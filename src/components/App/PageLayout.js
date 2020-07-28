import { useState, cloneElement, useEffect } from 'react'
import useSWR from 'swr'
import Client from '../../utils/Client'
import Head from '../Global/Head'
import BaseLayout from './BaseLayout'
import SideNav from './Navigation/SideNav'
import BottomNav from './Navigation/BottomNav'
import TopNav from './Navigation/TopNav'
import { authCheck } from '@/middleware/auth'

const PageLayout = ({ children, title, middleware }) => {
	const { data: user } = useSWR(authCheck ? '/api/user' : null, () => Client.user())
	const { data: notifications } = useSWR(authCheck ? '/api/notifications' : null, () => Client.notifications())

	const [mobileNavigationOpen, setMobileNavigationOpen] = useState(false)

	return (
		<BaseLayout middleware={middleware}>
			<Head />
			<SideNav isOpen={mobileNavigationOpen} onClose={() => setMobileNavigationOpen(false)} user={user} />
			<div className="flex flex-col h-screen">
				<TopNav title={title} user={user} openSideNav={() => setMobileNavigationOpen(true)} />

				<main className="pt-header sm:pt-0 pb-footer sm:bg-gray-50">
					<div className="hidden sm:block w-full h-header bg-white" />
					<div className="max-w-7xl mx-auto sm:px-6 lg:px-8 h-full">
						<div>{cloneElement(children, { user })}</div>
					</div>
				</main>

				{authCheck && <BottomNav user={user} notifications={notifications} />}
			</div>
		</BaseLayout>
	)
}

export const usePageLayout = (title) => (page, props = {}) => (
	<PageLayout title={title} {...props}>
		{page}
	</PageLayout>
)

export default PageLayout
