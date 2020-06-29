const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
	purge: ['./src/components/**/*.js', './src/pages/**/*.js'],
	theme: {
		extend: {
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
			},
			rotate: {
				'-2': '-2deg',
			},
			zIndex: {
				1: 1,
			},
		},
	},
	variants: {},
	plugins: [require('@tailwindcss/ui')],
}
