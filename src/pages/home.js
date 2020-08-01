import { usePageLayout } from '../components/App/PageLayout'
import { useSWRInfinite } from 'swr'
import Client from '../utils/Client'
import Compose from '../components/App/Compose'
import Post from '../components/App/Post'
import { useTitle } from '../hooks/meta'
import withAuth from '../middleware/auth'
import { useEffect, useCallback, useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useInView } from 'react-intersection-observer'
import useUser from '@/hooks/user'
import { SearchOutline, SparklesOutline, SparklesSolid } from '@/components/App/Icon'
import { Portal } from 'react-portal'
import ClientOnly from '@/components/App/ClientOnly'
import useStickyState from '@/hooks/sticky'
import { ZERO_TAGLINES } from '@/utils/constants'
import { random } from '@/utils/arr'

const Home = () => {
	const router = useRouter()
	const { user } = useUser()

	const setTitle = useTitle('Home', user?.profile?.timeline_feed && <link rel="alternate" type="application/rss+xml" title="Auralite Timeline" href={user.profile.timeline_feed} />)

	const [showRead, setShowRead] = useStickyState(false, 'oldFeed')

	const { data: posts, error, isLoading, loadMore, isEnd, refresh } = useTimeline(showRead)

	const [$timelineEnd, onEnd] = useInView({ threshold: 1 })

	useEffect(() => {
		if (!onEnd) return

		loadMore()
	}, [onEnd])

	const removeFromTimeline = () => refresh()
	const zeroTagline = useMemo(() => random(ZERO_TAGLINES), [ZERO_TAGLINES])

	return (
		<>
			{setTitle}
			<ClientOnly>
				<Portal node={typeof document != 'undefined' && document.getElementById('header-portal')}>
					<button onClick={() => setShowRead((state) => !state)} className="focus:outline-none rounded-full p-1 focus:shadow-outline">
						{showRead ? <SparklesOutline className="w-6 h-6 text-indigo-500" /> : <SparklesSolid className="w-6 h-6 text-indigo-500" />}
					</button>
				</Portal>
			</ClientOnly>
			<div className="sm:flex sm:items-start sm:justify-between sm:space-x-8">
				<div className="flex-1 max-w-md sm:max-w-3xl relative z-0 mt-4">
					<Compose onPost={removeFromTimeline} />
					<div className="bg-white dark:bg-gray-900 sm:rounded-lg sm:shadow mb-4">{!error && posts?.flat(1)?.map((post) => <Post key={post.id} post={post} onDelete={() => refresh()} shouldTrack={!showRead} />)}</div>
					{isLoading && (
						<div className="bg-white dark:bg-gray-900 sm:rounded-lg sm:shadow mb-4">
							{[...Array(10).keys()].map((key) => (
								<Post key={`loading-${key}`} isSkeleton={true} />
							))}
						</div>
					)}
					{isEnd ? (
						<div className="text-center flex flex-col items-center justify-center pb-6 dark:text-gray-300">
							<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" className="heroicon-award heroicon heroicons-lg">
								<path className="text-indigo-400 fill-current" d="M30.42 61.96a6.07 6.07 0 0 0 1.54 1.95L26.18 85.5l9.8-5.66 5.65 9.8 5.65-21.07c.6.28 1.26.46 1.93.54l-6.9 25.7-7.06-12.24L23 89.64l7.42-27.68zM51.03 70l.27-.98c.5-.1.98-.26 1.43-.47h-.01l5.64 21.08 5.66-9.8 9.8 5.66-5.79-21.6a6.05 6.05 0 0 0 1.55-1.94L77 89.64l-12.25-7.07-7.07 12.25-6.65-24.8z" />
								<path className="fill-current text-indigo-500" d="M45.96 67.71l.16.14a5.31 5.31 0 0 0 .26.2l-5.09 19-4.95-8.58-8.57 4.95 5.06-18.9a6.18 6.18 0 0 0 4.1.87l.21-.04c2.73-.44 6.68.62 8.82 2.36zM58.7 87.05l-5.09-19 .27-.2.16-.14a12.72 12.72 0 0 1 8.82-2.36l.2.04c1.4.22 2.87-.13 4.1-.86l5.07 18.9-8.58-4.96-4.95 8.58z" />
								<path className="fill-current text-indigo-400" d="M43.56 57.09a22.98 22.98 0 0 1-9.8-5.8l-.05-.05a22.98 22.98 0 0 1-5.8-9.8l-.26-.97a23.06 23.06 0 0 1 0-10.94l.26-.97a23.05 23.05 0 0 1 15.65-15.65l.96-.25a23.05 23.05 0 0 1 10.95 0l.96.25a23.05 23.05 0 0 1 15.65 15.65l.26.97a23.06 23.06 0 0 1 0 10.94l-.26.97a22.98 22.98 0 0 1-5.8 9.8l-.05.05a22.98 22.98 0 0 1-9.8 5.8l-.96.26a23.06 23.06 0 0 1-10.95 0l-.96-.26z" />
								<path
									className="fill-current text-indigo-500"
									d="M47.38 66.3l-.16-.14a13.2 13.2 0 0 0-4.45-2.24l1.5-5.6a24.06 24.06 0 0 0 11.46 0l1.5 5.6a13.2 13.2 0 0 0-4.45 2.24l-.17.13a4.42 4.42 0 0 1-5.23 0zm-4.08-8.25l-1.5 5.61a13.2 13.2 0 0 0-4.98-.28l-.2.03a4.42 4.42 0 0 1-4.53-2.62l-.08-.2a13.2 13.2 0 0 0-2.73-4.16l4.1-4.11a23.97 23.97 0 0 0 9.92 5.73zm13.4 0a23.97 23.97 0 0 0 9.91-5.73l4.1 4.1a13.2 13.2 0 0 0-2.73 4.18l-.07.2a4.42 4.42 0 0 1-4.53 2.6l-.2-.02a13.2 13.2 0 0 0-4.98.28l-1.5-5.6zm10.62-6.44a23.97 23.97 0 0 0 5.73-9.92l5.6 1.5a13.2 13.2 0 0 0-.28 4.98l.04.21a4.42 4.42 0 0 1-2.62 4.53l-.2.08a13.2 13.2 0 0 0-4.16 2.73l-4.11-4.1zm5.99-10.88a24.06 24.06 0 0 0 0-11.46l5.6-1.5a13.2 13.2 0 0 0 2.25 4.45l.13.16a4.42 4.42 0 0 1 0 5.24l-.13.16a13.2 13.2 0 0 0-2.24 4.45l-5.61-1.5zm-.26-12.43a23.97 23.97 0 0 0-5.73-9.91l4.1-4.11A13.2 13.2 0 0 0 75.6 17l.2.08c1.7.64 2.9 2.74 2.62 4.53l-.04.2a13.2 13.2 0 0 0 .29 4.98l-5.6 1.5zm-6.44-10.62a23.97 23.97 0 0 0-9.92-5.73l1.5-5.61c1.72.4 3.48.53 4.98.28l.2-.03a4.42 4.42 0 0 1 4.54 2.62l.07.2a13.2 13.2 0 0 0 2.74 4.16l-4.1 4.1zm-10.88-6a24.06 24.06 0 0 0-11.46 0l-1.5-5.6a13.2 13.2 0 0 0 4.45-2.24l.16-.13a4.42 4.42 0 0 1 5.23 0l.17.13a13.2 13.2 0 0 0 4.45 2.24l-1.5 5.6zm-12.43.27a23.97 23.97 0 0 0-9.91 5.73l-4.11-4.11A13.2 13.2 0 0 0 32 9.4l.08-.2a4.42 4.42 0 0 1 4.53-2.61l.2.03c1.5.25 3.27.12 4.98-.28l1.5 5.6zm-10.62 6.44a23.97 23.97 0 0 0-5.73 9.91l-5.61-1.5c.4-1.71.52-3.47.28-4.97l-.03-.21a4.42 4.42 0 0 1 2.62-4.53l.2-.08a13.2 13.2 0 0 0 4.16-2.73l4.1 4.1zm-6 10.88a24.06 24.06 0 0 0 0 11.46l-5.6 1.5a13.2 13.2 0 0 0-2.24-4.45l-.13-.16a4.42 4.42 0 0 1 0-5.24l.13-.16a13.2 13.2 0 0 0 2.24-4.45l5.6 1.5zm.27 12.42a23.98 23.98 0 0 0 5.73 9.92l-4.11 4.11A13.2 13.2 0 0 0 24.4 53l-.2-.08a4.42 4.42 0 0 1-2.61-4.53l.03-.2c.24-1.5.12-3.27-.28-4.98l5.6-1.5z"
								/>
								<path
									className="fill-current text-indigo-900"
									fillRule="nonzero"
									d="M70.94 59.31l9.24 34.48-14.7-8.49L57 100l-7-26.12L43 100 34.5 85.3l-14.7 8.49 9.25-34.48a12.78 12.78 0 0 0-5.37-4.45 6.46 6.46 0 0 1-4.07-6.8c.47-2.93-.59-6.88-2.33-9.02a6.46 6.46 0 0 1-.13-7.92c1.87-2.3 2.93-6.25 2.5-8.98a6.46 6.46 0 0 1 3.84-6.92c2.77-1.06 5.66-3.95 6.64-6.53a6.46 6.46 0 0 1 6.8-4.07l.2.03c2.73.44 6.68-.62 8.82-2.36a6.46 6.46 0 0 1 7.92-.13c2.3 1.87 6.25 2.93 8.98 2.5l.2-.04a6.41 6.41 0 0 1 6.72 3.88c1.06 2.77 3.95 5.66 6.53 6.65a6.46 6.46 0 0 1 4.07 6.79c-.47 2.93.59 6.88 2.33 9.02a6.46 6.46 0 0 1 .13 7.92c-1.87 2.3-2.93 6.25-2.5 8.98a6.46 6.46 0 0 1-3.84 6.92 12.9 12.9 0 0 0-5.56 4.53zm-24.98 8.4a12.72 12.72 0 0 0-8.82-2.36l-.2.04a6.18 6.18 0 0 1-4.1-.87l-5.07 18.9 8.57-4.95 4.95 8.58 5.1-19a3.97 3.97 0 0 0-.27-.2l-.16-.14zm-15.54-5.75L23 89.64l12.25-7.07 7.07 12.25L49.2 69.1a6.34 6.34 0 0 1-1.94-.55h.01l-5.65 21.08-5.65-9.8-9.8 5.66 5.78-21.6.1.08a6.07 6.07 0 0 1-1.64-2.02zM51.03 70l6.65 24.8 7.07-12.24L77 89.64l-7.42-27.68c-.36.74-.9 1.4-1.55 1.95l5.79 21.59-9.8-5.66-5.66 9.8-5.64-21.07c-.44.2-.93.36-1.42.46l-.27.98zm7.67 17.04l4.95-8.58 8.58 4.95-5.07-18.9a6.19 6.19 0 0 1-4.1.87l-.2-.04c-2.73-.44-6.68.62-8.82 2.36l-.16.14-.27.2 5.1 19zM47.38 66.29a4.42 4.42 0 0 0 5.23 0l.17-.13a13.2 13.2 0 0 1 4.45-2.24l-1.5-5.6a24.05 24.05 0 0 1-11.46 0l-1.5 5.6a13.2 13.2 0 0 1 4.45 2.24l.16.13zm-4.08-8.24a23.97 23.97 0 0 1-9.91-5.73l-4.11 4.1A13.2 13.2 0 0 1 32 60.6l.08.2a4.42 4.42 0 0 0 4.53 2.6l.2-.02a13.2 13.2 0 0 1 4.98.28l1.5-5.6zm.26-.96l.96.25a23.05 23.05 0 0 0 10.95 0l.96-.25c3.76-1.1 7.11-3.12 9.8-5.8l.06-.05c2.68-2.7 4.7-6.05 5.8-9.8l.25-.97a23.06 23.06 0 0 0 0-10.94l-.26-.97a23.05 23.05 0 0 0-15.65-15.65l-.96-.25a23.06 23.06 0 0 0-10.95 0l-.96.25a23.05 23.05 0 0 0-15.65 15.65l-.26.97a23.06 23.06 0 0 0 0 10.94l.26.97a22.98 22.98 0 0 0 5.8 9.8l.05.04a22.98 22.98 0 0 0 9.8 5.8zm13.13.96l1.5 5.61a13.2 13.2 0 0 1 4.98-.28l.2.03a4.42 4.42 0 0 0 4.54-2.62l.07-.2a13.2 13.2 0 0 1 2.74-4.16l-4.1-4.11a23.97 23.97 0 0 1-9.93 5.73zm10.63-6.44l4.1 4.11A13.2 13.2 0 0 1 75.6 53l.2-.08a4.42 4.42 0 0 0 2.62-4.53l-.04-.2a13.2 13.2 0 0 1 .29-4.98l-5.6-1.5a23.97 23.97 0 0 1-5.74 9.91zm5.99-10.88l5.6 1.5a13.2 13.2 0 0 1 2.25-4.45l.13-.16a4.42 4.42 0 0 0 0-5.24l-.13-.16a13.2 13.2 0 0 1-2.24-4.45l-5.61 1.5a24.06 24.06 0 0 1 0 11.46zm-.26-12.43l5.6-1.5a13.2 13.2 0 0 1-.28-4.97l.04-.21a4.42 4.42 0 0 0-2.62-4.53l-.2-.08a13.2 13.2 0 0 1-4.16-2.73l-4.11 4.1a23.97 23.97 0 0 1 5.73 9.92zm-6.44-10.62l4.1-4.11a13.2 13.2 0 0 1-2.73-4.17l-.07-.2a4.42 4.42 0 0 0-4.53-2.61l-.2.03c-1.51.25-3.27.12-4.98-.28l-1.5 5.6a23.97 23.97 0 0 1 9.91 5.74zm-10.88-6l1.5-5.6a13.2 13.2 0 0 1-4.45-2.24l-.17-.13a4.42 4.42 0 0 0-5.23 0l-.16.13a13.2 13.2 0 0 1-4.45 2.24l1.5 5.6a24.06 24.06 0 0 1 11.46 0zm-12.43.27l-1.5-5.61c-1.71.4-3.47.53-4.98.28l-.2-.03a4.42 4.42 0 0 0-4.53 2.62l-.08.2a13.2 13.2 0 0 1-2.73 4.16l4.1 4.1a23.97 23.97 0 0 1 9.92-5.72zm-10.62 6.44l-4.11-4.11A13.2 13.2 0 0 1 24.4 17l-.2.08a4.42 4.42 0 0 0-2.61 4.53l.03.2c.24 1.5.12 3.27-.28 4.98l5.6 1.5a23.97 23.97 0 0 1 5.74-9.91zm-6 10.88l-5.6-1.5a13.2 13.2 0 0 1-2.24 4.45l-.13.16a4.42 4.42 0 0 0 0 5.24l.13.16a13.2 13.2 0 0 1 2.24 4.45l5.6-1.5a24.06 24.06 0 0 1 0-11.46zm.27 12.42l-5.61 1.5c.4 1.72.52 3.48.28 4.98l-.03.21a4.42 4.42 0 0 0 2.62 4.53l.2.08a13.2 13.2 0 0 1 4.16 2.73l4.1-4.1a23.98 23.98 0 0 1-5.72-9.93zm14.1-24.58C43.75 15.76 46.78 15 50 15v1c-3.06 0-5.94.72-8.5 2l-.45-.9zM38 19l.6.8a19.1 19.1 0 0 0-2.04 1.76l-.7-.7c.67-.67 1.38-1.3 2.14-1.86zm-8 16c0-4.5 1.49-8.66 4-12l.8.6A18.92 18.92 0 0 0 31 35c0 3.05.72 5.94 2 8.5l-.9.45A19.92 19.92 0 0 1 30 35z"
								/>
							</svg>

							<p className="mt-4 text-2xl text-gray-800 dark:text-gray-300">You've reached the end of Auralite</p>
							<ClientOnly>
								<p className="text-xl text-gray-700 dark:text-gray-400">{zeroTagline}</p>
							</ClientOnly>
						</div>
					) : (
						<div ref={$timelineEnd} />
					)}
				</div>
				<div className="hidden sm:block max-w-sm w-full mt-4 relative rounded-md shadow-sm">
					<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
						<SearchOutline className="h-5 w-5 text-gray-400" />
					</div>
					<input type="search" onChange={(event) => router.push({ pathname: '/search', query: { q: event.target.value } })} className="form-input dark:bg-gray-900 dark:text-gray-300 dark:border-gray-900 block w-full pl-10 sm:text-sm sm:leading-5" placeholder="Search Auralite" />
				</div>
			</div>
		</>
	)
}

const useTimeline = (showRead) => {
	const { data, error, mutate, size, setSize } = useSWRInfinite(
		(index, previousPageData) => {
			if (previousPageData && previousPageData.currentPage === previousPageData.lastPage) return null

			return showRead ? `/api/timeline?page=${(previousPageData?.currentPage ?? index) + 1}` : `/api/timeline/unread?page=${(previousPageData?.currentPage ?? index) + 1}`
		},
		async (key) => {
			const data = await Client.timeline({ page: key.split('?page=', 2)[1], includeRead: showRead })

			if (!data) return

			return { currentPage: data.current_page, lastPage: data.last_page, posts: data.data }
		}
	)

	const isEmpty = !data && !error
	const isLoading = isEmpty || (data && typeof data[data.length - 1] === 'undefined')
	const isEnd = data?.[data.length - 1] && data[data.length - 1].currentPage === data[data.length - 1].lastPage
	const loadMore = useCallback(async () => setSize((size) => size + 1), [])

	return { data: data?.map((page) => page.posts), error, isEmpty, isLoading, loadMore, isEnd, refresh: mutate }
}

Home.getLayout = usePageLayout('Home')
Home.middleware = withAuth()

export default Home
