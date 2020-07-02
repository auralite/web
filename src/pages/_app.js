import '../../src/scss/app.scss'
import 'nprogress/nprogress.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Pipeline from 'pipeline-js'
import * as Fathom from 'fathom-client'
import App from 'next/app'
import * as Sentry from '@sentry/browser'
import NProgress from 'nprogress'

Sentry.init({
	enabled: process.env.NODE_ENV === 'production',
	dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
})

const MyApp = ({ Component, pageProps }) => {
	const router = useRouter()

	useEffect(() => {
		Fathom.load('KXUEDJON', {
			includedDomains: ['auralite.io'],
			url: 'https://koi.auralite.io/script.js',
		})

		const onRouteChangeComplete = () => Fathom.trackPageview()

		router.events.on('routeChangeComplete', onRouteChangeComplete)

		return () => {
			router.events.off('routeChangeComplete', onRouteChangeComplete)
		}
	}, [])

	useEffect(() => {
		const startProgress = () => NProgress.start()
		const progressEnd = () => NProgress.done()

		router.events.on('routeChangeStart', startProgress)
		router.events.on('routeChangeComplete', progressEnd)
		router.events.on('routeChangeError', progressEnd)

		return () => {
			router.events.off('routeChangeStart', startProgress)
			router.events.off('routeChangeComplete', progressEnd)
			router.events.off('routeChangeError', progressEnd)
		}
	})

	const getLayout = Component.getLayout || ((page) => page)

	return getLayout(<Component {...pageProps} />)
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
	const props = await App.getInitialProps({ Component, ctx })

	const middleware = new Pipeline(Component.middleware || [])

	return middleware.process({ props, ctx }).props
}

export default MyApp
