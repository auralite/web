import '../../src/scss/app.scss'
import 'nprogress/nprogress.css'
import { useEffect } from 'react'
import Pipeline from 'pipeline-js'
import * as Fathom from 'fathom-client'
import App from 'next/app'
import * as Sentry from '@sentry/browser'
import NProgress from 'nprogress'
import Error from './_error'
import { useBaseLayout } from '@/components/Global/BaseLayout'

Sentry.init({
	enabled: process.env.NODE_ENV === 'production',
	dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
})

const MyApp = ({ Component, pageProps, router, ...serverProps }) => {
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

	if (pageProps?.isError) return <Error statusCode={pageProps.statusCode} />

	const getLayout = Component.getLayout || useBaseLayout()

	return getLayout(<Component {...pageProps} {...serverProps} />, { ...serverProps, middleware: Component.middleware })
}

export default MyApp
