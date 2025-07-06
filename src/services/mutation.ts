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
	addSubTask,
	deleteSpace,
	deleteSubTask,
	updateSpace,
	updateSubTask,
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
