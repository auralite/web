import { useState, useEffect } from 'react'
import Transition from '../Global/Transition'
import useClickOutside from '../../hooks/click-outside'

const ConfirmationModal = () => {
	const [visible, setVisible] = useState(false)

	const { ref: hideOnClickOutside } = useClickOutside(() => setVisible(false))

	useEffect(() => {
		setVisible(!!window.location.search.match(/confirmed/))
	}, [])

	return (
		<Transition show={visible}>
			<div className="fixed bottom-0 inset-x-0 px-4 pb-6 sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center z-20">
				<Transition enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
					<div className="fixed inset-0 transition-opacity">
						<div className="absolute inset-0 bg-gray-500 opacity-75" />
					</div>
				</Transition>
				<Transition enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enterTo="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 sm:scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
					<div className="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-md sm:w-full sm:p-6" role="dialog" aria-modal="true" aria-label="Social Share Modal" ref={hideOnClickOutside}>
						<div>
							<div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-2xl">
								<svg className="block h-8 w-8 mx-auto" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
									<g fill="none" fillRule="evenodd">
										<path d="M11.87 63.903l16.264-40.305c1.886-5.656 8.957-2.356 21.213 9.9 12.255 12.255 15.555 19.326 9.9 21.213L18.94 70.974c-1.885.943-3.771.472-5.657-1.414-1.885-1.886-2.357-3.771-1.414-5.657zM41.569 15.82l2.828-2.829 2.828 2.829-2.828 2.828zm-16.264-3.536l2.829-2.828 2.828 2.828-2.828 2.829z" fill="#C3CAEA" />
										<path fill="#7282C6" d="M22.477 20.77l2.828-2.829 2.829 2.829-2.829 2.828zm41.037 28.259l3.464-2 2 3.464-3.464 2z" />
										<path fill="#98A7E7" d="M58.564 17.21l3.464-2 2 3.463-3.464 2z" />
										<path fill="#7282C6" d="M44.422 24.28l3.464-2 2 3.464-3.464 2z" />
										<path fill="#98A7E7" d="M69.17 53.272l3.465-2 2 3.464-3.464 2z" />
										<path fill="#C3CAEA" d="M62.807 61.1l2-3.465 3.464 2-2 3.465z" />
										<path fill="#98A7E7" d="M13.31 44.129l2-3.464 3.463 2-2 3.464z" />
										<path fill="#7282C6" d="M64.22 66.707l3.465-2 2 3.464-3.464 2z" />
										<path fill="#98A7E7" d="M52.272 59.635l3.464-2 2 3.465-3.464 2zm8.035-7.399c-1.757 1.757-9.83-3.466-18.031-11.667-8.201-8.201-13.425-16.274-11.668-18.032 1.758-1.757 9.83 3.467 18.032 11.668 8.2 8.2 13.424 16.273 11.667 18.03z" />
										<path d="M52.231 34.968v-7.071c-.037-3.809 1.948-4.417 5.955-1.824 4.006 2.593 6.128 3.535 6.364 2.828-2.593-3.535-3.182-6.01-1.768-7.424 2.121-2.122 4.95 2.121 7.07 0 1.415-1.415 1.18-3.536-.706-6.364l2.121-2.122c2.828 4.243 3.182 7.425 1.06 9.546-3.181 3.182-8.131-1.06-8.131.354 0 1.414 3.535 4.95 1.414 7.07-2.121 2.122-7.778-2.12-8.485-2.827-.472-.472-.707-.236-.707.707v7.07l-4.187.057z" fill="#C3CAEA" />
										<path d="M45.385 43.544c8.678-4.812 18.013-7.218 28.003-7.218v4.243c-11.34-1.112-19.847.608-25.524 5.159a86.092 86.092 0 01-2.479-2.184zm-7.14-7.259c1.796-12.953.193-19.657-4.808-20.112v-3.535c4.714.943 7.424 4.125 8.132 9.546.663 5.082.186 10.476-1.43 16.18a91.083 91.083 0 01-1.894-2.079zM13.991 17.941c.792 1.672 4.597.354 6.01 2.475 1.415 2.121-3.535 3.536-5.303 5.303-1.178 1.179.118 1.768 3.89 1.768 2.12-.236 3.653.118 4.596 1.06.943.944-.236 3.536-3.536 7.779l-1.768-.354c.472-.471 1.415-1.885 2.829-4.242 1.414-2.357.353-3.418-3.182-3.182-2.829 0-4.478-.707-4.95-2.122-.471-1.414.943-2.828 4.243-4.242-2.829 0-4.714-.943-5.657-2.829-.943-1.885.354-4.124 3.889-6.717l1.768 1.06c-2.829 1.415-3.62 2.571-2.829 4.243z" fill="#7282C6" />
									</g>
								</svg>
							</div>
							<div className="mt-3 text-center sm:mt-5">
								<h3 className="text-xl leading-6 font-bold text-gray-900">Social networks are better with friends</h3>
								<div className="mt-2">
									<p className="leading-6 text-gray-500">The more users who join Auralite, the better it'll be. We've even written something for you if you're in a rush. Thank you for helping us get the word out!</p>
								</div>
							</div>
						</div>
						<div className="mt-5 sm:mt-6">
							<span className="flex w-full rounded-md shadow-sm">
								<a href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fauralite.io&text=I%20just%20joined%20the%20Auralite%20early-access%20list%2C%20a%20new%20social%20network%20by%20@m1guelpf" className="inline-flex items-center justify-center py-2 px-6 border border-transparent text-sm font-bold rounded-md text-white bg-indigo-500 transition duration-150 ease-in-out hover:bg-indigo-400 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-500 w-full" target="_blank" rel="noopener noreferrer">
									<svg className="mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
										<path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
									</svg>
									<div>Help us out with a Tweet</div>
								</a>
							</span>
						</div>
					</div>
				</Transition>
			</div>
		</Transition>
	)
}

export default ConfirmationModal
