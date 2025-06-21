import { PlusIcon } from 'lucide-react'
import { Button } from './components/ui/button'
import { SidebarInset, SidebarProvider, SidebarTrigger } from './components/ui/sidebar'
import { AppSidebar } from './modules/layout/AppSidebar'
import TableView from './modules/table/TableView'

export default function App() {
	return (
		<>
			<SidebarProvider
				style={
					{
						'--sidebar-width': '18rem',
					} as React.CSSProperties
				}
			>
				<AppSidebar />
				<SidebarInset>
					<header className="flex py-5 shrink-0 items-center justify-between gap-2 px-6">
						<div className="flex items-center gap-3">
							{/* <SidebarTrigger className="-ml-1" /> */}
							<h1 className="font-semibold text-3xl">Tasks</h1>
						</div>
						<Button className="rounded-full">
							<PlusIcon className="h-3 w-3" />
							<span>Add task</span>
						</Button>
					</header>
					<div className="flex-1 relative max-w-5xl px-4 mx-auto flex flex-col overflow-hidden">
						<TableView />
					</div>
				</SidebarInset>
			</SidebarProvider>
		</>
	)
}
