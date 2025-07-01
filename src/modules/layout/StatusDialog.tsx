import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import Spinner from '@/components/widgets/Spinner'
import { useStatusList } from '@/services/query'

export default function StatusDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
	const { data: statusList, isLoading: isStatusLoading } = useStatusList()
	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Status</DialogTitle>
				</DialogHeader>

				{isStatusLoading ? (
					<Spinner />
				) : (
					<>
						<Input
							className="bg-muted border-transparent rounded-full"
							placeholder="Search status by name"
						/>

						{statusList?.map((status) => (
							<div
								key={status.id}
								className="text-sm border rounded-sm p-2 flex items-center gap-2"
							>
								<div
									className="h-4 w-4 rounded-full"
									style={{ backgroundColor: status.color }}
								></div>
								{status.name}
							</div>
						))}
					</>
				)}
			</DialogContent>
		</Dialog>
	)
}
