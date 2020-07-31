import { useState, useEffect } from 'react'
import ThemeContext from '@/context/theme'
import useStickyState from '@/hooks/sticky'

const ThemeManager = ({ children }) => {
	const [theme, setTheme] = useStickyState(
		() => {
			return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)')?.matches ? 'dark' : 'light'
		},
		'theme',
		false
	)

	useEffect(() => {
		document.body.classList.add('dark:bg-gray-900', 'sm:dark:bg-gray-700')

		if (theme === 'dark') {
			document.documentElement.classList.add('scheme-dark')
		} else {
			document.documentElement.classList.remove('scheme-dark')
		}
	}, [theme])

	return <ThemeContext.Provider value={[theme, setTheme]}>{children}</ThemeContext.Provider>
}

export default ThemeManager
