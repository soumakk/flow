import { useAtomValue } from 'jotai/react'
import { SidebarInset, SidebarProvider } from './components/ui/sidebar'
import AppHeader from './modules/layout/AppHeader'
import { AppSidebar } from './modules/layout/AppSidebar'
import TableView from './modules/table/TableView'
import { activeSpaceIdAtom } from './lib/atoms'
import TaskFilters from './modules/filters/TaskFilters'

export default function App() {
	const activeSpaceId = useAtomValue(activeSpaceIdAtom)
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
					{activeSpaceId ? (
						<>
							<AppHeader />
							<TaskFilters />
							<div className="flex-1 relative max-w-5xl px-4 mx-auto flex flex-col overflow-hidden">
								<TableView />
							</div>
						</>
					) : null}
				</SidebarInset>
			</SidebarProvider>
		</>
	)
}
