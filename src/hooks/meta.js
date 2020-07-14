import Head from 'next/head'

const useMeta = (title, description, image, extra) => (
	<Head>
		<title key="title">{title ? `${title} - ` : ''}Auralite</title>
		<meta key="ogTitle" name="og:title" content={`${title ? `${title} - ` : ''}Auralite`} />
		<meta key="twitterTitle" name="twitter:title" content={`${title ? `${title} - ` : ''}Auralite`} />
		<meta name="description" key="description" content={description} />
		<meta name="og:description" key="ogDescription" content={description} />
		<meta name="twitter:description" key="twitterDescription" content={description} />
		<meta name="og:image" key="ogImage" content={`https://auralite.io${image}`} />
		<meta name="twitter:image" key="twitterImage" content={`https://auralite.io${image}`} />
		{extra}
	</Head>
)

export const useTitle = (title) => (
	<Head>
		<title key="title">{title ? `${title} - ` : ''}Auralite</title>
		<meta key="ogTitle" name="og:title" content={`${title ? `${title} - ` : ''}Auralite`} />
		<meta key="twitterTitle" name="twitter:title" content={`${title ? `${title} - ` : ''}Auralite`} />
	</Head>
)

export const useDescription = (description) => (
	<Head>
		<meta name="description" key="description" content={description} />
		<meta name="og:description" key="ogDescription" content={description} />
		<meta name="twitter:description" key="twitterDescription" content={description} />
	</Head>
)

export const useImage = (image) => (
	<Head>
		<meta name="og:image" key="ogImage" content={`https://auralite.io${image}`} />
		<meta name="twitter:image" key="twitterImage" content={`https://auralite.io${image}`} />
	</Head>
)

export default useMeta
