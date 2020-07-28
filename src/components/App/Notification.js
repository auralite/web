import React, { useEffect } from 'react'
import Client from '../../utils/Client'
import { mutate } from 'swr'
import Skeleton from 'react-loading-skeleton'
import Post from './Post'
import { useInView } from 'react-intersection-observer'
import { ReplySolid, AtSolid } from './Icon'

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
	const [ref, inView] = useInView({ threshold: 1, triggerOnce: true })

	useEffect(() => {
		if (!inView || read) return

		Client.markNotificationRead({ id })
	}, [inView])

	const meta = <div className="flex items-center text-gray-400">{children}</div>

	return <Post ref={read ? null : ref} post={post} showParent={false} meta={meta} showOptions={false} />
}

const MentionNotification = ({ post, author, unread, id }) => (
	<NotificationSkeleton post={post} read={!unread} id={id}>
		<AtSolid className="w-4 h-4 mr-2" />
		<span>{author.name} mentioned you</span>
	</NotificationSkeleton>
)

const ReplyNotification = ({ post, author, unread, id }) => (
	<NotificationSkeleton post={post} read={!unread} id={id}>
		<ReplySolid className="w-4 h-4 mr-2" />
		<span>{author.name} replied to you</span>
	</NotificationSkeleton>
)

export default Notification
