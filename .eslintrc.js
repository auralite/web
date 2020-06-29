module.exports = {
	root: true,
	env: {
		browser: true,
		es2020: true,
	},
	extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:jsx-a11y/recommended', 'plugin:prettier/recommended'],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 11,
		sourceType: 'module',
	},
	plugins: ['react'],
	rules: {
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		semi: ['error', 'never'],
		'arrow-parens': ['warning', 'as-needed'],
		'react/react-in-jsx-scope': 'off',
		'react/no-unescaped-entities': 'off',
		'prettier/prettier': ['error', {}, { usePrettierrc: true }],
	},
}
