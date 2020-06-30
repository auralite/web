import { usePageLayout } from '../../../components/App/PageLayout'
import Post from '../../../components/App/Post'
import Compose from '../../../components/App/Compose'
import Client from '../../../utils/Client'
import useSWR, { mutate } from 'swr'
import useTitle from '../../../hooks/title'

const Show = ({ postId }) => {
	const { data: post } = useSWR(
		() => `/api/posts/${postId}`,
		() => Client.post({ postId })
	)

	const setTitle = useTitle(post && `${post.author.name} (@${post.author_handle}) on Auralite: ${post.content}`)

	const newPost = (reply) => {
		mutate(
			() => `/api/posts/${postId}`,
			(post) => {
				post.replies.concat(reply)

				return post
			}
		)
	}

	return (
		<>
			{setTitle}
			<div className="max-w-md sm:max-w-full border-l border-r relative z-0">
				<Post post={post} shouldLink={false} />
				<Compose replyTo={post} onPost={newPost} />
				{post ? post.replies.map((reply) => <Post key={reply.id} post={reply} showReplyIndicator={false} />) : [...Array(10).keys()].map((key) => <Post key={key} />)}
				<div className="text-center py-4">You've reached the end of Auralite. Now close the tab and do something else.</div>
			</div>
		</>
	)
}

Show.getLayout = usePageLayout()

Show.getInitialProps = async ({ query }) => {
	return { postId: query.post }
}

export default Show
