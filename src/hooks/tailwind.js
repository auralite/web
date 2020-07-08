import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../tailwind.config'

const useTailwind = (classes, type) => {
	if (!Array.isArray(type)) type = [type]
	classes = classes.split(' ')

	const { theme: tailwind } = resolveConfig(tailwindConfig)

	return type.map((key, i) => {
		const twClass = classes[i]
		const index = [...twClass.match(/^.*-(.*)$/)][1]

		return tailwind[key][index]
	})
}

export default useTailwind
