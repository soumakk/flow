import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import type { ITag } from '@/types/tasks'
import { Tag } from 'lucide-react'
import { useEffect, useState } from 'react'
import TagBadge from '../../../components/widgets/TagBadge'
import CreateNewItem from './CreateNewItem'

export default function TagsField({
	onSave,
	initialTags,
	tagsList,
}: {
	onSave: (tagIds: number[]) => void
	initialTags: number[]
	tagsList: ITag[]
}) {
	const [selectedTagIds, setSelectedTagsIds] = useState<number[]>(initialTags ?? [])
	const [search, setSearch] = useState('')
	const [open, setOpen] = useState(false)

	// useEffect(() => {
	// 	if (initialTags) {
	// 		setSelectedTagsIds(initialTags)
	// 	}
	// }, [initialTags])

	const filteredList = tagsList?.filter((opt) =>
		search ? opt.name?.toLowerCase().includes(search?.toLowerCase()) : true
	)

	async function handleSelect({
		label,
		tagId,
		color,
	}: {
		tagId?: number
		label?: string
		color?: string
	}) {
		if (tagId) {
			const temp = new Set(selectedTagIds)
			if (temp.has(tagId)) {
				temp.delete(tagId)
			} else {
				temp.add(tagId)
			}
			const tagIds = Array.from(temp)
			setSelectedTagsIds(tagIds)
			onSave(tagIds)
			// setOpen(false)
		}
		// else if (label && !tagId) {
		// const newId = generateId()
		// const temp = new Set(selectedTagIds)
		// await db.tags.add({
		// 	color: color,
		// 	name: label,
		// 	created_at: dayjs().toISOString(),
		// 	id: newId,
		// })
		// temp.add(newId)
		// const tagIds = Array.from(temp)
		// onSave(tagIds)
		// setSearch('')
		// setOpen(false)
		// }
	}

	const selectedTags = tagsList?.filter((tag) => selectedTagIds?.includes(tag.id))

	return (
		<Popover modal={true} open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<button className="w-full min-h-8 flex flex-wrap rounded-sm items-center gap-2 p-1 cursor-pointer data-[state=open]:outline-2 focus-visible:outline-2 outline-primary">
					{selectedTagIds?.length ? (
						selectedTags?.map((tag) => <TagBadge tag={tag} />)
					) : (
						<>
							<Tag className="h-4 w-4 text-muted-foreground ml-1" />
							<p className="text-xs text-muted-foreground ">Select tags</p>
						</>
					)}
				</button>
			</PopoverTrigger>
			<PopoverContent className="w-48 p-0" align="start">
				<Command shouldFilter={false}>
					<CommandInput
						value={search}
						onValueChange={setSearch}
						placeholder={`Search tags`}
					/>

					<CommandList>
						<CommandEmpty>No tags found.</CommandEmpty>

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
											handleSelect({ tagId: opt.id })
										}}
										className="[&>svg]:size-4 text-xs justify-between"
									>
										<TagBadge tag={opt} />
										{/* <EditStatus onSave={onSave} selected={opt} /> */}
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
