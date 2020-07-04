import moment from 'moment'
import Skeleton from 'react-loading-skeleton'
import Link from 'next/link'
import Avatar from './Avatar'
import useFormat from '../../hooks/format'
import LoadLink from './LoadLink'
import useSWR from 'swr'
import Client from '../../utils/Client'
import { useState } from 'react'
import useClickOutside from '../../hooks/click-outside'
import Transition from '../Global/Transition'

const Post = ({ post, shouldLink = true, showReply = true, small = false, meta, showOptions = true, onDelete = () => {} }) => {
	const postContent = useFormat(post?.content)
	const [optionsOpen, setOptionsOpen] = useState(false)
	const { ref: optionsRef, excludeRef } = useClickOutside(() => {
		if (!optionsOpen) return

		setOptionsOpen(false)
	})
	const { data: user } = useSWR(post && showOptions ? '/api/user' : null, () => Client.user())

	const Wrapper = shouldLink ? Link : 'div'

	const openDropdown = (event) => {
		event.stopPropagation()

		setOptionsOpen((state) => !state)
	}

	const deletePost = () => {
		Client.deletePost({ postId: post.id })
			.catch(() => alert('Something went wrong when deleting your post.'))
			.then(() => onDelete(post))
	}

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
		<Wrapper {...(shouldLink ? { href: '/[profile]/posts/[post]', as: `/${post?.author_handle}/posts/${post?.id}` } : { className: 'w-full' })}>
			<div className={`text-left pt-4 ${small ? 'pb-2' : 'pb-4 border-t'} px-6 w-full${shouldLink ? ' cursor-pointer' : ''}`}>
				{meta}
				<div className="flex items-center">
					<LoadLink deps={post?.author_handle} href="/[profile]" as={`/${post?.author_handle}`}>
						<a>
							<Avatar src={post?.author?.avatar} className="mr-2" sizeClasses={small ? 'h-6 w-6' : 'h-10 w-10'} />
						</a>
					</LoadLink>
					<div className="flex-1 flex items-center justify-between mr-1">
						<div>
							<LoadLink deps={post?.author_handle} href="/[profile]" as={`/${post?.author_handle}`}>
								<a className="font-bold text-gray-800 mr-2">{post?.author?.name || <Skeleton width={120} />}</a>
							</LoadLink>
							<LoadLink deps={post?.author_handle} href="/[profile]" as={`/${post?.author_handle}`}>
								<a className="text-gray-600">{post?.author_handle ? `@${post.author_handle}` : <Skeleton width={50} />}</a>
							</LoadLink>
						</div>
						<span className="flex items-center text-gray-400">
							<span>{post?.created_at ? moment.unix(post.created_at).fromNow(true) : <Skeleton width={25} />}</span>
							{post?.privacy === 'users' && (
								<div title="Only Auralite users can see this post">
									<svg className="ml-2 w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
										<path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
									</svg>
								</div>
							)}
							{showOptions && post?.author_handle && user?.profile?.handle === post?.author_handle && (
								<div className="relative inline-block text-left">
									<button ref={excludeRef} onClick={openDropdown} className="flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600" aria-label="Options" id="options-menu" aria-haspopup="true" aria-expanded="true">
										<svg className="ml-2 w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
											<path d="M19 9l-7 7-7-7" />
										</svg>
									</button>
									<Transition show={optionsOpen} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
										<div onClick={(event) => event.stopPropagation()} className="origin-top-right absolute right-0 mt-2 w-56 z-20 rounded-md shadow-lg">
											<div ref={optionsRef} className="rounded-md bg-white shadow-xs">
												<div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
													<button onClick={deletePost} className="flex w-full items-center px-4 py-2 text-sm leading-5 text-red-700 hover:bg-red-50 focus:outline-none focus:bg-red-50" role="menuitem">
														<svg className="w-4 h-4 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
															<path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
														</svg>
														<span>Delete Post</span>
													</button>
												</div>
											</div>
										</div>
									</Transition>
								</div>
							)}
						</span>
					</div>
				</div>
				<div className="mt-3 leading-normal text-lg">{postContent[0] !== undefined ? postContent : <Skeleton count={3} />}</div>
				{post?.parent && showReply && (
					<div className="mt-1 border rounded-lg">
						<Post post={post?.parent} small={true} showReply={false} showOptions={false} />
					</div>
				)}
			</div>
		</Wrapper>
	)
}

export default Post
