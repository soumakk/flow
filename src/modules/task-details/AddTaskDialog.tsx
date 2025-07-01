import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { activeSpaceIdAtom } from '@/lib/atoms'
import { useAddTask } from '@/services/mutation'
import { TaskPriority } from '@/types/tasks'
import { DialogTitle } from '@radix-ui/react-dialog'
import { useForm } from '@tanstack/react-form'
import { useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useAtomValue } from 'jotai/react'
import TextField from './fields/TextField'

export default function AddTaskDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
	const queryClient = useQueryClient()
	const { mutate } = useAddTask()
	const activeSpaceId = useAtomValue(activeSpaceIdAtom)

	// const { data: statusList, isLoading: isStatusLoading } = useStatusList()
	// const { data: tagsList, isLoading: isTagsLoading } = useTagsList()

	const form = useForm({
		defaultValues: {
			title: '',
			description: '',
		},
		onSubmit: ({ value }) => {
			mutate(
				{
					title: value?.title,
					description: value?.description,
					status_id: 1,
					due_date: dayjs().toISOString(),
					priority: TaskPriority.Normal,
					tag_ids: [],
					space_id: activeSpaceId,
				},
				{
					onSuccess: () => {
						queryClient.invalidateQueries({ queryKey: ['tasks', activeSpaceId] })
						onClose()
					},
				}
			)
		},
	})

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle></DialogTitle>
				</DialogHeader>

				<form
					onSubmit={(e) => {
						e.preventDefault()
						e.stopPropagation()
						form.handleSubmit()
					}}
				>
					<div className="mb-3">
						<form.Field name="title">
							{(field) => (
								<TextField
									className="text-xl font-medium w-full focus:outline-2 outline-input p-2 rounded-sm"
									placeholder="Whats on your mind?"
									defaultValue={field.state.value}
									onSave={(value) => {
										field.handleChange(value)
									}}
								/>
							)}
						</form.Field>
					</div>

					{/* <div className="my-4 flex flex-col gap-3">
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
						</div> */}

					<div className="flex justify-end">
						<Button type="submit">Save</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	)
}
