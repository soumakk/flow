import type { ISpace, ITask } from '@/types/tasks'
import { useLiveQuery } from '@electric-sql/pglite-react'

export function useSpaces() {
	const data = useLiveQuery(`
		SELECT id, name, created_at 
		FROM space 
		ORDER BY created_at DESC`)
	return {
		data: data?.rows as unknown as ISpace[],
		isLoading: data === undefined,
	}
}

export function useTasks() {
	const tasks = useLiveQuery(` 
  SELECT 
    t.id,
    t.title,
    t.description,
    t.due_date,
    t.priority,
    t.created_at,
    t.updated_at,
    s.name as space_name,
    s.id as space_id,
    st.name as status_name,
    st.color as status_color,
    st.id as status_id,
    -- Use JSONB_AGG instead of JSON_AGG
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
  GROUP BY t.id, s.id, s.name, st.id, st.name, st.color
  ORDER BY t.created_at DESC
  `)

	return {
		data: tasks?.rows as unknown as ITask[],
		isLoading: tasks === undefined,
	}
}
