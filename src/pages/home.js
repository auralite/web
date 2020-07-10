import { usePageLayout } from '../components/App/PageLayout'
import useSWR, { useSWRPages, mutate } from 'swr'
import Client from '../utils/Client'
import Compose from '../components/App/Compose'
import Post from '../components/App/Post'
import useTitle from '../hooks/title'
import withAuth from '../middleware/auth'
import useOnScreen from '../hooks/on-screen'
import { useRef, useEffect } from 'react'

const Home = () => {
	const setTitle = useTitle('Home')
	const { pages, isLoadingMore, loadMore, isReachingEnd } = useSWRPages(
		'timeline',
		({ offset, withSWR }) => {
			const { data } = withSWR(useSWR(`/api/timeline?page=${offset ?? 1}`, () => Client.timeline({ page: offset })))

			if (!data) return null

			return data.data.map((post) => <Post key={post.id} post={post} onDelete={removeFromTimeline} />)
		},
		(SWR) => (SWR.data?.last_page === SWR.data?.current_page ? null : SWR.data.current_page + 1),
		[]
	)

	const $timelineEnd = useRef(null)

	const endOnScreen = useOnScreen($timelineEnd, '200px')

	useEffect(() => {
		if (endOnScreen) loadMore()
	}, [endOnScreen])

	const removeFromTimeline = () => mutate('/api/timeline?page=1')

	return (
		<>
			{setTitle}
			<div className="max-w-md sm:max-w-3xl relative z-0 mt-4">
				<Compose onPost={removeFromTimeline} />
				<div className="bg-white sm:rounded-lg sm:shadow mb-4">
					{pages}
					{isLoadingMore && [...Array(10).keys()].map((key) => <Post key={`loading-${key}`} withBorder={false} />)}
				</div>
				{!isReachingEnd && <div ref={$timelineEnd} />}
				{isReachingEnd && <div className="text-center pb-2">You've reached the end of Auralite. Now close the tab and do something else.</div>}
			</div>
		</>
	)
}

Home.getLayout = usePageLayout('Home')
Home.middleware = withAuth()

export default Home
