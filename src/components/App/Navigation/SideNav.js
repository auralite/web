import Transition from '../../Global/Transition'
import Logo from '../../Global/Logo'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Avatar from '../Avatar'
import Skeleton from 'react-loading-skeleton'
import { logout } from '@/utils/auth'
import useUser from '@/hooks/user'
import { memo } from 'react'

const SideNav = ({ isOpen, onClose }) => {
	const { user } = useUser()

	return (
		<div className="fixed inset-0 flex z-40 pointer-events-none">
			<Transition show={isOpen} enter="transition-opacity ease-linear duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity ease-linear duration-300" leaveFrom="opacity-100" leaveTo="opacity-0">
				<div className="fixed inset-0 pointer-events-auto">
					<div className="absolute inset-0 bg-gray-600 opacity-75" onClick={onClose} />
				</div>
			</Transition>
			<Transition show={isOpen} enter="transition ease-in-out duration-300 transform" enterFrom="-translate-x-full" enterTo="translate-x-0" leave="transition ease-in-out duration-300 transform" leaveFrom="translate-x-0" leaveTo="-translate-x-full">
				<div className="my-safe-t sm:my-0 relative flex-1 flex flex-col max-w-xs w-full bg-white pointer-events-auto rounded-r-2xl sm:rounded-none shadow-lg sm:shadow-none">
					<div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
						<div className="flex-shrink-0 flex items-center px-4">
							<Logo className="h-8 w-auto" />
							<span className="ml-3 text-gray-800 font-semibold text-xl">Auralite</span>
						</div>
						<nav className="mt-5 px-2 space-y-1">
							<NavLink onClick={onClose} href="/home">
								{(active) => (
									<>
										<svg className={`mr-4 h-6 w-6 ${active ? 'text-gray-500' : 'text-gray-400'} group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
										</svg>
										Home
									</>
								)}
							</NavLink>
							<NavLink onClick={onClose} href="/search">
								{(active) => (
									<>
										<svg className={`mr-4 h-6 w-6 ${active ? 'text-gray-500' : 'text-gray-400'} group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150`} fill="currentColor" viewBox="0 0 20 20">
											<path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
										</svg>
										Search
									</>
								)}
							</NavLink>
							<NavLink onClick={onClose} href="/notifications">
								{(active) => (
									<>
										<svg className={`mr-4 h-6 w-6 ${active ? 'text-gray-500' : 'text-gray-400'} group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150`} stroke="currentColor" fill="none" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
										</svg>
										Notifications
									</>
								)}
							</NavLink>
							<NavLink onClick={onClose} href="/[profile]" as={`/${user?.profile?.handle}`}>
								{(active) => (
									<>
										<svg className={`mr-4 h-6 w-6 ${active ? 'text-gray-500' : 'text-gray-400'} group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150`} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
											<path d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
										</svg>
										Profile
									</>
								)}
							</NavLink>
							<NavLink onClick={onClose} href="/settings">
								{(active) => (
									<>
										<svg className={`mr-4 h-6 w-6 ${active ? 'text-gray-500' : 'text-gray-400'} group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150`} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
											<path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
											<path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
										</svg>
										Settings
									</>
								)}
							</NavLink>
						</nav>
					</div>
					<div className="flex-shrink-0 flex border-t border-gray-200 p-4">
						<div className="flex-shrink-0">
							<div className="flex items-center">
								<div>
									<Avatar sizeClasses="h-10 w-10" src={user?.profile?.avatar} />
								</div>
								<div className="ml-3">
									<p className="text-base leading-6 font-medium text-gray-700">{user?.profile?.name ?? <Skeleton width={120} />}</p>
									<button type="button" onClick={logout} className="text-sm leading-5 font-medium text-gray-500 group-hover:text-gray-700 focus:outline-none focus:underline transition ease-in-out duration-150">
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
	)
}

const NavLink = ({ children, href, as, onClick, ...props }) => {
	const router = useRouter()

	return (
		<Link href={href} as={as} {...props}>
			<a onClick={onClick} className={`${router.asPath === (as ?? href) ? 'text-gray-900 bg-gray-100 focus:bg-gray-200' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:text-gray-900 focus:bg-gray-100'} group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md focus:outline-none transition ease-in-out duration-150`}>
				{children(router.asPath === (as ?? href))}
			</a>
		</Link>
	)
}

export default memo(SideNav)
