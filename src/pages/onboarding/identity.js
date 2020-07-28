import { useState, useEffect } from 'react'
import Logo from '@/components/Global/Logo'
import LoadingButton from '@/components/App/LoadingButton'
import Client from '@/utils/Client'
import { useRouter } from 'next/router'
import withAuth from '@/middleware/auth'
import useUser from '@/hooks/user'

const Verify = () => {
	const router = useRouter()
	const { user } = useUser
	const isWaiting = user?.profile?.verification_status === 'IN_PROGRESS'
	const [isLoading, setIsLoading] = useState(false)
	const startVerification = (event) => {
		event.preventDefault()

		setIsLoading(true)

		Client.startIdentityVerification()
	}

	useEffect(() => {
		if (!isWaiting) return

		setIsLoading(true)
	}, [isWaiting])

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-lg w-full">
				<Logo className="mx-auto h-12 w-auto" />
				<h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">{isWaiting ? "We're now verifying your identity." : 'Verify your identity'}</h2>
				{router.query.error && (
					<div className="rounded-md bg-red-50 p-4 mt-6">
						<div className="flex">
							<div className="flex-shrink-0">
								<svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
									<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
								</svg>
							</div>
							<div className="ml-3">
								<h3 className="text-sm leading-5 font-medium text-red-800">We had some issues while verifying your identity</h3>
								<div className="mt-2 text-sm leading-5 text-red-700">
									{router.query.error === 'consent_declined' && <p>You need to consent to the verification to proceed</p>}
									{router.query.error === 'unverified' && <p>We were unable to verify your identity. Please try again or contact us if the issue persists.</p>}
									{router.query.error === 'name_check_failed' && <p>We were able to verify your identity, but couldn't verify your name matches the one on your profile. Please contact us to resolve this issue.</p>}
								</div>
							</div>
						</div>
					</div>
				)}
				{isWaiting ? <p className="mt-6 text-center text-gray-600">Feel free to close this tab and go on with your day, we'll make sure to email you when we're done.</p> : <p className="mt-6 text-center text-gray-600">We want to make Auralite about people and, to do so, we require you to verify your identity.</p>}
				{isWaiting || (
					<div className="mt-6 max-w-md mx-auto">
						<LoadingButton loading={isLoading} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out" type="button" onClick={startVerification}>
							<span className="absolute left-0 inset-y-0 flex items-center pl-3">
								<svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150" fill="currentColor" viewBox="0 0 20 20">
									<path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
								</svg>
							</span>
							Start Verification
						</LoadingButton>
					</div>
				)}
			</div>
		</div>
	)
}

Verify.middleware = withAuth()

export default Verify
