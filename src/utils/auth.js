import router from 'next/router'
import Cookies from 'js-cookie'
import Client from './Client'
const cookieSettings = { expires: 2628000, sameSite: 'lax' }

export const login = (token) => {
	Cookies.set('auralite_token', token, cookieSettings)

	Client.updateAuthToken(token)
}

export const logout = () => {
	Cookies.remove('auralite_token', cookieSettings)

	window.location = '/login'
}
