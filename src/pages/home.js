import { usePageLayout } from '../components/App/PageLayout'
import useSWR, { useSWRPages, mutate } from 'swr'
import Client from '../utils/Client'
import Compose from '../components/App/Compose'
import Post from '../components/App/Post'
import { useTitle } from '../hooks/meta'
import withAuth from '../middleware/auth'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useInView } from 'react-intersection-observer'
import useUser from '@/hooks/user'
import { SearchOutline } from '@/components/App/Icon'

const Home = () => {
	const router = useRouter()
	const { user } = useUser()

	const setTitle = useTitle('Home', user?.profile?.timeline_feed && <link rel="alternate" type="application/rss+xml" title="Auralite Timeline" href={user.profile.timeline_feed} />)

	const { pages, isLoading, loadMore, isEnd } = useTimeline()

	const [$timelineEnd, onEnd] = useInView({ threshold: 1 })

	useEffect(() => {
		if (!onEnd) return

		loadMore()
	}, [onEnd])

	const removeFromTimeline = () => mutate('/api/timeline?page=1')

	return (
		<>
			{setTitle}
			<div className="sm:flex sm:items-start sm:justify-between sm:space-x-8">
				<div className="flex-1 max-w-md sm:max-w-3xl relative z-0 mt-4">
					<Compose onPost={removeFromTimeline} />
					<div className="bg-white sm:rounded-lg sm:shadow mb-4">{pages}</div>
					{isLoading && (
						<div className="bg-white sm:rounded-lg sm:shadow mb-4">
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
					<input type="search" onChange={(event) => router.push({ pathname: '/search', query: { q: event.target.value } })} className="form-input block w-full pl-10 sm:text-sm sm:leading-5" placeholder="Search Auralite" />
				</div>
			</div>
		</>
	)
}

const useTimeline = () => {
	const removeFromTimeline = () => mutate('/api/timeline?page=1')

	const { pages, isLoadingMore, loadMore, isReachingEnd } = useSWRPages(
		'timeline',
		({ offset, withSWR }) => {
			const { data } = withSWR(useSWR(`/api/timeline?page=${offset ?? 1}`, () => Client.timeline({ page: offset }), { focusThrottleInterval: 10000 }))

			if (!data) return null

			return data.data.map((post) => <Post key={post.id} post={post} onDelete={removeFromTimeline} />)
		},
		(SWR) => (SWR.data?.last_page === SWR.data?.current_page ? null : SWR.data.current_page + 1),
		[]
	)

	return { pages, isLoading: isLoadingMore, loadMore, isEnd: isReachingEnd }
}

Home.getLayout = usePageLayout('Home')
Home.middleware = withAuth()

export default Home
