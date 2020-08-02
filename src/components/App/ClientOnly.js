const { useState, useEffect } = require('react')

const ClientOnly = ({ children }) => {
	if (isSSR()) return null

	return children
}

export const isSSR = () => {
	const [hasMounted, setHasMounted] = useState(false)

	useEffect(() => {
		setHasMounted(true)
	}, [])

	return !hasMounted
}

export default ClientOnly
