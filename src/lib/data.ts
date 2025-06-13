import { type IStatus, type ITag, type ITask, TaskPriority } from '@/types/tasks'

export const PriorityOptions = [
	{
		label: 'Urgent',
		value: TaskPriority.Urgent,
	},
	{
		label: 'High',
		value: TaskPriority.High,
	},
	{
		label: 'Normal',
		value: TaskPriority.Normal,
	},
	{
		label: 'Low',
		value: TaskPriority.Low,
	},
]

export const defaultStatus: IStatus[] = [
	{
		id: 's-1',
		name: 'To Do',
		color: '#FFB800', // Amber
		created_at: '2025-01-01T00:00:00Z',
		updated_at: '2025-01-01T00:00:00Z',
	},
	{
		id: 's-2',
		name: 'In Progress',
		color: '#1976D2', // Blue
		created_at: '2025-01-01T00:00:00Z',
		updated_at: '2025-01-01T00:00:00Z',
	},
	{
		id: 's-3',
		name: 'Review',
		color: '#7B1FA2', // Purple
		created_at: '2025-01-01T00:00:00Z',
		updated_at: '2025-01-01T00:00:00Z',
	},
	{
		id: 's-4',
		name: 'Done',
		color: '#388E3C', // Green
		created_at: '2025-01-01T00:00:00Z',
		updated_at: '2025-01-01T00:00:00Z',
	},
]

export const defaultTags: ITag[] = [
	{
		id: 't-1',
		name: 'Bug',
		color: '#D32F2F', // Red
		created_at: '2025-01-02T00:00:00Z',
	},
	{
		id: 't-2',
		name: 'Design',
		color: '#FF9800', // Orange
		created_at: '2025-01-02T00:00:00Z',
	},
	{
		id: 't-3',
		name: 'Frontend',
		color: '#0288D1', // Light Blue
		created_at: '2025-01-02T00:00:00Z',
	},
	{
		id: 't-4',
		name: 'Content',
		color: '#7B1FA2', // Purple
		created_at: '2025-01-02T00:00:00Z',
	},
	{
		id: 't-5',
		name: 'UX Research',
		color: '#388E3C', // Green
		created_at: '2025-01-02T00:00:00Z',
	},
	{
		id: 't-6',
		name: 'DevOps',
		color: '#455A64', // Blue Grey
		created_at: '2025-01-02T00:00:00Z',
	},
	{
		id: 't-7',
		name: 'Accessibility',
		color: '#C2185B', // Pink
		created_at: '2025-01-02T00:00:00Z',
	},
	{
		id: 't-8',
		name: 'Refactor',
		color: '#009688', // Teal
		created_at: '2025-01-02T00:00:00Z',
	},
	{
		id: 't-9',
		name: 'Analytics',
		color: '#303F9F', // Indigo
		created_at: '2025-01-02T00:00:00Z',
	},
	{
		id: 't-10',
		name: 'Reporting',
		color: '#795548', // Brown
		created_at: '2025-01-02T00:00:00Z',
	},
	{
		id: 't-11',
		name: 'SEO',
		color: '#FFA000', // Amber
		created_at: '2025-01-02T00:00:00Z',
	},
	{
		id: 't-12',
		name: 'Email',
		color: '#5D4037', // Dark Brown
		created_at: '2025-01-02T00:00:00Z',
	},
	{
		id: 't-13',
		name: 'UI Polish',
		color: '#607D8B', // Blue Grey
		created_at: '2025-01-02T00:00:00Z',
	},
	{
		id: 't-14',
		name: 'Legal',
		color: '#E64A19', // Deep Orange
		created_at: '2025-01-02T00:00:00Z',
	},
]

export const defaultTasks: ITask[] = [
	{
		id: '1',
		created_at: '2025-03-08T10:05:00Z',
		title: 'Fix login issue',
		description: 'Users cannot log in on mobile',
		priority: 'high',
		due_date: '2025-03-10T00:00:00Z',
		status_id: 's-1',
		updated_at: '2025-03-08T10:05:00Z',
		tag_ids: ['t-1'],
		sub_tasks: [
			{ id: 'st-1', title: 'Debug mobile auth', completed: false },
			{ id: 'st-2', title: 'Test on iOS & Android', completed: false },
		],
	},
	{
		id: '2',
		created_at: '2025-03-09T08:12:00Z',
		title: 'Update homepage banner',
		description: 'New campaign starts next week',
		priority: 'normal',
		due_date: '2025-03-12T00:00:00Z',
		status_id: 's-2',
		updated_at: '2025-03-09T08:15:00Z',
		tag_ids: ['t-2'],
		sub_tasks: [
			{ id: 'st-3', title: 'Design banner', completed: true },
			{ id: 'st-4', title: 'Deploy to site', completed: false },
		],
	},
	{
		id: '3',
		created_at: '2025-03-10T11:30:00Z',
		title: 'Database migration',
		description: 'Move from MySQL to PostgreSQL',
		priority: 'high',
		due_date: '2025-03-20T00:00:00Z',
		status_id: 's-1',
		updated_at: '2025-03-10T11:30:00Z',
		tag_ids: ['t-3'],
		sub_tasks: [
			{ id: 'st-5', title: 'Export MySQL data', completed: false },
			{ id: 'st-6', title: 'Import to PostgreSQL', completed: false },
		],
	},
	{
		id: '4',
		created_at: '2025-03-11T09:45:00Z',
		title: 'Write blog post on security',
		description: 'Publish article on two-factor authentication',
		priority: 'urgent',
		due_date: '2025-03-18T00:00:00Z',
		status_id: 's-3',
		updated_at: '2025-03-11T09:45:00Z',
		tag_ids: ['t-4'],
		sub_tasks: [
			{ id: 'st-7', title: 'Draft content', completed: true },
			{ id: 'st-8', title: 'Peer review', completed: false },
		],
	},
	{
		id: '5',
		created_at: '2025-03-11T14:20:00Z',
		title: 'Optimize image loading',
		description: 'Lazy-load images for performance',
		priority: 'normal',
		due_date: '2025-03-14T00:00:00Z',
		status_id: 's-2',
		updated_at: '2025-03-11T14:20:00Z',
		tag_ids: ['t-1', 't-3'],
		sub_tasks: [
			{ id: 'st-9', title: 'Add loading attribute', completed: false },
			{ id: 'st-10', title: 'Test on multiple browsers', completed: false },
		],
	},
	{
		id: '6',
		created_at: '2025-03-12T08:00:00Z',
		title: 'Conduct UX survey',
		description: 'Collect user feedback on new dashboard',
		priority: 'normal',
		due_date: '2025-03-19T00:00:00Z',
		status_id: 's-4',
		updated_at: '2025-03-12T08:00:00Z',
		tag_ids: ['t-5'],
		sub_tasks: [
			{ id: 'st-11', title: 'Create survey form', completed: true },
			{ id: 'st-12', title: 'Send to user list', completed: false },
		],
	},
	{
		id: '7',
		created_at: '2025-03-12T11:15:00Z',
		title: 'Set up CI/CD pipeline',
		description: 'Automate testing and deployment',
		priority: 'high',
		due_date: '2025-03-22T00:00:00Z',
		status_id: 's-1',
		updated_at: '2025-03-12T11:15:00Z',
		tag_ids: ['t-6'],
		sub_tasks: [
			{ id: 'st-13', title: 'Configure GitHub Actions', completed: false },
			{ id: 'st-14', title: 'Test deployment', completed: false },
		],
	},
	{
		id: '8',
		created_at: '2025-03-13T07:55:00Z',
		title: 'Run accessibility audit',
		description: 'Ensure WCAG compliance on site',
		priority: 'normal',
		due_date: '2025-03-17T00:00:00Z',
		status_id: 's-3',
		updated_at: '2025-03-13T07:55:00Z',
		tag_ids: ['t-7'],
		sub_tasks: [
			{ id: 'st-15', title: 'Scan pages with axe tool', completed: false },
			{ id: 'st-16', title: 'Fix critical issues', completed: false },
		],
	},
	{
		id: '9',
		created_at: '2025-03-14T10:30:00Z',
		title: 'Refactor user service',
		description: 'Improve code structure for better maintainability',
		priority: 'urgent',
		due_date: '2025-03-21T00:00:00Z',
		status_id: 's-1',
		updated_at: '2025-03-14T10:30:00Z',
		tag_ids: ['t-1', 't-8'],
		sub_tasks: [
			{ id: 'st-17', title: 'Split into smaller modules', completed: false },
			{ id: 'st-18', title: 'Write unit tests', completed: false },
		],
	},
	{
		id: '10',
		created_at: '2025-03-15T09:00:00Z',
		title: 'Redesign contact form',
		description: 'Improve UX and add validation',
		priority: 'normal',
		due_date: '2025-03-20T00:00:00Z',
		status_id: 's-2',
		updated_at: '2025-03-15T09:00:00Z',
		tag_ids: ['t-2'],
		sub_tasks: [
			{ id: 'st-19', title: 'Update form fields', completed: true },
			{ id: 'st-20', title: 'Client-side validation', completed: false },
		],
	},
	{
		id: '11',
		created_at: '2025-03-15T13:30:00Z',
		title: 'Set up analytics dashboard',
		description: 'Visualize key metrics with charts',
		priority: 'normal',
		due_date: '2025-03-23T00:00:00Z',
		status_id: 's-1',
		updated_at: '2025-03-15T13:30:00Z',
		tag_ids: ['t-9'],
		sub_tasks: [
			{ id: 'st-21', title: 'Define KPIs', completed: true },
			{ id: 'st-22', title: 'Create dashboard layout', completed: false },
		],
	},
	{
		id: '12',
		created_at: '2025-03-16T11:00:00Z',
		title: 'Prepare monthly report',
		description: 'Summarize activities for stakeholders',
		priority: 'low',
		due_date: '2025-03-25T00:00:00Z',
		status_id: 's-4',
		updated_at: '2025-03-16T11:00:00Z',
		tag_ids: ['t-10'],
		sub_tasks: [
			{ id: 'st-23', title: 'Gather metrics', completed: true },
			{ id: 'st-24', title: 'Write summary', completed: false },
		],
	},
	{
		id: '13',
		created_at: '2025-03-17T07:00:00Z',
		title: 'Fix broken links',
		description: 'Crawl site and update outdated URLs',
		priority: 'low',
		due_date: '2025-03-18T00:00:00Z',
		status_id: 's-3',
		updated_at: '2025-03-17T07:00:00Z',
		tag_ids: ['t-11'],
		sub_tasks: [
			{ id: 'st-25', title: 'Run link checker', completed: false },
			{ id: 'st-26', title: 'Replace old links', completed: false },
		],
	},
	{
		id: '14',
		created_at: '2025-03-18T08:45:00Z',
		title: 'Add dark mode',
		description: 'Provide a toggle to switch themes',
		priority: 'normal',
		due_date: '2025-03-27T00:00:00Z',
		status_id: 's-2',
		updated_at: '2025-03-18T08:45:00Z',
		tag_ids: ['t-3'],
		sub_tasks: [
			{ id: 'st-27', title: 'Add theme toggle', completed: false },
			{ id: 'st-28', title: 'Persist user setting', completed: false },
		],
	},
	{
		id: '15',
		created_at: '2025-03-18T15:00:00Z',
		title: 'Conduct code review',
		description: 'Review feature branch before merge',
		priority: 'high',
		due_date: '2025-03-19T00:00:00Z',
		status_id: 's-1',
		updated_at: '2025-03-18T15:00:00Z',
		tag_ids: ['t-1', 't-6'],
		sub_tasks: [
			{ id: 'st-29', title: 'Review pull request', completed: true },
			{ id: 'st-30', title: 'Leave comments', completed: false },
		],
	},
	{
		id: '16',
		created_at: '2025-03-19T12:15:00Z',
		title: 'Deploy staging release',
		description: 'Push latest build to staging environment',
		priority: 'high',
		due_date: '2025-03-20T00:00:00Z',
		status_id: 's-2',
		updated_at: '2025-03-19T12:15:00Z',
		tag_ids: ['t-6'],
		sub_tasks: [
			{ id: 'st-31', title: 'Build app', completed: false },
			{ id: 'st-32', title: 'Deploy to staging', completed: false },
		],
	},
	{
		id: '17',
		created_at: '2025-03-20T09:00:00Z',
		title: 'Migrate email service',
		description: 'Switch from SendGrid to Mailgun',
		priority: 'normal',
		due_date: '2025-03-28T00:00:00Z',
		status_id: 's-1',
		updated_at: '2025-03-20T09:00:00Z',
		tag_ids: ['t-12'],
		sub_tasks: [
			{ id: 'st-33', title: 'Update DNS records', completed: false },
			{ id: 'st-34', title: 'Integrate Mailgun API', completed: false },
		],
	},
	{
		id: '18',
		created_at: '2025-03-21T10:00:00Z',
		title: 'Improve 404 page',
		description: 'Add helpful links and a search bar',
		priority: 'low',
		due_date: '2025-03-25T00:00:00Z',
		status_id: 's-3',
		updated_at: '2025-03-21T10:00:00Z',
		tag_ids: ['t-13'],
		sub_tasks: [
			{ id: 'st-35', title: 'Design layout', completed: false },
			{ id: 'st-36', title: 'Link to main sections', completed: false },
		],
	},
	{
		id: '19',
		created_at: '2025-03-22T08:30:00Z',
		title: 'Review legal compliance',
		description: 'Ensure terms of service are up to date',
		priority: 'normal',
		due_date: '2025-03-30T00:00:00Z',
		status_id: 's-4',
		updated_at: '2025-03-22T08:30:00Z',
		tag_ids: ['t-14'],
		sub_tasks: [
			{ id: 'st-37', title: 'Review terms', completed: false },
			{ id: 'st-38', title: 'Get legal approval', completed: false },
		],
	},
	{
		id: '20',
		created_at: '2025-03-23T10:45:00Z',
		title: 'Fix Safari rendering bug',
		description: 'Layout breaks on Safari 16.2',
		priority: 'high',
		due_date: '2025-03-24T00:00:00Z',
		status_id: 's-1',
		updated_at: '2025-03-23T10:45:00Z',
		tag_ids: ['t-3'],
		sub_tasks: [
			{ id: 'st-39', title: 'Reproduce issue', completed: true },
			{ id: 'st-40', title: 'Patch layout CSS', completed: false },
		],
	},
]

export const StatusColors = [
	'#F44336', // Red
	'#E91E63', // Pink
	'#9C27B0', // Purple
	'#673AB7', // Deep Purple
	'#3F51B5', // Indigo
	'#2196F3', // Blue
	'#03A9F4', // Light Blue
	'#00BCD4', // Cyan
	'#009688', // Teal
	'#4CAF50', // Green
	'#8BC34A', // Light Green
	'#CDDC39', // Lime
	'#FFEB3B', // Yellow
	'#FFC107', // Amber
	'#FF9800', // Orange
	'#FF5722', // Deep Orange
	'#795548', // Brown
	'#9E9E9E', // Grey
	'#607D8B', // Blue Grey
	'#000000', // Black
	'#B71C1C', // Dark Red
	'#880E4F', // Dark Pink
	'#4A148C', // Dark Purple
	'#311B92', // Deep Indigo
	'#1A237E', // Navy Blue
	'#01579B', // Strong Blue
	'#006064', // Dark Cyan
	'#1B5E20', // Dark Green
	'#33691E', // Olive Green
	'#827717', // Dark Lime
	'#F57F17', // Mustard
	'#E65100', // Burnt Orange
	'#BF360C', // Brick
	'#3E2723', // Coffee Brown
	'#616161', // Dark Grey
	'#455A64', // Steel Blue Grey
	'#90CAF9', // Soft Blue
	'#A5D6A7', // Soft Green
	'#FFF59D', // Soft Yellow
	'#FFAB91', // Soft Orange
]
