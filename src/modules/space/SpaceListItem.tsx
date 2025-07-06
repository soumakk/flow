import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { activeSpaceIdAtom } from '@/lib/atoms'
import { useDeleteSpace, useUpdateSpace } from '@/services/mutation'
import type { ISpace } from '@/types/tasks'
import { useQueryClient } from '@tanstack/react-query'
import { useAtom } from 'jotai/react'
import { useLayoutEffect, useRef, useState } from 'react'

export default function SpaceListItem({ space }: { space: ISpace }) {
	const { mutate: deleteSpace } = useDeleteSpace()
	const { mutate: updateSpace } = useUpdateSpace()
	const queryClient = useQueryClient()
	const [isEditMode, setIsEditMode] = useState(false)
	const [activeSpaceId, setActiveSpaceId] = useAtom(activeSpaceIdAtom)
	const [text, setText] = useState(space.name)
	const inputRef = useRef<HTMLInputElement>(null)

	useLayoutEffect(() => {
		if (isEditMode) {
			setTimeout(() => {
				inputRef.current?.focus()
				inputRef.current?.select()
			}, 0)
		}
	}, [isEditMode])

	function handleDelete() {
		deleteSpace(
			{
				spaceId: space.id,
			},
			{
				onSuccess: () => {
					queryClient.invalidateQueries({ queryKey: ['spaces'] })
					setActiveSpaceId(null)
				},
			}
		)
	}

	function handleUpdate() {
		if (text) {
			updateSpace(
				{
					spaceId: space.id,
					name: text,
				},
				{
					onSuccess: () => {
						queryClient.invalidateQueries({ queryKey: ['spaces'] })
						setIsEditMode(false)
					},
				}
			)
		}
	}

	return (
		<SidebarMenuItem>
			<ContextMenu>
				<ContextMenuTrigger>
					<SidebarMenuButton
						asChild
						isActive={activeSpaceId === space.id}
						onClick={() => setActiveSpaceId(space.id)}
					>
						<div>
							{isEditMode ? (
								<input
									key={space.id}
									ref={inputRef}
									type="text"
									placeholder="Untitled"
									value={text}
									onChange={(e) => setText(e.target.value)}
									onBlur={() => {
										setIsEditMode(false)
										setText(space.name)
									}}
									onKeyDown={(e) => {
										if (e.key === 'Enter') {
											handleUpdate()
										}
									}}
								/>
							) : (
								<span>{text}</span>
							)}
						</div>
					</SidebarMenuButton>
				</ContextMenuTrigger>
				<ContextMenuContent>
					<ContextMenuItem
						onClick={() => {
							setIsEditMode(true)
						}}
					>
						Rename
					</ContextMenuItem>
					<ContextMenuItem variant="destructive" onClick={handleDelete}>
						Delete
					</ContextMenuItem>
				</ContextMenuContent>
			</ContextMenu>
		</SidebarMenuItem>
	)
}
