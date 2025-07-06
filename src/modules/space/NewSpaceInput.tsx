import { useAddSpace } from '@/services/mutation'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

export default function NewSpaceInput({ onClose }: { onClose: () => void }) {
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
		<input
			type="text"
			placeholder="Untitled"
			autoFocus
			value={text}
			onChange={(e) => setText(e.target.value)}
			onBlur={() => {
				onClose()
			}}
			onKeyDown={(e) => {
				if (e.key === 'Enter') {
					handleSave()
				}
			}}
		/>
	)
}
