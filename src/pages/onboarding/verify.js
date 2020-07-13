import { useState, useEffect } from 'react'
import Client from '@/utils/Client'
import Logo from '@/components/Global/Logo'
import useAlert from '@/hooks/alert'
import { useBaseLayout } from '@/components/App/BaseLayout'
import withAuth from '@/middleware/auth'

const VerifyEmail = () => {
	const [status, setStatus] = useState(null)
	const { createAlert } = useAlert()

	useEffect(() => {
		if (!status) return

		createAlert({
			title: 'Verification Resent',
			body: status,
		})
	}, [status])

	const resendVerification = (event) => {
		event.preventDefault()

		Client.resendEmailVerification().then(() => setStatus('A fresh verification link has been sent to your email address.'))
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full">
				<div>
					<Logo className="mx-auto h-12 w-auto" />
					<h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">Verify your email</h2>
					<p className="mt-6 text-center text-gray-600">We've sent you an email with a verification link. Please click it to start creating your Auralite profile.</p>
					{!status && (
						<div className="mt-2 text-center">
							<button type="button" onClick={resendVerification} className="cursor-pointer text-indigo-500 font-medium hover:underline focus:outline-none focus:underline">
								Didn't get it? Resend.
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

VerifyEmail.middleware = withAuth()

export default VerifyEmail
