import Transition from '../Global/Transition'

const Modal = ({ isVisible, onClose = () => {}, children }) => {
	return (
		<div className={`fixed px-2 sm:px-0 bottom-0 inset-0 p-0 flex items-center justify-center z-20 ${isVisible ? '' : 'pointer-events-none'}`}>
			<Transition show={isVisible} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
				<div className="fixed inset-0 transition-opacity">
					<div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose} />
				</div>
			</Transition>

			<Transition show={isVisible} enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enterTo="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 sm:scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
				<div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all w-full sm:max-w-4xl" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
					{children}
				</div>
			</Transition>
		</div>
	)
}

export default Modal
