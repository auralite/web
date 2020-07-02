import React, { useState, useEffect } from 'react'
import Logo from '../components/Global/Logo'
import Cookies from 'js-cookie'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router'
import { withGuest } from '../middleware/auth'

const Login = () => {
	const router = useRouter()
	const [error, setError] = useState(null)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	useEffect(() => {
		router.prefetch('/home')
	}, [])

	const loginUser = (event) => {
		event.preventDefault()

		setError(null)

		axios
			.post('/api/auth/login', { email, password })
			.then((response) => {
				Cookies.set('auralite_token', response.data.access_token)

				router.push('/home')
			})
			.catch((error) => {
				if (error.response.data.error !== 'invalid_grant') return alert('Something went wrong! Please try again or contact us if the problem persists.')

				setError('These credentials do not match our records.')
			})
	}

	useEffect(() => setError(null), [email, password])

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full">
				<div>
					<Logo className="mx-auto h-12 w-auto" />
					<h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">Sign in to your account</h2>
					<p className="mt-2 text-center text-sm leading-5 text-gray-600">
						Or{' '}
						<Link href="/">
							<a className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">apply for early access</a>
						</Link>
					</p>
				</div>
				<form className="mt-8" onSubmit={loginUser}>
					<div className="rounded-md shadow-sm">
						<div>
							<input className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${error ? 'border-red-400 placeholder-red-500 text-red-900 focus:shadow-outline-red focus:border-red-300' : 'border-gray-300 placeholder-gray-500 text-gray-900 focus:shadow-outline-blue focus:border-blue-300'} rounded-t-md focus:outline-none focus:z-10 sm:text-sm sm:leading-5`} type="email" aria-label="Email address" placeholder="Email address" value={email} onChange={(event) => setEmail(event.target.value)} required />
						</div>
						<div className="-mt-px">
							<input aria-label="Password" name="password" type="password" required className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${error ? 'border-red-400 placeholder-red-500 text-red-900 focus:shadow-outline-red focus:border-red-300' : 'border-gray-300 placeholder-gray-500 text-gray-900 focus:shadow-outline-blue focus:border-blue-300'} rounded-b-md focus:outline-none focus:z-10 sm:text-sm sm:leading-5`} placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
						</div>
					</div>
					{error && <p className="mt-2 text-sm leading-5 text-red-600">{error}</p>}

					<div className="mt-6 flex items-center justify-between">
						<div className="flex items-center">
							<input id="remember_me" type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" defaultChecked={true} />
							<label htmlFor="remember_me" className="ml-2 block text-sm leading-5 text-gray-900">
								Remember me
							</label>
						</div>

						<div className="text-sm leading-5">
							<button onClick={() => alert('nah')} className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
								Forgot your password?
							</button>
						</div>
					</div>

					<div className="mt-6">
						<button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
							<span className="absolute left-0 inset-y-0 flex items-center pl-3">
								<svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150" fill="currentColor" viewBox="0 0 20 20">
									<path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
								</svg>
							</span>
							Sign in
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

Login.middleware = withGuest()

export default Login
