import Head from 'next/head'

export default function Home() {
	return (
		<>
			<Head>
				<title>Auralite</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="flex items-center justify-center min-h-screen">
				<h1 className="text-6xl">Hello, Auralite!</h1>
			</main>
		</>
	)
}
