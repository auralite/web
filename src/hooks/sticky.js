import { useEffect, useState } from 'react'

const useStickyState = (defaultValue, key, shouldEncode = true) => {
	if (typeof window === 'undefined') {
		return useState(defaultValue)
	}

	const encode = shouldEncode ? (val) => JSON.stringify(val) : (val) => val
	const decode = shouldEncode ? (val) => JSON.parse(val) : (val) => val

	const [value, setValue] = useState(() => {
		const stickyValue = window.localStorage.getItem(key)
		return stickyValue !== null ? decode(stickyValue) : typeof defaultValue == 'function' ? defaultValue() : defaultValue
	})

	useEffect(() => {
		window.localStorage.setItem(key, encode(value))
	}, [key, value])

	return [value, setValue]
}

export default useStickyState
