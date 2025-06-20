import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { DatabaseProvider } from './contexts/DatabaseProvider.tsx'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<DatabaseProvider>
			<App />
		</DatabaseProvider>
	</StrictMode>
)
