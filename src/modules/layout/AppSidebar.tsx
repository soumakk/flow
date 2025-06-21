import * as React from 'react'

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
import { GalleryVerticalEnd } from 'lucide-react'
import { useSpaces } from '@/services/query'
import type { ISpace } from '@/types/tasks'
import { useAtom } from 'jotai/react'
import { activeSpaceIdAtom } from '@/lib/atoms'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { data: spaces } = useSpaces()
	const [activeSpaceId, setActiveSpaceId] = useAtom(activeSpaceIdAtom)

	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<a href="#">
								<div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
									<GalleryVerticalEnd className="size-4" />
								</div>
								<div className="flex flex-col gap-0.5 leading-none">
									<span className="font-medium">Flow</span>
									<span className="">v1.0.0</span>
								</div>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
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
