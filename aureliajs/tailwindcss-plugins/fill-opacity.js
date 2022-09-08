const plugin = require("tailwindcss/plugin")

/**
 * @type { import("tailwindcss/plugin") }
 */
module.exports = plugin(function ({ matchUtilities, theme }) {
	matchUtilities(
		{
			"fill-opacity": (value) => ({
				"fill-opacity": value,
			}),
		},
		{
			values: theme("opacity", {}),
			type: "any",
		},
	)
})
