import redirectTo from '../utils/redirectTo'
import Cookies from 'js-cookie'

const AuthMiddleware = () => {
	if (!authCheck) return redirectTo('/login')
}

const GuestMiddleware = () => {
	if (authCheck) return redirectTo('/home')
}

export const authCheck = !!Cookies.get('auralite_token') || typeof window === 'undefined'

const withAuth = () => [AuthMiddleware]

export default withAuth
export const withGuest = () => [GuestMiddleware]
