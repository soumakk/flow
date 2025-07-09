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
	currentPageAtom,
} from '@/lib/atoms'
import { useAtomValue } from 'jotai/react'
import type { TaskFilterBody } from '@/types/tasks'

export function useSpaces() {
	const db = usePGlite()
	return useQuery({
		queryKey: ['spaces'],
		queryFn: () => getSpaces(db),
	})
}

export function useTaskFilters() {
	const activeSpaceId = useAtomValue(activeSpaceIdAtom)
	const searchQuery = useAtomValue(searchQueryAtom)
	const statusFilter = useAtomValue(statusFilterAtom)
	const tagsFilter = useAtomValue(tagsFilterAtom)
	const priorityFilter = useAtomValue(priorityFilterAtom)
	const dueDateFilter = useAtomValue(dueDateFilterAtom)
	const currentPage = useAtomValue(currentPageAtom)
	const pageLimit = 20

	const body: TaskFilterBody = {
		spaceId: activeSpaceId,
		statusIds: statusFilter,
		priorities: priorityFilter,
		tagIds: tagsFilter,
		search: searchQuery,
		offset: (currentPage - 1) * pageLimit,
		limit: pageLimit,
	}

	return {
		pageLimit,
		currentPage,
		reqBody: body,
	}
}

export function useTasks() {
	const { reqBody } = useTaskFilters()
	console.log(reqBody)

	const db = usePGlite()

	return useQuery({
		queryKey: ['tasks', reqBody],
		queryFn: () => getAllTasksSQL(db, reqBody),
		enabled: !!reqBody?.spaceId,
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
