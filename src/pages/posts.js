import PageLayout from '../components/App/PageLayout'
import useSWR from 'swr'
import Client from '../utils/Client'
import Compose from '../components/App/Compose'
import Post from '../components/App/Post'

const Posts = () => {
	const { data: posts } = useSWR('/api/timeline', () => Client.timeline())

	return (
		<PageLayout>
			<div className="max-w-md sm:max-w-full border-l border-r relative z-0">
				<Compose />
				{posts ? posts.map((post) => <Post key={post.id} post={post} />) : <span>Loading posts...</span>}
				<div className="text-center py-4">You've reached the end of Auralite. Now close the tab and do something else.</div>
			</div>
		</PageLayout>
	)
}

export default Posts
