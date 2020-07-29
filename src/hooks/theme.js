import { useContext } from 'react'
import ThemeContext from '@/context/theme'

const useTheme = () => {
	const [theme, setTheme] = useContext(ThemeContext)
	const isDark = theme === 'dark'
	const isLight = theme === 'light'
	const toggleTheme = () => setTheme((theme) => (theme === 'dark' ? 'light' : 'dark'))

	return { theme, isDark, isLight, toggleTheme, setTheme }
}

export default useTheme
