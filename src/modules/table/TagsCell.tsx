import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import TagBadge from '@/components/widgets/TagBadge'
import type { ITag } from '@/types/tasks'
import { Ellipsis } from 'lucide-react'
import { useState } from 'react'

const max_tag = 2

export default function TagsCell({ tags }: { tags: ITag[] }) {
	const [isOpen, setIsOpen] = useState(false)
	const hasExtraTags = tags.length > max_tag

	return (
		<div className="flex items-center gap-2">
			{tags?.slice(0, max_tag)?.map((tag) => (
				<TagBadge tag={tag} />
			))}

			{hasExtraTags ? (
				<Popover open={isOpen}>
					<PopoverTrigger asChild>
						<button
							className="bg-muted h-[22px] px-1"
							onMouseEnter={() => setIsOpen(true)}
							onMouseLeave={() => setIsOpen(false)}
						>
							<Ellipsis className="h-4 w-4 text-muted-foreground" />
						</button>
					</PopoverTrigger>
					<PopoverContent
						className="w-auto p-2 ring-1 ring-border "
						align="end"
						side="top"
					>
						<div className="flex gap-2">
							{tags?.map((tag) => (
								<TagBadge tag={tag} />
							))}
						</div>
					</PopoverContent>
				</Popover>
			) : null}
		</div>
	)
}
