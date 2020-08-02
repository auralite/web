import AlertManager from '../App/AlertManager'
import { useEffect } from 'react'
import Pipeline from 'pipeline-js'
import ThemeManager from './ThemeManager'
import { useRouter } from 'next/router'

const BaseLayout = ({ children, middleware }) => {
	const router = useRouter()

	useEffect(() => {
		new Pipeline(middleware).process()
	}, [router.pathname])

	return (
		<ThemeManager>
			<AlertManager>{children}</AlertManager>
		</ThemeManager>
	)
}

export const useBaseLayout = () => (page, props = {}) => <BaseLayout {...props}>{page}</BaseLayout>

export default BaseLayout
