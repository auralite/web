import { useState, useEffect } from 'react'
import Client from '../../utils/Client'
import useFormat from '../../hooks/format'
import { usePageLayout } from '../../components/App/PageLayout'
import { UploadableAvatar } from '../../components/App/Avatar'
import Post from '../../components/App/Post'
import Skeleton from '../../components/App/Skeleton'
import useMeta from '../../hooks/meta'
import { useRouter } from 'next/router'
import useAlert from '@/hooks/alert'
import useUser from '@/hooks/user'
import Tabs from '@/components/App/Tabs'

const Profile = ({ handle, authCheck, profile }) => {
	const router = useRouter()
	const isReplies = router.pathname.endsWith('/replies')

	const { user: currentUser, mutate: mutateUser } = useUser()

	const setMeta = useMeta(profile && `${profile?.name} (@${handle})`, profile?.bio, `/api/meta/profile?handle=${handle}`, <link rel="alternate" type="application/rss+xml" title={`${profile?.name}'s Auralite Feed`} href={`https://feeds.auralite.io/${handle}`} />)
	const userBio = useFormat(profile?.bio)
	const [error, setError] = useState(null)
	const [isUpdating, setIsUpdating] = useState(false)
	const [bio, setBio] = useState(profile?.bio)
	const [avatar, setAvatar] = useState(null)
	const { createAlert } = useAlert()

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

				createAlert({ title: 'Profile Updated', body: 'Your profile has been updated. Changes might take a few seconds to propagate.' })
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

		mutateUser((user) => {
			user.profile = profileFunc(user.profile)

			return user
		})
	}

	return (
		<>
			{setMeta}
			<div className="relative z-0 sm:mt-4 flex flex-col sm:flex-row sm:items-start sm:space-x-8">
				<div className="flex sm:shadow sm:rounded-lg bg-white dark:bg-gray-900 sm:sticky sm:top-card sm:max-w-lg w-full">
					<div className="pt-4 sm:pb-4 px-6 w-full">
						<div>
							<div className="flex items-center justify-between">
								<UploadableAvatar src={profile?.avatar} shouldAllowUploads={isUpdating} sizeClasses="h-12 w-12" onChange={(key) => setAvatar(key)} />
								{profile && currentUser && profile.handle === currentUser.profile.handle && (
									<>
										{isUpdating ? (
											<button onClick={saveChanges} type="button" className="inline-flex items-center px-2.5 py-1.5 border-2 border-indigo-500 text-sm leading-5 font-medium rounded-md bg-indigo-500 dark:bg-indigo-600 dark:bg-opacity-25 dark:border-transparent text-indigo-50 hover:bg-indigo-400 hover:border-indigo-400 focus:outline-none focus:bg-indigo-400 focus:border-indigo-400 focus:shadow-outline-indigo transition ease-in-out duration-150">
												Save Changes
											</button>
										) : (
											<button onClick={() => setIsUpdating((state) => !state)} type="button" className="inline-flex items-center px-2.5 py-1.5 border-2 border-indigo-500 text-sm leading-5 font-medium rounded-md text-indigo-500 hover:bg-indigo-500 hover:text-indigo-50 dark-hover:bg-indigo-600 dark-hover:bg-opacity-25 dark-hover:border-transparent focus:outline-none focus:shadow-outline-indigo transition ease-in-out duration-150">
												Edit Profile
											</button>
										)}
									</>
								)}
							</div>
							<p className="font-bold text-lg text-gray-800 dark:text-gray-300 mt-1">{profile?.name ? profile.name : <Skeleton width={200} />}</p>
							<p className="text-gray-600 dark:text-gray-500 text-sm">{profile?.handle ? `@${profile.handle}` : <Skeleton width={100} />}</p>
						</div>
						{isUpdating ? (
							<>
								<div className="relative rounded-md shadow-sm">
									<textarea data-gramm="false" id="about" rows="3" className={`form-textarea dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 mt-1 block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5${error ? ' border-red-300 dark:border-red-500 text-red-900 dark:text-red-400 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red' : ''}`} placeholder="18-year-old maker. Founder of Sitesauce, working on Auralite." onChange={(event) => setBio(event.target.value)} value={bio} required minLength="60" maxLength="160" />
									<div className="absolute bottom-2 right-2 pointer-events-none">
										<span className="text-sm text-gray-400 dark:text-gray-500">
											<span className={bio.length < 60 || bio.length > 160 ? 'text-red-400 dark:text-red-500' : 'text-green-400 dark:text-green-500'}>{bio.length}</span>/{bio.length < 60 ? 60 : 160}
										</span>
									</div>
								</div>
								{error && <p className="mt-2 text-sm text-red-600">{error}</p>}
							</>
						) : (
							<div className="mt-3 dark:text-gray-400 leading-normal">{userBio[0] ? userBio : <Skeleton count={2} />}</div>
						)}
					</div>
				</div>
				<div className="flex-1 max-w-md sm:max-w-3xl bg-white dark:bg-gray-900 sm:shadow sm:rounded-lg">
					<div className="border-b border-gray-200 dark:border-gray-800">
						<div className="px-6">
							<nav className="-mb-px flex">
								<Tabs
									tabs={[
										{ isLink: true, active: !isReplies, href: '/[profile]', as: `/${handle}`, shallow: true, content: 'Posts' },
										{ isLink: true, active: isReplies, href: '/[profile]/replies', as: `/${handle}/replies`, shallow: true, content: 'Replies' },
									]}
								/>
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

export const getStaticProps = async ({ params: { profile } }) => {
	try {
		return {
			props: {
				handle: profile,
				profile: await Client.profile({ handle: profile }),
			},
			revalidate: 1,
		}
	} catch (error) {
		return { props: { isError: true, statusCode: error.response.status }, revalidate: 1 }
	}
}

export const getStaticPaths = async () => {
	return {
		paths: [{ params: { profile: 'miguel' } }],
		fallback: true,
	}
}

export default Profile
