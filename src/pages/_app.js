import '../../src/scss/app.scss'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as Fathom from 'fathom-client'
import cookies from 'next-cookies'
import App from 'next/app'
import redirectTo from '../../src/utils/redirectTo'

const AuthPaths = ['/login']

const MyApp = ({ Component, pageProps }) => {
	const router = useRouter()

	useEffect(() => {
		Fathom.load('KXUEDJON', {
			includedDomains: ['auralite.io'],
			url: 'https://koi.auralite.io/script.js',
		})

		function onRouteChangeComplete() {
			Fathom.trackPageview()
		}

		router.events.on('routeChangeComplete', onRouteChangeComplete)

		return () => {
			router.events.off('routeChangeComplete', onRouteChangeComplete)
		}
	}, [])

	return <Component {...pageProps} />
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
	const appProps = await App.getInitialProps({ Component, ctx })
	const cookie = cookies(ctx)

	if (['/', '/_error'].includes(ctx.pathname)) return { ...appProps }

	if (cookie.auralite_token && AuthPaths.includes(ctx.pathname)) redirectTo('/posts', { res: ctx.res, status: 301 })
	if (!cookie.auralite_token && !AuthPaths.includes(ctx.pathname)) redirectTo('/login', { res: ctx.res, status: 301 })

	return { ...appProps }
}

export default MyApp
