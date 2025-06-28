import { useMutation } from '@tanstack/react-query'
import { addSpace, addSubTask, deleteSubTask, updateSubTask, updateTaskDetails } from './api'
import type { IAddSubTaskBody, IUpdateSubTaskBody, IUpdateTaskBody } from '@/types/tasks'
import { usePGlite } from '@electric-sql/pglite-react'

export function useTaskUpdateMutation() {
	const db = usePGlite()
	return useMutation({
		mutationFn: (body: IUpdateTaskBody) => updateTaskDetails(db, body),
	})
}

export function useAddSubTask() {
	const db = usePGlite()
	return useMutation({
		mutationFn: (body: IAddSubTaskBody) => addSubTask(db, body),
	})
}

export function useUpdateSubTask() {
	const db = usePGlite()
	return useMutation({
		mutationFn: (body: IUpdateSubTaskBody) => updateSubTask(db, body),
	})
}

export function useDeleteSubTask() {
	const db = usePGlite()
	return useMutation({
		mutationFn: (body: { subTaskId: number }) => deleteSubTask(db, body),
	})
}

export function useAddSpace() {
	const db = usePGlite()
	return useMutation({
		mutationFn: (body: { name: string }) => addSpace(db, body),
	})
}
