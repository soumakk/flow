import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import Loader from '@/components/widgets/Loader'
import StatusBadge from '@/components/widgets/StatusBadge'
import { useDeleteTask, useUpdateTask } from '@/services/mutation'
import { useStatusList, useTagsList, useTaskDetails } from '@/services/query'
import { DialogTitle } from '@radix-ui/react-dialog'
import DateField from './fields/DateField'
import PriorityField from './fields/PriorityField'
import StatusField from './fields/StatusField'
import TagsField from './fields/TagsField'
import TextField from './fields/TextField'
import TextareaField from './fields/TextareaField'
import SubTasksList from './sub-task/SubTasksList'
import { Button } from '@/components/ui/button'

export default function TaskDetailsDialog({
	open,
	onClose,
	taskId,
	refetchTasks,
}: {
	open: boolean
	onClose: () => void
	taskId: number
	refetchTasks: () => void
}) {
	const {
		data: taskData,
		isLoading,
		refetch,
	} = useTaskDetails({
		taskId: taskId,
	})
	const { data: statusList, isLoading: isStatusLoading } = useStatusList()
	const { data: tagsList, isLoading: isTagsLoading } = useTagsList({})
	const { mutate: updateTask } = useUpdateTask()
	const { mutate: deleteTask } = useDeleteTask()

	function handleUpdateTask(key: string, value: any) {
		updateTask(
			{
				taskId,
				title: taskData?.title,
				description: taskData?.description,
				status_id: taskData?.status_id,
				due_date: taskData?.due_date,
				priority: taskData?.priority,
				tag_ids: taskData?.tags?.map((tag) => tag.id),
				[key]: value,
			},
			{
				onSuccess: () => {
					refetch()
					refetchTasks?.()
				},
			}
		)
	}

	function handleDeleteTask() {
		deleteTask(
			{
				taskId,
			},
			{
				onSuccess: () => {
					refetchTasks?.()
					onClose()
				},
			}
		)
	}

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle></DialogTitle>
				</DialogHeader>

				{isLoading || isStatusLoading || isTagsLoading ? (
					<Loader className="min-h-[200px] " />
				) : (
					<div className="">
						<div className="mb-3">
							<TextField
								className="text-xl font-medium w-full focus:outline-2 outline-input p-2 rounded-sm"
								placeholder="Untitled"
								defaultValue={taskData?.title}
								onSave={(value) => {
									handleUpdateTask('title', value)
								}}
							/>
						</div>

						<div className="my-4 flex flex-col gap-3">
							<div className="grid grid-cols-3 items-center">
								<label className="text-muted-foreground text-xs uppercase font-medium">
									Due date
								</label>

								<DateField
									initialValue={taskData?.due_date}
									onSave={(value) => {
										handleUpdateTask('due_date', value)
									}}
								/>
							</div>

							<div className="grid grid-cols-3 items-center">
								<label className="text-muted-foreground text-xs uppercase font-medium">
									Status
								</label>
								<StatusField
									onSave={(value) => {
										handleUpdateTask('status_id', value)
									}}
									initialValue={taskData?.status_id}
									statusList={statusList}
									render={(statusInfo) =>
										statusInfo ? <StatusBadge status={statusInfo} /> : null
									}
								/>
							</div>

							<div className="grid grid-cols-3 items-center">
								<label className="text-muted-foreground text-xs uppercase font-medium">
									Priority
								</label>
								<PriorityField
									onSave={(value) => {
										handleUpdateTask('priority', value)
									}}
									initialValue={taskData.priority}
								/>
							</div>

							<div className="grid grid-cols-3 items-center">
								<label className="text-muted-foreground text-xs uppercase font-medium">
									Tags
								</label>
								<TagsField
									onSave={(value) => {
										handleUpdateTask('tag_ids', value)
									}}
									initialTags={taskData?.tags?.map((tag) => tag.id)}
									tagsList={tagsList}
								/>
							</div>
						</div>

						<div className="col-span-3">
							<div>
								<TextareaField
									initialValue={taskData.description}
									onSave={(value) => {
										handleUpdateTask('description', value)
									}}
								/>
							</div>
						</div>

						<SubTasksList task={taskData} />

						<Button
							variant="secondary"
							className="bg-transparent text-destructive hover:bg-destructive/10"
							onClick={handleDeleteTask}
						>
							Delete
						</Button>
					</div>
				)}
			</DialogContent>
		</Dialog>
	)
}
