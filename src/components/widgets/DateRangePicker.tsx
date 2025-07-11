'use client'

import { Calendar1 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import dayjs from 'dayjs'
import type { DateRange } from 'react-day-picker'

interface IDatePicker {
	id: string
	value: DateRange | null
	onChange: (range: DateRange | null) => void
	onBlur?: () => void
	placeholder?: string
}

export function DatePicker({ value, onChange, placeholder, ...rest }: IDatePicker) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={'ghost'}
					className={cn('h-8 justify-start text-left font-normal px-3 border	')}
				>
					<Calendar1 className="h-4 w-4 text-muted-foreground" />
					<span className={cn('truncate')}>
						{value?.from ? (
							value?.from !== value.to ? (
								<>
									{dayjs(value.from).format('MMM DD, YYYY')} -{' '}
									{dayjs(value.to).format('MMM DD, YYYY')}
								</>
							) : (
								dayjs(value.from).format('MMM DD, YYYY')
							)
						) : (
							<span>{placeholder ?? 'Pick a date range'}</span>
						)}
					</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar
					mode="range"
					captionLayout="dropdown"
					selected={value}
					onSelect={onChange}
				/>
				<div className="px-3 pb-3">
					<Button
						variant="ghost"
						size="sm"
						className="w-full "
						onClick={() => onChange(undefined)}
					>
						Clear date
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	)
}
