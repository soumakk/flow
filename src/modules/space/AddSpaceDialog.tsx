import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useAddSpace } from '@/services/mutation'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

export default function AddSpaceDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
	const { mutate } = useAddSpace()
	const [text, setText] = useState('')
	const queryClient = useQueryClient()

	function handleSave() {
		if (text) {
			mutate(
				{ name: text },
				{
					onSuccess: () => {
						queryClient.invalidateQueries({ queryKey: ['spaces'] })
						onClose()
					},
				}
			)
		}
	}

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>New space</DialogTitle>
				</DialogHeader>

				<form
					onSubmit={(e) => {
						e.preventDefault()
						e.stopPropagation()
						handleSave()
					}}
				>
					<Input
						placeholder="Space name"
						value={text}
						onChange={(e) => setText(e.target.value)}
					/>

					<Button className="w-full" type="submit">
						Save
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	)
}
