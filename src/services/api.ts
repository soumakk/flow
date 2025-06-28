import type {
	ISpace,
	IStatus,
	IAddSubTaskBody,
	ITag,
	ITask,
	ITaskDetails,
	IUpdateTaskBody,
	IUpdateSubTaskBody,
} from '@/types/tasks'
import type { PGliteWithLive } from '@electric-sql/pglite/live'

export async function getAllTasksSQL(db: PGliteWithLive, params: { spaceId: number }) {
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
    
        COUNT(DISTINCT sub.id) as subtask_count,
        COUNT(DISTINCT CASE WHEN sub.completed = true THEN sub.id END) as completed_subtasks
    
        FROM task t
        JOIN space s ON t.space_id = s.id
        JOIN status st ON t.status_id = st.id
        LEFT JOIN task_tag tt ON t.id = tt.task_id
        LEFT JOIN tag ON tt.tag_id = tag.id
        LEFT JOIN sub_task sub ON t.id = sub.task_id
    
        WHERE t.space_id = $1
        GROUP BY t.id, s.id, s.name, st.id, st.name, st.color
        ORDER BY t.created_at DESC
      `,
		[params.spaceId]
	)
	return data.rows as ITask[]
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

export async function updateTaskDetails(db: PGliteWithLive, body: IUpdateTaskBody) {
	console.log({ body })
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

export async function getSpaces(db: PGliteWithLive) {
	const data = await db.query(`
		SELECT id, name, created_at 
		FROM space 
		ORDER BY created_at DESC
    `)
	return data?.rows as ISpace[]
}

export async function getStatusList(db: PGliteWithLive) {
	const data = await db.query(`
		SELECT id, name, color, created_at 
		FROM status 
		ORDER BY created_at DESC
    `)
	return data?.rows as IStatus[]
}

export async function getTagsList(db: PGliteWithLive) {
	const data = await db.query(`
		SELECT id, name, color, created_at 
		FROM tag 
		ORDER BY created_at DESC
    `)
	return data?.rows as ITag[]
}
