import { usePageLayout } from '../components/App/PageLayout'
import { useSWRInfinite } from 'swr'
import Client from '../utils/Client'
import Compose from '../components/App/Compose'
import Post from '../components/App/Post'
import { useTitle } from '../hooks/meta'
import withAuth from '../middleware/auth'
import { useEffect, useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import { useInView } from 'react-intersection-observer'
import useUser from '@/hooks/user'
import { SearchOutline, SparklesOutline, SparklesSolid } from '@/components/App/Icon'
import { Portal } from 'react-portal'
import ClientOnly from '@/components/App/ClientOnly'
import useStickyState from '@/hooks/sticky'

const Home = () => {
	const router = useRouter()
	const { user } = useUser()

	const setTitle = useTitle('Home', user?.profile?.timeline_feed && <link rel="alternate" type="application/rss+xml" title="Auralite Timeline" href={user.profile.timeline_feed} />)

	const { data: posts, isLoading, loadMore, isEnd, refresh } = useTimeline()

	const [showRead, setShowRead] = useStickyState(false, 'oldFeed')

	const [$timelineEnd, onEnd] = useInView({ threshold: 1 })

	useEffect(() => {
		if (!onEnd) return

		loadMore()
	}, [onEnd])

	const removeFromTimeline = () => refresh()

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
					<div className="bg-white dark:bg-gray-900 sm:rounded-lg sm:shadow mb-4">
						{posts
							?.flat(1)
							?.filter((post) => showRead || !post.is_read)
							?.map((post) => (
								<Post key={post.id} post={post} onDelete={() => refresh()} />
							))}
					</div>
					{isLoading && (
						<div className="bg-white dark:bg-gray-900 sm:rounded-lg sm:shadow mb-4">
							{[...Array(10).keys()].map((key) => (
								<Post key={`loading-${key}`} isSkeleton={true} />
							))}
						</div>
					)}
					{isEnd ? <div className="text-center pb-2">You've reached the end of Auralite. Now close the tab and do something else.</div> : <div ref={$timelineEnd} />}
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

const useTimeline = () => {
	const { data, error, mutate, size, setSize } = useSWRInfinite(
		(index, previousPageData) => {
			if (previousPageData && previousPageData.currentPage === previousPageData.lastPage) return null

			return `/api/timeline?page=${(previousPageData?.currentPage ?? index) + 1}`
		},
		async (key) => {
			const data = await Client.timeline({ page: key.split('?page=', 2)[1] })

			if (!data) return

			return { currentPage: data.current_page, lastPage: data.last_page, posts: data.data }
		}
	)

	const isLoading = (!data && !error) || (data && typeof data[size - 1] === 'undefined')
	const isEnd = data?.[size - 1]?.currentPage === data?.[size - 1]?.lastPage
	const loadMore = useCallback(async () => setSize((size) => size + 1), [])

	return { data: data?.map((page) => page.posts), isLoading, loadMore, isEnd, refresh: mutate }
}

Home.getLayout = usePageLayout('Home')
Home.middleware = withAuth()

export default Home
