import { Fragment } from 'react'
import Link from 'next/link'

const Tabs = ({ tabs }) => (
	<>
		{tabs.map(({ active, tag: Tag = 'a', className = '', content, isLink = false, ...props }, i) => {
			const Wrapper = isLink ? Link : Fragment

			return (
				<Wrapper key={i} {...(isLink ? props : {})}>
					<Tag className={`${active ? 'border-indigo-500 dark:border-indigo-500 text-indigo-600 dark:text-indigo-400 focus:text-indigo-800 focus:border-indigo-700' : 'border-transparent text-gray-500 hover:text-gray-700 dark-hover:text-gray-400 hover:border-gray-300 dark-hover:border-gray-500 focus:text-gray-700 focus:border-gray-300'} ${i === 0 ? '' : 'ml-8'} group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm leading-5 focus:outline-none ${className}`} {...(isLink ? {} : props)}>
						{content}
					</Tag>
				</Wrapper>
			)
		})}
	</>
)

export default Tabs
