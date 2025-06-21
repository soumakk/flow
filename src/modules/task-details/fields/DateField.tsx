import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { formatDate } from '@/lib/utils'
import dayjs from 'dayjs'
import { Calendar1 } from 'lucide-react'

export default function DateField({
	initialValue,
	onSave,
}: {
	initialValue?: string
	onSave: (value: string) => void
}) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<button className="h-8 px-2 w-full gap-2 text-xs rounded-sm flex items-center cursor-pointer data-[state=open]:outline-2 outline-input">
					<Calendar1 className="h-4 w-4 text-muted-foreground" />
					{initialValue ? (
						<p className="whitespace-nowrap">{formatDate(initialValue)}</p>
					) : (
						<p className="text-sm">Pick a date</p>
					)}
				</button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar
					mode="single"
					selected={dayjs(initialValue ?? new Date()).toDate()}
					onSelect={(date) => onSave(dayjs(date).toISOString())}
					autoFocus
				/>
			</PopoverContent>
		</Popover>
	)
}
