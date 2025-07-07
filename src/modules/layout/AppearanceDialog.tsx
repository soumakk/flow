import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { useTheme } from '@/contexts/ThemeProvider'
import { Theme, themeColors } from '@/lib/atoms'
import { cn } from '@/lib/utils'
import { Monitor, Moon, Sun } from 'lucide-react'

const themeOptions = [
	{ label: 'Light', value: Theme.light, icon: <Sun className="h-4 w-4" /> },
	{ label: 'Dark', value: Theme.dark, icon: <Moon className="h-4 w-4" /> },
	{ label: 'System', value: Theme.system, icon: <Monitor className="h-4 w-4" /> },
]

export default function AppearanceDialog({
	open,
	onClose,
}: {
	open: boolean
	onClose: () => void
}) {
	const { setTheme, theme, color, setColor } = useTheme()

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
							className={cn(
								'flex-1 text-sm border-2 rounded-md p-4 flex items-center gap-2 cursor-pointer',
								{
									'border-primary text-primary': theme === t.value,
								}
							)}
							onClick={() => setTheme(t.value)}
						>
							<span>{t.icon}</span>
							{t.label}
						</button>
					))}
				</div>

				<Label>Brand</Label>
				<div className="flex flex-wrap gap-4">
					{themeColors?.map((c) => (
						<div
							onClick={() => setColor(c)}
							className="h-7 w-7  cursor-pointer active:scale-90 transition-all duration-100"
							style={{
								backgroundColor: color === c ? 'transparent' : c,
								border: color === c ? `3px solid ${c}` : 'none',
							}}
							key={c}
						></div>
					))}
				</div>
			</DialogContent>
		</Dialog>
	)
}
