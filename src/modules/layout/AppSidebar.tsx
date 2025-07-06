import * as React from 'react'

import FlowLogo from '@/assets/icons/FlowLogo'
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from '@/components/ui/sidebar'
import { useSpaces } from '@/services/query'
import type { ISpace } from '@/types/tasks'
import { CircleDot, Palette, Plus, Tag } from 'lucide-react'
import NewSpaceInput from '../space/NewSpaceInput'
import SpaceListItem from '../space/SpaceListItem'
import TagsDialog from '../tags/TagsDialog'
import AppearanceDialog from './AppearanceDialog'
import StatusDialog from './StatusDialog'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { data: spaces } = useSpaces()
	const [isTagsDialogOpen, setIsTagsDialogOpen] = React.useState(false)
	const [isStatusDialogOpen, setIsStatusDialogOpen] = React.useState(false)
	const [isAppearanceDialogOpen, setIsAppearanceDialogOpen] = React.useState(false)
	const [isAddNewSpace, setIsAddNewSpace] = React.useState(false)

	return (
		<Sidebar {...props}>
			<SidebarHeader className="p-6">
				<SidebarMenu>
					<SidebarMenuItem>
						<FlowLogo />
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent className="px-6">
				<SidebarGroup className="p-0">
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton onClick={() => setIsTagsDialogOpen(true)}>
									<Tag className="size-4" />
									<span>Tags</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton onClick={() => setIsStatusDialogOpen(true)}>
									<CircleDot className="size-4" />
									<span>Status</span>
								</SidebarMenuButton>
							</SidebarMenuItem>

							<SidebarMenuItem>
								<SidebarMenuButton onClick={() => setIsAppearanceDialogOpen(true)}>
									<Palette className="size-4" />
									<span>Appearance</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				<SidebarGroup className="p-0">
					<SidebarGroupLabel className="justify-between">
						<span>Spaces</span>

						<Plus
							className="h-4 w-4 cursor-pointer"
							onClick={() => setIsAddNewSpace(true)}
						/>
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{isAddNewSpace ? (
								<SidebarMenuItem>
									<SidebarMenuButton>
										<NewSpaceInput onClose={() => setIsAddNewSpace(false)} />
									</SidebarMenuButton>
								</SidebarMenuItem>
							) : null}

							{spaces?.map((space: ISpace) => (
								<SpaceListItem space={space} key={space.id} />
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarRail />

			{isTagsDialogOpen && (
				<TagsDialog open={isTagsDialogOpen} onClose={() => setIsTagsDialogOpen(false)} />
			)}

			{isStatusDialogOpen && (
				<StatusDialog
					open={isStatusDialogOpen}
					onClose={() => setIsStatusDialogOpen(false)}
				/>
			)}

			{isAppearanceDialogOpen && (
				<AppearanceDialog
					open={isAppearanceDialogOpen}
					onClose={() => setIsAppearanceDialogOpen(false)}
				/>
			)}
		</Sidebar>
	)
}
