import { useState, useEffect, useRef } from 'react'

function useOnScreen(rootMargin = '0px') {
	const ref = useRef(null)

	const [isIntersecting, setIntersecting] = useState(false)

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting), { rootMargin })

		if (ref.current) {
			observer.observe(ref.current)
		}
		return () => {
			observer.unobserve(ref.current)
		}
	}, [])

	return [ref, isIntersecting]
}

export default useOnScreen
