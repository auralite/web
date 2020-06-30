import { useEffect, useRef } from 'react'

const useClickOutside = (handleClick) => {
	const ref = useRef(null)
	const excludeRef = useRef(null)

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (!ref.current || ref.current.contains(event.target) || (excludeRef.current && excludeRef.current.contains(event.target))) return

			handleClick()
		}

		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [ref, excludeRef, handleClick])

	return { ref, excludeRef }
}

export default useClickOutside
