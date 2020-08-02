import { useMemo } from 'react'
import replace from 'react-string-replace'
import Link from 'next/link'

const useFormat = (content, { underlineLinks = false } = {}) => {
	return useMemo(() => {
		let formatted = replace(content, /([A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~?#/.=]+)/g, (url, i) => {
			try {
				return (
					<a key={url + i} href={url} target="_blank" className={`text-indigo-500 ${underlineLinks ? 'underline' : ''} hover:underline`} rel="noopener noreferrer nofollow">
						{normalizeUrl(url)}
					</a>
				)
			} catch {
				return <span key={url + i}>{url}</span>
			}
		})
		formatted = replace(formatted, /([@]+[A-Za-z0-9-_]+)/g, (username, i) => (
			<Link key={username + i} href="/[profile]" as={`/${username.replace('@', '')}`}>
				<a className="text-indigo-500 hover:underline">{username}</a>
			</Link>
		))
		return replace(formatted, '\n', (_, key) => <br key={'br' + key} />)
	}, [content])
}

const normalizeUrl = (urlString) => {
	urlString = urlString.trim()

	const hasRelativeProtocol = urlString.startsWith('//')
	const isRelativeUrl = !hasRelativeProtocol && /^\.*\//.test(urlString)

	// Prepend protocol
	if (!isRelativeUrl) urlString = urlString.replace(/^(?!(?:\w+:)?\/\/)|^\/\//, 'https:')

	let urlObj
	try {
		urlObj = new URL(urlString)
	} catch {
		return urlString
	}

	// Remove auth
	urlObj.username = ''
	urlObj.password = ''
	urlObj.hash = ''
	urlObj.search = ''

	// Decode URI octets
	if (urlObj.pathname) {
		try {
			urlObj.pathname = decodeURI(urlObj.pathname)
			// eslint-disable-next-line no-empty
		} catch (_) {}
	}

	if (urlObj.hostname) {
		// Remove trailing dot
		urlObj.hostname = urlObj.hostname.replace(/\.$/, '')

		// Remove `www.`
		if (/^www\.(?:[a-z\-\d]{2,63})\.(?:[a-z.]{2,5})$/.test(urlObj.hostname)) {
			urlObj.hostname = urlObj.hostname.replace(/^www\./, '')
		}
	}

	urlObj.pathname = urlObj.pathname.replace(/\/$/, '')

	// Take advantage of many of the Node `url` normalizations
	urlString = urlObj.toString()

	// Remove ending `/`
	if (urlObj.pathname === '/') urlString = urlString.replace(/\/$/, '')

	urlString = urlString.replace(/^(?:https?:)?\/\//, '')

	return urlString
}

export default useFormat
