import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { useStatusList, useTagsList, useTaskDetails } from '@/services/query'
import { DialogTitle } from '@radix-ui/react-dialog'
import TextField from './fields/TextField'
import TextareaField from './fields/TextareaField'
import DateField from './fields/DateField'
import StatusField from './fields/StatusField'
import PriorityField from './fields/PriorityField'
import TagsField from './fields/TagsField'
import SubTasksList from './sub-task/SubTasksList'
import { useUpdateTask } from '@/services/mutation'
import { useQueryClient } from '@tanstack/react-query'
import { useAtomValue } from 'jotai/react'
import { activeSpaceIdAtom } from '@/lib/atoms'
import Loader from '@/components/widgets/Loader'

export default function TaskDetailsDialog({
	open,
	onClose,
	taskId,
}: {
	open: boolean
	onClose: () => void
	taskId: number
}) {
	const queryClient = useQueryClient()
	const activeSpaceId = useAtomValue(activeSpaceIdAtom)

	const { data: taskData, isLoading } = useTaskDetails({
		taskId: taskId,
	})
	const { data: statusList, isLoading: isStatusLoading } = useStatusList()
	const { data: tagsList, isLoading: isTagsLoading } = useTagsList({})
	const { mutate } = useUpdateTask()

	function updateTask(key: string, value: any) {
		mutate(
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
					queryClient.invalidateQueries({ queryKey: ['task', taskId] })
					queryClient.invalidateQueries({ queryKey: ['tasks', activeSpaceId] })
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
									updateTask('title', value)
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
										updateTask('due_date', value)
									}}
								/>
							</div>

							<div className="grid grid-cols-3 items-center">
								<label className="text-muted-foreground text-xs uppercase font-medium">
									Status
								</label>
								<StatusField
									onSave={(value) => {
										updateTask('status_id', value)
									}}
									initialValue={taskData?.status_id}
									statusList={statusList}
								/>
							</div>

							<div className="grid grid-cols-3 items-center">
								<label className="text-muted-foreground text-xs uppercase font-medium">
									Priority
								</label>
								<PriorityField
									onSave={(value) => {
										updateTask('priority', value)
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
										updateTask('tag_ids', value)
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
										updateTask('description', value)
									}}
								/>
							</div>
						</div>

						<SubTasksList task={taskData} />
					</div>
				)}
			</DialogContent>
		</Dialog>
	)
}
