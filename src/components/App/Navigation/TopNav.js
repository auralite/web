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

const TopNav = ({ title, openSideNav }) => {
	const router = useRouter()
	const { user } = useUser()
	const [isOpen, setOpen] = useState(false)

	const { ref: profileRef } = useClickOutside(() => {
		if (!isOpen) return

		setOpen(false)
	})

	return (
		<nav className="bg-crystal fixed z-20 w-full pt-safe-t sm:pt-4" style={{ boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.05)' }}>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between">
					<div className="flex items-stretch">
						<div className="pb-4 flex items-center">
							<button onClick={() => (authCheck ? openSideNav() : router.push('/'))} className="sm:hidden flex-shrink-0">
								<a className="flex-shrink-0">
									<Logo className="h-8 w-8" />
								</a>
							</button>
							<Link href={authCheck ? '/home' : '/'}>
								<a className="hidden sm:block flex-shrink-0">
									<Logo className="h-8 w-8" />
								</a>
							</Link>
							{title && <p className="sm:hidden ml-2 text-gray-800 font-semibold text-xl">{title}</p>}
						</div>
						<div className="hidden sm:-my-px sm:ml-6 sm:flex space-x-8">
							<Link href="/home">
								<a className={`${router.pathname === '/home' ? 'border-indigo-500 text-gray-900 focus:border-indigo-700' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300'} pb-4 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 focus:outline-none transition duration-150 ease-in-out`}>Home</a>
							</Link>
							<Link href="/search">
								<a className={`${router.pathname === '/search' ? 'border-indigo-500 text-gray-900 focus:border-indigo-700' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300'} pb-4 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 focus:outline-none transition duration-150 ease-in-out`}>Search</a>
							</Link>
							<Link href="/notifications">
								<a className={`${router.pathname === '/notifications' ? 'border-indigo-500 text-gray-900 focus:border-indigo-700' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300'} pb-4 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 focus:outline-none transition duration-150 ease-in-out`}>Notifications</a>
							</Link>
							<Link href="/settings">
								<a className={`${router.pathname === '/settings' ? 'border-indigo-500 text-gray-900 focus:border-indigo-700' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300'} pb-4 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 focus:outline-none transition duration-150 ease-in-out`}>Settings</a>
							</Link>
						</div>
					</div>
					{authCheck ? (
						<div className="pb-4">
							<div className="ml-4 flex items-center md:ml-6">
								<div ref={profileRef} className="ml-3 relative">
									<div>
										<button onClick={() => setOpen((state) => !state)} className="hidden max-w-xs md:flex items-center text-sm rounded-full text-white focus:outline-none focus:shadow-solid" id="user-menu" aria-label="User menu" aria-haspopup="true">
											<Avatar sizeClasses="h-8 w-8" src={user?.profile?.avatar} />
										</button>
										<button onClick={openSideNav} className="sm:hidden max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none focus:shadow-solid" id="user-menu" aria-label="User menu" aria-haspopup="true">
											<Avatar sizeClasses="h-8 w-8" src={user?.profile?.avatar} />
										</button>
									</div>
									<Transition show={user && isOpen} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
										<div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg z-10">
											<div className="py-1 rounded-md bg-white shadow-xs" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
												<Link href="/[profile]" as={`/${user?.profile?.handle}`}>
													<a className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
														Your Profile
													</a>
												</Link>
												<button onClick={() => alert('lol nope')} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
													Settings
												</button>
												<button onClick={logout} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
													Sign out
												</button>
											</div>
										</div>
									</Transition>
								</div>
							</div>
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

export default memo(TopNav)
