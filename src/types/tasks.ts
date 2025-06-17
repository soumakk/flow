export interface ISpace {
	id: number
	name: string
	created_at: string
}

export interface ITask {
	id: number
	title: string
	description?: string | null
	due_date: string
	status_id: number
	tag_ids: string[]
	priority: string
	sub_tasks: ISubTask[]
	created_at: string
	updated_at: string
}

export interface ISubTask {
	id: number
	title: string
	completed: boolean
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
