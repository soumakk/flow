import { cn } from '@/lib/utils'
import type { ITask } from '@/types/tasks'
import { Circle, CircleCheck, PlusIcon, Trash2 } from 'lucide-react'
import TextField from '../fields/TextField'
import SubTaskProgress from './SubTaskProgress'

export default function SubTasksList({ task }: { task: ITask }) {
	// async function updateCell(id: string, key: string, value: any) {
	// 	await db.tasks.update(id, { ...task, [key]: value, updated_at: dayjs().toISOString() })
	// }

	async function handleSubtaskChange(taskId: string, subTaskId: string, key: string, value: any) {
		const temp = task.sub_tasks.map((t) => {
			if (t.id === subTaskId) {
				return {
					...t,
					[key]: value,
				}
			} else return t
		})

		// await updateCell(taskId, 'sub_tasks', temp)
	}

	async function handleAddNewSubtask(taskId: string) {
		// const temp = task.sub_tasks.concat([{ id: generateId(), title: '', completed: false }])
		// await updateCell(taskId, 'sub_tasks', temp)
	}

	async function handleSubTaskDelete(taskId: string, subTaskId: string) {
		// const temp = task.sub_tasks.filter((st) => st.id !== subTaskId)
		// await updateCell(taskId, 'sub_tasks', temp)
	}

	return (
		<div className="py-5">
			<div className="flex items-center justify-between py-2 border-b border-border">
				<label className="text-muted-foreground text-xs uppercase font-medium">
					Sub Tasks
				</label>

				<SubTaskProgress subTasks={task.sub_tasks} />
			</div>

			<ul>
				{task.sub_tasks?.map((st) => (
					<li
						key={st.id}
						className="flex items-center gap-2 py-2 border-b border-border text-sm group"
					>
						<button
							onClick={() =>
								handleSubtaskChange(task.id, st.id, 'completed', !st.completed)
							}
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
								handleSubtaskChange(task?.id, st.id, 'title', value)
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
