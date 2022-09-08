const path = require("node:path")

module.exports = {
	"extends": [
		// "eslint:recommended",
		// "plugin:@typescript-eslint/recommended",
		// "plugin:@typescript-eslint/recommended-requiring-type-checking",
		"standard-with-typescript",
		"plugin:unicorn/recommended",
	],
	"root": true,
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		ecmaVersion: "latest",
		sourceType: "module",
		ecmaFeatures: {
			legacyDecorators: true,
		},
	},
	"plugins": [
		"@typescript-eslint",
		"sort-class-members",
		"unicorn",
	],
	"env": {
		browser: true,
		es6: true,
		node: true,
	},
	/*
	"settings": {
		"import/extensions": [ ".js", ".ts" ],
		"import/parsers": {
			"@typescript-eslint/parser": [ ".js", ".ts" ],
		},
		"import/resolver": {
			typescript: {
				alwaysTryTypes: true,
				project: [
					path.join(__dirname, "tsconfig.json"),
				],
			},
		},
	},
	*/
	"rules": {
		// ---EcmaScript - Possible Problems--- //

		"no-inner-declarations": [ "error" ], // Overwrite StandardJS

		"no-unused-vars": [ "off" ], // Overwrite StandardJS
		"@typescript-eslint/no-unused-vars": [ "warn", { vars: "all", args: "none", ignoreRestSiblings: true }], // Overwrite StandardJS

		// ---EcmaScript - Suggestions--- //

		"no-nested-ternary": [ "off" ], // Set
		"unicorn/no-nested-ternary": [ "off" ], // Set

		"no-redeclare": [ "off" ], // Set
		"@typescript-eslint/no-redeclare": [ "error", { ignoreDeclarationMerge: true }], // Set

		"one-var": [ "error", "never" ], // Overwrite StandardJS

		"operator-assignment": [ "error", "always" ], // Set

		"quote-props": [ "error", "consistent-as-needed", { keywords: true }], // Overwrite StandardJS

		"sort-imports": [ "error", { ignoreDeclarationSort: true, allowSeparatedGroups: true }], // Set

		// ---EcmaScript - Layout & Formatting--- //

		"array-bracket-spacing": [ "error", "always", { arraysInArrays: false, objectsInArrays: false }], // Overwrite StandardJS

		"arrow-parens": [ "error", "always" ], // Set

		"brace-style": [ "off" ], // Overwrite StandardJS
		"@typescript-eslint/brace-style": [ "error", "stroustrup", { allowSingleLine: true }], // Overwrite StandardJS

		"comma-dangle": [ "off" ], // Overwrite StandardJS
		"@typescript-eslint/comma-dangle": [ "error", "always-multiline" ], // Overwrite StandardJS

		"indent": [ "off" ], // Overwrite StandardJS
		"@typescript-eslint/indent": [ "error", "tab", { ignoredNodes: [ "TemplateLiteral *", "TSTypeParameterInstantiation" ], SwitchCase: 1, VariableDeclarator: "first", outerIIFEBody: 1, MemberExpression: "off", FunctionDeclaration: { parameters: 1, body: 1 }, FunctionExpression: { parameters: 1, body: 1 }, StaticBlock: { body: 1 }, CallExpression: { arguments: 1 }, ArrayExpression: 1, ObjectExpression: 1, ImportDeclaration: 1, flatTernaryExpressions: false, offsetTernaryExpressions: false, ignoreComments: false }], // Overwrite StandardJS

		"lines-between-class-members": [ "off" ], // Overwrite StandardJS
		"@typescript-eslint/lines-between-class-members": [ "error", "always", { exceptAfterSingleLine: true, exceptAfterOverload: true }], // Overwrite StandardJS

		"no-mixed-spaces-and-tabs": [ "error", "smart-tabs" ], // Overwrite StandardJS

		"no-multiple-empty-lines": [ "error", { max: 1, maxEOF: 1, maxBOF: 0 }], // Overwrite StandardJS

		"no-tabs": [ "off", { allowIndentationTabs: true }], // Overwrite StandardJS

		"operator-linebreak": [ "error", "before", { overrides: { "??": "before" } }], // Overwrite StandardJS

		"quotes": [ "off" ], // Overwrite StandardJS
		"@typescript-eslint/quotes": [ "error", "double", { avoidEscape: true, allowTemplateLiterals: true }], // Overwrite StandardJS

		"template-curly-spacing": [ "error", "always" ], // Overwrite StandardJS

		// ---TypeScript--- //

		"@typescript-eslint/ban-types": [ "error" ], // Set

		"@typescript-eslint/member-delimiter-style": [ "error", { multiline: { delimiter: "comma", requireLast: true }, singleline: { delimiter: "comma", requireLast: false } }], // Overwrite StandardJS

		"@typescript-eslint/naming-convention": [ "error", { selector: [ "typeLike" ], format: [ "PascalCase" ] }, { selector: [ "variable" ], format: [ "camelCase", "UPPER_CASE", "PascalCase" ] }, { selector: [ "interface" ], format: [ "PascalCase" ], custom: { regex: "^I[A-Z]", match: false } }], // Overwrite StandardJS

		"@typescript-eslint/no-floating-promises": [ "off" ], // Overwrite StandardJS

		"@typescript-eslint/consistent-type-imports": [ "error", { prefer: "type-imports", disallowTypeAnnotations: true }], // Set

		"@typescript-eslint/strict-boolean-expressions": [ "off" ], // Overwrite StandardJS

		// ---import--- //

		"import/order": [ "error", { "groups": [ "builtin", "external", "internal", "parent", "sibling", "index", "unknown", "object", "type" ], "alphabetize": { order: "asc", caseInsensitive: false }, "newlines-between": "never" }], // Set

		// ---sort-class-members--- //

		"sort-class-members/sort-class-members": [ "error", {
			groups: {
				"lifecycle": [
					{ type: "method", name: "configureRouter" },
					{ type: "method", name: "determineActivationStrategy" },
					{ type: "method", name: "created" },
					{ type: "method", name: "canActivate" },
					{ type: "method", name: "activate" },
					{ type: "method", name: "bind" },
					{ type: "method", name: "attached" },
					{ type: "method", name: "canDeactivate" },
					{ type: "method", name: "deactivate" },
					{ type: "method", name: "detached" },
					{ type: "method", name: "unbind" },
				],
				"component-lifecycle": [
					{ type: "method", name: "created" },
					{ type: "method", name: "bind" },
					{ type: "method", name: "attached" },
					{ type: "method", name: "detached" },
					{ type: "method", name: "unbind" },
				],
				"router-lifecycle": [
					{ type: "method", name: "configureRouter" },
					{ type: "method", name: "determineActivationStrategy" },
					{ type: "method", name: "canActivate" },
					{ type: "method", name: "activate" },
					{ type: "method", name: "canDeactivate" },
					{ type: "method", name: "deactivate" },
				],
			},
			order: [
				{ "name": "metadata", "type": "method", "static": true },

				{ "name": "inject", "static": true },

				// [static-properties] | [private-properties]
				{ "type": "property", "sort": "alphabetical", "static": true, "private": true, "groupByDecorator": undefined },
				// [static-properties] | [private-properties] | [arrow-function-properties]
				{ "type": "property", "sort": "alphabetical", "static": true, "private": true, "groupByDecorator": undefined, "propertyType": "ArrowFunctionExpression" },
				// [static-properties]
				{ "type": "property", "sort": "alphabetical", "static": true, "private": false, "groupByDecorator": undefined },
				// [static-properties] | [arrow-function-properties]
				{ "type": "property", "sort": "alphabetical", "static": true, "private": false, "groupByDecorator": undefined, "propertyType": "ArrowFunctionExpression" },

				// [private-properties]
				{ "type": "property", "sort": "alphabetical", "static": false, "private": true, "groupByDecorator": undefined },
				// [private-properties] | [arrow-function-properties]
				{ "type": "property", "sort": "alphabetical", "static": false, "private": true, "groupByDecorator": undefined, "propertyType": "ArrowFunctionExpression" },

				// [properties]
				{ "type": "property", "sort": "alphabetical", "static": false, "private": false, "groupByDecorator": undefined },
				// [arrow-function-properties]
				{ "type": "property", "sort": "alphabetical", "static": false, "private": false, "groupByDecorator": undefined, "propertyType": "ArrowFunctionExpression" },

				// [properties]
				{ "type": "property", "sort": "alphabetical", "static": false, "private": false, "groupByDecorator": "bindable" },
				// [arrow-function-properties]
				{ "type": "property", "sort": "alphabetical", "static": false, "private": false, "groupByDecorator": "bindable", "propertyType": "ArrowFunctionExpression" },

				// [properties]
				{ "type": "property", "sort": "alphabetical", "static": false, "private": false, "groupByDecorator": "observable" },
				// [arrow-function-properties]
				{ "type": "property", "sort": "alphabetical", "static": false, "private": false, "groupByDecorator": "observable", "propertyType": "ArrowFunctionExpression" },

				"constructor",

				"[lifecycle]",

				// [accessor-pairs]
				{ type: "method", sort: "alphabetical", accessorPair: true },
				// [getters]
				{ type: "method", sort: "alphabetical", kind: "get" },
				// [setters]
				{ type: "method", sort: "alphabetical", kind: "set" },

				{ type: "method", sort: "alphabetical", name: "/.+Changed$/" },

				// [static-methods] | [private-methods] | [async-methods]
				{ "type": "method", "sort": "alphabetical", "static": true, "private": true, "async": true },
				// [static-methods] | [private-methods]
				{ "type": "method", "sort": "alphabetical", "static": true, "private": true, "async": false },
				// [static-methods] | [async-methods]
				{ "type": "method", "sort": "alphabetical", "static": true, "private": false, "async": true },
				// [static-methods]
				{ "type": "method", "sort": "alphabetical", "static": true, "private": false, "async": false },

				// [private-methods] | [async-methods]
				{ "type": "method", "sort": "alphabetical", "static": false, "private": true, "async": true },
				// [private-methods]
				{ "type": "method", "sort": "alphabetical", "static": false, "private": true, "async": false },

				// [async-methods]
				{ "type": "method", "sort": "alphabetical", "static": false, "private": false, "async": true },
				// [methods]
				{ "type": "method", "sort": "alphabetical", "static": false, "private": false, "async": false },

				"[everything-else]",
			],
			accessorPairPositioning: "together",
			stopAfterFirstProblem: false,
			locale: "en-US",
		}], // Set

		// ---Unicorn--- //

		"unicorn/prefer-at": [ "error" ], // Overwrite unicorn

		"unicorn/prefer-module": [ "off" ], // Overwrite unicorn

		"unicorn/prefer-string-replace-all": [ "error" ], // Overwrite unicorn

		"unicorn/prevent-abbreviations": [ "error", { checkFilenames: false }], // Overwrite unicorn

		"unicorn/no-array-reduce": [ "off" ], // Overwrite unicorn

		"unicorn/no-useless-undefined": [ "off" ], // Overwrite unicorn
	},
	"overrides": [
		{
			files: [ "*.ts" ],
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
				ecmaFeatures: {
					legacyDecorators: true,
				},
				project: [
					path.join(__dirname, "tsconfig.json"),
				],
				tsconfigRootDir: __dirname,
			},
		},
	],
}
