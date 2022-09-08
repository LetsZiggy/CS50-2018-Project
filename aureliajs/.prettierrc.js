const dataBinding = "(.bind|.one-time|.from-view|.to-view|.one-way|.two-way)?"
const eventBinding = "(.delegate|.trigger|.capture)?"
const referenceBinding = ".ref"

module.exports = {
	// ---Plugins--- //

	plugins: [
		"prettier-plugin-packagejson",
		"prettier-plugin-organize-attributes",
		// "prettier-plugin-tailwindcss",
	],

	// ---Options--- //

	/* printWidth: 120, */
	/* tabWidth: 2, */
	/* useTabs: true, */
	semi: false,
	singleQuote: false,
	quoteProps: "consistent",
	jsxSingleQuote: false,
	trailingComma: "all",
	bracketSpacing: true,
	bracketSameLine: true,
	arrowParens: "always",
	rangeStart: 0,
	rangeEnd: Number.POSITIVE_INFINITY,
	/* parser: "", */
	/* filepath: "", */
	requirePragma: false,
	insertPragma: false,
	proseWrap: "preserve",
	htmlWhitespaceSensitivity: "css",
	vueIndentScriptAndStyle: false,
	/* endOfLine: "lf", */
	embeddedLanguageFormatting: "auto",
	singleAttributePerLine: true,

	// ---prettier-plugin-organize-attributes--- //

	attributeGroups: [
		"^slot$",
		`^[A-Za-z-]+${ referenceBinding }$`,
		`^id${ dataBinding }$`,
		`^name${ dataBinding }$`,
		`^class${ dataBinding }$`,
		`^style${ dataBinding }$`,
		"^css$",
		`^data-[A-Za-z-]+${ dataBinding }`,
		`^src${ dataBinding }$`,
		`^for${ dataBinding }$`,
		`^type${ dataBinding }$`,
		`^href${ dataBinding }$`,
		`^value${ dataBinding }$`,
		`^title${ dataBinding }$`,
		`^alt${ dataBinding }$`,
		`^role${ dataBinding }$`,
		`^aria-[A-Za-z-]+${ dataBinding }`,
		`^[A-Za-z-]+${ dataBinding }$`,
		`^[A-Za-z-]+${ eventBinding }$`,
		"$DEFAULT",
	],
	attributeSort: "ASC",
	attributeIgnoreCase: true,

	// ---prettier-plugin-tailwindcss--- //

	// tailwindConfig: "./tailwind.config.js",

	// ---Overrides--- //

	/*
	overrides: [
		{
			files: [ "*.html" ],
			options: {},
		},
	],
	*/
}
