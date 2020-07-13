const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
	purge: ['./src/components/**/*.js', './src/pages/**/*.js'],
	theme: {
		extend: {
			height: {
				header: 'calc(max(1rem, env(safe-area-inset-top)) + 3rem)',
			},
			borderRadius: {
				xl: '1rem',
				'2xl': '2rem',
			},
			letterSpacing: {
				micro: '-0.01em',
			},
			fontSize: {
				'6xl': '4.5rem',
			},
			fontFamily: {
				screen: ["'Nunito Sans'", ...defaultTheme.fontFamily.sans],
				'screen-italic': ["'Verveine Regular'", ...defaultTheme.fontFamily.sans],
			},
			inset: {
				card: 'calc(max(1rem, env(safe-area-inset-top)) + 4rem)',
			},
			spacing: {
				'safe-t': 'max(1rem, env(safe-area-inset-top))',
			},
			padding: {
				'safe-b': 'env(safe-area-inset-bottom)',
				header: 'calc(max(1rem, env(safe-area-inset-top)) + 3rem)',
				footer: 'calc(env(safe-area-inset-top) + 3.5rem)',
			},
			rotate: {
				'-2': '-2deg',
			},
			zIndex: {
				1: 1,
			},
		},
	},
	variants: {
		display: ['responsive', 'group-hover'],
		opacity: ['responsive', 'hover', 'focus', 'group-hover'],
	},
	plugins: [require('@tailwindcss/ui')],
}
