module.exports = {
	"env": {
		"browser": true,
		"commonjs": true,
		"es6": true
	},
	"extends": "airbnb",
	"parserOptions": {
		"sourceType": "module"
	},
	"rules": {
		"arrow-parens": ["error", "as-needed"],
		"import/no-extraneous-dependencies": ['off', 'never'],
		"import/no-dynamic-require": ['off', 'never'],
		"global-require": ['off', 'never'],
		"one-var": [
			'off',
			'never'
		],
		"comma-dangle": [
			'off',
			'never'
		],
		"linebreak-style": ["off"],
		"class-methods-use-this": ["off"],
		"no-bitwise": ['off', 'never'],
		"no-mixed-operators": ['off', 'never'],
		"no-plusplus": ["error", {
			"allowForLoopAfterthoughts": true
		}],
		"no-underscore-dangle": ['off', 'never'],
		// "quotes": [
		//     "error",
		//     "double"
		// ],
		"semi": [
			"error",
			"always"
		],
		"react/jsx-filename-extension": ['off', 'never'],
		"no-param-reassign": ["off"],
		"no-unused-expressions": ["off"],
	}
};
