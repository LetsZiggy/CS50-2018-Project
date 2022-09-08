const plugin = require("tailwindcss/plugin")

/**
 * @type { import("tailwindcss/plugin") }
 */
module.exports = plugin(function ({ addUtilities }) {
	addUtilities({
		".dasharray-none": {
			"stroke-dasharray": "none",
		},

		".linecap-butt": {
			"stroke-linecap": "butt",
		},

		".linecap-round": {
			"stroke-linecap": "round",
		},

		".linecap-square": {
			"stroke-linecap": "square",
		},

		".linejoin-bevel": {
			"stroke-linejoin": "bevel",
		},

		".linejoin-miter": {
			"stroke-linejoin": "miter",
		},

		".linejoin-round": {
			"stroke-linejoin": "round",
		},

		".linejoin-arcs": {
			"stroke-linejoin": "arcs",
		},

		".linejoin-miter-clip": {
			"stroke-linejoin": "miter-clip",
		},

		".miterlimit-0": {
			"stroke-miterlimit": 0,
		},

		".clip-rule-nonzero": {
			"clip-rule": "nonzero",
		},

		".clip-rule-evenodd": {
			"clip-rule": "evenodd",
		},

		".clip-rule-inherit": {
			"clip-rule": "inherit",
		},

		".fill-rule-nonzero": {
			"fill-rule": "nonzero",
		},

		".fill-rule-evenodd": {
			"fill-rule": "evenodd",
		},
	})
})
