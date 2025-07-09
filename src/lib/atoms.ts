import { TaskPriority } from '@/types/tasks'
import { atomWithStorage } from 'jotai/utils'
import { atom } from 'jotai/vanilla'

export enum Theme {
	light = 'light',
	dark = 'dark',
	system = 'system',
}

export const StatusColors = [
	'#E53935', // Red
	'#FF7043', // Orange Red
	'#FB8C00', // Orange
	'#FFA726', // Light Orange
	'#FFD600', // Gold
	'#FFF176', // Light Yellow
	'#AEEA00', // Light Lime
	'#8BC34A', // Light Green
	'#43A047', // Green
	'#00C853', // Emerald
	'#1DE9B6', // Mint
	'#00897B', // Teal
	'#00B8D4', // Cyan
	'#18FFFF', // Aqua
	'#039BE5', // Light Blue
	'#1E88E5', // Blue
	'#1976D2', // Deep Blue
	'#3F51B5', // Indigo
	'#5C6BC0', // Light Indigo
	'#7C4DFF', // Deep Purple
	'#8E24AA', // Purple
	'#BA68C8', // Lavender
	'#D81B60', // Magenta
	'#F06292', // Pink
	'#F8BBD0', // Pastel Rose
	'#8D6E63', // Brown
	'#A1887F', // Light Brown
	'#BCAAA4', // Taupe
	'#757575', // Gray
	'#90A4AE', // Blue Gray
	'#B0BEC5', // Light Blue Gray
	'#546E7A', // Slate
	'#263238', // Charcoal
	'#607D8B', // Steel Blue
	'#4DD0E1', // Turquoise
	'#81D4FA', // Sky Blue
	'#AED581', // Pastel Green
	'#DCE775', // Pastel Yellow
	'#FFD54F', // Pastel Gold
	'#FF8A65', // Coral
	'#FFAB91', // Light Coral
	'#CE93D8', // Pastel Purple
	'#B388FF', // Pastel Violet
	'#80CBC4', // Pastel Teal
	'#C5E1A5', // Pastel Lime
]

export const themeColors = [
	'#2563EB', // Blue (Strong, accessible)
	'#F59E42', // Orange (Warm, energetic)
	'#10B981', // Emerald Green (Fresh, modern)
	'#E11D48', // Rose Red (Bold, attention-grabbing)
	'#A21CAF', // Purple (Rich, creative)
	'#FACC15', // Gold/Yellow (Bright, lively)
	'#0EA5E9', // Sky Blue (Cool, clean)
	'#F472B6', // Pink (Soft yet vibrant)
]

export const defaultPrimaryColor = themeColors[0]

export const activeSpaceIdAtom = atomWithStorage<number | null>('space', null)
export const themeAtom = atomWithStorage<Theme>('theme', Theme.light)
export const primaryColorAtom = atomWithStorage('color', defaultPrimaryColor)

export const searchQueryAtom = atom('')
export const statusFilterAtom = atom<number[]>([])
export const tagsFilterAtom = atom<number[]>([])
export const priorityFilterAtom = atom<string[]>([])
export const dueDateFilterAtom = atom<string>()
export const currentPageAtom = atom<number>(1)

export const PriorityOptions = [
	{
		label: 'Urgent',
		value: TaskPriority.Urgent,
		color: '#fb2c36',
	},
	{
		label: 'High',
		value: TaskPriority.High,
		color: '#eab308',
	},
	{
		label: 'Normal',
		value: TaskPriority.Normal,
		color: '#3b82f6',
	},
	{
		label: 'Low',
		value: TaskPriority.Low,
		color: '#6a7282 ',
	},
]
