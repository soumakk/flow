import { Input } from '@/components/ui/input'
import { DatePicker } from '@/components/widgets/DatePicker'
import { MultiDropdown } from '@/components/widgets/MultiDropdown'
import {
	dueDateFilterAtom,
	priorityFilterAtom,
	PriorityOptions,
	searchQueryAtom,
	statusFilterAtom,
	tagsFilterAtom,
} from '@/lib/atoms'
import { useStatusList, useTagsList } from '@/services/query'
import { useAtom } from 'jotai/react'
import { Disc, Flag, Tag } from 'lucide-react'

export default function TaskFilters() {
	const { data: statusList, isLoading: isStatusLoading } = useStatusList()
	const { data: tagsList, isLoading: isTagsLoading } = useTagsList({})

	const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom)
	const [statusFilter, setStatusFilter] = useAtom(statusFilterAtom)
	const [tagsFilter, setTagsFilter] = useAtom(tagsFilterAtom)
	const [priorityFilter, setPriorityFilter] = useAtom(priorityFilterAtom)
	const [dueDateFilter, setDueDateFilter] = useAtom(dueDateFilterAtom)

	const statusOptions = statusList?.map((status) => ({
		label: status.name,
		value: status.id,
		color: status.color,
	}))

	const tagsOptions = tagsList?.map((tag) => ({
		label: tag.name,
		value: tag.id,
		color: tag.color,
	}))

	return (
		<div className="flex px-6 pb-4">
			<div className="flex items-center gap-3 py-1">
				<Input
					placeholder="Search tasks"
					className="h-8"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					// startIcon={<Search className="h-4 w-4 text-muted-foreground" />}
				/>

				<MultiDropdown
					trigger={
						<>
							<Disc className="h-4 w-4 text-muted-foreground" />
							<span>Status</span>
						</>
					}
					options={statusOptions}
					title="status"
					selected={statusFilter}
					onSelect={(selected) => setStatusFilter(selected)}
				/>

				<MultiDropdown
					trigger={
						<>
							<Tag className="h-4 w-4 text-muted-foreground" />
							<span>Tags</span>
						</>
					}
					options={tagsOptions}
					title="tags"
					selected={tagsFilter}
					onSelect={(selected) => setTagsFilter(selected)}
				/>

				<MultiDropdown
					trigger={
						<>
							<Flag className="h-4 w-4 text-muted-foreground" />
							<span>Priority</span>
						</>
					}
					options={PriorityOptions}
					title="priority"
					selected={priorityFilter}
					onSelect={(selected) => setPriorityFilter(selected)}
					hideSearch
				/>

				<DatePicker id="date" value={dueDateFilter} onChange={setDueDateFilter} />
			</div>
		</div>
	)
}
