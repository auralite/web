import chrome from 'chrome-aws-lambda'
import puppeteer from 'puppeteer-core'

let _page
const exePath = process.platform === 'win32' ? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe' : process.platform === 'linux' ? '/usr/bin/google-chrome' : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const isLocal = process.env.VERCEL_REGION === 'dev1'

export default async (req, res) => {
	if (req.method !== 'GET' || !req.query.handle) return res.status(400).json({ error: 'Invalid Request' })

	res.setHeader('Content-Type', `image/jpeg`)
	res.setHeader('Cache-Control', `public, immutable, no-transform, s-maxage=60, stale-while-revalidate`)

	res.status(200).send(await getScreenshot(req.query.handle))
}

const getScreenshot = async (handle) => {
	const page = await getPage()

	await page.setViewport({ width: 2048, height: 1170 })

	await page.goto(`https://auralite.io/meta/profile?handle=${handle}`)

	return await page.screenshot({ type: 'jpeg' })
}

const getPage = async () => {
	if (_page) return _page

	const browser = await puppeteer.launch(
		isLocal
			? {
					args: [],
					executablePath: exePath,
					headless: true,
			  }
			: {
					args: chrome.args,
					executablePath: await chrome.executablePath,
					headless: chrome.headless,
			  }
	)

	_page = await browser.newPage()

	return _page
}
