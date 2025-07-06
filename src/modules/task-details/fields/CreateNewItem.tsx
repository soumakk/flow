import { Badge } from '@/components/ui/badge'
import { CommandItem } from '@/components/ui/command'
import { StatusColors } from '@/lib/atoms'
import { shuffle } from 'radash'
import { useState } from 'react'

export default function CreateNewItem({
	onSelect,
	label,
}: {
	onSelect: (label: string, color: string) => void
	label: string
}) {
	const defaultColor = StatusColors[Math.floor(Math.random() * StatusColors.length - 1)]
	const [color, setColor] = useState(defaultColor)
	return (
		<CommandItem onSelect={() => onSelect(label, color)} className="text-xs font-semibold">
			Create{' '}
			{label ? (
				<div className="flex flex-1 overflow-hidden">
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
						className="hover:bg-zinc-300 font-medium gap-1 px-2 max-w-full"
					>
						<p className="text-ellipsis overflow-hidden whitespace-nowrap">{label}</p>
					</Badge>
				</div>
			) : null}
		</CommandItem>
	)
}
