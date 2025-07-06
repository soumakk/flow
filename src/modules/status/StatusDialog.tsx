import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import Loader from '@/components/widgets/Loader'
import { useStatusList } from '@/services/query'
import { useDebounce } from '@uidotdev/usehooks'
import { useState } from 'react'
import AddStatusForm from './AddStatusForm'
import { Trash2 } from 'lucide-react'
import { useDeleteStatus } from '@/services/mutation'
import { useQueryClient } from '@tanstack/react-query'

export default function StatusDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
	const [search, setSearch] = useState('')
	const debouncedSearch = useDebounce(search, 300)
	const { mutate: deleteStatus } = useDeleteStatus()
	const queryClient = useQueryClient()
	const { data: statusList, isLoading: isStatusLoading } = useStatusList({
		search: debouncedSearch,
	})

	function handleDelete(statusId: number) {
		deleteStatus(
			{
				statusId,
			},
			{
				onSuccess: () => {
					queryClient.invalidateQueries({ queryKey: ['status'] })
				},
			}
		)
	}

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Status</DialogTitle>
				</DialogHeader>

				<div className="flex gap-4">
					<Input
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="bg-muted border-transparent"
						placeholder="Search status by name"
					/>
					<AddStatusForm />
				</div>

				<div className="min-h-[300px]">
					{isStatusLoading ? (
						<Loader />
					) : (
						<div className="flex flex-col gap-3">
							{statusList?.map((status) => (
								<div
									key={status.id}
									className="text-sm border rounded-sm p-2 flex items-center gap-2 group/status overflow-hidden"
								>
									<div
										className="h-4 w-4 rounded-full"
										style={{ backgroundColor: status.color }}
									></div>
									<p className="flex-1">{status.name}</p>

									<div className="px-1">
										<Trash2
											onClick={() => handleDelete(status.id)}
											className="h-4 w-4 text-destructive cursor-pointer group-hover/status:translate-x-0 translate-x-7 transition-discrete duration-200"
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
