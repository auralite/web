import moment from 'moment'
import Skeleton from 'react-loading-skeleton'
import Link from 'next/link'
import Avatar from './Avatar'
import useFormat from '../../hooks/format'
import LoadLink from './LoadLink'

const Post = ({ post, shouldLink = true, showReply = true, small = false, meta }) => {
	const postContent = useFormat(post?.content)

	const Wrapper = shouldLink ? Link : 'div'

	moment.updateLocale('en', {
		relativeTime: {
			future: 'in %s',
			past: '%s ago',
			s: '%ds',
			ss: '%ds',
			m: '%dm',
			mm: '%dm',
			h: '%dh',
			hh: '%dh',
			d: '%dd',
			dd: '%dd',
		},
	})

	return (
		<Wrapper {...(shouldLink ? { href: { query: { postId: post?.id } }, as: `/${post?.author_handle}/posts/${post?.id}`, shallow: true } : { className: 'w-full' })}>
			<div className={`text-left pt-4 ${small ? 'pb-2' : 'pb-4 border-b'} px-2 w-full${shouldLink ? ' cursor-pointer' : ''}`}>
				{meta}
				<div className="flex items-center">
					<LoadLink deps={post?.author_handle} href="/[profile]" as={`/${post?.author_handle}`}>
						<a>
							<Avatar src={post?.author?.avatar} className="mr-2" sizeClasses={small ? 'h-6 w-6' : 'h-10 w-10'} />
						</a>
					</LoadLink>
					<div className="flex-1 flex items-center justify-between whitespace-no-wrap overflow-hidden mr-1">
						<div>
							<LoadLink deps={post?.author_handle} href="/[profile]" as={`/${post?.author_handle}`}>
								<a className="font-bold text-gray-800 mr-2">{post?.author?.name || <Skeleton width={120} />}</a>
							</LoadLink>
							<LoadLink deps={post?.author_handle} href="/[profile]" as={`/${post?.author_handle}`}>
								<a className="text-gray-600">{post?.author_handle ? `@${post.author_handle}` : <Skeleton width={50} />}</a>
							</LoadLink>
						</div>
						<span className="text-gray-400">{post?.created_at ? moment.unix(post.created_at).fromNow(true) : <Skeleton width={25} />}</span>
					</div>
				</div>
				<div className="mt-3 leading-normal text-lg">{postContent[0] ? postContent : <Skeleton count={3} />}</div>
				{post?.reply_to && showReply && (
					<div className="mt-1 border rounded-lg">
						<Post post={post?.parent} small={true} showReply={false} />
					</div>
				)}
			</div>
		</Wrapper>
	)
}

export default Post
