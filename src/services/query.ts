import { usePGlite } from '@electric-sql/pglite-react'
import { useQuery } from '@tanstack/react-query'
import { getAllTasksSQL, getSpaces, getStatusList, getTagsList, getTaskDetails } from './api'

export function useSpaces() {
	const db = usePGlite()
	return useQuery({
		queryKey: ['spaces'],
		queryFn: () => getSpaces(db),
	})
}

export function useTasks({ spaceId }: { spaceId: number }) {
	const db = usePGlite()
	return useQuery({
		queryKey: ['tasks', spaceId],
		queryFn: () => getAllTasksSQL(db, { spaceId }),
		enabled: !!spaceId,
	})
}

export function useTaskDetails({ taskId }: { taskId: number }) {
	const db = usePGlite()

	return useQuery({
		queryKey: ['task', taskId],
		queryFn: () => getTaskDetails(db, { taskId }),
		enabled: !!taskId,
	})
}

export function useStatusList() {
	const db = usePGlite()
	return useQuery({
		queryKey: ['status'],
		queryFn: () => getStatusList(db),
	})
}

export function useTagsList() {
	const db = usePGlite()
	return useQuery({
		queryKey: ['tags'],
		queryFn: () => getTagsList(db),
	})
}
