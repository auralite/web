import { fromUnixTime, format } from 'date-fns'
import Skeleton from '@/components/App/Skeleton'
import Link from 'next/link'
import Avatar from './Avatar'
import useFormat from '@/hooks/format'
import Client from '@/utils/Client'
import { useState, Fragment, forwardRef, memo } from 'react'
import useClickOutside from '@/hooks/click-outside'
import Transition from '../Global/Transition'
import ImageGrid, { useImageGrid } from './ImageGrid'
import useUser from '@/hooks/user'
import { ChevronDownOutline, TrashOutline } from './Icon'

const Post = forwardRef(({ post, shouldLink = true, isParent = false, showParent = true, meta, featured = false, showOptions = true, onDelete = () => {}, withBorder = true, isSkeleton = false }, ref) => {
	const postContent = useFormat(post?.content)
	const [optionsOpen, setOptionsOpen] = useState(false)
	const { ref: optionsRef, excludeRef } = useClickOutside(() => {
		if (!optionsOpen) return

		setOptionsOpen(false)
	})
	const { user } = useUser(post && showOptions)

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

	const parentClasses = `px-4 ${isParent ? '' : `border-b border-gray-200 dark:border-gray-800 ${withBorder ? '' : 'sm:border-b-0'}`} ${post?.parent ? 'pt-1' : 'pt-5'} pb-5 w-full group`

	return (
		<>
			{!isSkeleton && post?.parent && showParent && <Post post={post?.parent} isParent={true} withBorder={false} />}
			<Wrapper {...(shouldLink ? { href: '/[profile]/posts/[post]', as: `/${post?.author_handle}/posts/${post?.id}`, scroll: false } : { className: parentClasses, ref })}>
				<ChildWrapper {...(shouldLink ? { className: parentClasses + ' cursor-pointer', ref } : {})}>
					<>
						{meta && <div className="mb-2 mt-2">{meta}</div>}
						<div className="flex items-stretch">
							<div className="flex-shrink-0 mr-4">
								<Avatar src={post?.author?.avatar} sizeClasses="w-12 h-12" />
								{isParent && <div className="w-0.5 bg-gray-200 dark:bg-gray-800 mx-auto h-full" />}
							</div>
							<div className="flex flex-col flex-1 min-w-0">
								<div className="flex items-center justify-between">
									<p className="m-0 whitespace-no-wrap overflow-hidden inline-flex">
										<Link href="/[profile]" as={`/${post?.author_handle}`}>
											<a className="inline overflow-ellipsis overflow-hidden space-x-1 text-cool-gray-500">
												<span className="font-bold text-cool-gray-900 dark:text-gray-400">{post?.author?.name ?? <Skeleton width={100} />}</span>
												<span className="text-cool-gray-500 dark:text-gray-500">{post?.author_handle ? `@${post.author_handle}` : <Skeleton width={50} />}</span>
											</a>
										</Link>
										<span className="flex-shrink-0">
											<span className="text-cool-gray-500 dark:text-gray-500 px-1">&middot;</span>
											<span className="text-cool-gray-500 dark:text-gray-500">{post?.created_at ? format(fromUnixTime(post.created_at), 'MMM dd') : <Skeleton width={30} />}</span>
										</span>
									</p>
									{showOptions && post?.author_handle && user?.profile?.handle === post?.author_handle && (
										<div className="relative hidden group-hover:block">
											<button ref={excludeRef} onClick={openDropdown} className="flex items-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark-hover:text-gray-400 focus:outline-none focus:text-gray-600" aria-label="Options" id="options-menu" aria-haspopup="true" aria-expanded="true">
												<ChevronDownOutline className="ml-2 w-4 h-4" />
											</button>
											<Transition show={optionsOpen} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
												<div onClick={(event) => event.stopPropagation()} className="origin-top-right absolute right-0 mt-2 w-56 z-20 rounded-md shadow-lg">
													<div ref={optionsRef} className="rounded-md bg-white shadow-xs">
														<div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
															<button onClick={deletePost} className="flex w-full items-center px-4 py-2 text-sm leading-5 text-red-700 hover:bg-red-50 focus:outline-none focus:bg-red-50" role="menuitem">
																<TrashOutline className="w-4 h-4 mr-2" />
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
									<p className={`text-gray-800 dark:text-gray-400 text-left break-words ${featured ? 'text-lg' : ''}`}>{postContent[0] !== undefined ? postContent : <Skeleton count={3} />}</p>
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

Post.displayName = 'Post'

export default memo(Post)
