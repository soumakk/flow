import * as React from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

export function MultiDropdown(props: {
	id?: string
	selected: any[]
	onSelect: (selected: any[]) => void
	options: { label: string; value: any; color: string }[]
	title: string
	trigger?: React.ReactNode
	hideSearch?: boolean
}) {
	const { id, options, title, selected, trigger, onSelect, hideSearch } = props
	const [open, setOpen] = React.useState(false)
	const [search, setSearch] = React.useState('')

	const filteredOptions = options?.filter((opt) =>
		search ? opt.label?.toLowerCase().includes(search?.toLowerCase()) : true
	)

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					id={id}
					variant="ghost"
					size="sm"
					role="combobox"
					aria-expanded={open}
					className={cn('relative gap-1.5 font-normal border h-8 px-3')}
				>
					{trigger ?? <span className="capitalize">{title}</span>}
					{selected?.length ? (
						<Badge className="ml-1 text-xs h-4 w-4 p-0 grid place-content-center">
							{selected?.length}
						</Badge>
					) : null}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0" align="start">
				<Command shouldFilter={false}>
					{!hideSearch && (
						<CommandInput
							value={search}
							onValueChange={setSearch}
							placeholder={`Search ${title}`}
						/>
					)}
					<CommandEmpty>No {title} found.</CommandEmpty>
					<CommandGroup className="max-h-[200px] overflow-auto">
						{filteredOptions?.map((opt) => (
							<CommandItem
								key={opt.value}
								value={opt.value}
								onSelect={() => {
									const temp = new Set(selected)
									if (temp.has(opt.value)) {
										temp.delete(opt.value)
									} else {
										temp.add(opt.value)
									}
									onSelect(Array.from(temp))
								}}
								className="text-sm p-2"
							>
								<Checkbox
									checked={selected?.includes(opt.value)}
									className="mr-1"
								/>

								{opt?.color ? (
									<div
										className="h-3 w-3 "
										style={{ backgroundColor: opt?.color }}
									></div>
								) : null}

								<span>{opt.label}</span>
							</CommandItem>
						))}
					</CommandGroup>
				</Command>

				{selected?.length ? (
					<div className="p-1">
						<Button
							variant="ghost"
							size="sm"
							className="w-full "
							onClick={() => {
								onSelect([])
							}}
						>
							Clear
						</Button>
					</div>
				) : null}
			</PopoverContent>
		</Popover>
	)
}
