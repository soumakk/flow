import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination'
import { currentPageAtom } from '@/lib/atoms'
import { useTaskFilters } from '@/services/query'
import { useAtom } from 'jotai/react'

export default function TableFooter({ totalCount }: { totalCount: number }) {
	const { pageLimit } = useTaskFilters()
	const [page, setPage] = useAtom(currentPageAtom)
	const totalPages = Math.floor(totalCount / pageLimit)

	return (
		<div className="flex items-center justify-between py-3">
			<p className="text-sm text-muted-foreground">
				total: {totalCount} | page: {page} | limit: {pageLimit}
			</p>
			<div>
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious
								disabled={page === 1}
								onClick={() => setPage((p) => p - 1)}
							/>
						</PaginationItem>
						{/* {Array.from(Array(pages).keys())?.map((page) => (
							<PaginationItem>
								<PaginationLink href="#">{page + 1}</PaginationLink>
							</PaginationItem>
						))} */}
						<PaginationItem>
							<PaginationNext
								disabled={page >= totalPages}
								onClick={() => setPage((p) => p + 1)}
							/>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</div>
		</div>
	)
}
