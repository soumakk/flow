import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import StatusBadge from '@/components/widgets/StatusBadge'
import type { IStatus } from '@/types/tasks'
import { useEffect, useState, type ReactNode } from 'react'
import CreateNewItem from './CreateNewItem'
import { cn } from '@/lib/utils'
import { useAddStatus } from '@/services/mutation'
import { useQueryClient } from '@tanstack/react-query'

export default function StatusField({
	onSave,
	initialValue,
	statusList,
	render,
	className,
}: {
	onSave: (value: number) => void
	initialValue: number
	statusList: IStatus[]
	className?: string
	render: (statusInfo: IStatus) => ReactNode
}) {
	const [currentStatus, setCurrentStatus] = useState(initialValue)
	const [search, setSearch] = useState('')
	const statusInfo = statusList?.find((opt) => opt.id === currentStatus)
	const [open, setOpen] = useState(false)
	const { mutate: addStatus } = useAddStatus()
	const queryClient = useQueryClient()

	useEffect(() => {
		if (initialValue) {
			setCurrentStatus(initialValue)
		}
	}, [initialValue])

	const filteredList = statusList?.filter((opt) =>
		search ? opt.name?.toLowerCase().includes(search?.toLowerCase()) : true
	)

	async function handleSelect({
		label,
		statusId,
		color,
	}: {
		statusId?: number
		label?: string
		color?: string
	}) {
		if (statusId) {
			setCurrentStatus(statusId)
			onSave(statusId)
			setOpen(false)
		} else if (label && !statusId) {
			// add new status
			addStatus(
				{
					name: label,
					color: color,
				},
				{
					onSuccess: (res) => {
						onSave(res.id)
						queryClient.invalidateQueries({ queryKey: ['status'] })
						setOpen(false)
					},
				}
			)
		}
	}

	return (
		<Popover modal={true} open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<button
					className={cn(
						'flex w-full rounded-sm items-center gap-2 p-1 cursor-pointer data-[state=open]:outline-2 focus-visible:outline-2 outline-primary',
						className
					)}
				>
					{render(statusInfo)}
					{/* {currentStatus ? <StatusBadge status={statusInfo} /> : null} */}
				</button>
			</PopoverTrigger>
			<PopoverContent className="w-48 p-0" align="start">
				<Command shouldFilter={false}>
					<CommandInput
						value={search}
						onValueChange={setSearch}
						placeholder={`Search status`}
					/>

					<CommandList>
						<CommandEmpty>No status found.</CommandEmpty>

						<CommandGroup>
							{filteredList?.length === 0 ? (
								<CreateNewItem
									label={search}
									onSelect={(label, color) => {
										handleSelect({ label, color })
									}}
								/>
							) : (
								filteredList?.map((opt) => (
									<CommandItem
										key={opt.id}
										onSelect={() => {
											handleSelect({ statusId: opt.id })
										}}
										className="[&>svg]:size-4 text-xs justify-between"
									>
										<StatusBadge status={opt} />
									</CommandItem>
								))
							)}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
