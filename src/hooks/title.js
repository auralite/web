import Head from 'next/head'

const useTitle = (title) => {
	return (
		<Head>
			<title key="title">{title ? `${title} - ` : ''}Auralite</title>
			<meta key="ogTitle" name="og:title" content={`${title ? `${title} - ` : ''}Auralite`} />
			<meta key="twitterTitle" name="twitter:title" content={`${title ? `${title} - ` : ''}Auralite`} />
		</Head>
	)
}

export default useTitle
