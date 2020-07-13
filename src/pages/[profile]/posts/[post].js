import { usePageLayout } from '../../../components/App/PageLayout'
import { withAuthInfo } from '../../../middleware/auth'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import Client from '../../../utils/Client'
import { useTitle } from '../../../hooks/meta'
import Compose from '../../../components/App/Compose'
import Post from '../../../components/App/Post'
import { useState, useEffect, useRef, useLayoutEffect } from 'react'

const PostPage = ({ postId, authCheck, initialData }) => {
	const router = useRouter()
	const [replyHeight, setReplyHeight] = useState(0)
	const composeRef = useRef(null)
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

	const scrollToReply = () =>
		new Promise((resolve, reject) => {
			const checkOrWait = () => {
				if (post && post.reply_to === null) return reject()
				if (replyHeight != 0) return resolve()

				setTimeout(500, () => checkOrWait())
			}

			checkOrWait()
		})
			.catch(() => {})
			.then(() => {
				window.requestAnimationFrame(() => {
					window.scroll({ top: replyHeight + (composeRef.current?.offsetHeight ?? 0) + 5, left: 0 })
				})
			})

	useEffect(() => {
		router.events.on('routeChangeComplete', () => scrollToReply())

		return () => {
			router.events.off('routeChangeComplete', () => scrollToReply())
		}
	}, [])

	useLayoutEffect(() => {
		scrollToReply()
	}, [replyHeight])

	return (
		<>
			{setTitle}
			<div className="max-w-md sm:max-w-3xl rounded-b-lg relative z-0 mt-4">
				<div style={{ minHeight: `calc(100vh + 1rem + ${replyHeight}px)` }}>
					<div className="bg-white sm:rounded-lg sm:shadow sm:mb-4">
						<Post post={post} shouldLink={false} featured={true} onDelete={() => router.back()} parentReply={(ref) => setReplyHeight(ref.current?.offsetHeight ?? 0)} withBorder={false} />
					</div>
					{authCheck && <Compose ref={composeRef} replyTo={post} onPost={newPost} />}
					<div className="bg-white sm:rounded-lg sm:shadow mb-4">{post ? post.replies.map((reply, key) => <Post key={reply.id} post={reply} showReply={false} onDelete={updateReplyList} withBorder={key + 1 !== post.replies.length} />) : [...Array(3).keys()].map((key) => <Post key={key} />)}</div>
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
