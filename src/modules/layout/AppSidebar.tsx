import * as React from 'react'

import flowLogo from '@/assets/flow.svg'
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
import { activeSpaceIdAtom } from '@/lib/atoms'
import { useSpaces } from '@/services/query'
import type { ISpace } from '@/types/tasks'
import { useAtom } from 'jotai/react'
import { CircleDot, Palette, Tag } from 'lucide-react'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { data: spaces } = useSpaces()
	const [activeSpaceId, setActiveSpaceId] = useAtom(activeSpaceIdAtom)

	return (
		<Sidebar {...props}>
			<SidebarHeader className="p-6">
				<SidebarMenu>
					<SidebarMenuItem>
						<a href="#">
							<img src={flowLogo} alt="Flow" />
						</a>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent className="px-6">
				<SidebarGroup className="p-0">
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton>
									<Tag className="size-4" />
									<span>Tags</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton>
									<CircleDot className="size-4" />
									<span>Status</span>
								</SidebarMenuButton>
							</SidebarMenuItem>

							<SidebarMenuItem>
								<SidebarMenuButton>
									<Palette className="size-4" />
									<span>Appearance</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				<SidebarGroup className="p-0">
					<SidebarGroupLabel>Spaces</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{spaces?.map((space: ISpace) => (
								<SidebarMenuItem key={space.id}>
									<SidebarMenuButton
										isActive={activeSpaceId === space.id}
										onClick={() => setActiveSpaceId(space.id)}
									>
										{space?.name}
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	)
}
