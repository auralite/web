const withPWA = require('next-pwa')
const withSourceMaps = require('@zeit/next-source-maps')({ devtool: 'hidden-source-map' })
const SentryWebpackPlugin = require('@sentry/webpack-plugin')

const { NEXT_PUBLIC_SENTRY_DSN: SENTRY_DSN, SENTRY_ORG, SENTRY_PROJECT, SENTRY_AUTH_TOKEN, NODE_ENV } = process.env

process.env.SENTRY_DSN = SENTRY_DSN

module.exports = withPWA(
	withSourceMaps({
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

			return config
		},
	})
)
