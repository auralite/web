import { useState, useEffect } from 'react'
import ThemeContext from '@/context/theme'
import useStickyState from '@/hooks/sticky'
import useTheme from '@/hooks/theme'
import Swipe from 'react-easy-swipe'
import { SunSolid, MoonSolid } from '../App/Icon'

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

export const ThemeToggle = () => {
	const { isDark, toggleTheme } = useTheme()
	const [swipeDirection, setSwipeDirection] = useState(null)

	function handleKeyDown(e) {
		if ([' ', 'Enter'].includes(e.key)) {
			e.preventDefault()
			toggleTheme()
		}
	}

	const registerDirection = (position) => {
		if (Math.abs(position.x) < 20) return

		setSwipeDirection(position.x > 0 ? 'right' : 'left')
	}

	const performSwipe = () => {
		if (swipeDirection === 'right' && !isDark) toggleTheme()
		if (swipeDirection === 'left' && isDark) toggleTheme()

		setSwipeDirection(null)
	}

	return (
		<Swipe tag="span" className="h-6" onSwipeMove={registerDirection} onSwipeEnd={performSwipe}>
			<span role="checkbox" tabIndex={0} aria-checked={isDark} onClick={() => toggleTheme()} onKeyDown={(e) => handleKeyDown(e)} className={`${isDark ? 'bg-indigo-600' : 'bg-gray-200'} select-none relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:shadow-outline`}>
				<span aria-hidden="true" className={`${isDark ? 'translate-x-5' : 'translate-x-0'} relative inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200`}>
					<span className={`${isDark ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200'} absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}>
						<SunSolid className="h-3 w-3 text-gray-400" />
					</span>
					<span className={`${isDark ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100'} absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}>
						<MoonSolid className="h-3 w-3 text-indigo-600" />
					</span>
				</span>
			</span>
		</Swipe>
	)
}

export const ThemeBubble = () => {
	const { isDark, toggleTheme } = useTheme()

	return (
		<button className="fixed bottom-0 right-0 px-8 py-8 -mb-4 -mr-4 rounded-full bg-indigo-300 dark:bg-indigo-800 cursor-pointer" onClick={toggleTheme}>
			<span className={`${isDark ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200'} pb-3 pr-2 absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}>
				<SunSolid className="h-6 w-6 text-indigo-800" />
			</span>
			<span className={`${isDark ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100'} pb-3 pr-1 absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}>
				<MoonSolid className="h-6 w-6 text-indigo-300" />
			</span>
		</button>
	)
}

export default ThemeManager
