// const defaultTheme = require("tailwindcss/defaultTheme")

/**
 * @type { import("tailwindcss").Config }
 */
module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{html,ts,js}",
	],
	theme: {
		extend: {
			height: {
				"1/12": "8.333333%",
				"2/12": "16.666667%",
				"3/12": "25%",
				"4/12": "33.333333%",
				"5/12": "41.666667%",
				"6/12": "50%",
				"7/12": "58.333333%",
				"8/12": "66.666667%",
				"9/12": "75%",
				"10/12": "83.333333%",
				"11/12": "91.666667%",
			},
			boxShadow: {
				"sm": "0 1px 1px 0 rgb(0 0 0 / 0.1)", // 0 1px 2px 0 rgb(0 0 0 / 0.05)
				"DEFAULT": "0 1px 1px 0 rgb(0 0 0 / 0.1), 0 2px 2px -1px rgb(0 0 0 / 0.1)", // 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)
				"md": "0 1px 1px 0 rgb(0 0 0 / 0.1), 0 2px 2px -1px rgb(0 0 0 / 0.1), 0 4px 4px -2px rgb(0 0 0 / 0.1), 0 8px 8px -4px rgb(0 0 0 / 0.1)", // 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)
				"lg": "0 1px 1px 0 rgb(0 0 0 / 0.1), 0 2px 2px -1px rgb(0 0 0 / 0.1), 0 4px 4px -2px rgb(0 0 0 / 0.1), 0 8px 8px -4px rgb(0 0 0 / 0.1), 0 16px 16px -8px rgb(0 0 0 / 0.1)", // 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)
				"xl": "0 1px 1px 0 rgb(0 0 0 / 0.1), 0 2px 2px -1px rgb(0 0 0 / 0.1), 0 4px 4px -2px rgb(0 0 0 / 0.1), 0 8px 8px -4px rgb(0 0 0 / 0.1), 0 16px 16px -8px rgb(0 0 0 / 0.1), 0 32px 32px -16px rgb(0 0 0 / 0.1)", // 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)
				"2xl": "0 1px 1px 0 rgb(0 0 0 / 0.1), 0 2px 2px -1px rgb(0 0 0 / 0.1), 0 4px 4px -2px rgb(0 0 0 / 0.1), 0 8px 8px -4px rgb(0 0 0 / 0.1), 0 16px 16px -8px rgb(0 0 0 / 0.1), 0 32px 32px -16px rgb(0 0 0 / 0.1), 0 64px 64px -32px rgb(0 0 0 / 0.1)", // 0 25px 50px -12px rgb(0 0 0 / 0.25)
				"inner": "inset 0 1px 2px 0 rgb(0 0 0 / 0.05), inset 0 2px 4px 0 rgb(0 0 0 / 0.075), inset 0 4px 8px 0 rgb(0 0 0 / 0.1)", // inset 0 2px 4px 0 rgb(0 0 0 / 0.05)
			},
			fill: {
				none: "none",
				transparent: "transparent",
			},
			spacing: {
				4.5: "1.125rem",
				5.5: "1.375rem",
				6.5: "1.625rem",
				7.5: "1.875rem",
				8.5: "2.125rem",
				9.5: "2.375rem",
			},
			stroke: {
				none: "none",
				transparent: "transparent",
			},
			strokeWidth: {
				"1/2": "0.5",
				"3/2": "1.5",
			},
			animation: {
				shake: "shake 0.15s linear infinite",
			},
			keyframes: {
				shake: {
					"0%, 100%": { transform: "translateX(-2.5%)" },
					"50%": { transform: "translateX(2.5%)" },
				},
			},
		},
	},
	plugins: [
		require("@tailwindcss/aspect-ratio"),
		require("@tailwindcss/container-queries"),
		require("@tailwindcss/forms")({ strategy: "class" }),
		require("@tailwindcss/typography"),
		require("./tailwindcss-plugins/fill-opacity"),
		require("./tailwindcss-plugins/stroke-opacity"),
		require("./tailwindcss-plugins/svg-attribute"),
	],
}
