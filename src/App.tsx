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
						'--sidebar-width': '19rem',
					} as React.CSSProperties
				}
			>
				<AppSidebar />
				<SidebarInset>
					<header className="flex h-16 shrink-0 items-center gap-2 px-4">
						<SidebarTrigger className="-ml-1" />
					</header>
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
				</SidebarInset>
			</SidebarProvider>
		</>
	)
}
