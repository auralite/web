import { useState, useEffect, forwardRef } from 'react'
import Client from '../../utils/Client'
import LoadingButton from './LoadingButton'
import Avatar from './Avatar'
import useSWR from 'swr'
import ImageGrid, { useImageGrid } from './ImageGrid'

const Compose = forwardRef(({ replyTo, onPost = () => {} }, ref) => {
	const { data: user } = useSWR('/api/user', () => Client.user())

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	const [post, setPost] = useState('')
	const remainingChars = 300 - post.length

	const { uploaderSettings, gridSettings, showGrid, hasPendingImages, images, cleanupImages } = useImageGrid()
	const [privacy, setPrivacy] = useState('public')

	const updatePost = (content) => {
		setPost(content.replace(/\n{3,}/m, '\n\n'))

		setError(null)
	}

	useEffect(() => {
		setPrivacy(replyTo?.privacy ?? 'public')
	}, [replyTo?.privacy])

	const submitForm = (event) => {
		event.preventDefault()

		setLoading(true)

		Client.createPost({ post: post.trim(), privacy, reply_to: replyTo?.id, images })
			.then((post) => {
				onPost(post)
				setLoading(false)
				setError(null)
				setPost('')
				cleanupImages()
			})
			.catch((error) => {
				if (!error.response?.data?.errors) return alert('Something went wrong when creating your post.')

				setError(error.response.data.errors.content[0])
				setLoading(false)
			})
	}

	return (
		<div ref={ref} className="bg-white sm:rounded-lg sm:shadow p-6 sm:mb-8 border-b sm:border-b-0 border-gray-200">
			<div className="flex w-full">
				<div className="hidden sm:block flex-shrink-0 mr-5">
					<div>
						<Avatar src={user?.profile?.avatar} sizeClasses="w-12 h-12" />
					</div>
				</div>
				<form onSubmit={submitForm} className="flex-1">
					<textarea value={post} onChange={(event) => updatePost(event.target.value)} className={`form-textarea mb-2 focus:bg-white block w-full ${remainingChars <= 0 ? 'border border-red-500' : ''}`} rows="3" placeholder="What's on your mind?" />
					{error && <p className="mb-2 text-sm text-red-600">{error}</p>}
					{showGrid && <ImageGrid {...gridSettings} />}
					<div className="flex justify-between items-center">
						<div className="flex items-center space-x-2">
							<label htmlFor="image" type="button" className="-m-2 cursor-pointer inline-flex justify-between items-center focus:outline-none p-2 rounded-full text-gray-500 bg-white hover:bg-gray-200 transition duration-200 ease-in-out">
								<input id="image" multiple accept="image/*" className="hidden" type="file" {...uploaderSettings} />
								<svg className="h-6 w-6 text-gray-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
									<path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
								</svg>
							</label>
							<button type="button" title={privacy === 'public' ? 'Share with everyone' : 'Share with Auralite users'} onClick={() => setPrivacy((privacy) => (privacy === 'public' ? 'users' : 'public'))} className="-m-2 cursor-pointer inline-flex justify-between items-center focus:outline-none p-2 rounded-full text-gray-500 bg-white hover:bg-gray-200 transition duration-200 ease-in-out">
								{privacy === 'public' ? (
									<>
										<svg className="h-6 w-6 text-gray-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
											<path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
										</svg>
										<p className="ml-1">Share with everyone</p>
									</>
								) : (
									<>
										<svg className="h-6 w-6 text-gray-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
											<path d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
										</svg>
										<p className="ml-1">Share with Auralite users</p>
									</>
								)}
							</button>
						</div>
						<div className="flex items-center">
							<span className={`mr-3 text-sm text-gray-600 ${remainingChars <= 20 && remainingChars > 10 ? 'text-yellow-600' : ''} ${remainingChars <= 10 ? 'text-red-600' : ''}`}>{remainingChars}</span>
							<LoadingButton loading={loading} disabled={post.trim().length < 2 || remainingChars <= 0 || hasPendingImages} type="submit" disabledClasses="bg-indigo-300 cursor-not-allowed" loadingClasses="bg-indigo-600 cursor-wait" activeClasses="hover:bg-indigo-500 focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 bg-indigo-600" className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white focus:outline-none transition ease-in-out duration-150">
								Post
							</LoadingButton>
						</div>
					</div>
				</form>
			</div>
		</div>
	)
})

export default Compose
