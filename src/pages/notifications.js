import { usePageLayout } from '../components/App/PageLayout'
import useSWR from 'swr'
import Client from '../utils/Client'
import Notification from '../components/App/Notification'
import useTitle from '../hooks/title'

const Notifications = () => {
	const setTitle = useTitle('Notifications')
	const { data: notifications } = useSWR('/api/notifications', () => Client.notifications())

	return (
		<>
			{setTitle}
			<div className="max-w-md sm:max-w-full border-l border-r relative z-0">
				<div className="flex flex-col">{notifications ? notifications.map((notification, key) => <Notification key={key} {...notification} />) : [...Array(10).keys()].map((key) => <Notification key={key} />)}</div>
			</div>
		</>
	)
}

Notifications.getLayout = usePageLayout()

export default Notifications
