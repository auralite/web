const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')
const selectorParser = require('postcss-selector-parser')

module.exports = {
	purge: ['./src/**/*.{js,mdx}', './next.config.js'],
	theme: {
		extend: {
			height: {
				header: 'calc(max(1rem, env(safe-area-inset-top)) + 3rem)',
			},
			borderRadius: {
				xl: '1rem',
				'2xl': '2rem',
			},
			lineHeight: {
				px: '1',
			},
			letterSpacing: {
				micro: '-0.01em',
			},
			fontSize: {
				'6xl': '4.5rem',
			},
			backgroundOpacity: {
				10: '.1',
				90: '.9',
			},
			boxShadow: {
				header: 'rgb(0, 0, 0, .05) 0px 3px 6px 0px',
				'header-dark': 'rgb(255, 255, 255, .02) 0px 3px 6px 0px',
				footer: '0 -3px 6px 0 rgba(0, 0, 0, 0.05)',
				'footer-dark': '0 -3px 6px 0 rgb(255, 255, 255, .02)',
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
				'-1': -1,
				1: 1,
			},
			fill: {
				none: 'none',
			},
			animation: {
				ring: 'ring 1s ease-in-out 0s 1',
			},
			keyframes: {
				ring: {
					'0%, 80%': {
						transform: 'rotate(0deg)',
					},
					'16%, 48%': {
						transform: 'rotate(15deg)',
					},
					'32%, 64%': {
						transform: 'rotate(-15deg)',
					},
				},
			},
			typography: (theme) => ({
				default: {
					css: {
						a: {
							color: theme('colors.indigo.500'),
							fontWeight: 700,
						},
						strong: {
							color: theme('colors.indigo.500'),
							fontWeight: 700,
						},
					},
				},
				dark: {
					css: {
						color: theme('colors.gray.300'),
						blockquote: {
							color: theme('colors.gray.300'),
							borderLeftColor: theme('colors.gray.700'),
						},
						hr: {
							borderTopColor: theme('colors.gray.800'),
						},
						strong: {
							color: theme('colors.white'),
						},
						'figure figcaption': {
							color: theme('colors.gray.500'),
						},
						a: {
							color: theme('colors.white'),
						},
						th: {
							color: theme('colors.white'),
						},
						'h1, h2, h3, h4': {
							color: theme('colors.white'),
						},
						code: {
							color: theme('colors.gray.300'),
						},
						'code:before': {
							color: theme('colors.gray.300'),
						},
						'code:after': {
							color: theme('colors.gray.300'),
						},
						'ol > li:before': {
							color: theme('colors.gray.400'),
						},
						'ul > li:before': {
							backgroundColor: theme('colors.gray.600'),
						},
					},
				},
			}),
		},
	},
	variants: {
		backgroundColor: ['responsive', 'hover', 'focus', 'dark', 'dark-hover'],
		textColor: ['responsive', 'hover', 'focus', 'dark', 'dark-hover'],
		borderColor: ['responsive', 'hover', 'focus', 'dark', 'dark-hover'],
		backgroundOpacity: ['responsive', 'hover', 'focus', 'dark', 'dark-hover'],
		boxShadow: ['responsive', 'hover', 'focus', 'dark'],
		display: ['responsive', 'group-hover'],
		opacity: ['responsive', 'hover', 'focus', 'group-hover'],
		typography: ['responsive', 'dark'],
	},
	plugins: [
		plugin(function ({ addVariant, prefix, e }) {
			addVariant('dark', ({ modifySelectors, separator }) => {
				modifySelectors(({ selector }) => {
					return selectorParser((selectors) => {
						selectors.walkClasses((sel) => {
							sel.value = `dark${separator}${sel.value}`
							sel.parent.insertBefore(sel, selectorParser().astSync(prefix('.scheme-dark ')))
						})
					}).processSync(selector)
				})
			})
			addVariant('dark-hover', ({ modifySelectors, separator }) => {
				modifySelectors(({ className }) => {
					return `.scheme-dark .${e(`dark-hover${separator}${className}`)}:hover`
				})
			})
		}),
		require('@tailwindcss/ui'),
		require('@tailwindcss/typography'),
	],
}
