import { TaskPriority } from '@/types/tasks'
import { atomWithStorage } from 'jotai/utils'

export const activeSpaceIdAtom = atomWithStorage<number | null>('space', null)

export const PriorityOptions = [
	{
		label: 'Urgent',
		value: TaskPriority.Urgent,
	},
	{
		label: 'High',
		value: TaskPriority.High,
	},
	{
		label: 'Normal',
		value: TaskPriority.Normal,
	},
	{
		label: 'Low',
		value: TaskPriority.Low,
	},
]
