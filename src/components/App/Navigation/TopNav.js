import { useRouter } from 'next/router'
import Link from 'next/link'
import { authCheck } from '@/middleware/auth'
import Logo from '@/components/Global/Logo'
import Avatar from '../Avatar'
import { useState, memo } from 'react'
import { logout } from '@/utils/auth'
import useClickOutside from '@/hooks/click-outside'
import Transition from '@/components/Global/Transition'
import useUser from '@/hooks/user'
import { SunSolid, MoonSolid } from '../Icon'
import useTheme from '@/hooks/theme'
import dynamic from 'next/dynamic'

const TopNav = ({ title, openSideNav }) => {
	const router = useRouter()
	const { user } = useUser()
	const { toggleTheme } = useTheme()
	const [isOpen, setOpen] = useState(false)

	const { ref: profileRef } = useClickOutside(() => {
		if (!isOpen) return

		setOpen(false)
	})

	return (
		<nav className="bg-white dark:bg-gray-900 bg-opacity-90 bg-crystal fixed z-20 w-full pt-safe-t sm:pt-4 shadow-header dark:shadow-header-dark">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between">
					<div className="flex items-stretch">
						<div className="pb-4 flex items-center">
							<button onClick={() => (authCheck ? openSideNav() : router.push('/'))} className={`sm:hidden flex-shrink-0 ${authCheck ? 'focus:outline-none focus:shadow-outline rounded-full' : ''}`} aria-label="Menu">
								{authCheck ? <Avatar src={user?.profile?.avatar} sizeClasses="h-8 w-8" /> : <Logo className="h-8 w-8" />}
							</button>
							<Link href={authCheck ? '/home' : '/'}>
								<a className="hidden sm:block flex-shrink-0">
									<Logo className="h-8 w-8" />
								</a>
							</Link>
							{title && <p className="sm:hidden ml-2 text-gray-800 dark:text-gray-100 font-semibold text-xl">{title}</p>}
						</div>
						<div className="hidden sm:-my-px sm:ml-6 sm:flex space-x-8">
							<NavItem href="/home" label="Home" />
							<NavItem href="/search" label="Search" />
							<NavItem href="/notifications" label="Notifications" />
							<NavItem href="/settings" label="Settings" />
						</div>
					</div>
					{authCheck ? (
						<div className="pb-4">
							<div className="hidden sm:flex ml-4 items-center md:ml-6">
								<div ref={profileRef} className="ml-3 relative">
									<div>
										<button onClick={() => setOpen((state) => !state)} className="hidden max-w-xs md:flex items-center text-sm rounded-full text-white dark:text-gray-300 focus:outline-none focus:shadow-solid" id="user-menu" aria-label="User menu" aria-haspopup="true">
											<Avatar sizeClasses="h-8 w-8" src={user?.profile?.avatar} />
										</button>
										<button onClick={openSideNav} className="sm:hidden max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none focus:shadow-solid" id="user-menu" aria-label="User menu" aria-haspopup="true">
											<Avatar sizeClasses="h-8 w-8" src={user?.profile?.avatar} />
										</button>
									</div>
									<Transition show={user && isOpen} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
										<div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg z-10">
											<div className="py-1 rounded-md bg-white dark:bg-gray-900 shadow-xs" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
												<Link href="/[profile]" as={`/${user?.profile?.handle}`}>
													<a className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark-hover:text-gray-300 dark-hover:bg-gray-700" role="menuitem">
														Your Profile
													</a>
												</Link>
												<Link href="/settings">
													<a className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark-hover:text-gray-300 dark-hover:bg-gray-700" role="menuitem">
														Settings
													</a>
												</Link>
												<button onClick={toggleTheme} className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark-hover:text-gray-300 dark-hover:bg-gray-700" role="menuitem">
													Toggle Theme
												</button>
												<button onClick={logout} className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark-hover:text-gray-300 dark-hover:bg-gray-700" role="menuitem">
													Sign out
												</button>
											</div>
										</div>
									</Transition>
								</div>
							</div>
							<span className="sm:hidden">
								<ThemeToggle />
							</span>
						</div>
					) : (
						<Link href="/login">
							<a className="mb-4 inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-50 focus:outline-none focus:border-gray-300 focus:shadow-outline-gray active:bg-gray-200 transition ease-in-out duration-150">Log In</a>
						</Link>
					)}
				</div>
			</div>
		</nav>
	)
}

const NavItem = ({ href, label }) => {
	const router = useRouter()

	return (
		<Link href={href}>
			<a className={`${router.pathname === href ? 'border-indigo-500 dark:border-gray-300 text-gray-900 dark:text-gray-300 focus:border-indigo-700' : 'border-transparent text-gray-500 hover:text-gray-700 dark-hover:text-gray-400 hover:border-gray-300 dark-hover:border-gray-400 focus:text-gray-700 focus:border-gray-300'} pb-4 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 focus:outline-none transition duration-150 ease-in-out`}>{label}</a>
		</Link>
	)
}

const ThemeToggle = dynamic(
	Promise.resolve(() => {
		const { isDark, toggleTheme } = useTheme()

		function handleKeyDown(e) {
			if ([' ', 'Enter'].includes(e.key)) {
				e.preventDefault()
				toggleTheme()
			}
		}

		return (
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
		)
	}),
	{ ssr: false }
)

export default memo(TopNav)
