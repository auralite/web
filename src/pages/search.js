import { usePageLayout } from '../components/App/PageLayout'
import withAuth from '../middleware/auth'
import { useRouter } from 'next/router'
import useSWR, { useSWRPages } from 'swr'
import Client from '@/utils/Client'
import Post from '@/components/App/Post'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { SearchOutline } from '@/components/App/Icon'

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

	const [$timelineEnd, isEnd] = useInView({ threshold: 1, rootMargin: '200px' })

	useEffect(() => {
		if (isEnd) loadMore()
	}, [isEnd])

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
					<div className="mt-1 relative rounded-md shadow-sm mx-4 sm:mx-0">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<SearchOutline className="h-5 w-5 text-gray-400 dark:text-gray-500" />
						</div>
						<input type="search" value={query} onChange={(event) => setQuery(event.target.value)} className="form-input dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 block w-full pl-10 sm:text-sm sm:leading-5" placeholder="Search Auralite" autoFocus={true} />
					</div>
				</div>
				<div className="bg-white dark:bg-gray-900 sm:rounded-lg sm:shadow mb-4 sm:mt-4">{pages}</div>
				{isLoadingMore && (
					<div className="bg-white dark:bg-gray-900 sm:rounded-lg sm:shadow mb-4">
						{[...Array(10).keys()].map((key) => (
							<Post key={`loading-${key}`} isSkeleton={true} />
						))}
					</div>
				)}
				{!isReachingEnd && <div ref={$timelineEnd} />}
				{isReachingEnd && !isEmpty && <div className="text-center dark:text-gray-400 pb-2">No more results :(</div>}
				{isEmpty && <div className="text-center dark:text-gray-400 pb-2">No results :(</div>}
			</div>
		</>
	)
}

Search.getLayout = usePageLayout('Search')
Search.middleware = withAuth()

export default Search
