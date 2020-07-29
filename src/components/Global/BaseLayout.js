import AlertManager from '../App/AlertManager'
import { useEffect } from 'react'
import Pipeline from 'pipeline-js'
import ThemeManager from './ThemeManager'

const BaseLayout = ({ children, middleware }) => {
	useEffect(() => {
		new Pipeline(middleware).process()
	}, [])

	return (
		<ThemeManager>
			<AlertManager>{children}</AlertManager>
		</ThemeManager>
	)
}

export const useBaseLayout = () => (page, props = {}) => <BaseLayout {...props}>{page}</BaseLayout>

export default BaseLayout
