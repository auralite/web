import Link from 'next/link'
import { useRouter } from 'next/router'
import Avatar from '../Avatar'
import { HomeOutline, SearchOutline, BellOutline, HomeSolid, SearchSolid, BellSolid } from '../Icon'
import useUser from '@/hooks/user'
import useNotifications from '@/hooks/notifications'

const BottomNav = () => {
	const { user } = useUser()
	const { notifications } = useNotifications()

	return (
		<footer className="sm:hidden bg-white flex fixed bottom-0 z-20 w-full pb-safe-b" style={{ boxShadow: '0 -3px 6px 0 rgba(0, 0, 0, 0.05)' }}>
			<NavLink href="/home">{(isActive) => (isActive ? <HomeSolid className="w-7 h-7 text-gray-600" /> : <HomeOutline className="w-7 h-7 text-gray-400" />)}</NavLink>
			<NavLink href="/search">{(isActive) => (isActive ? <SearchSolid className="w-7 h-7 text-gray-600" /> : <SearchOutline className="w-7 h-7 text-gray-400" />)}</NavLink>
			<NavLink href="/notifications">
				{(isActive) => (
					<div className={`relative ${isActive ? 'text-gray-600' : 'text-gray-400'}`}>
						{isActive ? <BellSolid className="w-7 h-7" /> : <BellOutline className="w-7 h-7" />}
						{notifications && notifications.filter((notification) => notification.unread).length > 0 && <span className="-mr-1.5 -mt-1 absolute top-0 right-0 text-sm">{notifications.filter((notification) => notification.unread).length}</span>}
					</div>
				)}
			</NavLink>
			<NavLink href="/[profile]" as={`/${user?.profile?.handle}`} className="group focus:outline-none">
				{(isActive) => (
					<div className={`w-7 h-7 rounded-full text-gray-600 group-focus:shadow-solid ${isActive ? 'shadow-solid' : ''}`}>
						<Avatar sizeClasses="h-7 w-7" src={user?.profile?.avatar} />
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

export default BottomNav
