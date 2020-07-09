import Link from 'next/link'
import { useRouter } from 'next/router'

const NavLink = ({ children, href, as, onClick, ...props }) => {
	const router = useRouter()

	return (
		<Link href={href} as={as} {...props}>
			<a onClick={onClick} className={`${router.asPath === (as ?? href) ? 'text-gray-900 bg-gray-100 focus:bg-gray-200' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:text-gray-900 focus:bg-gray-100'} group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md focus:outline-none transition ease-in-out duration-150`}>
				{children(router.asPath === (as ?? href))}
			</a>
		</Link>
	)
}

export default NavLink
