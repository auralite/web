const { default: Client } = require('@/utils/Client')
const { authCheck } = require('@/middleware/auth')
const { default: useSWR } = require('swr')

const useNotifications = (maybe = true) => {
	const { data, error, mutate } = useSWR(maybe && authCheck ? '/api/notifications' : null, () => Client.notifications())
	return {
		notifications: data,
		isLoading: !error && !data,
		isError: error,
		mutate,
	}
}

export default useNotifications
