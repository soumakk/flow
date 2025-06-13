export interface ITask {
	id: string
	created_at: string
	title: string
	description?: string | null
	priority: string
	due_date: string
	status_id: string
	tag_ids: string[]
	updated_at: string
	sub_tasks: ISubTask[]
}

export interface ISubTask {
	id: string
	title: string
	completed: boolean
}

export interface IStatus {
	id: string
	name: string
	color: string
	created_at: string
	updated_at: string
}

export interface ITag {
	id: string
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
