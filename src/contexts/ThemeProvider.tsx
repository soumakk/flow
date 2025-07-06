import { defaultPrimaryColor, primaryColorAtom, Theme, themeAtom } from '@/lib/atoms'
import { useAtom } from 'jotai/react'
import { createContext, useContext, useEffect } from 'react'

type ThemeProviderState = {
	theme: Theme
	setTheme: (theme: Theme) => void
	setColor: (color: string) => void
	color: string
}

const initialState: ThemeProviderState = {
	theme: Theme.light,
	setTheme: () => null,
	color: defaultPrimaryColor,
	setColor: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setTheme] = useAtom(themeAtom)
	const [color, setColor] = useAtom(primaryColorAtom)

	useEffect(() => {
		const root = window.document.documentElement

		root.classList.remove('light', 'dark')

		if (theme === 'system') {
			const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'dark'
				: 'light'

			root.classList.add(systemTheme)
			return
		}

		root.classList.add(theme)

		root.style.setProperty('--primary', color)
		root.style.setProperty('--sidebar-accent', `${color}1A`)
	}, [theme, color])

	const value = {
		theme,
		setTheme: (theme: Theme) => {
			setTheme(theme)
		},
		color,
		setColor,
	}

	return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>
}

export const useTheme = () => {
	const context = useContext(ThemeProviderContext)

	if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider')

	return context
}
