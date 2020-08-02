import Transition from '../../Global/Transition'
import Logo from '../../Global/Logo'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Avatar from '../Avatar'
import Skeleton from '../Skeleton'
import { logout } from '@/utils/auth'
import useUser from '@/hooks/user'
import { memo } from 'react'
import { HomeOutline, SearchOutline, BellOutline, UserCircleOutline, CogOutline, HomeSolid, SearchSolid, BellSolid, UserCircleSolid, CogSolid } from '../Icon'
import ClientOnly from '../ClientOnly'
import { ThemeToggle } from '@/components/Global/ThemeManager'

const SideNav = ({ isOpen, onClose }) => {
	const { user } = useUser()

	return (
		<div className="fixed inset-0 flex z-40 pointer-events-none">
			<Transition show={isOpen} enter="transition-opacity ease-linear duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity ease-linear duration-300" leaveFrom="opacity-100" leaveTo="opacity-0">
				<div className="fixed inset-0 pointer-events-auto">
					<button className="absolute inset-0 bg-gray-600 dark:bg-gray-500 opacity-75 focus:outline-none" onClick={onClose} />
				</div>
			</Transition>
			<Transition show={isOpen} enter="transition ease-in-out duration-300 transform" enterFrom="-translate-x-full" enterTo="translate-x-0" leave="transition ease-in-out duration-300 transform" leaveFrom="translate-x-0" leaveTo="-translate-x-full">
				<div className="my-safe-t sm:my-0 relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-gray-900 pointer-events-auto rounded-r-2xl sm:rounded-none shadow-lg sm:shadow-none">
					<div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
						<div className="flex-shrink-0 flex items-center px-4">
							<Avatar sizeClasses="h-8 w-8" src={user?.profile?.avatar} />
							<span className="ml-3 text-gray-800 dark:text-gray-300 font-semibold text-xl">{user?.profile?.name ?? <Skeleton width={120} />}</span>
						</div>
						<nav className="mt-5 px-2 space-y-1">
							<NavLink onClick={onClose} href="/home">
								{(active) => (
									<>
										{active ? <HomeSolid className="mr-4 h-6 w-6 text-gray-500 dark:text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" /> : <HomeOutline className="mr-4 h-6 w-6 text-gray-400 dark:text-gray-500 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" />}
										Home
									</>
								)}
							</NavLink>
							<NavLink onClick={onClose} href="/search">
								{(active) => (
									<>
										{active ? <SearchSolid className="mr-4 h-6 w-6 text-gray-500 dark:text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" /> : <SearchOutline className="mr-4 h-6 w-6 text-gray-400 dark:text-gray-500 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" />}
										Search
									</>
								)}
							</NavLink>
							<NavLink onClick={onClose} href="/notifications">
								{(active) => (
									<>
										{active ? <BellSolid className="mr-4 h-6 w-6 text-gray-500 dark:text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" /> : <BellOutline className="mr-4 h-6 w-6 text-gray-400 dark:text-gray-500 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" />}
										Notifications
									</>
								)}
							</NavLink>
							<NavLink onClick={onClose} href="/[profile]" as={`/${user?.profile?.handle}`}>
								{(active) => (
									<>
										{active ? <UserCircleSolid className="mr-4 h-6 w-6 text-gray-500 dark:text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" /> : <UserCircleOutline className="mr-4 h-6 w-6 text-gray-400 dark:text-gray-500 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" />}
										Profile
									</>
								)}
							</NavLink>
							<NavLink onClick={onClose} href="/settings">
								{(active) => (
									<>
										{active ? <CogSolid className="mr-4 h-6 w-6 text-gray-500 dark:text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" /> : <CogOutline className="mr-4 h-6 w-6 text-gray-400 dark:text-gray-500 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" />}
										Settings
									</>
								)}
							</NavLink>
						</nav>
					</div>
					<div className="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-800 p-4">
						<div className="flex items-center justify-between w-full">
							<span className="font-medium text-gray-800 dark:text-gray-300">Theme</span>
							<ClientOnly>
								<ThemeToggle />
							</ClientOnly>
						</div>
					</div>
					<div className="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-800 p-4">
						<div className="flex-shrink-0">
							<div className="flex items-center">
								<div>
									<Logo className="h-10 w-auto" />
								</div>
								<div className="ml-3">
									<p className="text-base leading-6 font-medium text-gray-700 dark:text-gray-300">
										<span className="relative" style={{ zIndex: 4 }}>
											Auralite
										</span>{' '}
										<span className="bg-indigo-100 dark:bg-gray-700 text-indigo-500 dark:text-indigo-300 font-bold rounded-lg px-2 -mx-2 relative" style={{ zIndex: 3 }}>
											beta ({process.env.commitHash.substring(0, 6)})
										</span>
									</p>
									<button type="button" onClick={logout} className="text-sm leading-5 font-medium text-gray-500 dark:text-gray-600 group-hover:text-gray-700 focus:outline-none focus:underline transition ease-in-out duration-150">
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
			{/* eslint-disable-next-line  */}
			<a onClick={onClick} className={`${router.asPath === (as ?? href) ? 'text-gray-900 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 focus:bg-gray-200' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:text-gray-900 focus:bg-gray-100'} group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md focus:outline-none transition ease-in-out duration-150`}>
				{children(router.asPath === (as ?? href))}
			</a>
		</Link>
	)
}
export default memo(SideNav)
