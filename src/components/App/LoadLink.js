import Link from 'next/link'

const LoadLink = ({ deps, children, ...props }) => <>{deps ? <Link {...props}>{children}</Link> : children}</>

export default LoadLink
