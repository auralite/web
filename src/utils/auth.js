import router from 'next/router'
import Cookies from 'js-cookie'

export const logout = () => {
	Cookies.remove('auralite_token', { expires: 2628000, sameSite: 'lax' })

	router.push('/login')
}
