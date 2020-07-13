import { useState, useEffect } from 'react'
import moment from 'moment'
import useSWR from 'swr'
import Client from '../../utils/Client'
import useFormat from '../../hooks/format'
import { usePageLayout } from '../../components/App/PageLayout'
import Avatar from '../../components/App/Avatar'
import Post from '../../components/App/Post'
import Skeleton from 'react-loading-skeleton'
import useTitle, { useImage } from '../../hooks/title'
import Error from '../_error'
import { withAuthInfo } from '../../middleware/auth'
import Link from 'next/link'

const Profile = ({ handle, authCheck, isReplies, initialData }) => {
	const { data: profile, mutate: mutateProfile, error: profileError } = useSWR(
		() => `/api/users/${handle}`,
		() => Client.profile({ handle }),
		{ initialData }
	)
	const { data: currentUser, mutate: mutateUser } = useSWR(authCheck ? '/api/user' : null, () => Client.user())
	const setTitle = useTitle(profile && `${profile?.name} (@${profile.handle})`)
	const setImage = useImage(`/api/meta/profile?handle=${handle}`)
	const userBio = useFormat(profile?.bio)
	const [error, setError] = useState(null)
	const [isUpdating, setIsUpdating] = useState(false)
	const [bio, setBio] = useState(profile?.bio)
	const [avatar, setAvatar] = useState(null)

	useEffect(() => {
		setBio(profile?.bio)
	}, [profile])

	const saveChanges = () => {
		Client.updateProfile({ bio, avatar })
			.then((profile) => {
				setIsUpdating(false)
				setAvatar(null)
				setError(null)

				mutateUser((user) => {
					user.profile = profile

					return user
				})
				mutateProfile(profile)
			})
			.catch((error) => {
				if (!error.response?.data?.errors) return alert('Something went wrong when updating your profile.')

				setError(error.response.data.errors.bio[0])
			})
	}

	const removeFromProfile = (deletedPost) => {
		const profileFunc = (profile) => {
			profile.posts = profile.posts.filter((post) => post.id !== deletedPost.id)

			return profile
		}

		mutateProfile(profileFunc)
		mutateUser((user) => {
			user.profile = profileFunc(user.profile)

			return user
		})
	}

	moment.updateLocale('en', {
		relativeTime: {
			future: 'in %s',
			past: '%s ago',
			s: '%ds',
			ss: '%ds',
			m: '%dm',
			mm: '%dm',
			h: '%dh',
			hh: '%dh',
			d: '%dd',
			dd: '%dd',
		},
	})

	if (profileError?.response) return <Error statusCode={profileError.response.status} />

	return (
		<>
			{setTitle}
			{setImage}
			<div className="relative z-0 sm:mt-4 flex flex-col sm:flex-row sm:items-start sm:space-x-8">
				<div className="flex sm:shadow sm:rounded-lg bg-white sm:sticky sm:top-card sm:max-w-lg w-full">
					<div className="pt-4 sm:pb-4 px-6 w-full">
						<div>
							<div className="flex items-center justify-between">
								<Avatar src={profile?.avatar} isUpdating={isUpdating} sizeClasses="h-12 w-12" onChange={(key) => setAvatar(key)} />
								{profile && currentUser && profile.handle === currentUser.profile.handle && (
									<>
										{isUpdating ? (
											<button onClick={saveChanges} type="button" className="inline-flex items-center px-2.5 py-1.5 border-2 border-indigo-500 text-sm leading-5 font-medium rounded-md bg-indigo-500 text-indigo-50 hover:bg-indigo-400 hover:border-indigo-400 focus:outline-none focus:bg-indigo-400 focus:border-indigo-400 focus:shadow-outline-indigo transition ease-in-out duration-150">
												Save Changes
											</button>
										) : (
											<button onClick={() => setIsUpdating((state) => !state)} type="button" className="inline-flex items-center px-2.5 py-1.5 border-2 border-indigo-500 text-sm leading-5 font-medium rounded-md text-indigo-500 hover:bg-indigo-500 hover:text-indigo-50 focus:outline-none focus:bg-indigo-500 focus:text-indigo-50 focus:shadow-outline-indigo transition ease-in-out duration-150">
												Edit Profile
											</button>
										)}
									</>
								)}
							</div>
							<p className="font-bold text-lg text-gray-800 mt-1">{profile?.name ? profile.name : <Skeleton width={200} />}</p>
							<p className="text-gray-600 text-sm">{profile?.handle ? `@${profile.handle}` : <Skeleton width={100} />}</p>
						</div>
						{isUpdating ? (
							<>
								<div className="relative rounded-md shadow-sm">
									<textarea data-gramm="false" id="about" rows="3" className={`form-textarea mt-1 block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5${error ? ' border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red' : ''}`} placeholder="18-year-old maker. Founder of Sitesauce, working on Auralite." onChange={(event) => setBio(event.target.value)} value={bio} required minLength="60" maxLength="160" />
									<div className="absolute bottom-2 right-2 pointer-events-none">
										<span className="text-sm text-gray-400">
											<span className={bio.length < 60 || bio.length > 160 ? 'text-red-400' : 'text-green-400'}>{bio.length}</span>/{bio.length < 60 ? 60 : 160}
										</span>
									</div>
								</div>
								{error && <p className="mt-2 text-sm text-red-600">{error}</p>}
							</>
						) : (
							<div className="mt-3 leading-normal">{userBio[0] ? userBio : <Skeleton count={2} />}</div>
						)}
					</div>
				</div>
				<div className="flex-1 max-w-md sm:max-w-3xl bg-white sm:shadow sm:rounded-lg">
					<div className="border-b border-gray-200">
						<div className="px-6">
							<nav className="-mb-px flex">
								<Link href="/[profile]" as={`/${handle}`} shallow={true}>
									<a className={`${isReplies ? 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300' : 'border-indigo-500 text-indigo-600 focus:text-indigo-800 focus:border-indigo-700'} whitespace-no-wrap py-4 px-1 border-b-2 font-medium text-sm leading-5 focus:outline-none`}>Posts</a>
								</Link>
								<Link href="/[profile]/replies" as={`/${handle}/replies`} shallow={true}>
									<a className={`${isReplies ? 'border-indigo-500 text-indigo-600 focus:text-indigo-800 focus:border-indigo-700' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300'} whitespace-no-wrap ml-8 py-4 px-1 border-b-2 font-medium text-sm leading-5 focus:outline-none`}>Replies</a>
								</Link>
							</nav>
						</div>
					</div>
					<div>{profile ? profile.posts.filter((post) => (isReplies ? post.reply_to : !post.reply_to)).map((post) => <Post key={post.id} post={post} showOptions={authCheck} onDelete={removeFromProfile} />) : [...Array(10).keys()].map((key) => <Post key={key} />)}</div>
				</div>
			</div>
		</>
	)
}

Profile.getLayout = usePageLayout()
Profile.middleware = withAuthInfo()

Profile.getInitialProps = async ({ query, pathname }) => {
	try {
		return { handle: query.profile, isReplies: pathname.includes('/replies'), initialData: await Client.profile({ handle: query.profile }) }
	} catch (error) {
		return { error }
	}
}

export default Profile
