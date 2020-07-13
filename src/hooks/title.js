import Head from 'next/head'

const useTitle = (title) => (
	<Head>
		<title key="title">{title ? `${title} - ` : ''}Auralite</title>
		<meta key="ogTitle" name="og:title" content={`${title ? `${title} - ` : ''}Auralite`} />
		<meta key="twitterTitle" name="twitter:title" content={`${title ? `${title} - ` : ''}Auralite`} />
	</Head>
)

export const useImage = (image) => (
	<Head>
		<meta name="og:image" key="ogImage" content={`https://auralite.io${image}`} />
		<meta name="twitter:image" key="twitterImage" content={`https://auralite.io${image}`} />
	</Head>
)

export default useTitle
