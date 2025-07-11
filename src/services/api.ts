import type {
	IAddSubTaskBody,
	IAddTaskBody,
	ISpace,
	IStatus,
	ITag,
	ITask,
	ITaskDetails,
	IUpdateSubTaskBody,
	IUpdateTaskBody,
	TaskFilterBody,
} from '@/types/tasks'
import type { PGliteWithLive } from '@electric-sql/pglite/live'

// Tasks
export async function getAllTasksSQL(
	db: PGliteWithLive,
	body: TaskFilterBody
): Promise<{ totalCount: number; tasks: ITask[] } | null> {
	try {
		const queryParts: string[] = ['t.space_id = $1']
		const params: any[] = [body.spaceId]
		let paramIndex = 2

		// Status filter
		if (body.statusIds?.length) {
			queryParts.push(
				`t.status_id IN (${body.statusIds.map(() => `$${paramIndex++}`).join(', ')})`
			)
			params.push(...body.statusIds)
		}

		// Priority filter
		if (body.priorities?.length) {
			queryParts.push(
				`t.priority IN (${body.priorities.map(() => `$${paramIndex++}`).join(', ')})`
			)
			params.push(...body.priorities)
		}

		// Tag filter (tasks with any of the selected tags)
		if (body.tagIds?.length) {
			queryParts.push(`t.id IN (
        SELECT task_id FROM task_tag WHERE tag_id IN (${body.tagIds
			.map(() => `$${paramIndex++}`)
			.join(', ')})
      )`)
			params.push(...body.tagIds)
		}

		// Due date range
		if (body.dueDateFrom) {
			queryParts.push(`t.due_date >= $${paramIndex++}`)
			params.push(body.dueDateFrom)
		}
		if (body.dueDateTo) {
			queryParts.push(`t.due_date <= $${paramIndex++}`)
			params.push(body.dueDateTo)
		}

		// Case-insensitive title search
		if (body.search) {
			queryParts.push(`t.title ILIKE $${paramIndex++}`)
			params.push(`%${body.search}%`)
		}

		// Pagination
		const limit = body.limit ?? 10
		const offset = body.offset ?? 0
		params.push(limit, offset)

		const whereClause = queryParts.length ? `WHERE ${queryParts.join(' AND ')}` : ''

		// --- Count Query (without limit/offset) ---
		const countParams = params.slice(0, params.length - 2)
		const countQuery = `
      SELECT COUNT(DISTINCT t.id) AS total_count
      FROM task t
      ${whereClause}
    `
		const countResult = await db.query(countQuery, countParams)
		const totalCount = Number((countResult.rows[0] as any)?.total_count ?? 0)

		// --- Main Data Query ---
		const data = await db.query(
			`
      SELECT 
        t.id,
        t.title,
        t.description,
        t.due_date,
        t.priority,
        t.created_at,
        t.updated_at,
        s.id as space_id,
        st.id as status_id,
        JSONB_BUILD_OBJECT(
          'id', st.id, 
          'name', st.name, 
          'color', st.color
        ) as status,
        COALESCE(
          JSONB_AGG(
            DISTINCT CASE 
              WHEN tag.id IS NOT NULL 
              THEN JSONB_BUILD_OBJECT(
                'id', tag.id, 
                'name', tag.name, 
                'color', tag.color
              )
              ELSE NULL 
            END
          ) FILTER (WHERE tag.id IS NOT NULL), 
          '[]'::jsonb
        ) as tags,
        COUNT(DISTINCT sub.id) as subtask_count,
        COUNT(DISTINCT CASE WHEN sub.completed = true THEN sub.id END) as completed_subtasks
      FROM task t
      JOIN space s ON t.space_id = s.id
      JOIN status st ON t.status_id = st.id
      LEFT JOIN task_tag tt ON t.id = tt.task_id
      LEFT JOIN tag ON tt.tag_id = tag.id
      LEFT JOIN sub_task sub ON t.id = sub.task_id
      ${whereClause}
      GROUP BY t.id, s.id, s.name, st.id, st.name, st.color
      ORDER BY t.created_at DESC
      LIMIT $${params.length - 1} OFFSET $${params.length}
      `,
			params
		)

		return {
			totalCount,
			tasks: data.rows as ITask[],
		}
	} catch (error) {
		console.log(error)
		return null
	}
}

export async function getTaskDetails(db: PGliteWithLive, params: { taskId: number }) {
	const data = await db.query(
		`
     SELECT 
    t.id,
    t.title,
    t.description,
    t.due_date,
    t.priority,
    t.created_at,
    t.updated_at,
    s.id as space_id,
    st.id as status_id,

    JSONB_BUILD_OBJECT(
      'id', st.id, 
      'name', st.name, 
      'color', st.color
    )  as status,

    COALESCE(
      JSONB_AGG(
        DISTINCT CASE 
          WHEN tag.id IS NOT NULL 
          THEN JSONB_BUILD_OBJECT(
            'id', tag.id, 
            'name', tag.name, 
            'color', tag.color
          )
          ELSE NULL 
        END
      ) FILTER (WHERE tag.id IS NOT NULL), 
      '[]'::jsonb
    ) as tags,

    COALESCE(
      JSONB_AGG(
        DISTINCT CASE 
          WHEN sub.id IS NOT NULL 
          THEN JSONB_BUILD_OBJECT(
            'id', sub.id, 
            'title', sub.title, 
            'completed', sub.completed,
            'created_at', sub.created_at
          )
          ELSE NULL 
        END
      ) FILTER (WHERE sub.id IS NOT NULL), 
      '[]'::jsonb
    ) as subtasks,

    COUNT(DISTINCT sub.id) as subtask_count,
    COUNT(DISTINCT CASE WHEN sub.completed = true THEN sub.id END) as completed_subtasks
    FROM task t
    JOIN space s ON t.space_id = s.id
    JOIN status st ON t.status_id = st.id
    LEFT JOIN task_tag tt ON t.id = tt.task_id
    LEFT JOIN tag ON tt.tag_id = tag.id
    LEFT JOIN sub_task sub ON t.id = sub.task_id
    WHERE t.id = $1
    GROUP BY t.id, s.id, s.name, st.id, st.name, st.color
    ORDER BY t.created_at DESC
    `,
		[params.taskId]
	)
	return data.rows[0] as ITaskDetails
}

export async function addNewTask(db: PGliteWithLive, body: IAddTaskBody) {
	return await db.sql`
       INSERT INTO task (title, description, status_id, priority, due_date, space_id) 
        VALUES (${body.title}, ${body.description}, ${body.status_id}, ${body.priority}, ${body.due_date}, ${body.space_id})
    `
}

export async function updateTaskDetails(db: PGliteWithLive, body: IUpdateTaskBody) {
	return await db.transaction(async (tx) => {
		// Update task fields
		await tx.sql`
        UPDATE task
        SET
          title = ${body.title},
          description = ${body.description},
          status_id = ${body.status_id},
          priority = ${body.priority},
          due_date = ${body.due_date},
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ${body.taskId}
      `

		// Update tags (delete existing + insert new)
		await tx.sql`
        DELETE FROM task_tag
        WHERE task_id = ${body.taskId}
      `

		if (body.tag_ids?.length) {
			await tx.sql`
          INSERT INTO task_tag (task_id, tag_id)
          SELECT ${body.taskId}, unnest(${body.tag_ids}::int[])
        `
		}
	})
}

export async function deleteTask(db: PGliteWithLive, body: { taskId: number }) {
	return await db.sql`
      DELETE FROM task 
      WHERE id = ${body.taskId}
    `
}

// Sub task
export async function addSubTask(db: PGliteWithLive, body: IAddSubTaskBody) {
	return await db.sql`
      INSERT INTO sub_task (title, completed, task_id) 
      VALUES (${body.title}, ${body.completed}, ${body.taskId})
    `
}

export async function updateSubTask(db: PGliteWithLive, body: IUpdateSubTaskBody) {
	console.log(body)
	return await db.sql`
      UPDATE sub_task 
      SET 
        title = ${body.title},
        completed = ${body.completed},
        task_id = ${body.taskId}
      WHERE id = ${body.subTaskId}
    `
}

export async function deleteSubTask(db: PGliteWithLive, body: { subTaskId: number }) {
	return await db.sql`
      DELETE FROM sub_task 
      WHERE id = ${body.subTaskId}
    `
}

// Spaces
export async function getSpaces(db: PGliteWithLive) {
	const data = await db.query(`
		SELECT id, name, created_at 
		FROM space 
		ORDER BY created_at DESC
    `)
	return data?.rows as ISpace[]
}

export async function addSpace(db: PGliteWithLive, body: { name: string }) {
	return await db.sql`
      INSERT INTO space (name)
      VALUES (${body.name})
    `
}

export async function updateSpace(db: PGliteWithLive, body: { name: string; spaceId: number }) {
	return await db.sql`
      UPDATE space 
      SET 
        name = ${body.name}
      WHERE id = ${body.spaceId}
    `
}

export async function deleteSpace(db: PGliteWithLive, body: { spaceId: number }) {
	return await db.sql`
      DELETE FROM space 
      WHERE id = ${body.spaceId}
    `
}

// Status
export async function getStatusList(db: PGliteWithLive, body: { search?: string }) {
	let query = ''
	const params: string[] = []

	if (body?.search) {
		query = `WHERE LOWER(name) LIKE LOWER($1)`
		params.push(`%${body.search}%`)
	}

	const data = await db.query(
		`
		SELECT id, name, color, created_at 
		FROM status 
    ${query}
		ORDER BY created_at DESC
    `,
		params
	)
	return data?.rows as IStatus[]
}

export async function addStatus(db: PGliteWithLive, body: { name: string; color: string }) {
	const data = await db.sql`
      INSERT INTO status (name, color)
      VALUES (${body.name}, ${body.color})
      RETURNING id
    `
	return data?.rows?.[0] as { id: number }
}

export async function updateStatus(
	db: PGliteWithLive,
	body: { name: string; color: string; statusId: number }
) {
	return await db.sql`
      UPDATE status 
      SET 
        name = ${body.name},
        color = ${body.color}
      WHERE id = ${body.statusId}
    `
}

export async function deleteStatus(db: PGliteWithLive, body: { statusId: number }) {
	return await db.sql`
      DELETE FROM status  
      WHERE id = ${body.statusId}
    `
}

// Tags
export async function getTagsList(db: PGliteWithLive, body: { search?: string }) {
	let query = ''
	const params: string[] = []

	if (body?.search) {
		query = `WHERE LOWER(name) LIKE LOWER($1)`
		params.push(`%${body.search}%`)
	}

	const data = await db.query(
		`
		SELECT id, name, color, created_at 
		FROM tag 
    ${query}
		ORDER BY created_at DESC
    `,
		params
	)
	return data?.rows as ITag[]
}

export async function addTag(db: PGliteWithLive, body: { name: string; color: string }) {
	return await db.sql`
      INSERT INTO tag (name, color)
      VALUES (${body.name}, ${body.color})
    `
}

export async function updateTag(
	db: PGliteWithLive,
	body: { name: string; color: string; tagId: number }
) {
	return await db.sql`
      UPDATE tag 
      SET 
        name = ${body.name},
        color = ${body.color}
      WHERE id = ${body.tagId}
    `
}

export async function deleteTag(db: PGliteWithLive, body: { tagId: number }) {
	return await db.sql`
      DELETE FROM tag 
      WHERE id = ${body.tagId}
    `
}
