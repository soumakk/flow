import { activeSpaceIdAtom, PriorityOptions } from '@/lib/atoms'
import { formatDate } from '@/lib/utils'
import { useTasks } from '@/services/query'
import type { ITask, TaskPriority } from '@/types/tasks'
import type { ColumnDef } from '@tanstack/react-table'
import { useAtomValue } from 'jotai/react'
import { Calendar1, CircleDot, Flag, Hourglass, Loader, Tag, Type } from 'lucide-react'
import { useState } from 'react'
import DataTable from './DataTable'
import TaskDetailsDialog from '../task-details/TaskDetailsDialog'
import PriorityFlag from '@/components/widgets/PriorityFlag'
import StatusBadge from '@/components/widgets/StatusBadge'
import TagBadge from '@/components/widgets/TagBadge'

export default function TableView() {
	const activeSpaceId = useAtomValue(activeSpaceIdAtom)
	const { data: tasks, isLoading: isTasksLoading } = useTasks({ spaceId: activeSpaceId })
	const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null)

	const columns: ColumnDef<ITask>[] = [
		{
			accessorKey: 'title',
			header: () => (
				<p className="flex gap-2 items-center">
					<Type className="h-4 w-4 text-muted-foreground" />
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
					<Flag className="h-4 w-4 text-muted-foreground" />
					<span>Priority</span>
				</p>
			),
			cell: ({ getValue }) => {
				const priority = getValue()
				const selectedLabel = PriorityOptions?.find((opt) => opt.value === priority)?.label
				return (
					<div className="flex items-center gap-2">
						<PriorityFlag priority={priority as TaskPriority} className="h-4 w-4" />
						<span>{selectedLabel}</span>
					</div>
				)
			},
		},
		{
			accessorKey: 'status_id',
			header: () => (
				<p className="flex gap-2 items-center">
					<CircleDot className="h-4 w-4 text-muted-foreground" />
					<span>Status</span>
				</p>
			),
			cell: ({ getValue, row }) => {
				const status = row.original?.status
				return <StatusBadge status={status} />
			},
		},
		{
			accessorKey: 'due_date',
			header: () => (
				<p className="flex gap-2 items-center whitespace-nowrap">
					<Calendar1 className="h-4 w-4 text-muted-foreground" />
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
					<Tag className="h-4 w-4 text-muted-foreground" />
					<span>Tags</span>
				</p>
			),
			cell: ({ getValue, row }) => {
				const tags = row.original?.tags
				return (
					<div className="flex items-center gap-2">
						{tags?.map((tag) => (
							<TagBadge tag={tag} />
						))}
					</div>
				)
			},
		},

		{
			accessorKey: 'updated_at',
			header: () => (
				<p className="flex gap-2 items-center whitespace-nowrap">
					<Hourglass className="h-4 w-4 text-muted-foreground" />
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
		return (
			<div className="grid place-content-center h-full">
				<Loader className="h-5 w-5 animate-spin" />
			</div>
		)
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
