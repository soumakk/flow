import { SidebarInset, SidebarProvider } from './components/ui/sidebar'
import AppHeader from './modules/layout/AppHeader'
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
					<AppHeader />
					<div className="flex-1 relative max-w-5xl px-4 mx-auto flex flex-col overflow-hidden">
						<TableView />
					</div>
				</SidebarInset>
			</SidebarProvider>
		</>
	)
}
