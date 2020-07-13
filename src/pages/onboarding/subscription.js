import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js/pure'
import Client from '@/utils/Client'
import Logo from '@/components/Global/Logo'
import withAuth from '@/middleware/auth'

const Subscription = () => {
	const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY)

	const [plan, setPlan] = useState('yearly')

	const launchCheckout = async () => {
		const sessionId = await Client.launchCheckout({ plan }).catch(() => alert('Something went wrong when creating your subscription. Please reload the page and try again, or contact us if the problem persists.'))

		const stripe = await stripePromise

		const { error } = await stripe.redirectToCheckout({ sessionId })

		if (error) alert(error)
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="w-full">
				<div className="max-w-4xl mx-auto">
					<Logo className="mx-auto h-12 w-auto" />
					<h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">Subscribe to Auralite</h2>
				</div>
				<div className="mt-6 max-w-4xl mx-auto rounded-md bg-indigo-50 p-4 border border-indigo-300">
					<div className="flex">
						<div className="flex-shrink-0">
							<svg className="h-5 w-5 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
								<path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
							</svg>
						</div>
						<div className="ml-3 flex-1 md:flex md:justify-between">
							<p className="text-sm leading-5 text-indigo-700">Since you're gonna be helping test Auralite while it's still in beta, we'll apply a 50% discount to your account. Have fun!</p>
						</div>
					</div>
				</div>
				<div className="mt-8">
					<div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="max-w-lg mx-auto rounded-lg border border-gray-200 shadow overflow-hidden lg:max-w-none lg:flex">
							<div className="bg-white px-6 py-8 lg:flex-shrink-1 lg:p-12">
								<h3 className="text-2xl leading-8 font-extrabold text-gray-900 sm:text-3xl sm:leading-9">{plan === 'yearly' ? 'Yearly' : 'Monthly'} Membership</h3>
								<p className="mt-6 text-base leading-6 text-gray-500">Ad-funded platforms focus on the advertisers who are generating money. With an user-funded platform we can focus exclusively on improving your experience.</p>
								<div className="mt-8">
									<div className="flex items-center">
										<h4 className="flex-shrink-0 pr-4 bg-white text-sm leading-5 tracking-wider font-semibold uppercase text-indigo-600">What's included</h4>
										<div className="flex-1 border-t-2 border-gray-200" />
									</div>
									<ul className="mt-8 lg:grid lg:grid-cols-2 lg:col-gap-8 lg:row-gap-5">
										<li className="flex items-start lg:col-span-1">
											<div className="flex-shrink-0">
												<svg className="h-5 w-5 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
													<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
												</svg>
											</div>
											<p className="ml-3 text-sm leading-5 text-gray-700">No ads, ever</p>
										</li>
										<li className="mt-5 flex items-start lg:col-span-1 lg:mt-0">
											<div className="flex-shrink-0">
												<svg className="h-5 w-5 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
													<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
												</svg>
											</div>
											<p className="ml-3 text-sm leading-5 text-gray-700">A voice on the development of Auralite</p>
										</li>
										<li className="mt-5 flex items-start lg:col-span-1 lg:mt-0">
											<div className="flex-shrink-0">
												<svg className="h-5 w-5 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
													<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
												</svg>
											</div>
											<p className="ml-3 text-sm leading-5 text-gray-700">Total control over your privacy</p>
										</li>
										<li className="mt-5 flex items-start lg:col-span-1 lg:mt-0">
											<div className="flex-shrink-0">
												<svg className="h-5 w-5 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
													<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
												</svg>
											</div>
											<p className="ml-3 text-sm leading-5 text-gray-700">Unlimited access to Auralite, everything included!</p>
										</li>
									</ul>
								</div>
							</div>
							<div className="py-8 px-6 text-center bg-gray-50 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12">
								<p className="text-lg leading-6 font-medium text-gray-900">Pay once, enjoy all {plan === 'yearly' ? 'year' : 'month'}</p>
								<div className="mt-4 flex items-center justify-center text-5xl leading-none font-extrabold text-gray-900">
									<span>${plan === 'yearly' ? '99' : '10'}</span>
									<span className="ml-3 text-xl leading-7 font-medium text-gray-500">/ {plan === 'yearly' ? 'yr' : 'month'}</span>
								</div>
								<div className="mt-6">
									<div className="rounded-md shadow">
										<button type="button" onClick={launchCheckout} className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
											Start 7-day trial
										</button>
									</div>
								</div>
								<div className="mt-4 text-sm leading-5">
									<button type="button" onClick={() => setPlan(plan === 'yearly' ? 'monthly' : 'yearly')} className="font-medium text-gray-700 underline focus:outline-none focus:text-gray-900 hover:text-gray-900 transition duration-100 ease-in-out">
										I'd rather pay {plan === 'yearly' ? 'monthly' : 'yearly'}
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

Subscription.middleware = withAuth()

export default Subscription
