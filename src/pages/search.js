import { usePageLayout } from '../components/App/PageLayout'
import withAuth from '../middleware/auth'
import { useRouter } from 'next/router'
import useSWR, { useSWRPages } from 'swr'
import Client from '@/utils/Client'
import Post from '@/components/App/Post'
import { useRef, useEffect, useState } from 'react'
import useOnScreen from '@/hooks/on-screen'

const Search = () => {
	const router = useRouter()

	const [query, setQuery] = useState(router.query.q ?? '')

	const { pages, isLoadingMore, loadMore, isReachingEnd, isEmpty } = useSWRPages(
		'timeline',
		({ offset, withSWR }) => {
			const { data } = withSWR(
				useSWR(
					() => `/api/search?q=${query}&page=${offset ?? 1}`,
					() => Client.search({ query })
				)
			)

			if (!data) return null

			return data.data.map((post) => <Post key={post.id} post={post} />)
		},
		(SWR) => (SWR.data?.last_page === SWR.data?.current_page ? null : SWR.data.current_page + 1),
		[query]
	)

	const $timelineEnd = useRef(null)

	const endOnScreen = useOnScreen($timelineEnd, '200px')

	useEffect(() => {
		if (endOnScreen) loadMore()
	}, [endOnScreen])

	useEffect(() => {
		router.push({
			pathname: router.pathname,
			query: { q: encodeURI(query) },
		})
	}, [query])

	return (
		<>
			<div className="max-w-md sm:max-w-3xl relative z-0 mt-4">
				<div>
					<div className="mt-1 relative rounded-md shadow-sm">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<svg className="h-5 w-5 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
								<path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
							</svg>
						</div>
						<input type="search" value={query} onChange={(event) => setQuery(event.target.value)} className="form-input block w-full pl-10 sm:text-sm sm:leading-5" placeholder="Search Auralite" autoFocus={true} />
					</div>
				</div>
				<div className="bg-white sm:rounded-lg sm:shadow mb-4 sm:mt-4">{pages}</div>
				{isLoadingMore && (
					<div className="bg-white sm:rounded-lg sm:shadow mb-4">
						{[...Array(10).keys()].map((key) => (
							<Post key={`loading-${key}`} isSkeleton={true} />
						))}
					</div>
				)}
				{!isReachingEnd && <div ref={$timelineEnd} />}
				{isReachingEnd && !isEmpty && <div className="text-center pb-2">No more results :(</div>}
				{isEmpty && <div className="text-center pb-2">No results :(</div>}
			</div>
		</>
	)
}

Search.getLayout = usePageLayout('Search')
Search.middleware = withAuth()

export default Search
