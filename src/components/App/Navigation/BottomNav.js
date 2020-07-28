import Link from 'next/link'
import { useRouter } from 'next/router'
import LoadLink from '../LoadLink'
import Avatar from '../Avatar'

const BottomNav = ({ user, notifications }) => {
	const router = useRouter()

	return (
		<div className="sm:hidden bg-white flex items-center justify-around fixed bottom-0 z-20 w-full pb-safe-b" style={{ boxShadow: '0 -3px 6px 0 rgba(0, 0, 0, 0.05)' }}>
			<Link href="/home">
				<a className="p-4">
					<svg className={`w-6 h-6 ${router.pathname === '/home' ? 'text-gray-600' : 'text-gray-400'}`} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
						<path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
					</svg>
				</a>
			</Link>
			<Link href="/search">
				<a className="p-4">
					<svg className={`w-6 h-6 ${router.pathname === '/search' ? 'text-gray-600' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 20 20">
						<path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
					</svg>
				</a>
			</Link>
			<Link href="/notifications">
				<a className={`p-4 ${router.pathname === '/notifications' ? 'text-gray-600' : 'text-gray-400'} relative`} aria-label="Notifications">
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
					<div className={`w-6 h-6 rounded-full text-gray-600 group-focus:shadow-solid ${user?.profile && router.asPath === `/${user?.profile?.handle}` ? 'shadow-solid' : ''}`}>
						<Avatar sizeClasses="h-6 w-6" src={user?.profile?.avatar} />
					</div>
				</a>
			</LoadLink>
		</div>
	)
}

export default BottomNav
