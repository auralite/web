import chrome from 'chrome-aws-lambda'
import puppeteer from 'puppeteer-core'

let _page
const exePath = process.platform === 'win32' ? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe' : process.platform === 'linux' ? '/usr/bin/google-chrome' : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const isLocal = process.env.VERCEL_REGION === 'dev1'

export const getScreenshot = async (url) => {
	const page = await getPage()

	await page.setViewport({ width: 1572, height: 960 })

	await page.goto(url)

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
