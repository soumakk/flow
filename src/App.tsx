import { useAtomValue } from 'jotai/react'
import { SidebarInset, SidebarProvider } from './components/ui/sidebar'
import { activeSpaceIdAtom } from './lib/atoms'
import AppHeader from './modules/layout/AppHeader'
import { AppSidebar } from './modules/layout/AppSidebar'
import TableView from './modules/table/TableView'

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
							<TableView />
						</>
					) : null}
				</SidebarInset>
			</SidebarProvider>
		</>
	)
}
