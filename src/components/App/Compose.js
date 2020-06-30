import { useState } from 'react'
import { mutate } from 'swr'
import Client from '../../utils/Client'
import LoadingButton from './LoadingButton'

const Compose = ({ replyTo }) => {
	const [error, setError] = useState(null)
	const [post, setPost] = useState('')
	const [loading, setLoading] = useState(false)

	const updatePost = (content) => {
		setPost(content.replace(/\n{3,}/m, '\n\n'))

		setError(null)
	}

	const submitForm = (event) => {
		event.preventDefault()

		setLoading(true)

		Client.post({ post, reply_to: replyTo?.id })
			.then((post) => {
				mutate('/api/timeline', (posts) => [post, ...posts])
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
		<form onSubmit={submitForm} className="border-b px-2 py-4 w-full">
			<div className="relative rounded-md shadow-sm">
				<textarea rows="3" data-gramm="false" className={`form-textarea mb-2 block w-full transition duration-150 ease-in-out sm:text-sm z-10 sm:leading-5${error ? ' border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red' : ''}`} placeholder="What's on your mind?" onChange={(event) => updatePost(event.target.value)} value={post} required minLength="2" maxLength="300" />
				<div className="absolute bottom-2 right-2 pointer-events-none">
					<span className="text-sm text-gray-400">
						<span className={post.length < 2 || post.length > 300 ? 'text-red-400' : 'text-green-400'}>{post.length}</span>/300
					</span>
				</div>
			</div>
			{error && <p className="mb-2 text-sm text-red-600">{error}</p>}
			<div className="text-right">
				<span className="inline-flex rounded-md shadow-sm">
					<LoadingButton loading={loading} type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
						Post
					</LoadingButton>
				</span>
			</div>
		</form>
	)
}

export default Compose
