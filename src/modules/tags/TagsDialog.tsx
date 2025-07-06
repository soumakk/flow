import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import Loader from '@/components/widgets/Loader'
import { useDeleteTag } from '@/services/mutation'
import { useTagsList } from '@/services/query'
import { useQueryClient } from '@tanstack/react-query'
import { useDebounce } from '@uidotdev/usehooks'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import AddTagForm from './AddTagForm'

export default function TagsDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
	const { mutate: deleteTag } = useDeleteTag()
	const [search, setSearch] = useState('')
	const debouncedSearch = useDebounce(search, 300)
	const { data: tagsList, isLoading: isTagsLoading } = useTagsList({ search: debouncedSearch })
	const queryClient = useQueryClient()

	function handleDelete(tagId: number) {
		deleteTag(
			{
				tagId,
			},
			{
				onSuccess: () => {
					queryClient.invalidateQueries({ queryKey: ['tags'] })
				},
			}
		)
	}

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Tags</DialogTitle>
				</DialogHeader>

				<div className="flex gap-4">
					<Input
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="bg-muted border-transparent"
						placeholder="Search tags by name"
					/>
					<AddTagForm />
				</div>

				<div className="min-h-[300px]">
					{isTagsLoading ? (
						<Loader />
					) : (
						<div className="flex flex-col gap-3">
							{tagsList?.map((tag) => (
								<div
									key={tag.id}
									className="text-sm border rounded-sm px-1 py-1 flex items-center gap-2 group/tag overflow-hidden"
								>
									<div
										className="h-6 w-1 rounded-sm group-hover/tag:w-8 transition-discrete duration-200"
										style={{ backgroundColor: tag.color }}
									></div>
									<p className="flex-1">{tag.name}</p>

									<div className="px-1">
										<Trash2
											onClick={() => handleDelete(tag.id)}
											className="h-4 w-4 text-destructive cursor-pointer group-hover/tag:translate-x-0 translate-x-6 transition-discrete duration-200"
										/>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	)
}
