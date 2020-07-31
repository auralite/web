import { usePageLayout } from '../components/App/PageLayout'
import withAuth from '../middleware/auth'
import { useRouter } from 'next/router'
import { useSWRInfinite } from 'swr'
import Client from '@/utils/Client'
import Post from '@/components/App/Post'
import { useEffect, useState, useCallback } from 'react'
import { useInView } from 'react-intersection-observer'
import { SearchOutline } from '@/components/App/Icon'

const Search = () => {
	const router = useRouter()

	const [query, setQuery] = useState(router.query.q ?? '')

	const { data, isLoading, loadMore, isReachingEnd, isEmpty } = useSearchResults(query)

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
				<div className="bg-white dark:bg-gray-900 sm:rounded-lg sm:shadow mb-4 sm:mt-4">{data}</div>
				{isLoading && (
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

const useSearchResults = (query) => {
	const { data, error, mutate, size, setSize } = useSWRInfinite(
		(index, previousPageData) => {
			if (previousPageData && previousPageData.currentPage === previousPageData.lastPage) return null

			return `/api/search?q=${query}&page=${(previousPageData?.currentPage ?? index) + 1}`
		},
		async (key) => {
			const data = await Client.search({ query, page: key.split('?page=', 2)[1] })

			if (!data) return

			return { currentPage: data.current_page, lastPage: data.last_page, posts: data.data.map((post) => <Post key={post.id} post={post} onDelete={() => mutate()} />) }
		}
	)

	const isLoading = (!data && !error) || (data && typeof data[size - 1] === 'undefined')
	const isReachingEnd = data?.[size - 1]?.currentPage === data?.[size - 1]?.lastPage
	const loadMore = useCallback(async () => setSize((size) => size + 1), [])

	return { data: data?.map((page) => page.posts), isLoading, loadMore, isReachingEnd, refresh: mutate }
}

Search.getLayout = usePageLayout('Search')
Search.middleware = withAuth()

export default Search
