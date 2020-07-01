import Transition from '../Global/Transition'
import { withRouter } from 'next/router'
import useClickOutside from '../../hooks/click-outside'
import Show from '../../pages/[profile]/posts/[post]'

const Modal = ({ router }) => {
	const { ref: hideOnClickOutside } = useClickOutside(() => router.push(router.pathname, router.pathname, { shallow: true }))

	return (
		<div className={`fixed bottom-0 inset-x-0 px-4 pb-6 sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center z-20 ${router.query.postId ? '' : 'pointer-events-none'}`}>
			<Transition show={!!router.query.postId} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
				<div className="fixed inset-0 transition-opacity">
					<div className="absolute inset-0 bg-gray-500 opacity-75" />
				</div>
			</Transition>

			<Transition show={!!router.query.postId} enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enterTo="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 sm:scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
				<div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-4xl sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline" ref={hideOnClickOutside}>
					<Show postId={router.query.postId} />
				</div>
			</Transition>
		</div>
	)
}

export default withRouter(Modal)
