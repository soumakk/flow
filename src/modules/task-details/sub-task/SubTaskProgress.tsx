import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import CircularProgress from '@/components/widgets/CircularProgress'
import type { ISubTask } from '@/types/tasks'

export default function SubTaskProgress({
	subTasks,
	size = 20,
	stroke = 3,
}: {
	subTasks: ISubTask[]
	size?: number
	stroke?: number
}) {
	const totalCount = subTasks?.length ?? 0
	const completedCount = subTasks?.filter((st) => st.completed)?.length ?? 0
	const progress = (completedCount * 100) / totalCount

	return (
		<>
			{totalCount > 0 ? (
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>
							<CircularProgress
								progress={progress}
								size={size}
								strokeWidth={stroke}
							/>
						</TooltipTrigger>
						<TooltipContent>
							<p className="text-xs">
								Sub tasks: {completedCount} / {totalCount}
							</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			) : null}
		</>
	)
}
