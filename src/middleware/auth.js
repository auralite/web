import cookies from 'next-cookies'
import redirectTo from '../utils/redirectTo'

const AuthMiddleware = ({ props, ctx }) => {
	if (!props.authCheck) return redirectTo('/login', { res: ctx.res, status: 301 })

	return { props, ctx }
}

const GuestMiddleware = ({ props, ctx }) => {
	if (props.authCheck) return redirectTo('/home', { res: ctx.res, status: 301 })

	return { props, ctx }
}

const AddAuthInfo = ({ props, ctx }) => {
	return { props: { ...props, authCheck: isAuthenticated(ctx) }, ctx }
}

const isAuthenticated = (ctx) => {
	const cookie = cookies(ctx)

	return !!cookie.auralite_token
}

export default () => [AddAuthInfo, AuthMiddleware]
export const withGuest = () => [AddAuthInfo, GuestMiddleware]
export const withAuthInfo = () => [AddAuthInfo]
