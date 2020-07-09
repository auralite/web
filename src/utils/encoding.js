export const base64 = (str) => {
	if (typeof window !== 'undefined') return btoa(str)

	return Buffer.from(str).toString('base64')
}
