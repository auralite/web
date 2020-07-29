import { useState, useEffect } from 'react'
import ThemeContext from '@/context/theme'

const ThemeManager = ({ children }) => {
	const prefersDark = typeof window !== 'undefined' && localStorage.getItem('theme') !== 'light' && window?.matchMedia('(prefers-color-scheme: dark)')?.matches

	const [theme, setTheme] = useState(prefersDark ? 'dark' : 'light')

	useEffect(() => {
		document.body.classList.add('dark:bg-gray-900', 'sm:dark:bg-gray-700')

		localStorage.setItem('theme', theme)

		if (theme === 'dark') {
			document.documentElement.classList.add('scheme-dark')
		} else {
			document.documentElement.classList.remove('scheme-dark')
		}
	}, [theme])

	return <ThemeContext.Provider value={[theme, setTheme]}>{children}</ThemeContext.Provider>
}

export default ThemeManager
