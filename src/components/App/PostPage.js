import useSWR from 'swr'
import Client from '../../utils/Client'
import useTitle from '../../hooks/title'
import Post from './Post'
import Compose from './Compose'
import Error from '../../pages/_error'

const PostPage = ({ postId }) => {
	const { data: post, mutate, error: postError } = useSWR(
		() => `/api/posts/${postId}`,
		() => Client.post({ postId })
	)

	const setTitle = useTitle(post && `${post.author.name} (@${post.author_handle}) on Auralite: ${post.content}`)

	const newPost = (reply) => {
		mutate((post) => {
			post.replies.concat(reply)

			return post
		})
	}

	if (postError?.response) return <Error statusCode={postError.response.status} />

	return (
		<>
			{setTitle}
			<div className="max-w-md sm:max-w-full border-l border-r relative z-0">
				<Post post={post} shouldLink={false} />
				<Compose replyTo={post} onPost={newPost} />
				{post ? post.replies.map((reply) => <Post key={reply.id} post={reply} showReply={false} />) : [...Array(3).keys()].map((key) => <Post key={key} />)}
				<div className="text-center py-4">You've reached the end of Auralite. Now close the tab and do something else.</div>
			</div>
		</>
	)
}

export default PostPage
