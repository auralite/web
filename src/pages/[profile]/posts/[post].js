import { usePageLayout } from '../../../components/App/PageLayout'
import { withAuthInfo } from '../../../middleware/auth'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import Client from '../../../utils/Client'
import useMeta from '../../../hooks/meta'
import Compose from '../../../components/App/Compose'
import Post from '../../../components/App/Post'
import { useEffect, useRef, useLayoutEffect } from 'react'

const PostPage = ({ postId, authCheck, initialData }) => {
	const router = useRouter()
	const postRef = useRef(null)
	const { data: post, mutate } = useSWR(
		() => `/api/posts/${postId}`,
		() => Client.post({ postId }),
		{ initialData }
	)

	const setMeta = useMeta(post && `${post.author.name} (@${post.author_handle}) on Auralite: ${post.content}`, post.content, `/api/meta/post?postId=${postId}`)

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

	const scrollToReply = () => {
		window.requestAnimationFrame(() => {
			setTimeout(() => {
				window.scroll({ top: postRef.current?.offsetTop })
			}, 200)
		})
	}

	useEffect(() => {
		router.events.on('routeChangeComplete', () => scrollToReply())

		return () => {
			router.events.off('routeChangeComplete', () => scrollToReply())
		}
	}, [])

	useLayoutEffect(() => {
		scrollToReply()
	}, [postRef])

	return (
		<>
			{setMeta}
			<div className="max-w-md sm:max-w-3xl rounded-b-lg relative z-0 mt-4">
				<div>
					<div className="bg-white sm:rounded-lg sm:shadow sm:mb-4">
						<Post ref={postRef} post={post} shouldLink={false} featured={true} onDelete={() => router.back()} withBorder={false} />
					</div>
					<div className="min-h-screen">
						{authCheck && <Compose replyTo={post} onPost={newPost} />}
						<div className="bg-white sm:rounded-lg sm:shadow mb-4">{post ? post.replies.map((reply, key) => <Post key={reply.id} post={reply} showReply={false} onDelete={updateReplyList} withBorder={key + 1 !== post.replies.length} />) : [...Array(3).keys()].map((key) => <Post key={key} />)}</div>
					</div>
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
