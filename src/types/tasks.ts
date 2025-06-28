export interface ISpace {
	id: number
	name: string
	created_at: string
}

export interface ITask {
	id: number
	title: string
	description: string
	due_date: string
	priority: string
	created_at: string
	updated_at: string
	space_id: number
	status_id: number
	status: IStatus
	tags: ITag[]
	subtask_count: number
	completed_subtasks: number
}

export interface ITaskDetails {
	id: number
	title: string
	description: string
	due_date: string
	priority: string
	created_at: string
	updated_at: string
	space_id: number
	status_id: number
	status: IStatus
	tags: ITag[]
	subtasks: ISubTask[]
	subtask_count: number
	completed_subtasks: number
}

export interface ISubTask {
	id: number
	title: string
	completed: boolean
	created_at: string
}

export interface IStatus {
	id: number
	name: string
	color: string
	created_at: string
}

export interface ITag {
	id: number
	name: string
	color: string
	created_at: string
}

export enum TaskPriority {
	Urgent = 'urgent',
	High = 'high',
	Normal = 'normal',
	Low = 'low',
}

export interface IUpdateTaskBody {
	taskId: number
	title: string
	description: string
	status_id: number
	priority: string
	due_date: string
	tag_ids: number[]
}

export interface IAddSubTaskBody {
	taskId: number
	title: string
	completed: boolean
}

export interface IUpdateSubTaskBody {
	subTaskId: number
	taskId: number
	title: string
	completed: boolean
}
