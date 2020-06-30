import { useState } from 'react'
import useSWR from 'swr'
import Client from '../../utils/Client'
import useClickOutside from '../../hooks/click-outside'
import Link from 'next/link'
import Logo from '../Global/Logo'
import Transition from '../Global/Transition'
import Notification from './Notification'
import Head from 'next/head'

const PageLayout = ({ children, title }) => {
	const { data: user } = useSWR('/api/user', () => Client.user())
	const { data: notifications } = useSWR('/api/notifications', () => Client.notifications())
	const [notificationsOpen, setNotificationsOpen] = useState(false)
	const [navigationOpen, setNavigationOpen] = useState(false)
	const profileRef = useClickOutside(() => setNavigationOpen(false))
	const notificationRef = useClickOutside(() => setNotificationsOpen(false))

	return (
		<>
			<Head>
				<title>{title ? `${title} - ` : ''}Auralite</title>
				<meta name="description" content="A social network for the future" />
				<meta name="og:type" content="website" />
				<meta name="og:url" content="https://auralite.io/" />
				<meta name="og:title" content="Auralite" />
				<meta name="og:description" content="A social network for the future" />
				<meta name="og:image" content="https://auralite.io/img/card.jpg" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@goauralite" />
				<meta name="twitter:title" content="Auralite" />
				<meta name="twitter:description" content="A social network for the future." />
				<meta name="twitter:image" content="https://auralite.io/img/card.jpg" />
				<meta name="twitter:creator" content="@m1guelpf" />
				<link rel="stylesheet" href="/css/app.css" />
				<link rel="apple-touch-icon" sizes="180x180" href="/img/icons/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/img/icons/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/img/icons/favicon-16x16.png" />
				<link rel="manifest" href="/img/icons/site.webmanifest" />
				<link rel="mask-icon" href="/img/icons/safari-pinned-tab.svg" color="#6875f5" />
				<link rel="shortcut icon" href="/img/icons/favicon.ico" />
				<meta name="msapplication-TileColor" content="#603cba" />
				<meta name="msapplication-config" content="/img/icons/browserconfig.xml" />
				<meta name="theme-color" content="#6875f5" />
			</Head>
			<div>
				<nav className="bg-indigo-700">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="flex items-center justify-between h-16">
							<Link href={'/posts'}>
								<a className="flex-shrink-0">
									<Logo className="h-8 w-8" />
								</a>
							</Link>
							<div className="hidden md:block">
								<div className="ml-4 flex items-center md:ml-6">
									<button onClick={() => setNotificationsOpen((state) => !state)} className="p-1 pr-2.5 border-2 border-transparent text-indigo-300 rounded-full hover:text-white relative" aria-label="Notifications">
										<svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
										</svg>
										{notifications && notifications.filter((notification) => notification.unread).length > 0 && <span className="mr-1 absolute top-0 right-0 text-sm">{notifications.filter((notification) => notification.unread).length}</span>}
									</button>

									{user && (
										<div ref={profileRef} className="ml-3 relative">
											<div>
												<button onClick={() => setNavigationOpen((state) => !state)} className="max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none focus:shadow-solid" id="user-menu" aria-label="User menu" aria-haspopup="true">
													<img className="h-8 w-8 rounded-full" src={user.profile.avatar} alt="" />
												</button>
											</div>
											<Transition show={navigationOpen} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
												<div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg z-10">
													<div className="py-1 rounded-md bg-white shadow-xs" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
														<Link href="/[profile]" as={`/${user.profile.handle}`}>
															<a className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
																Your Profile
															</a>
														</Link>
														<button onClick={() => alert('lol nope')} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
															Settings
														</button>
														<Link href="/logout">
															<a className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
																Sign out
															</a>
														</Link>
													</div>
												</div>
											</Transition>
										</div>
									)}
								</div>
							</div>
							<div className="flex md:hidden">
								<button onClick={() => setNotificationsOpen((state) => !state)} className="p-1 pr-2.5 mr-1 border-2 border-transparent text-indigo-300 rounded-full hover:text-white relative" aria-label="Notifications">
									<svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
									</svg>
									{notifications && notifications.filter((notification) => notification.unread).length > 0 && <span className="mr-1 absolute top-0 right-0 text-sm">{notifications.filter((notification) => notification.unread).length}</span>}
								</button>
								{user && (
									<button onClick={() => setNavigationOpen((state) => !state)} className="w-8 h-8 max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none focus:shadow-solid" id="user-menu" aria-label="User menu" aria-haspopup="true">
										<img className="h-8 w-8 rounded-full" src={user.profile.avatar} alt="" />
									</button>
								)}
							</div>
						</div>
					</div>

					<div className="fixed inset-0 overflow-hidden pointer-events-none z-40">
						<div ref={notificationRef} className="absolute inset-0 overflow-hidden">
							<Transition show={notificationsOpen} enter="ease-in-out duration-500" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in-out duration-500" leaveFrom="opacity-100" leaveTo="opacity-0">
								<div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
							</Transition>
							<section className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
								<Transition show={notificationsOpen} enter="transform transition ease-in-out duration-500 sm:duration-700" enterFrom="translate-x-full" enterTo="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leaveFrom="translate-x-0" leaveTo="translate-x-full">
									<div className="relative w-screen max-w-md pointer-events-auto">
										<div className="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
											<button onClick={() => setNotificationsOpen(false)} aria-label="Close panel" className="text-gray-300 hover:text-white transition ease-in-out duration-150">
												<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
												</svg>
											</button>
										</div>
										<div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
											<header className="space-y-1 py-6 px-4 bg-indigo-700 sm:px-6">
												<div className="flex items-center justify-between space-x-3">
													<h2 className="text-lg leading-7 font-medium text-white">Notifications</h2>
												</div>
											</header>
											<div className="relative flex-1">{notifications ? notifications.map((notification, key) => <Notification key={key} {...notification} />) : <span>Loading notifications...</span>}</div>
										</div>
									</div>
								</Transition>
							</section>
						</div>
					</div>

					{navigationOpen && (
						<div className="md:hidden">
							<div className="pt-2 pb-3">
								{user && (
									<div className="flex items-center px-5">
										<div className="flex-shrink-0">
											<img className="h-10 w-10 rounded-full" src={user.profile.avatar} alt="" />
										</div>
										<div className="ml-3">
											<div className="text-base font-medium leading-none text-white">{user.profile.name}</div>
											<div className="mt-1 text-sm font-medium leading-none text-indigo-300">@{user.profile.handle}</div>
										</div>
									</div>
								)}
								<div className="mt-3 px-2">
									{user && (
										<Link href="/[profile]" as={`/${user.profile.handle}`}>
											<a className="block px-3 py-2 rounded-md text-base font-medium text-indigo-300 hover:text-white hover:bg-indigo-600 focus:outline-none focus:text-white focus:bg-indigo-600">Your Profile</a>
										</Link>
									)}
									<button onClick={() => alert('lol nope')} className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-indigo-300 hover:text-white hover:bg-indigo-600 focus:outline-none focus:text-white focus:bg-indigo-600">
										Settings
									</button>
									<Link href="/logout">
										<a className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-indigo-300 hover:text-white hover:bg-indigo-600 focus:outline-none focus:text-white focus:bg-indigo-600">Sign out</a>
									</Link>
								</div>
							</div>
						</div>
					)}
				</nav>

				<main>
					<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
						<div>{children}</div>
					</div>
				</main>
			</div>
		</>
	)
}

export default PageLayout
