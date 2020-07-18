import { getScreenshot } from '@/utils/puppeteer'

export default async (req, res) => {
	if (req.method !== 'GET' || !req.query.handle) return res.status(400).json({ error: 'Invalid Request' })

	res.setHeader('Content-Type', `image/jpeg`)
	res.setHeader('Cache-Control', `public, immutable, no-transform, s-maxage=3600, stale-while-revalidate`)

	res.status(200).send(await getScreenshot(`https://auralite.io/meta/profile?handle=${req.query.handle}`))
}
