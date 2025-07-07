import FlowIcon from '@/assets/icons/FlowIcon'
import { initDBQuery, initDummyDataQuery, resetDBQuery } from '@/lib/sql'
import { PGlite } from '@electric-sql/pglite'
import { PGliteProvider } from '@electric-sql/pglite-react'
import { live, type PGliteWithLive } from '@electric-sql/pglite/live'
import { useEffect, useState, type ReactNode } from 'react'

export const DatabaseProvider = ({ children }: { children: ReactNode }) => {
	const [db, setDb] = useState<PGliteWithLive | undefined>()
	const [isInitialized, setIsInitialized] = useState(false)

	useEffect(() => {
		const initializeDatabase = async () => {
			try {
				const pgliteDb = await PGlite.create({
					dataDir: 'idb://flow-db',
					extensions: { live },
					relaxedDurability: false,
				})

				const isInit = localStorage.getItem('isDbInit')

				if (isInit !== 'true') {
					await pgliteDb.exec(resetDBQuery)
					await pgliteDb.exec(initDBQuery)
					await pgliteDb.exec(initDummyDataQuery)
					localStorage.setItem('isDbInit', 'true')
				}

				setDb(pgliteDb)
				setIsInitialized(true)
			} catch (error) {
				console.error('Failed to initialize database:', error)
			}
		}

		initializeDatabase()
	}, [])

	if (!isInitialized) {
		return (
			<div className="h-screen w-full grid place-content-center">
				<FlowIcon />
			</div>
		)
	}

	return <PGliteProvider db={db}>{children}</PGliteProvider>
}
