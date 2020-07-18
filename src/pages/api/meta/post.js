import { getScreenshot } from '@/utils/puppeteer'

export default async (req, res) => {
	if (req.method !== 'GET' || !req.query.postId) return res.status(400).json({ error: 'Invalid Request' })

	res.setHeader('Content-Type', `image/jpeg`)
	res.setHeader('Cache-Control', `public, immutable, no-transform, s-maxage=604800, stale-while-revalidate`)

	res.status(200).send(await getScreenshot(`http://auralite.io/meta/post?postId=${req.query.postId}`))
}
