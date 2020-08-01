import React from 'react'
import Link from 'next/link'
import { ThemeBubble } from '@/components/Global/ThemeManager'
import { ArrowLeftOutline } from '@/components/App/Icon'
import ClientOnly from '@/components/App/ClientOnly'

const NotFoundPage = () => {
	return (
		<>
			<div className="h-screen flex items-center justify-center text-center dark:text-gray-300 dark:dark-bg">
				<div>
					<h1 className="font-black font-screen text-5xl sm:text-6xl">Not Found</h1>
					<p className="text-xl sm:text-2xl">Sorry, there is nothing at this URL.</p>
					<Link href="/">
						<a className="flex items-center sm:justify-center mt-3">
							<ArrowLeftOutline className="w-6 h-6 mr-2" />
							<span className="text-xl">Go back home</span>
						</a>
					</Link>
				</div>
			</div>
			<ClientOnly>
				<ThemeBubble />
			</ClientOnly>
		</>
	)
}

export default NotFoundPage
