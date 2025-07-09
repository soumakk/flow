import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

import {
	flexRender,
	getCoreRowModel,
	useReactTable,
	type ColumnDef,
	type Row,
} from '@tanstack/react-table'
import { Loader } from 'lucide-react'

interface DataTableProps {
	columns: ColumnDef<any>[]
	data: any[]
	isLoading?: boolean
	onRowClick?: (row: Row<any>) => void
}

export default function DataTable({ data, columns, onRowClick, isLoading }: DataTableProps) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	})

	return (
		<Table>
			<TableHeader>
				{table.getHeaderGroups().map((headerGroup) => (
					<TableRow key={headerGroup.id}>
						{headerGroup.headers.map((header) => (
							<TableHead
								key={header.id}
								style={{
									width: header.getSize(),
								}}
							>
								{header.isPlaceholder
									? null
									: flexRender(
											header.column.columnDef.header,
											header.getContext()
									  )}
							</TableHead>
						))}
					</TableRow>
				))}
			</TableHeader>

			<TableBody>
				{isLoading ? (
					<TableRow>
						<TableCell colSpan={columns.length}>
							<div className="grid place-content-center h-40">
								<Loader className="h-5 w-5 animate-spin" />
							</div>
						</TableCell>
					</TableRow>
				) : table.getRowModel().rows.length ? (
					table.getRowModel().rows.map((row) => (
						<TableRow
							key={row.id}
							data-state={row.getIsSelected() && 'selected'}
							onClick={() => onRowClick?.(row)}
						>
							{row.getVisibleCells().map((cell) => (
								<TableCell key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</TableCell>
							))}
						</TableRow>
					))
				) : (
					<TableRow>
						<TableCell colSpan={columns.length} className="h-40 text-center">
							No results.
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	)
}
