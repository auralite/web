import { useState } from 'react'
import Head from '../Global/Head'
import BaseLayout from '../Global/BaseLayout'
import SideNav from './Navigation/SideNav'
import BottomNav from './Navigation/BottomNav'
import TopNav from './Navigation/TopNav'
import { authCheck } from '@/middleware/auth'

const PageLayout = ({ children, title, middleware }) => {
	const [mobileNavigationOpen, setMobileNavigationOpen] = useState(false)

	return (
		<BaseLayout middleware={middleware}>
			<Head />
			<SideNav isOpen={mobileNavigationOpen} onClose={() => setMobileNavigationOpen(false)} />
			<div className="flex flex-col h-screen">
				<TopNav title={title} openSideNav={() => setMobileNavigationOpen(true)} />

				<main className="pt-header sm:pt-0 pb-footer sm:bg-gray-50 sm:dark:dark-bg sm:dark:bg-transparent h-full">
					<div className="hidden sm:block w-full h-header bg-white" />
					<div className="max-w-7xl mx-auto sm:px-6 lg:px-8 h-full">{children}</div>
				</main>

				{authCheck && <BottomNav />}
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
