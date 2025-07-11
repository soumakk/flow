import { cn } from '@/lib/utils'
import { useAddSubTask, useDeleteSubTask, useUpdateSubTask } from '@/services/mutation'
import type { ISubTask, ITaskDetails } from '@/types/tasks'
import { Circle, CircleCheck, PlusIcon, Trash2 } from 'lucide-react'
import TextField from '../fields/TextField'
import SubTaskProgress from './SubTaskProgress'
import { useQueryClient } from '@tanstack/react-query'

export default function SubTasksList({ task }: { task: ITaskDetails }) {
	const { mutate: addSubTask } = useAddSubTask()
	const { mutate: updateSubTask } = useUpdateSubTask()
	const { mutate: deleteSubTask } = useDeleteSubTask()
	const queryClient = useQueryClient()

	async function handleSubtaskChange(subTask: ISubTask, key: string, value: any) {
		updateSubTask(
			{
				taskId: task.id,
				subTaskId: subTask.id,
				title: subTask.title,
				completed: subTask.completed,
				[key]: value,
			},
			{
				onSuccess: () => {
					queryClient.invalidateQueries({ queryKey: ['task', task.id] })
					queryClient.invalidateQueries({ queryKey: ['tasks', task.space_id] })
				},
			}
		)
	}

	async function handleAddNewSubtask(taskId: number) {
		addSubTask(
			{ title: 'Untitled', completed: false, taskId },
			{
				onSuccess: () => {
					queryClient.invalidateQueries({ queryKey: ['task', taskId] })
					queryClient.invalidateQueries({ queryKey: ['tasks', task.space_id] })
				},
			}
		)
	}

	async function handleSubTaskDelete(taskId: number, subTaskId: number) {
		deleteSubTask(
			{ subTaskId },
			{
				onSuccess: () => {
					queryClient.invalidateQueries({ queryKey: ['task', taskId] })
					queryClient.invalidateQueries({ queryKey: ['tasks', task.space_id] })
				},
			}
		)
	}

	return (
		<div className="py-5">
			<div className="flex items-center justify-between py-2 border-b border-border">
				<label className="text-muted-foreground text-xs uppercase font-medium">
					Sub Tasks
				</label>

				<SubTaskProgress subTasks={task.subtasks} />
			</div>

			<ul>
				{task.subtasks?.map((st) => (
					<li
						key={st.id}
						className="flex items-center gap-2 py-2 border-b border-border text-sm group"
					>
						<button
							onClick={() => {
								handleSubtaskChange(st, 'completed', !st.completed)
							}}
						>
							{st.completed ? (
								<CircleCheck className="h-4 w-4 text-muted-foreground" />
							) : (
								<Circle className="h-4 w-4 text-muted-foreground" />
							)}
						</button>

						<TextField
							readOnly={st.completed}
							defaultValue={st.title}
							className={cn('flex-1 outline-none', {
								'line-through': st.completed,
							})}
							placeholder="What's on your mind"
							onSave={(value) => {
								handleSubtaskChange(st, 'title', value)
							}}
						/>

						<button
							className="hidden group-hover:block cursor-pointer"
							onClick={() => handleSubTaskDelete(task.id, st.id)}
						>
							<Trash2 className="h-4 w-4 text-red-400" />
						</button>
					</li>
				))}

				<button
					onClick={() => handleAddNewSubtask(task.id)}
					className="flex items-center gap-2 text-xs px-2 py-2 text-muted-foreground w-full cursor-pointer hover:bg-accent"
				>
					<PlusIcon className="h-4 w-4" />
					<span>Add Subtask</span>
				</button>
			</ul>
		</div>
	)
}
