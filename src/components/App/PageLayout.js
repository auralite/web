import { useState } from 'react'
import useSWR from 'swr'
import Client from '../../utils/Client'
import useClickOutside from '../../hooks/click-outside'
import Link from 'next/link'
import Logo from '../Global/Logo'
import Transition from '../Global/Transition'
import Head from '../Global/Head'
import AlertManager from './AlertManager'
import Avatar from './Avatar'
import LoadLink from './LoadLink'
import Skeleton from 'react-loading-skeleton'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import NavLink from './NavLink'

const PageLayout = ({ children, authCheck }) => {
	const router = useRouter()

	const { data: user } = useSWR(authCheck ? '/api/user' : null, () => Client.user())
	const { data: notifications } = useSWR(authCheck ? '/api/notifications' : null, () => Client.notifications())

	const [profileNavigationOpen, setProfileNavigationOpen] = useState(false)
	const [mobileNavigationOpen, setMobileNavigationOpen] = useState(false)
	const { ref: profileRef } = useClickOutside(() => {
		if (!profileNavigationOpen) return

		setProfileNavigationOpen(false)
	})

	const logout = () => {
		Cookies.remove('auralite_token', { expires: 2628000, sameSite: 'lax' })

		router.push('/login')
	}

	return (
		<>
			<Head />
			<AlertManager>
				<div className="fixed inset-0 flex z-40 pointer-events-none">
					<Transition show={mobileNavigationOpen} enter="transition-opacity ease-linear duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity ease-linear duration-300" leaveFrom="opacity-100" leaveTo="opacity-0">
						<div className="fixed inset-0 pointer-events-auto">
							<div className="absolute inset-0 bg-gray-600 opacity-75" onClick={() => setMobileNavigationOpen(false)} />
						</div>
					</Transition>
					<Transition show={mobileNavigationOpen} enter="transition ease-in-out duration-300 transform" enterFrom="-translate-x-full" enterTo="translate-x-0" leave="transition ease-in-out duration-300 transform" leaveFrom="translate-x-0" leaveTo="-translate-x-full">
						<div className="relative flex-1 flex flex-col max-w-xs w-full bg-indigo-800 pointer-events-auto">
							<div className="absolute top-0 right-0 -mr-14 p-1">
								<button onClick={() => setMobileNavigationOpen(false)} className="flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-gray-600" aria-label="Close sidebar">
									<svg className="h-6 w-6 text-white" stroke="currentColor" fill="none" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>
							</div>
							<div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
								<div className="flex-shrink-0 flex items-center px-4">
									<Logo className="h-8 w-auto" />
									<span className="ml-3 text-indigo-50 font-semibold text-xl">Auralite</span>
								</div>
								<nav className="mt-5 px-2 space-y-1">
									<NavLink onClick={() => setMobileNavigationOpen(false)} href="/home">
										<svg className="mr-4 h-6 w-6 text-indigo-400 group-hover:text-indigo-300 group-focus:text-indigo-300 transition ease-in-out duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
										</svg>
										Home
									</NavLink>
									<NavLink onClick={() => setMobileNavigationOpen(false)} href="/search">
										<svg className="mr-4 h-6 w-6 text-indigo-400 group-hover:text-indigo-300 group-focus:text-indigo-300 transition ease-in-out duration-150" fill="currentColor" viewBox="0 0 20 20">
											<path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
										</svg>
										Search
									</NavLink>
									<NavLink onClick={() => setMobileNavigationOpen(false)} href="/notifications">
										<svg className="mr-4 h-6 w-6 text-indigo-400 group-hover:text-indigo-300 group-focus:text-indigo-300 transition ease-in-out duration-150" stroke="currentColor" fill="none" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
										</svg>
										Notifications
									</NavLink>
									<NavLink onClick={() => setMobileNavigationOpen(false)} href="/[profile]" as={`/${user?.profile?.handle}`}>
										<svg className="mr-4 h-6 w-6 text-indigo-400 group-hover:text-indigo-300 group-focus:text-indigo-300 transition ease-in-out duration-150" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
											<path d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
										</svg>
										Profile
									</NavLink>
									<NavLink onClick={() => setMobileNavigationOpen(false)} href="/settings">
										<svg className="mr-4 h-6 w-6 text-indigo-400 group-hover:text-indigo-300 group-focus:text-indigo-300 transition ease-in-out duration-150" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
											<path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
											<path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
										</svg>
										Settings
									</NavLink>
								</nav>
							</div>
							<div className="flex-shrink-0 flex border-t border-indigo-700 p-4">
								<div className="flex-shrink-0">
									<div className="flex items-center">
										<div>
											<Avatar sizeClasses="h-10 w-10" src={user?.profile?.avatar} />
										</div>
										<div className="ml-3">
											<p className="text-base leading-6 font-medium text-white">{user?.profile?.name ?? <Skeleton width={120} />}</p>
											<button type="button" onClick={logout} className="text-sm leading-5 font-medium text-indigo-300 hover:text-indigo-100 focus:outline-none focus:underline transition ease-in-out duration-150">
												Log Out
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</Transition>
					<div className="flex-shrink-0 w-14" />
				</div>
				<div className="flex flex-col h-screen">
					<nav className="bg-indigo-700 fixed z-20 w-full pt-safe-t pb-4 sm:pt-4">
						<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
							<div className="flex items-center justify-between">
								<button onClick={() => setMobileNavigationOpen(true)} className="flex-shrink-0">
									<a className="flex-shrink-0">
										<Logo className="h-8 w-8" />
									</a>
								</button>
								{authCheck ? (
									<div className="hidden md:block">
										<div className="ml-4 flex items-center md:ml-6">
											<div ref={profileRef} className="ml-3 relative">
												<div>
													<button onClick={() => setProfileNavigationOpen((state) => !state)} className="max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none focus:shadow-solid" id="user-menu" aria-label="User menu" aria-haspopup="true">
														<Avatar sizeClasses="h-8 w-8" src={user?.profile?.avatar} />
													</button>
												</div>
												<Transition show={user && profileNavigationOpen} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
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
										<a className="inline-flex items-center px-4 py-2 border border-indigo-500 text-sm leading-5 font-medium rounded-md text-indigo-300 bg-transparent hover:bg-indigo-500 hover:text-indigo-50 focus:outline-none focus:bg-indigo-300 focus:text-indigo-50 focus:shadow-outline-indigo transition ease-in-out duration-150">Log In</a>
									</Link>
								)}
							</div>
						</div>
					</nav>

					<main className="pt-header sm:pt-16 sm:bg-gray-50">
						<div className="max-w-7xl mx-auto sm:px-6 lg:px-8 h-full">
							<div>{children}</div>
						</div>
					</main>

					{authCheck && (
						<div className="bg-indigo-700 flex items-center justify-around fixed bottom-0 z-20 w-full pb-safe-b">
							<Link href="/home">
								<a className="p-4">
									<svg className="w-6 h-6 text-indigo-300" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
										<path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
									</svg>
								</a>
							</Link>
							<Link href="/search">
								<a className="p-4">
									<svg className="w-6 h-6 text-indigo-300" fill="currentColor" viewBox="0 0 20 20">
										<path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
									</svg>
								</a>
							</Link>
							<Link href="/notifications">
								<a className="p-4 text-indigo-300 relative" aria-label="Notifications">
									<div className="relative">
										<svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
										</svg>
										{notifications && notifications.filter((notification) => notification.unread).length > 0 && <span className="-mr-1.5 -mt-1 absolute top-0 right-0 text-sm">{notifications.filter((notification) => notification.unread).length}</span>}
									</div>
								</a>
							</Link>
							<LoadLink deps={user?.profile} href="/[profile]" as={`/${user?.profile?.handle}`}>
								<a className="group p-4 focus:outline-none">
									<div className="w-6 h-6 rounded-full text-white group-focus:shadow-solid">
										<Avatar sizeClasses="h-6 w-6" src={user?.profile?.avatar} />
									</div>
								</a>
							</LoadLink>
						</div>
					)}
				</div>
			</AlertManager>
		</>
	)
}

export const usePageLayout = () => (page, props = {}) => <PageLayout {...props}>{page}</PageLayout>

export default PageLayout
