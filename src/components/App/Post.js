import moment from 'moment'
import Skeleton from 'react-loading-skeleton'
import Link from 'next/link'
import Avatar from './Avatar'
import useFormat from '../../hooks/format'
import useSWR from 'swr'
import Client from '../../utils/Client'
import { useState, Fragment, useRef, forwardRef, useEffect, useMemo } from 'react'
import useClickOutside from '../../hooks/click-outside'
import Transition from '../Global/Transition'
import ImageGrid, { useImageGrid } from './ImageGrid'

const Post = forwardRef(({ post, shouldLink = true, showReply = true, isParent = false, meta, featured = false, showOptions = true, onDelete = () => {}, parentReply = () => {}, withBorder = true, isSkeleton = false }, ref) => {
	const postContent = useFormat(post?.content)
	const [optionsOpen, setOptionsOpen] = useState(false)
	const parentRef = useRef(null)
	useEffect(() => {
		parentReply(parentRef)
	})
	const { ref: optionsRef, excludeRef } = useClickOutside(() => {
		if (!optionsOpen) return

		setOptionsOpen(false)
	})
	const { data: user } = useSWR(post && showOptions ? '/api/user' : null, () => Client.user())

	const Wrapper = shouldLink ? Link : 'div'
	const ChildWrapper = shouldLink ? 'div' : Fragment

	const openDropdown = (event) => {
		event.stopPropagation()

		setOptionsOpen((state) => !state)
	}

	const deletePost = () => {
		Client.deletePost({ postId: post.id })
			.catch(() => alert('Something went wrong when deleting your post.'))
			.then(() => onDelete(post))
	}

	const gridSettings = useImageGrid(post?.media, true)

	const parentClasses = `px-4 ${isParent ? '' : `border-b border-gray-200 ${withBorder ? '' : 'sm:border-b-0'}`} ${showReply && post?.parent ? 'pt-1' : 'pt-5'} pb-5 w-full group`

	return (
		<>
			{!isSkeleton && showReply && post?.parent && <Post ref={parentRef} post={post?.parent} isParent={true} withBorder={false} showReply={false} />}
			<Wrapper {...(shouldLink ? { href: '/[profile]/posts/[post]', as: `/${post?.author_handle}/posts/${post?.id}`, scroll: true } : { className: parentClasses, ref })}>
				<ChildWrapper {...(shouldLink ? { className: parentClasses + ' cursor-pointer', ref } : {})}>
					<>
						{meta && <div className="mb-2 -mt-2">{meta}</div>}
						<div className="flex items-stretch">
							<div className="flex-shrink-0 mr-4">
								<Avatar src={post?.author?.avatar} sizeClasses="w-12 h-12" />
								{isParent && <div className="w-0.5 bg-gray-200 mx-auto h-full" />}
							</div>
							<div className="flex-1 overflow-hidden flex flex-col">
								<div className="flex items-center justify-between">
									<p className="m-0 whitespace-no-wrap overflow-hidden inline-flex space-x-1">
										<Link href="/[profile]" as={`/${post?.author_handle}`}>
											<a className="inline overflow-ellipsis overflow-hidden min-w-0 space-x-1">
												<span className="font-bold text-gray-900">{post?.author?.name ?? <Skeleton width={100} />}</span>
												<span className="overflow-ellipsis text-gray-600 overflow-hidden min-w-0">{post?.author_handle ? `@${post.author_handle}` : <Skeleton width={50} />}</span>
											</a>
										</Link>
										<span className="text-gray-600">&middot;</span>
										<span className="text-gray-600">{post?.created_at ? moment.unix(post.created_at).format('MMM D') : <Skeleton width={30} />}</span>
									</p>
									{showOptions && post?.author_handle && user?.profile?.handle === post?.author_handle && (
										<div className="relative hidden group-hover:block">
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
								</div>
								<div className="mt-1">
									<p className={`text-gray-800 text-left break-words ${featured ? 'text-lg' : ''}`}>{postContent[0] !== undefined ? postContent : <Skeleton count={3} />}</p>
									{post?.media?.length > 0 && (
										<div className="mt-2">
											<ImageGrid {...gridSettings} />
										</div>
									)}
								</div>
							</div>
						</div>
					</>
				</ChildWrapper>
			</Wrapper>
		</>
	)
})

export default Post
