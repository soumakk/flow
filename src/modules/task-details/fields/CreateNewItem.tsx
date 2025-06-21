import { Badge } from '@/components/ui/badge'
import { CommandItem } from '@/components/ui/command'
import { StatusColors } from '@/lib/data'
import { shuffle } from 'radash'
import { useState } from 'react'

export default function CreateNewItem({
	onSelect,
	label,
}: {
	onSelect: (label: string, color: string) => void
	label: string
}) {
	const [color, setColor] = useState('#2797ff')
	return (
		<CommandItem onSelect={() => onSelect(label, color)}>
			Create{' '}
			<Badge
				onClick={(e) => {
					e.stopPropagation()
					const temp = shuffle(StatusColors)
					const index = Math.floor(Math.random() * temp.length)
					setColor(temp[index])
				}}
				style={{
					color: color,
					backgroundColor: `${color}40`,
				}}
				className="hover:bg-zinc-300 font-medium rounded-full gap-1 px-2 text-ellipsis overflow-hidden"
			>
				<p className="text-ellipsis overflow-hidden whitespace-nowrap">{label}</p>
			</Badge>
		</CommandItem>
	)
}
