import { usePageLayout } from '../components/App/PageLayout'
import useSWR from 'swr'
import Client from '../utils/Client'
import Compose from '../components/App/Compose'
import Post from '../components/App/Post'
import useTitle from '../hooks/title'
import withAuth from '../middleware/auth'

const Home = () => {
	const setTitle = useTitle('Home')
	const { data: posts } = useSWR('/api/timeline', () => Client.timeline())

	return (
		<>
			{setTitle}
			<div className="max-w-md sm:max-w-full border-l border-r relative z-0">
				<Compose />
				{posts ? posts.map((post) => <Post key={post.id} post={post} />) : [...Array(10).keys()].map((key) => <Post key={key} />)}
				<div className="text-center py-4">You've reached the end of Auralite. Now close the tab and do something else.</div>
			</div>
		</>
	)
}

Home.getLayout = usePageLayout()
Home.middleware = withAuth()

export default Home
