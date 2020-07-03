import { useState } from 'react'
import { mutate } from 'swr'
import Client from '../../utils/Client'
import LoadingButton from './LoadingButton'

const Compose = ({ replyTo, onPost }) => {
	if (!onPost) onPost = (post) => mutate('/api/timeline', (posts) => [post, ...posts])

	const [error, setError] = useState(null)
	const [post, setPost] = useState('')
	const [privacy, setPrivacy] = useState(replyTo?.privacy ?? 'public')
	const [loading, setLoading] = useState(false)

	const updatePost = (content) => {
		setPost(content.replace(/\n{3,}/m, '\n\n'))

		setError(null)
	}

	const submitForm = (event) => {
		event.preventDefault()

		setLoading(true)

		Client.createPost({ post, privacy, reply_to: replyTo?.id })
			.then((post) => {
				onPost(post)
				setLoading(false)
				setError(null)
				setPost('')
			})
			.catch((error) => {
				setError(error.response.data.errors.content[0])
				setLoading(false)
			})
	}

	return (
		<form onSubmit={submitForm} className="px-6 py-4 w-full">
			<div className="relative rounded-md shadow-sm">
				<textarea rows="3" data-gramm="false" className={`form-textarea mb-2 block w-full transition duration-150 ease-in-out sm:text-sm z-10 sm:leading-5${error ? ' border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red' : ''}`} placeholder="What's on your mind?" onChange={(event) => updatePost(event.target.value)} value={post} required minLength="2" maxLength="300" />
				<div className="absolute bottom-2 right-2 pointer-events-none">
					<span className="text-sm text-gray-400">
						<span className={post.length < 2 || post.length > 300 ? 'text-red-400' : 'text-green-400'}>{post.length}</span>/300
					</span>
				</div>
			</div>
			{error && <p className="mb-2 text-sm text-red-600">{error}</p>}
			<div className="mt-2 sm:mt-4 flex flex-col sm:flex-row items-end">
				<div className="w-full sm:max-w-md mb-4 sm:mb-0">
					<select value={privacy} onChange={(event) => setPrivacy(event.target.value)} id="privacy" className="mt-1 form-select block w-full pl-3 pr-10 py-2 text-base leading-6 border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5" disabled={replyTo?.privacy !== 'public'}>
						<option value="public">Share with everyone</option>
						<option value="users">Share with Auralite users</option>
					</select>
				</div>
				<div className="w-full text-right">
					<span className="w-full sm:w-auto inline-flex rounded-md shadow-sm">
						<LoadingButton loading={loading} type="submit" className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
							Post
						</LoadingButton>
					</span>
				</div>
			</div>
		</form>
	)
}

export default Compose
