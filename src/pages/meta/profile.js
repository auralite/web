import Client from '@/utils/Client'

const ProfileMeta = ({ profile }) => {
	return (
		<div className="flex items-center justify-center h-screen">
			<h1 className="text-6xl">{profile?.name}'s Auralite profile</h1>
		</div>
	)
}

ProfileMeta.getInitialProps = async ({ query }) => {
	try {
		return { profile: await Client.profile({ handle: query.handle }) }
	} catch (error) {
		return { error }
	}
}

export default ProfileMeta
