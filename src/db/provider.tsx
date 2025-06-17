import { PGlite } from '@electric-sql/pglite'
import { PGliteProvider } from '@electric-sql/pglite-react'
import { live, type PGliteWithLive } from '@electric-sql/pglite/live'
import { drizzle } from 'drizzle-orm/pglite'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { initQuery } from './initQuery'
import * as schema from './schema'

type DrizzleClient = ReturnType<typeof drizzle<typeof schema>>

const DrizzleContext = createContext<DrizzleClient | null>(null)

// Singleton pattern to avoid React strict mode issues
let pgInstance: PGliteWithLive | null = null
let drizzleInstance: DrizzleClient | null = null

export const DatabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [db, setDb] = useState<PGliteWithLive | null>(null)
	const [drizzleDb, setDrizzleDb] = useState<DrizzleClient | null>(null)
	const [isInitialized, setIsInitialized] = useState(false)

	useEffect(() => {
		const initDb = async () => {
			try {
				// Use singleton to prevent multiple instances in React strict mode
				if (!pgInstance) {
					pgInstance = await PGlite.create({
						dataDir: 'idb://flow',
						extensions: {
							live,
						},
					})
					await pgInstance.exec(initQuery)
				}

				if (!drizzleInstance) {
					drizzleInstance = drizzle(pgInstance as unknown as PGlite, { schema })
				}

				setDb(pgInstance)
				setDrizzleDb(drizzleInstance)
				setIsInitialized(true)
			} catch (error) {
				console.error('Failed to initialize database:', error)
			}
		}

		initDb()
	}, [])

	if (!db || !drizzleDb || !isInitialized) {
		return <div>Loading database...</div>
	}

	return (
		<PGliteProvider db={db}>
			<DrizzleContext.Provider value={drizzleDb}>{children}</DrizzleContext.Provider>
		</PGliteProvider>
	)
}

export const useDrizzle = () => {
	const context = useContext(DrizzleContext)
	if (!context) {
		throw new Error('useDrizzle must be used within DatabaseProvider')
	}
	return context
}
