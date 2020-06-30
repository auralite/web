import { useState } from 'react'
import Transition from '../Global/Transition'

const Alert = ({ title, body }) => {
	const [visible, setVisible] = useState(true)

	setTimeout(() => setVisible(false), 3000)

	return (
		<Transition show={visible} enter="transform ease-out duration-300 transition" enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2" enterTo="translate-y-0 opacity-100 sm:translate-x-0" leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
			<div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto">
				<div className="rounded-lg shadow-xs overflow-hidden">
					<div className="p-4">
						<div className="flex items-start">
							<div className="flex-shrink-0">
								<svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
							</div>
							<div className="ml-3 w-0 flex-1 pt-0.5">
								<p className="text-sm leading-5 font-medium text-gray-900">{title}</p>
								<p className="mt-1 text-sm leading-5 text-gray-500">{body}</p>
							</div>
							<div className="ml-4 flex-shrink-0 flex">
								<button onClick={() => setVisible(false)} className="inline-flex text-gray-400 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150">
									<svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
										<path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Transition>
	)
}

export default Alert
