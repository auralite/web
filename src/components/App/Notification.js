import React from 'react'
import Client from '../../utils/Client'
import { mutate } from 'swr'
import Skeleton from 'react-loading-skeleton'
import Post from './Post'

const Notification = ({ type, ...notification }) => {
	switch (type) {
		case 'mention':
			return <MentionNotification {...notification} />

		case 'reply':
			return <ReplyNotification {...notification} />

		case undefined:
			return <LoadingNotification />

		default:
			throw 'Unknown notification type'
	}
}

const LoadingNotification = () => (
	<button>
		<Post
			showReply={false}
			meta={
				<div className="flex items-center text-gray-400">
					<Skeleton width={250} />
				</div>
			}
		/>
	</button>
)

const NotificationSkeleton = ({ post, read, children, id }) => {
	const markRead = () => {
		if (read) return

		Client.markNotificationRead({ id })

		mutate('/api/notifications', (notifications) => notifications.filter((notification) => notification.id !== id))
	}

	const meta = <div className="flex items-center text-gray-400">{children}</div>

	return (
		<button onClick={markRead}>
			<Post post={post} showReply={false} meta={meta} />
		</button>
	)
}

const MentionNotification = ({ post, author, unread, id }) => (
	<NotificationSkeleton post={post} read={!unread} id={id}>
		<svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
			<path fillRule="evenodd" d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z" clipRule="evenodd" />
		</svg>
		<span>{author.name} mentioned you</span>
	</NotificationSkeleton>
)

const ReplyNotification = ({ post, author, unread, id }) => (
	<NotificationSkeleton post={post} read={!unread} id={id}>
		<svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
			<path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
		</svg>
		<span>{author.name} replied to you</span>
	</NotificationSkeleton>
)

export default Notification
