import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { activeSpaceIdAtom } from '@/lib/atoms'
import { useAddTask } from '@/services/mutation'
import { useStatusList, useTasks } from '@/services/query'
import { TaskPriority } from '@/types/tasks'
import { DialogTitle } from '@radix-ui/react-dialog'
import { useForm } from '@tanstack/react-form'
import dayjs from 'dayjs'
import { useAtomValue } from 'jotai/react'
import { CornerDownLeft, Disc } from 'lucide-react'
import PriorityField from './fields/PriorityField'
import StatusField from './fields/StatusField'
import TextField from './fields/TextField'

export default function AddTaskDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
	const { mutate } = useAddTask()
	const activeSpaceId = useAtomValue(activeSpaceIdAtom)

	const { refetch } = useTasks()
	const { data: statusList, isLoading: isStatusLoading } = useStatusList()

	const form = useForm({
		defaultValues: {
			title: '',
			description: '',
			status_id: 1,
			priority: TaskPriority.Normal,
		},
		onSubmit: ({ value }) => {
			mutate(
				{
					title: value?.title,
					description: value?.description,
					status_id: value?.status_id,
					due_date: dayjs().toISOString(),
					priority: value?.priority,
					tag_ids: [],
					space_id: activeSpaceId,
				},
				{
					onSuccess: () => {
						refetch()
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
									className="text-xl font-medium w-full focus:outline-0 p-2 rounded-sm"
									placeholder="Whats on your mind?"
									defaultValue={field.state.value}
									onSave={(value) => {
										field.handleChange(value)
									}}
								/>
							)}
						</form.Field>
					</div>

					<div className="flex justify-between">
						<div className="flex items-center gap-3">
							<form.Field name="status_id">
								{(field) => (
									<StatusField
										onSave={(value) => {
											field.handleChange(value)
										}}
										initialValue={field.state.value}
										statusList={statusList}
										className="border text-sm px-2 h-8"
										render={(statusInfo) => (
											<>
												<Disc
													className="h-4 w-4"
													style={{ color: statusInfo?.color }}
												/>
												<span className="whitespace-nowrap">
													{statusInfo?.name ?? 'Status'}
												</span>
											</>
										)}
									/>
								)}
							</form.Field>

							<form.Field name="priority">
								{(field) => (
									<PriorityField
										onSave={(value) => {
											field.handleChange(value)
										}}
										initialValue={field.state.value}
										className="border text-sm"
									/>
								)}
							</form.Field>
						</div>

						<Button type="submit">
							Save
							<CornerDownLeft />
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	)
}
