import { usePageLayout } from '../../../components/App/PageLayout'
import { withAuthInfo } from '../../../middleware/auth'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import Client from '../../../utils/Client'
import useTitle from '../../../hooks/title'
import Compose from '../../../components/App/Compose'
import Post from '../../../components/App/Post'
import { useState, useEffect } from 'react'

const PostPage = ({ postId, authCheck, initialData }) => {
	const router = useRouter()
	const [replyHeight, setReplyHeight] = useState(0)
	const { data: post, mutate } = useSWR(
		() => `/api/posts/${postId}`,
		() => Client.post({ postId }),
		{ initialData }
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

	useEffect(() => {
		window.requestAnimationFrame(() => {
			window.scroll({ top: replyHeight - 10, left: 0 })
		})
	}, [replyHeight])

	return (
		<>
			{setTitle}
			<div className="max-w-md sm:max-w-full sm:border-l sm:border-r rounded-b-lg relative z-0">
				<div style={{ minHeight: `calc(100vh + ${replyHeight}px)` }}>
					<Post post={post} shouldLink={false} featured={true} onDelete={() => router.back()} parentReply={(ref) => setReplyHeight(ref.current?.offsetHeight ?? 0)} />
					{post ? post.replies.map((reply) => <Post key={reply.id} post={reply} showReply={false} onDelete={updateReplyList} />) : [...Array(3).keys()].map((key) => <Post key={key} />)}
				</div>
			</div>
		</>
	)
}

PostPage.getLayout = usePageLayout()

PostPage.getInitialProps = async ({ query }) => {
	try {
		return { postId: query.post, initialData: await Client.post({ postId: query.post }) }
	} catch (error) {
		return { error }
	}
}

PostPage.middleware = withAuthInfo()

export default PostPage
