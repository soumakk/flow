'use client'

import { Calendar1 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import dayjs from 'dayjs'

interface IDatePicker {
	id: string
	value: string
	onChange: (date: string) => void
	onBlur?: () => void
}

export function DatePicker({ value, onChange, ...rest }: IDatePicker) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={'ghost'}
					className={cn('h-8 justify-start text-left font-normal px-3 border	')}
				>
					<Calendar1 className="h-4 w-4 text-muted-foreground" />
					{value ? dayjs(value).format('MMM DD, YYYY') : <span>Due Date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar
					mode="single"
					captionLayout="dropdown"
					selected={dayjs(value).toDate()}
					onSelect={(date) => onChange(dayjs(date).toISOString())}
					initialFocus
				/>
				<div className="px-3 pb-3">
					<Button
						variant="ghost"
						size="sm"
						className="w-full "
						onClick={() => onChange(null)}
					>
						Clear date
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	)
}
