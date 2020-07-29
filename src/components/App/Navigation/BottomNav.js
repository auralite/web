import Link from 'next/link'
import { useRouter } from 'next/router'
import Avatar from '../Avatar'
import { HomeOutline, SearchOutline, BellOutline, HomeSolid, SearchSolid, BellSolid } from '../Icon'
import useUser from '@/hooks/user'
import useNotifications from '@/hooks/notifications'
import { memo } from 'react'

const BottomNav = () => {
	const { user } = useUser()
	const { notifications } = useNotifications()

	return (
		<footer className="sm:hidden bg-white dark:bg-gray-900 flex fixed bottom-0 z-20 w-full pb-safe-b shadow-footer dark:shadow-footer-dark">
			<NavLink href="/home">{(isActive) => (isActive ? <HomeSolid className="w-6 h-6 text-gray-600 dark:text-gray-400" /> : <HomeOutline className="w-6 h-6 text-gray-400 dark:text-gray-600" />)}</NavLink>
			<NavLink href="/search">{(isActive) => (isActive ? <SearchSolid className="w-6 h-6 text-gray-600 dark:text-gray-400" /> : <SearchOutline className="w-6 h-6 text-gray-400 dark:text-gray-600" />)}</NavLink>
			<NavLink href="/notifications">
				{(isActive) => (
					<div className={`relative ${isActive ? 'text-gray-600 dark:text-gray-400' : 'text-gray-400 dark:text-gray-600'}`}>
						{isActive ? <BellSolid className="w-6 h-6" /> : <BellOutline className="w-6 h-6" />}
						{notifications && notifications.filter((notification) => notification.unread).length > 0 && <span className="-mr-1.5 -mt-1 absolute top-0 right-0 text-sm">{notifications.filter((notification) => notification.unread).length}</span>}
					</div>
				)}
			</NavLink>
			<NavLink href="/[profile]" as={`/${user?.profile?.handle}`} className="group focus:outline-none">
				{(isActive) => (
					<div className={`w-6 h-6 rounded-full text-gray-600 dark:text-gray-400 group-focus:shadow-solid ${isActive ? 'shadow-solid' : ''}`}>
						<Avatar sizeClasses="h-6 w-6" src={user?.profile?.avatar} />
					</div>
				)}
			</NavLink>
		</footer>
	)
}

const NavLink = ({ children, className = '', ...props }) => {
	const router = useRouter()

	const isActive = props.as ? router.asPath === props.as : router.pathname === props.href

	return (
		<Link {...props}>
			<a className={`flex items-center justify-center w-1/4 py-3 ${className}`}>{children(isActive)}</a>
		</Link>
	)
}

export default memo(BottomNav)
