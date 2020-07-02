import { usePageLayout } from '../../../components/App/PageLayout'
import { withAuthInfo } from '../../../middleware/auth'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import Client from '../../../utils/Client'
import useTitle from '../../../hooks/title'
import Error from '../../_error'
import Compose from '../../../components/App/Compose'
import Post from '../../../components/App/Post'

const PostPage = ({ postId, authCheck }) => {
	const router = useRouter()
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

	const updateReplyList = (deletedPost) => {
		mutate((post) => {
			post.replies = post.replies.filter((reply) => reply.id !== deletedPost.id)

			return post
		})
	}

	if (postError?.response) return <Error statusCode={postError.response.status} />

	return (
		<>
			{setTitle}
			<div className="max-w-md sm:max-w-full border-l border-r border-b rounded-b-lg relative z-0">
				<Post post={post} shouldLink={false} onDelete={() => router.back()} />
				{authCheck && <Compose replyTo={post} onPost={newPost} />}
				{post ? post.replies.map((reply) => <Post key={reply.id} post={reply} showReply={false} onDelete={updateReplyList} />) : [...Array(3).keys()].map((key) => <Post key={key} />)}
			</div>
		</>
	)
}

PostPage.getLayout = usePageLayout()

PostPage.getInitialProps = async ({ query }) => {
	return { postId: query.post }
}

PostPage.middleware = withAuthInfo()

export default PostPage
