import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Monitor, Moon, Sun } from 'lucide-react'
import { useLayoutEffect, useState } from 'react'

const themeOptions = [
	{ label: 'Light', value: 'light', icon: <Sun className="h-4 w-4" /> },
	{ label: 'Dark', value: 'dark', icon: <Moon className="h-4 w-4" /> },
	{ label: 'System', value: 'system', icon: <Monitor className="h-4 w-4" /> },
]

export default function AppearanceDialog({
	open,
	onClose,
}: {
	open: boolean
	onClose: () => void
}) {
	const [theme, setTheme] = useState('light')

	function toggleTheme(t: string) {
		setTheme(t)
	}

	useLayoutEffect(() => {
		const root = window.document.documentElement
		root.classList.remove('light', 'dark')

		root.classList.add(theme)
	}, [theme])

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Appearance</DialogTitle>
				</DialogHeader>

				<Label>Theme</Label>
				<div className="flex items-center gap-4">
					{themeOptions?.map((t) => (
						<button
							key={t.value}
							className="flex-1 text-sm border rounded-md p-4 flex items-center gap-2 cursor-pointer"
							onClick={() => toggleTheme(t.value)}
						>
							<span>{t.icon}</span>
							{t.label}
						</button>
					))}
				</div>
			</DialogContent>
		</Dialog>
	)
}
