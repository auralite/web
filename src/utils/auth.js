import router from 'next/router'
import Cookies from 'js-cookie'
import Client from './Client'

export const login = (token) => {
	Cookies.set('auralite_token', token, { expires: 2628000, sameSite: 'lax' })

	Client.updateAuthToken(token)
}

export const logout = () => {
	Cookies.remove('auralite_token', { expires: 2628000, sameSite: 'lax' })

	router.push('/login')
}
