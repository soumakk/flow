import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import Spinner from '@/components/widgets/Spinner'
import { useTagsList } from '@/services/query'

export default function TagsDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
	const { data: tagsList, isLoading: isTagsLoading } = useTagsList()
	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Tags</DialogTitle>
				</DialogHeader>

				{isTagsLoading ? (
					<Spinner />
				) : (
					<>
						<Input
							className="bg-muted border-transparent rounded-full"
							placeholder="Search tags by name"
						/>

						{tagsList?.map((tag) => (
							<div
								key={tag.id}
								className="text-sm border rounded-sm px-1 py-1 flex items-center gap-2 group/tag"
							>
								<div
									className="h-6 w-1 rounded-sm group-hover/tag:w-8 transition-discrete duration-200"
									style={{ backgroundColor: tag.color }}
								></div>
								{tag.name}
							</div>
						))}
					</>
				)}
			</DialogContent>
		</Dialog>
	)
}
