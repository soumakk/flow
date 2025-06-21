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

export const StatusColors = [
	'#F44336', // Red
	'#E91E63', // Pink
	'#9C27B0', // Purple
	'#673AB7', // Deep Purple
	'#3F51B5', // Indigo
	'#2196F3', // Blue
	'#03A9F4', // Light Blue
	'#00BCD4', // Cyan
	'#009688', // Teal
	'#4CAF50', // Green
	'#8BC34A', // Light Green
	'#CDDC39', // Lime
	'#FFEB3B', // Yellow
	'#FFC107', // Amber
	'#FF9800', // Orange
	'#FF5722', // Deep Orange
	'#795548', // Brown
	'#9E9E9E', // Grey
	'#607D8B', // Blue Grey
	'#000000', // Black
	'#B71C1C', // Dark Red
	'#880E4F', // Dark Pink
	'#4A148C', // Dark Purple
	'#311B92', // Deep Indigo
	'#1A237E', // Navy Blue
	'#01579B', // Strong Blue
	'#006064', // Dark Cyan
	'#1B5E20', // Dark Green
	'#33691E', // Olive Green
	'#827717', // Dark Lime
	'#F57F17', // Mustard
	'#E65100', // Burnt Orange
	'#BF360C', // Brick
	'#3E2723', // Coffee Brown
	'#616161', // Dark Grey
	'#455A64', // Steel Blue Grey
	'#90CAF9', // Soft Blue
	'#A5D6A7', // Soft Green
	'#FFF59D', // Soft Yellow
	'#FFAB91', // Soft Orange
]
