import { useState } from 'react'
import Transition from '../Global/Transition'
import { CheckCircleOutline, CrossSolid } from './Icon'

const Alert = ({ title, body }) => {
	const [visible, setVisible] = useState(true)

	setTimeout(() => setVisible(false), 3000)

	return (
		<Transition show={visible} enter="transform ease-out duration-300 transition" enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2" enterTo="translate-y-0 opacity-100 sm:translate-x-0" leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
			<div className="max-w-sm w-full bg-white dark:bg-gray-900 shadow-lg rounded-lg pointer-events-auto">
				<div className="rounded-lg shadow-xs overflow-hidden">
					<div className="p-4">
						<div className="flex items-start">
							<div className="flex-shrink-0">
								<CheckCircleOutline className="h-6 w-6 text-green-400 dark:text-green-500" />
							</div>
							<div className="ml-3 w-0 flex-1 pt-0.5">
								<p className="text-sm leading-5 font-medium text-gray-900 dark:text-gray-300">{title}</p>
								<p className="mt-1 text-sm leading-5 text-gray-500 dark:text-gray-500">{body}</p>
							</div>
							<div className="ml-4 flex-shrink-0 flex">
								<button onClick={() => setVisible(false)} className="inline-flex text-gray-400 dark:text-gray-500 focus:outline-none transition ease-in-out duration-150">
									<CrossSolid className="h-5 w-5" />
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
