import CircularProgress from '@/components/widgets/CircularProgress'
import PriorityFlag from '@/components/widgets/PriorityFlag'
import StatusBadge from '@/components/widgets/StatusBadge'
import { PriorityOptions } from '@/lib/atoms'
import { formatDate } from '@/lib/utils'
import { useTasks } from '@/services/query'
import type { ITask, TaskPriority } from '@/types/tasks'
import type { ColumnDef } from '@tanstack/react-table'
import { Calendar1, CircleDot, Flag, Hourglass, Tag, Type } from 'lucide-react'
import { useState } from 'react'
import TaskDetailsDialog from '../task-details/TaskDetailsDialog'
import DataTable from './DataTable'
import TagsCell from './TagsCell'
import TaskFilters from '../filters/TaskFilters'
import TableFooter from './TableFooter'

export default function TableView() {
	const { data, isLoading: isTasksLoading, refetch } = useTasks()
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
			cell: ({ getValue, row }) => {
				const value = getValue() as string
				const totalCount = row.original?.subtask_count ?? 0
				const completedCount = row.original?.completed_subtasks ?? 0
				const progress = (completedCount * 100) / totalCount

				return (
					<div className="flex items-center gap-2">
						<p className="whitespace-nowrap">{value}</p>
						<CircularProgress progress={progress} size={18} strokeWidth={2} />
					</div>
				)
			},
			size: 400,
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
				return <TagsCell tags={tags} />
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

	return (
		<>
			<div className="flex-1 relative max-w-6xl px-4 mx-auto flex flex-col">
				<TaskFilters />
				<div className="flex-1">
					<DataTable
						columns={columns}
						data={data?.tasks ?? []}
						onRowClick={(task) => setSelectedTaskId(task.original.id)}
						isLoading={isTasksLoading}
					/>
				</div>
				<TableFooter totalCount={data?.totalCount} />
			</div>

			{selectedTaskId ? (
				<TaskDetailsDialog
					open={!!selectedTaskId}
					onClose={() => setSelectedTaskId(null)}
					taskId={selectedTaskId}
					refetchTasks={refetch}
				/>
			) : null}
		</>
	)
}
