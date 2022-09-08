import { build } from "aurelia-cli"
import * as gulp from "gulp"

export default function clearCache () {
	return build.clearCache()
}
