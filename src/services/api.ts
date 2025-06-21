import type { ISpace, IStatus, ITag, ITask, ITaskDetails } from '@/types/tasks'
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
