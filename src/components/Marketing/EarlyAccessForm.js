import axios from 'axios'
import { useState, useEffect } from 'react'

const EarlyAccessForm = () => {
	const [subscribed, setSubscribed] = useState(false)
	const [email, setEmail] = useState('')

	useEffect(() => {
		setSubscribed(localStorage.getItem('subscribed') == 'true')
	}, [])

	const handleForm = async (event) => {
		event.preventDefault()

		try {
			await axios.post('https://newsletter.m1guelpf.me/api/subscribe/6fd363df-ec34-4a07-ae2d-8e38e5d1a6fd', { email })
		} catch (error) {
			if (!error.response || error.response.data.code !== 'already_subscribed') return alert(error.response.data.message)
		}

		setSubscribed(true)

		if (window.fathom) window.fathom.trackGoal('LQLUQ7ZW', 0)

		localStorage.setItem('subscribed', true)
	}

	return (
		<div className="relative max-w-screen-xl mx-auto px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
			<div className="px-6 py-6 bg-indigo-700 rounded-lg md:py-12 md:px-12 lg:py-16 lg:px-10 lg:flex lg:items-center lg:justify-between">
				{subscribed ? (
					<div x-show="subscribed" className="w-full text-center xl:w-0 xl:flex-1">
						<h2 className="text-2xl leading-8 font-extrabold tracking-tight text-white sm:text-3xl sm:leading-9">You've requested early-access</h2>
						<p className="mt-3 text-lg leading-6 text-indigo-200">If you haven't already, make sure to confirm your subscription by clicking on the link we've sent you.</p>
					</div>
				) : (
					<>
						<div className="xl:w-0 xl:flex-1">
							<h2 className="text-2xl leading-8 font-extrabold tracking-tight text-white sm:text-3xl sm:leading-9">Get early-access</h2>
							<p className="mt-3 max-w-lg text-lg leading-6 text-indigo-200">Learn more about Auralite and be the first one to get access.</p>
						</div>
						<div className="mt-8 sm:w-full sm:max-w-md xl:mt-0 xl:ml-8">
							<form onSubmit={handleForm} className="sm:flex">
								<input aria-label="Email address" type="email" required className="appearance-none w-full px-5 py-3 border border-transparent text-base leading-6 rounded-md text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 transition duration-150 ease-in-out" placeholder="Enter your email" value={email} onChange={(event) => setEmail(event.target.value)} />
								<div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
									<button className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-400 focus:outline-none focus:bg-indigo-400 transition duration-150 ease-in-out">Sign me up</button>
								</div>
							</form>
							<p className="mt-3 text-sm leading-5 text-indigo-200">Your email will only be used to let you know about Auralite updates and send you your early-access invite. You can unsubscribe at any time.</p>
						</div>
					</>
				)}
			</div>
		</div>
	)
}

export default EarlyAccessForm
