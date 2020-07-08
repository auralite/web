import { usePageLayout } from '../components/App/PageLayout'
import useSWR from 'swr'
import Client from '../utils/Client'
import Compose from '../components/App/Compose'
import Post from '../components/App/Post'
import useTitle from '../hooks/title'
import withAuth from '../middleware/auth'

const Home = () => {
	const setTitle = useTitle('Home')
	const { data: posts, mutate } = useSWR('/api/timeline', () => Client.timeline())

	const removeFromTimeline = (deletedPost) => {
		mutate((posts) => posts.filter((post) => post.id !== deletedPost.id))
	}

	return (
		<>
			{setTitle}
			<div className="max-w-md sm:max-w-3xl relative z-0 mt-4">
				<Compose />
				<div className="bg-white sm:rounded-lg sm:shadow mb-8">{posts ? posts.map((post) => <Post key={post.id} post={post} onDelete={removeFromTimeline} />) : [...Array(10).keys()].map((key) => <Post key={key} />)}</div>
				<div className="text-center py-4">You've reached the end of Auralite. Now close the tab and do something else.</div>
			</div>
		</>
	)
}

Home.getLayout = usePageLayout()
Home.middleware = withAuth()

export default Home
