const withPWA = require('next-pwa')
const withSourceMaps = require('@zeit/next-source-maps')()
const { createLoader } = require('simple-functional-loader')
const SentryWebpackPlugin = require('@sentry/webpack-plugin')

const { NEXT_PUBLIC_SENTRY_DSN: SENTRY_DSN, SENTRY_ORG, SENTRY_PROJECT, SENTRY_AUTH_TOKEN, NODE_ENV } = process.env

process.env.SENTRY_DSN = SENTRY_DSN

module.exports = withPWA(
	withSourceMaps({
		pageExtensions: ['js', 'jsx', 'mdx'],
		experimental: {
			modern: true,
		},
		poweredByHeader: false,
		pwa: {
			disable: process.env.NODE_ENV === 'development',
			register: true,
			runtimeCaching: require('./cache.config'),
			dest: 'public',
		},
		webpack: (config, options) => {
			if (!options.isServer) {
				config.resolve.alias['@sentry/node'] = '@sentry/browser'
			}

			if (SENTRY_DSN && SENTRY_ORG && SENTRY_PROJECT && SENTRY_AUTH_TOKEN && NODE_ENV === 'production') {
				config.plugins.push(
					new SentryWebpackPlugin({
						include: '.next',
						ignore: ['node_modules'],
						urlPrefix: '~/_next',
						release: options.buildId,
					})
				)
			}

			config.module.rules.push({
				test: /\.(png|jpe?g|gif|mp4)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							publicPath: '/_next',
							name: 'static/media/[name].[ext]?[hash]',
						},
					},
				],
			})

			const mdx = [
				options.defaultLoaders.babel,
				{
					loader: '@mdx-js/loader',
					options: {
						rehypePlugins: [],
					},
				},
			]

			config.module.rules.push({
				test: /\.mdx$/,
				use: [
					...mdx,
					createLoader(function (src) {
						return this.callback(null, ['import BlogLayout from "@/components/Marketing/BlogLayout"', src, 'export default (props) => <BlogLayout {...meta} {...props} />'].join('\n\n'))
					}),
				],
			})

			return config
		},
	})
)
