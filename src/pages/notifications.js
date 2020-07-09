import { usePageLayout } from '../components/App/PageLayout'
import useSWR from 'swr'
import Client from '../utils/Client'
import Notification from '../components/App/Notification'
import useTitle from '../hooks/title'
import withAuth from '../middleware/auth'

const Notifications = () => {
	const setTitle = useTitle('Notifications')
	const { data: notifications } = useSWR('/api/notifications', () => Client.notifications())

	return (
		<>
			{setTitle}
			<div className="max-w-md sm:max-w-3xl relative z-0 sm:mt-4">
				<div className="flex flex-col sm:rounded-lg sm:bg-white sm:shadow">{notifications ? notifications.map((notification, key) => <Notification key={key} {...notification} />) : [...Array(10).keys()].map((key) => <Notification key={key} />)}</div>
			</div>
		</>
	)
}

Notifications.middleware = withAuth()
Notifications.getLayout = usePageLayout('Notifications')

export default Notifications
