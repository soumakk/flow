import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { useStatusList, useTagsList, useTaskDetails } from '@/services/query'
import { DialogTitle } from '@radix-ui/react-dialog'
import TextField from './fields/TextField'
import TextareaField from './fields/TextareaField'
import DateField from './fields/DateField'
import StatusField from './fields/StatusField'
import PriorityField from './fields/PriorityField'
import TagsField from './fields/TagsField'
import { Loader } from 'lucide-react'
import SubTasksList from './sub-task/SubTasksList'

export default function TaskDetailsDialog({
	open,
	onClose,
	taskId,
}: {
	open: boolean
	onClose: () => void
	taskId: number
}) {
	const { data: taskData, isLoading } = useTaskDetails({
		taskId: taskId,
	})
	const { data: statusList, isLoading: isStatusLoading } = useStatusList()
	const { data: tagsList, isLoading: isTagsLoading } = useTagsList()

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle></DialogTitle>
				</DialogHeader>

				{isLoading || isStatusLoading || isTagsLoading ? (
					<Loader />
				) : (
					<div className="">
						<div className="mb-3">
							<TextField
								className="text-xl font-medium w-full focus:outline-2 outline-input p-2 rounded-sm"
								placeholder="Untitled"
								defaultValue={taskData?.title}
								onSave={(value) => {
									// updateCell(task?.id, 'title', value)
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
										// updateCell(task?.id, 'due_date', value)
									}}
								/>
							</div>

							<div className="grid grid-cols-3 items-center">
								<label className="text-muted-foreground text-xs uppercase font-medium">
									Status
								</label>
								<StatusField
									onSave={(value) => {
										// updateCell(task?.id, 'status_id', value)
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
										// updateCell(task?.id, 'priority', value)
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
										// updateCell(task?.id, 'tag_ids', value)
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
										// updateCell(task?.id, 'description', value)
									}}
								/>
							</div>
						</div>

						<SubTasksList task={taskData} />

						<div className="col-span-2 flex flex-col gap-3 sm:gap-6"></div>
					</div>
				)}
			</DialogContent>
		</Dialog>
	)
}
