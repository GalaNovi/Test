module.exports = {
	root: true,
	extends: [
		'plugin:vue/vue3-essential',
		'@vue/airbnb',
	],
	parserOptions: {
		parser: 'babel-eslint',
	},
	rules: {
		indent: ['error', 'tab'],
		'vue/script-indent': ['error', 'tab', {
			'baseIndent': 1,
			'switchCase': 1,
		}],
		'vue/html-indent': ['error', 'tab'],
		'no-tabs': 0,
	},
	overrides: [{
	  	'files': ['*.vue'],
	  	'rules': {
			'indent': 'off',
	  	}
	}]
}
