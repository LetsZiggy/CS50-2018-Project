module.exports = {
	"root": true,
	"plugins": [ "stylelint-order", "stylelint-csstree-validator" ],
	"processors": [],
	"extends": [ "stylelint-config-standard", "stylelint-config-recess-order" ],
	"rules": {
		// ---Possible errors--- //

		// ___Color___ //

		// ___Font family___ //

		// ___Named grid areas___ //

		// ___Function___ //

		// ___String___ //

		// ___Unit___ //

		// ___Property___ //

		// ___Keyframe declaration___ //

		// ___Declaration block___ //

		// ___Block___ //

		// ___Selector___ //

		// ___Media feature___ //

		// ___At-rule___ //

		"at-rule-no-unknown": [ true, { "ignoreAtRules": [ "tailwind", "layer", "responsive", "screen", "variants", "apply" ] }],

		// ___Comment___ //

		// ___General / Sheet___ //

		// ---Limit language features--- //

		// ___Alpha-value___ //

		// ___Hue___ //

		// ___Color___ //

		// ___Length___ //

		// ___Font weight___ //

		"font-weight-notation": [ "numeric", { "ignore": [ "relative" ] }],

		// ___Function___ //

		// ___Keyframes___ //

		// ___Number___ //

		// ___Time___ //

		// ___Unit___ //

		// ___Shorthand property___ //

		"shorthand-property-no-redundant-values": true,

		// ___Value___ //

		"value-no-vendor-prefix": true,

		// ___Custom property___ //

		// ___Property___ //

		"property-no-vendor-prefix": true,

		// ___Declaration___ //

		"declaration-no-important": true,

		// ___Declaration block___ //

		// ___Selector___ //

		"selector-no-vendor-prefix": true,

		// ___Media feature___ //

		"media-feature-name-no-vendor-prefix": true,

		// ___Custom media___ //

		// ___At-rule___ //

		"at-rule-no-vendor-prefix": true,

		// ___Comment___ //

		// ___General / Sheet___ //

		"no-unknown-animations": true,

		// ---Stylistic issues--- //

		// ___Color___ //

		// ___Font family___ //

		"font-family-name-quotes": "always-unless-keyword",

		// ___Function___ //

		"function-url-quotes": [ "always", { "except": [ "empty" ] }],

		// ___Number___ //

		// ___String___ //

		"string-quotes": "double",

		// ___Unit___ //

		// ___Value___ //

		"value-keyword-case": "lower",

		// ___Value list___ //

		// ___Custom property___ //

		// ___Property___ //

		// ___Declaration___ //

		"declaration-colon-newline-after": null,
		"declaration-empty-line-before": "never",

		// ___Declaration block___ //

		// ___Block___ //

		// ___Selector___ //

		"selector-attribute-quotes": "always",

		// ___Selector list___ //

		// ___Rule___ //

		// ___Media feature___ //

		// ___Media query list___ //

		// ___At-rule___ //

		"at-rule-empty-line-before": [ "always", { "except": [ "blockless-after-blockless", "first-nested" ], "ignoreAtRules": [ "apply", "responsive", "screen", "tailwind", "variants" ] }],
		"at-rule-name-newline-after": "always-multi-line",
		"at-rule-semicolon-space-before": "never",

		// ___Comment___ //

		// ___General / Sheet___ //

		"linebreaks": "unix",
		"no-empty-first-line": true,

		// ---csstree-validator--- //

		"csstree/validator": {
			"atrules": {
				"tailwind": {
					"prelude": "<custom-ident>",
				},
				"layer": {
					"prelude": "<custom-ident>",
				},
				"apply": {
					"prelude": "<any-value>",
				},
			},
			"properties": {
				"stroke-miterlimit": "<number>",
			},
		},
	},
	"overrides": [
		{
			files: [ "**/*.html" ],
			rules: {
				// ---Stylistic issues--- //

				// ___General / Sheet___ //

				"no-missing-end-of-source-newline": null,
			},
		},
	],
}
