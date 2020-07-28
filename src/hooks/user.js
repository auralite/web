const { default: Client } = require('@/utils/Client')
const { authCheck } = require('@/middleware/auth')
const { default: useSWR } = require('swr')

const useUser = (maybe = true) => {
	const { data, error, mutate } = useSWR(maybe && authCheck ? '/api/user' : null, () => Client.user(), { revalidateOnFocus: false, focusThrottleInterval: 60000 })
	return {
		user: data,
		isLoading: !error && !data,
		isError: error,
		mutate,
	}
}

export default useUser
