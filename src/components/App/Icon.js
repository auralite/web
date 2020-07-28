const Icon = ({ className, children, isSolid = true }) => (
	<svg viewBox={isSolid ? '0 0 20 20' : '0 0 24 24'} className={`${isSolid ? 'fill-current' : 'fill-none stroke-current stroke-2'} ${className}`} strokeLinecap="round" strokeLinejoin="round" fillRule="evenodd" clipRule="evenodd">
		{children}
	</svg>
)

export const HomeOutline = ({ className }) => (
	<Icon className={className} isSolid={false}>
		<path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
	</Icon>
)
export const HomeSolid = ({ className }) => (
	<Icon className={className} isSolid={true}>
		<path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
	</Icon>
)

export const SearchOutline = ({ className }) => (
	<Icon className={className} isSolid={false}>
		<path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
	</Icon>
)
export const SearchSolid = ({ className }) => (
	<Icon className={className} isSolid={true}>
		<path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
	</Icon>
)

export const BellOutline = ({ className }) => (
	<Icon className={className} isSolid={false}>
		<path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
	</Icon>
)
export const BellSolid = ({ className }) => (
	<Icon className={className} isSolid={true}>
		<path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
	</Icon>
)
