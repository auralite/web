import { useState } from 'react'
import withAuth from '@/middleware/auth'
import Client from '@/utils/Client'
import Logo from '@/components/Global/Logo'
import Avatar from '@/components/App/Avatar'
import { handleValidationErrors } from '@/utils/errors'

const CreateProfile = () => {
	const [errors, setErrors] = useState({})

	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [handle, setHandle] = useState('')
	const [bio, setBio] = useState('')
	const [avatar, setAvatar] = useState()

	const submitForm = (event) => {
		event.preventDefault()

		Client.createProfile({ name: `${firstName} ${lastName}`, handle, bio, avatar }).catch((error) => handleValidationErrors(error, setErrors))
	}

	return (
		<div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen">
			<div>
				<Logo className="mx-auto h-12 w-auto" />
				<h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">Create your profile</h2>
				<p className="mt-2 text-center text-sm leading-5 text-gray-600">To get started with Auralite, fill in your profile.</p>
			</div>
			<div className="mt-6 max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
				<div className="md:grid md:grid-cols-3 md:gap-6">
					<div className="md:col-span-1">
						<div className="px-4 sm:px-0">
							<h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>
							<p className="mt-1 text-sm leading-5 text-gray-600">This information will be displayed publicly so be careful what you share.</p>
						</div>
					</div>
					<div className="mt-5 md:mt-0 md:col-span-2">
						<form onSubmit={submitForm}>
							<div className="shadow sm:rounded-md sm:overflow-hidden">
								<div className="px-4 py-5 bg-white sm:p-6">
									<div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6">
										<div className="flex-1 mb-4 sm:mb-0">
											<label htmlFor="name" className="block text-sm font-medium leading-5 text-gray-700">
												First Name
											</label>
											<div className="mt-1 relative rounded-md shadow-sm">
												<input id="name" className={`form-input block w-full sm:text-sm sm:leading-5${errors.name ? ' pr-10 border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red' : ''}`} placeholder="Miguel" value={firstName} onChange={(event) => setFirstName(event.target.value)} required />
												{errors.name && (
													<div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
														<svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
															<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
														</svg>
													</div>
												)}
											</div>
										</div>
										<div className="flex-1">
											<label htmlFor="name" className="block text-sm font-medium leading-5 text-gray-700">
												Last Name
											</label>
											<div className="mt-1 relative rounded-md shadow-sm">
												<input id="name" className={`form-input block w-full sm:text-sm sm:leading-5${errors.name ? ' pr-10 border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red' : ''}`} placeholder="Piedrafita" value={lastName} onChange={(event) => setLastName(event.target.value)} required />
												{errors.name && (
													<div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
														<svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
															<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
														</svg>
													</div>
												)}
											</div>
										</div>
									</div>
									<p className={`mt-2 text-sm ${errors.name ? 'text-red-600' : 'text-gray-500'}`}>{errors.name ? errors.name[0] : "We want to create a space for human interaction, so we ask you to please use your real name. You'll need to verify this before posting."}</p>

									<div className="mt-6">
										<label htmlFor="handle" className="block text-sm font-medium leading-5 text-gray-700">
											Handle
										</label>
										<div className="mt-1 relative rounded-md shadow-sm">
											<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
												<span className="text-gray-500 sm:text-sm sm:leading-5">@</span>
											</div>
											<input id="handle" className={`form-input block w-full pl-8 sm:text-sm sm:leading-5${errors.handle ? ' pr-10 border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red' : ''}`} placeholder="miguel" value={handle} onChange={(event) => setHandle(event.target.value)} required minLength="2" maxLength="255" pattern="^[a-zA-Z_]{1}\w{1,14}$" />
											{errors.handle && (
												<div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
													<svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
														<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
													</svg>
												</div>
											)}
										</div>
										<p className={`mt-2 text-sm ${errors.handle ? 'text-red-600' : 'text-gray-500'}`}>{errors.handle ? errors.handle[0] : 'This can not be changed, so pick something cool!'}</p>
									</div>

									<div className="mt-6">
										<label htmlFor="about" className="block text-sm leading-5 font-medium text-gray-700">
											Bio
										</label>
										<div className="relative rounded-md shadow-sm">
											<textarea data-gramm="false" id="about" rows="3" className={`form-textarea mt-1 block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5${errors.bio ? ' border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red' : ''}`} placeholder="18-year-old maker. Founder of Sitesauce, working on Auralite." onChange={(event) => setBio(event.target.value)} value={bio} required minLength="60" maxLength="160" />
											<div className="absolute bottom-2 right-2 pointer-events-none">
												<span className="text-sm text-gray-400">
													<span className={bio.length < 60 || bio.length > 160 ? 'text-red-400' : 'text-green-400'}>{bio.length}</span>/{bio.length < 60 ? 60 : 160}
												</span>
											</div>
										</div>
										<p className={`mt-2 text-sm ${errors.bio ? 'text-red-600' : 'text-gray-500'}`}>{errors.bio ? errors.bio[0] : 'Brief description for your profile. URLs are hyperlinked. Min 60 chars.'}</p>
									</div>

									<div className="mt-6">
										<label className="block text-sm leading-5 font-medium text-gray-700" htmlFor="avatar">
											Avatar
										</label>
										<div className="mt-2 flex items-center">
											<Avatar isUpdating={true} onChange={(key) => setAvatar(key)} sizeClasses="h-12 w-12" />
										</div>
										<p className={`mt-2 text-sm ${errors.avatar ? 'text-red-600' : 'text-gray-500'}`}>{errors.avatar ? errors.avatar[0] : "We require you to have an avatar so others can recognize you. Don't worry, you can change it from your profile later!"}</p>
									</div>
								</div>
								<div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
									<span className="inline-flex rounded-md shadow-sm">
										<button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
											Create
										</button>
									</span>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

CreateProfile.middleware = withAuth()

export default CreateProfile
