import { useState, useEffect } from 'react'

function useOnScreen(ref, rootMargin = '0px') {
	const [isIntersecting, setIntersecting] = useState(false)

	const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting), { rootMargin })

	useEffect(() => {
		if (ref.current) observer.observe(ref.current)

		return () => {
			if (ref.current) observer.unobserve(ref.current)
		}
	}, [ref])

	return [ref, isIntersecting]
}

export default useOnScreen
