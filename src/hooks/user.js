import Client from '@/utils/Client'
import { authCheck } from '@/middleware/auth'
import useSWR from 'swr'

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
