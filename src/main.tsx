import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { DatabaseProvider } from './contexts/DatabaseProvider.tsx'
import QueryProvider from './contexts/QueryProvider.tsx'
import { ThemeProvider } from './contexts/ThemeProvider.tsx'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryProvider>
			<ThemeProvider>
				<DatabaseProvider>
					<App />
				</DatabaseProvider>
			</ThemeProvider>
		</QueryProvider>
	</StrictMode>
)
