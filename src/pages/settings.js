import withAuth from '@/middleware/auth'
import { usePageLayout } from '@/components/App/PageLayout'
import { useState, useEffect } from 'react'
import LoadingButton from '@/components/App/LoadingButton'
import Client from '@/utils/Client'
import useAlert from '@/hooks/alert'
import { handleValidationErrors } from '@/utils/errors'
import { logout } from '@/utils/auth'
import useUser from '@/hooks/user'

const Settings = () => {
	const { user, mutate } = useUser()
	const { createAlert } = useAlert()
	const [errors, setErrors] = useState({})
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	useEffect(() => {
		setEmail(user?.email)
	}, [user])

	const updateEmail = (event, setLoading) => {
		event.preventDefault()

		setLoading(true)

		Client.updateEmail({ email })
			.then((response) => {
				createAlert({ title: 'Email Updated', body: 'Your email has been updated successfully. You may need to verify your account again.' })

				mutate(response)

				setLoading(false)
			})
			.catch((error) => {
				handleValidationErrors(error, setErrors)

				setLoading(false)
			})
	}

	const openBilling = (event, setLoading) => {
		event.preventDefault()

		setLoading(true)

		Client.redirectToBilling()
	}

	const updatePassword = (event, setLoading) => {
		event.preventDefault()

		setLoading(true)

		Client.updatePassword({ password, confirmPassword })
			.then(() => {
				createAlert({ title: 'Password Updated', body: 'Your password has been updated successfully. You may need to login again.' })

				setTimeout(() => logout(), 5000)

				setLoading(false)
			})
			.catch((error) => {
				handleValidationErrors(error, setErrors)

				setLoading(false)
			})
	}

	const connectTwitter = (event, setLoading) => {
		event.preventDefault()

		setLoading(true)

		Client.connectTwitter()
	}

	const unlinkTwitter = (event) => {
		event.preventDefault()

		Client.unlinkTwitter()
			.then((response) => {
				mutate('/api/user', response)
			})
			.catch((error) => {
				handleValidationErrors(error, setErrors)
			})
	}

	return (
		<>
			<SettingsPanel title="Account" onSubmit={updateEmail} submitDisabled={email === user?.email}>
				<SettingsField label="Email address" errors={errors} id="email" type="email" placeholder="miguel@auralite.io" value={email} onChange={(email) => setEmail(email)} description="You'll need to verify your email again after updating it." />
			</SettingsPanel>

			<SettingsPanel title="Security" onSubmit={updatePassword} submitDisabled={password.trim() === '' || password !== confirmPassword} cta="Update">
				<SettingsField label="Password" errors={errors} id="password" type="password" placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;" value={password} onChange={(password) => setPassword(password)} description="We'll email you to let you know your password has changed." />
				<SettingsField label="Repeat password" errors={errors} id="password_confirmation" type="password" placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;" value={confirmPassword} onChange={(password) => setConfirmPassword(password)} />
			</SettingsPanel>

			<SettingsPanel title="Connections" onSubmit={user?.has_twitter_token ? unlinkTwitter : connectTwitter} withFooter={false}>
				<div className="col-span-12 flex flex-col md:flex-row items-center justify-between">
					<div>
						<h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-400">Connect to Twitter</h3>
						<div className="mt-2 max-w-xl lg:max-w-2xl text-sm leading-5 text-gray-600 md:pr-4">
							<p>Link your Twitter account to Auralite to automatically cross-post your Auralite posts to your Twitter profile. This is not applied for replies.</p>
						</div>
					</div>
					<div className="mt-4 md:mt-0 w-full md:w-auto">
						<span className="inline-flex rounded-md shadow-sm w-full">
							<button type="submit" className="w-full relative px-4 py-2 border border-gray-300 dark:border-gray-700 text-sm leading-5 font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:text-gray-800 dark-hover:text-gray-200 dark-hover:bg-gray-700 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in">
								{user?.has_twitter_token ? 'Unlink account' : 'Link account'}
							</button>
						</span>
					</div>
				</div>
			</SettingsPanel>

			<SettingsPanel title="Billing" cta="Open Billing Center" onSubmit={openBilling} />
		</>
	)
}

const SettingsPanel = ({ title, onSubmit, children, submitDisabled, cta = 'Save', withFooter = true }) => {
	const [loading, setLoading] = useState(false)

	return (
		<form onSubmit={(event) => onSubmit(event, setLoading)} className="mt-6 bg-white dark:bg-gray-900 shadow sm:rounded-lg overflow-hidden">
			<div className="px-4 py-5 sm:p-6">
				<div className={children ? 'mb-5' : ''}>
					<h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-400">{title}</h3>
				</div>
				<div>
					<div className="grid grid-cols-6 gap-6">{children}</div>
				</div>
			</div>
			{withFooter && (
				<div className="px-4 py-3 bg-gray-50 dark:bg-transparent sm:dark:bg-gray-800 dark:bg-opacity-25 text-right sm:px-6">
					<span className="inline-flex rounded-md shadow-sm">
						<LoadingButton loading={loading} disabled={submitDisabled} type="submit" disabledClasses="bg-indigo-300 dark:bg-indigo-600 dark:bg-opacity-10 cursor-not-allowed" loadingClasses="bg-indigo-300 dark:bg-indigo-600 dark:bg-opacity-10 cursor-wait" activeClasses="hover:bg-indigo-500 focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 bg-indigo-600 dark:bg-indigo-700 dark:bg-opacity-90" className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white focus:outline-none transition ease-in-out duration-150">
							{cta}
						</LoadingButton>
					</span>
				</div>
			)}
		</form>
	)
}

const SettingsField = ({ label, errors, id, type = 'text', placeholder, value, description, onChange }) => {
	return (
		<div className="col-span-6 sm:col-span-4">
			<label htmlFor={id} className="block text-sm font-medium leading-5 text-gray-700 dark:text-gray-400">
				{label}
			</label>
			<div className="mt-1 relative rounded-md shadow-sm">
				<input id={id} className={`form-input dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 block w-full ${errors[id] ? 'pr-10 border-red-300 dark:border-red-500 text-red-900 dark:text-red-700 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red' : ''} sm:text-sm sm:leading-5`} placeholder={placeholder} value={value} onChange={(event) => onChange(event.target.value)} type={type} required />
				{errors[id] && (
					<div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
						<svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
							<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
						</svg>
					</div>
				)}
			</div>
			<p className={`mt-2 text-sm ${errors[id] ? 'text-red-600 dark:text-red-500' : 'text-gray-500 dark:text-gray-600'}`}>{errors[id] ? errors[id][0] : description}</p>
		</div>
	)
}

Settings.middleware = withAuth()
Settings.getLayout = usePageLayout('Settings')

export default Settings
