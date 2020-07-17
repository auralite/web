import { withGuest } from '@/middleware/auth'
import { useBaseLayout } from '@/components/App/BaseLayout'
import { useState } from 'react'
import Logo from '@/components/Global/Logo'
import Link from 'next/link'
import LoadingButton from '@/components/App/LoadingButton'
import Client from '@/utils/Client'
import { handleValidationErrors } from '@/utils/errors'
import axios from 'axios'
import { login } from '@/utils/auth'
import { useRouter } from 'next/router'

const Register = () => {
	const router = useRouter()

	const [loading, setLoading] = useState(false)
	const [errors, setErrors] = useState({})
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [code, setCode] = useState('')

	const registerUser = (e) => {
		e.preventDefault()

		setLoading(true)

		axios
			.post('/api/auth/register', { email, password, code })
			.then((response) => {
				login(response.data.access_token)

				router.push('/home')
			})
			.catch((error) => {
				setLoading(false)

				handleValidationErrors(error, setErrors)
			})
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full">
				<div>
					<Logo className="mx-auto h-12 w-auto" />
					<h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">Create an Auralite account</h2>
					<p className="mt-2 text-center text-sm leading-5 text-gray-600">
						Or{' '}
						<Link href="/login">
							<a className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">log back into your account</a>
						</Link>
					</p>
				</div>
				<form className="mt-8" onSubmit={registerUser}>
					<div className="rounded-md shadow-sm">
						<div>
							<input className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${errors.email ? 'border-red-400 placeholder-red-500 text-red-900 focus:shadow-outline-red focus:border-red-300' : 'border-gray-300 placeholder-gray-500 text-gray-900 focus:shadow-outline-blue focus:border-blue-300'} rounded-md focus:outline-none focus:z-10 sm:text-sm sm:leading-5`} type="email" aria-label="Email address" placeholder="Email address" value={email} onChange={(event) => setEmail(event.target.value)} required />
						</div>
					</div>
					{errors.email && <p className="mt-2 text-sm leading-5 text-red-600">{errors.email[0]}</p>}

					<div className="mt-2 rounded-md shadow-sm">
						<div>
							<input className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${errors.password ? 'border-red-400 placeholder-red-500 text-red-900 focus:shadow-outline-red focus:border-red-300' : 'border-gray-300 placeholder-gray-500 text-gray-900 focus:shadow-outline-blue focus:border-blue-300'} rounded-md focus:outline-none focus:z-10 sm:text-sm sm:leading-5`} type="password" aria-label="Password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} required />
						</div>
					</div>
					{errors.password && <p className="mt-2 text-sm leading-5 text-red-600">{errors.password[0]}</p>}

					<div className="mt-2 rounded-md shadow-sm">
						<div>
							<input className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${errors.code ? 'border-red-400 placeholder-red-500 text-red-900 focus:shadow-outline-red focus:border-red-300' : 'border-gray-300 placeholder-gray-500 text-gray-900 focus:shadow-outline-blue focus:border-blue-300'} rounded-md focus:outline-none focus:z-10 sm:text-sm sm:leading-5`} type="text" aria-label="Invite Code" placeholder="Invite Code" value={code} onChange={(event) => setCode(event.target.value)} required />
						</div>
					</div>
					{errors.code && (
						<p className="mt-2 text-sm leading-5 text-red-600">
							Invite codes are required until public launch. If you don't have one, and you want one,{' '}
							<a className="underline" href="https://auralite.io">
								click here
							</a>
							.
						</p>
					)}

					<div className="mt-4">
						<LoadingButton loading={loading} type="submit" activeClasses="hover:bg-indigo-500  focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 bg-indigo-600" loadingClasses="bg-indigo-400 cursor-wait" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white focus:outline-none transition duration-150 ease-in-out">
							<span className="absolute left-0 inset-y-0 flex items-center pl-3">
								<svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150" fill="currentColor" viewBox="0 0 20 20">
									<path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
								</svg>
							</span>
							Get Started
						</LoadingButton>
					</div>
				</form>
			</div>
		</div>
	)
}

Register.getLayout = useBaseLayout()

Register.middleware = withGuest()

export default Register
