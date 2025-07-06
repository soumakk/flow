import { usePGlite } from '@electric-sql/pglite-react'
import { useQuery } from '@tanstack/react-query'
import { getAllTasksSQL, getSpaces, getStatusList, getTagsList, getTaskDetails } from './api'
import {
	searchQueryAtom,
	statusFilterAtom,
	tagsFilterAtom,
	priorityFilterAtom,
	dueDateFilterAtom,
	activeSpaceIdAtom,
} from '@/lib/atoms'
import { useAtomValue } from 'jotai/react'

export function useSpaces() {
	const db = usePGlite()
	return useQuery({
		queryKey: ['spaces'],
		queryFn: () => getSpaces(db),
	})
}

export function useTasks() {
	const activeSpaceId = useAtomValue(activeSpaceIdAtom)
	const searchQuery = useAtomValue(searchQueryAtom)
	const statusFilter = useAtomValue(statusFilterAtom)
	const tagsFilter = useAtomValue(tagsFilterAtom)
	const priorityFilter = useAtomValue(priorityFilterAtom)
	const dueDateFilter = useAtomValue(dueDateFilterAtom)

	const db = usePGlite()

	const body = {
		spaceId: activeSpaceId,
		statusIds: statusFilter,
		// priorities: priorityFilter,
	}

	return useQuery({
		queryKey: ['tasks', body],
		queryFn: () => getAllTasksSQL(db, body),
		enabled: !!body?.spaceId,
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

export function useStatusList(params?: { search?: string }) {
	const db = usePGlite()
	return useQuery({
		queryKey: ['status', params],
		queryFn: () => getStatusList(db, params),
	})
}

export function useTagsList(params?: { search?: string }) {
	const db = usePGlite()
	return useQuery({
		queryKey: ['tags', params],
		queryFn: () => getTagsList(db, params),
	})
}
