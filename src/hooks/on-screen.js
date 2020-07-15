import { useState, useEffect, useRef } from 'react'

function useOnScreen(ref, rootMargin = '0px') {
	const [isIntersecting, setIntersecting] = useState(false)
	const observer = useRef(null)

	useEffect(() => {
		observer.current = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting), { rootMargin })
	}, [])

	useEffect(() => {
		if (!observer.current) return

		if (ref.current) observer.current.observe(ref.current)

		return () => {
			if (ref.current) observer.current.unobserve(ref.current)
		}
	}, [ref, observer])

	return [ref, isIntersecting]
}

export default useOnScreen
