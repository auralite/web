import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../tailwind.config'
// import tw from 'twin.macro'

// A hook to get the
const useTailwind = (classes, type) => {
	if (!Array.isArray(type)) type = [type]
	classes = classes.split(' ')

	const { theme: tailwind } = resolveConfig(tailwindConfig)

	// console.log(tw`${classes}`)

	return type.map((key, i) => {
		const twClass = classes[i]
		const index = [...twClass.match(/^.*-(.*)$/)][1]

		return tailwind[key][index]
	})
}

export default useTailwind
