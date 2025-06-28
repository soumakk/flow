import FlowLogo from '@/assets/flow-logo.svg'
import { initDBQuery, initDummyDataQuery } from '@/lib/sql'
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

				// await pgliteDb.exec(`
				// 	DROP TABLE IF EXISTS task_tag CASCADE;
				// 	DROP TABLE IF EXISTS sub_task CASCADE;
				// 	DROP TABLE IF EXISTS task CASCADE;
				// 	DROP TABLE IF EXISTS tag CASCADE;
				// 	DROP TABLE IF EXISTS status CASCADE;
				// 	DROP TABLE IF EXISTS space CASCADE;
				// 	`)
				await pgliteDb.exec(initDBQuery)
				// await pgliteDb.exec(initDummyDataQuery)

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
				<img src={FlowLogo} className="animate-pulse" alt="flow" />
			</div>
		)
	}

	return <PGliteProvider db={db}>{children}</PGliteProvider>
}
