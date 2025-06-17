import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import { status } from './db/schema'
import { useDrizzleLiveQuery } from './db/useLiveQuery'
import TableView from './modules/table/TableView'

export default function App() {
	const statusList = useDrizzleLiveQuery((db) => db.select().from(status).toSQL())
	console.log(statusList)

	return (
		<div className="relative max-w-5xl mx-auto flex flex-col overflow-hidden">
			<div className="flex justify-between items-center px-4 py-4">
				<h1 className="font-semibold text-2xl">Tasks</h1>

				<div className="flex gap-3 items-center">
					<Button size="sm" className="rounded-full px-3 gap-1">
						<PlusIcon className="h-3 w-3" />
						<span>Add task</span>
					</Button>
				</div>
			</div>

			<TableView />
		</div>
	)
}
