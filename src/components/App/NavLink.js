import Link from 'next/link'
import { useRouter } from 'next/router'

const NavLink = ({ children, href, as, onClick, ...props }) => {
	const router = useRouter()

	return (
		<Link href={href} as={as} {...props}>
			<a onClick={onClick} className={`${router.asPath === (as ?? href) ? 'text-white bg-indigo-900' : 'text-indigo-300 hover:text-white hover:bg-indigo-700 focus:text-white'} group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md focus:outline-none focus:bg-indigo-700 transition ease-in-out duration-150`}>
				{children}
			</a>
		</Link>
	)
}

export default NavLink
