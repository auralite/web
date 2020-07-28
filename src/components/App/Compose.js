import { useState, useEffect, forwardRef, memo } from 'react'
import Client from '../../utils/Client'
import LoadingButton from './LoadingButton'
import Avatar from './Avatar'
import ImageGrid, { useImageGrid } from './ImageGrid'
import useUser from '@/hooks/user'
import { ImageOutline, GlobeOutline, UserCircleOutline } from './Icon'

const Compose = forwardRef(({ replyTo, onPost = () => {} }, ref) => {
	const { user } = useUser()

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
								<ImageOutline className="h-6 w-6 text-gray-500" />
							</label>
							<button type="button" title={privacy === 'public' ? 'Share with everyone' : 'Share with Auralite users'} onClick={() => setPrivacy((privacy) => (privacy === 'public' ? 'users' : 'public'))} className="-m-2 cursor-pointer inline-flex justify-between items-center focus:outline-none p-2 rounded-full text-gray-500 bg-white hover:bg-gray-200 transition duration-200 ease-in-out">
								{privacy === 'public' ? (
									<>
										<GlobeOutline className="h-6 w-6 text-gray-500" />
										<p className="ml-1">
											<span className="hidden sm:inline">Share with everyone</span>
											<span className="sm:hidden">Everyone</span>
										</p>
									</>
								) : (
									<>
										<UserCircleOutline className="h-6 w-6 text-gray-500" />
										<p className="ml-1">
											<span className="hidden sm:inline">Share with Auralite users</span>
											<span className="sm:hidden">Users only</span>
										</p>
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

export default memo(Compose)
