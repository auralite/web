import AlertManager from './AlertManager'
import { useEffect } from 'react'
import Pipeline from 'pipeline-js'

const BaseLayout = ({ children, middleware }) => {
	useEffect(() => {
		new Pipeline(middleware).process()
	}, [])

	return <AlertManager>{children}</AlertManager>
}

export const useBaseLayout = () => (page, props = {}) => <BaseLayout {...props}>{page}</BaseLayout>

export default BaseLayout
