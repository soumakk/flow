import { useLiveQuery } from '@electric-sql/pglite-react'
import type { Query } from 'drizzle-orm'
import { useDrizzle } from './provider'

export const useDrizzleLiveQuery = (queryFn: (db: ReturnType<typeof useDrizzle>) => Query) => {
	const db = useDrizzle()
	const query = queryFn(db)

	return useLiveQuery(query.sql, query.params)
}
