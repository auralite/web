import { theme as defaultConfig } from 'tailwindcss/stubs/defaultConfig.stub'
import { theme as tailwindConfig } from '../../tailwind.config'

const useTailwind = (classes, type) => {
	if (!Array.isArray(type)) type = [type]
	classes = classes.split(' ')

	const tailwind = { ...defaultConfig, ...tailwindConfig }

	return type.map((key, i) => {
		const twClass = classes[i]
		const index = [...twClass.match(/^.*-(.*)$/)][1]

		return tailwind[key][index]
	})
}

export default useTailwind
