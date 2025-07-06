import type {
	IAddSubTaskBody,
	IAddTaskBody,
	IUpdateSubTaskBody,
	IUpdateTaskBody,
} from '@/types/tasks'
import { usePGlite } from '@electric-sql/pglite-react'
import { useMutation } from '@tanstack/react-query'
import {
	addNewTask,
	addSpace,
	addStatus,
	addSubTask,
	addTag,
	deleteSpace,
	deleteStatus,
	deleteSubTask,
	deleteTag,
	updateSpace,
	updateStatus,
	updateSubTask,
	updateTag,
	updateTaskDetails,
} from './api'

// Tasks
export function useAddTask() {
	const db = usePGlite()
	return useMutation({
		mutationFn: (body: IAddTaskBody) => addNewTask(db, body),
	})
}

export function useUpdateTask() {
	const db = usePGlite()
	return useMutation({
		mutationFn: (body: IUpdateTaskBody) => updateTaskDetails(db, body),
	})
}

// Sub task
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

// Space
export function useAddSpace() {
	const db = usePGlite()
	return useMutation({
		mutationFn: (body: { name: string }) => addSpace(db, body),
	})
}

export function useUpdateSpace() {
	const db = usePGlite()
	return useMutation({
		mutationFn: (body: { name: string; spaceId: number }) => updateSpace(db, body),
	})
}

export function useDeleteSpace() {
	const db = usePGlite()
	return useMutation({
		mutationFn: (body: { spaceId: number }) => deleteSpace(db, body),
	})
}

// Tags
export function useAddTag() {
	const db = usePGlite()
	return useMutation({
		mutationFn: (body: { name: string; color: string }) => addTag(db, body),
	})
}

export function useUpdateTag() {
	const db = usePGlite()
	return useMutation({
		mutationFn: (body: { name: string; color: string; tagId: number }) => updateTag(db, body),
	})
}

export function useDeleteTag() {
	const db = usePGlite()
	return useMutation({
		mutationFn: (body: { tagId: number }) => deleteTag(db, body),
	})
}

// Status
export function useAddStatus() {
	const db = usePGlite()
	return useMutation({
		mutationFn: (body: { name: string; color: string }) => addStatus(db, body),
	})
}

export function useUpdateStatus() {
	const db = usePGlite()
	return useMutation({
		mutationFn: (body: { name: string; color: string; statusId: number }) =>
			updateStatus(db, body),
	})
}

export function useDeleteStatus() {
	const db = usePGlite()
	return useMutation({
		mutationFn: (body: { statusId: number }) => deleteStatus(db, body),
	})
}
