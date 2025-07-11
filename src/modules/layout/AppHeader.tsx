import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import AddTaskDialog from '../task-details/AddTaskDialog'
import { useState } from 'react'
import { useAtomValue } from 'jotai/react'
import { activeSpaceIdAtom } from '@/lib/atoms'
import { useSpaces } from '@/services/query'
import { SidebarTrigger } from '@/components/ui/sidebar'

export default function AppHeader() {
	const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false)
	const activeSpaceId = useAtomValue(activeSpaceIdAtom)
	const { data: spaces } = useSpaces()
	const currentSpace = spaces?.find((s) => s.id === activeSpaceId)

	return (
		<header className="flex py-5 shrink-0 items-center justify-between gap-2 px-6">
			<div className="flex items-center gap-3">
				<div className="md:hidden">
					<SidebarTrigger className="-ml-1" />
				</div>
				<h1 className="font-semibold text-2xl">{currentSpace?.name ?? 'Tasks'}</h1>
			</div>
			<Button onClick={() => setIsAddTaskDialogOpen(true)}>
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
