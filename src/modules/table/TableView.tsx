import { defaultStatus, defaultTags, defaultTasks, PriorityOptions } from '@/lib/data'
import DataTable from './DataTable'
import { formatDate } from '@/lib/utils'
import { Calendar1, Flag, Hourglass, Loader, Tag, Type } from 'lucide-react'
import type { ColumnDef } from '@tanstack/react-table'
import { useTasks } from '@/services/query'

export default function TableView() {
	const { data: tasks, isLoading: isTasksLoading } = useTasks()
	console.log(tasks)

	const columns: ColumnDef<any>[] = [
		{
			accessorKey: 'title',
			header: () => (
				<p className="flex gap-2 items-center">
					<Type className="h-4 w-4" />
					<span>Title</span>
				</p>
			),
			cell: ({ getValue }) => {
				const value = getValue() as string
				return <p className="whitespace-nowrap">{value}</p>
			},
			size: 300,
		},
		{
			accessorKey: 'priority',
			header: () => (
				<p className="flex gap-2 items-center">
					<Flag className="h-4 w-4" />
					<span>Priority</span>
				</p>
			),
			cell: ({ getValue }) => {
				const priority = getValue()
				const selectedLabel = PriorityOptions?.find((opt) => opt.value === priority)?.label
				return <p className="whitespace-nowrap">{selectedLabel}</p>
			},
		},
		{
			accessorKey: 'status_id',
			header: 'Status',
			cell: ({ getValue }) => {
				const statusId = getValue() as string
				const statusInfo = defaultStatus?.find((opt) => opt.id === statusId)
				return <p className="whitespace-nowrap">{statusInfo?.name}</p>
			},
		},
		{
			accessorKey: 'due_date',
			header: () => (
				<p className="flex gap-2 items-center whitespace-nowrap">
					<Calendar1 className="h-4 w-4" />
					<span>Due Date</span>
				</p>
			),
			cell: ({ getValue }) => {
				const date = getValue() as string
				return <>{date ? <p className="whitespace-nowrap">{formatDate(date)}</p> : null}</>
			},
		},
		{
			accessorKey: 'tag_ids',
			header: () => (
				<p className="flex gap-2 items-center">
					<Tag className="h-4 w-4" />
					<span>Tags</span>
				</p>
			),
			cell: ({ getValue }) => {
				const tagIds = getValue() as string[]
				const selectedTags = defaultTags?.filter((tag) => tagIds?.includes(tag.id))

				return (
					<p className="whitespace-nowrap">
						{selectedTags?.map((tag) => tag.name)?.join(', ')}
					</p>
				)
			},
		},

		{
			accessorKey: 'updated_at',
			header: () => (
				<p className="flex gap-2 items-center whitespace-nowrap">
					<Hourglass className="h-4 w-4" />
					<span>Last updated</span>
				</p>
			),
			cell: ({ getValue }) => {
				const updated = getValue() as string
				if (!updated) return null
				return (
					<p className="whitespace-nowrap">
						{formatDate(updated, 'MMM DD, YYYY HH:mm a')}
					</p>
				)
			},
		},
	]

	if (isTasksLoading) {
		return <Loader className="h-5 w-5 animate-spin" />
	}

	return <DataTable columns={columns} data={tasks} />
}
