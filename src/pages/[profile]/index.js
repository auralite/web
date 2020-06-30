import { useState, useEffect } from 'react'
import moment from 'moment'
import useSWR, { mutate } from 'swr'
import Client from '../../utils/Client'
import useFormat from '../../hooks/format'
import { usePageLayout } from '../../components/App/PageLayout'
import Avatar from '../../components/App/Avatar'
import Post from '../../components/App/Post'
import Skeleton from 'react-loading-skeleton'
import useTitle from '../../hooks/title'

const Profile = ({ handle }) => {
	const { data: profile } = useSWR(
		() => `/api/users/${handle}`,
		() => Client.profile({ handle })
	)
	const { data: currentUser } = useSWR('/api/user', () => Client.user())
	const setTitle = useTitle(profile && `${profile?.name} (@${profile.handle})`)
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

				mutate('/api/user', (user) => {
					user.profile = profile

					return user
				})
				mutate(`/api/users/${profile.handle}`, profile)
			})
			.catch((error) => {
				setError(error.response.data.errors.bio[0])
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

	return (
		<>
			{setTitle}
			<div className="max-w-md sm:max-w-full border-l border-r relative z-0">
				<div className="flex">
					<div className="border-b px-2 pt-2 pb-4 w-full">
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
				{profile ? profile.posts.map((post) => <Post key={post.id} post={post} />) : [...Array(10).keys()].map((key) => <Post key={key} />)}
				<div className="text-center py-4">You've reached the end of Auralite. Now close the tab and do something else.</div>
			</div>
		</>
	)
}

Profile.getLayout = usePageLayout()

Profile.getInitialProps = async ({ query }) => {
	return { handle: query.profile }
}

export default Profile
