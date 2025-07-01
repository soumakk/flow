import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import AddTaskDialog from '../task-details/AddTaskDialog'
import { useState } from 'react'

export default function AppHeader() {
	const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false)
	return (
		<header className="flex py-5 shrink-0 items-center justify-between gap-2 px-6">
			<div className="flex items-center gap-3">
				{/* <SidebarTrigger className="-ml-1" /> */}
				<h1 className="font-semibold text-3xl">Tasks</h1>
			</div>
			<Button className="rounded-full" onClick={() => setIsAddTaskDialogOpen(true)}>
				<PlusIcon className="h-3 w-3" />
				<span>Add task</span>
			</Button>

			{isAddTaskDialogOpen && (
				<AddTaskDialog
					open={isAddTaskDialogOpen}
					onClose={() => setIsAddTaskDialogOpen(false)}
				/>
			)}
		</header>
	)
}
