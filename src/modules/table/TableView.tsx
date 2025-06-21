import { activeSpaceIdAtom, PriorityOptions } from '@/lib/atoms'
import { formatDate } from '@/lib/utils'
import { useTasks } from '@/services/query'
import type { ITask } from '@/types/tasks'
import type { ColumnDef } from '@tanstack/react-table'
import { useAtomValue } from 'jotai/react'
import { Calendar1, Flag, Hourglass, Loader, Tag, Type } from 'lucide-react'
import { useState } from 'react'
import DataTable from './DataTable'
import TaskDetailsDialog from '../task-details/TaskDetailsDialog'

export default function TableView() {
	const activeSpaceId = useAtomValue(activeSpaceIdAtom)
	const { data: tasks, isLoading: isTasksLoading } = useTasks({ spaceId: activeSpaceId })
	const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null)

	const columns: ColumnDef<ITask>[] = [
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
			cell: ({ getValue, row }) => {
				const status = row.original?.status
				return <p className="whitespace-nowrap">{status?.name}</p>
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
			cell: ({ getValue, row }) => {
				const tags = row.original?.tags
				return (
					<p className="whitespace-nowrap">{tags?.map((tag) => tag.name)?.join(', ')}</p>
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

	return (
		<>
			<DataTable
				columns={columns}
				data={tasks ?? []}
				onRowClick={(task) => setSelectedTaskId(task.original.id)}
			/>

			{selectedTaskId ? (
				<TaskDetailsDialog
					open={!!selectedTaskId}
					onClose={() => setSelectedTaskId(null)}
					taskId={selectedTaskId}
				/>
			) : null}
		</>
	)
}
