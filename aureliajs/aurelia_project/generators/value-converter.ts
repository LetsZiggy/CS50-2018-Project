import { CLIOptions, Project, ProjectItem, UI } from "aurelia-cli"
import { inject } from "aurelia-dependency-injection"

@inject(Project, CLIOptions, UI)
export default class ValueConverterGenerator {
	constructor (private readonly project: Project, private readonly options: CLIOptions, private readonly ui: UI) {}

	async execute (): Promise<void> {
		const name: string = await this.ui.ensureAnswer(
			this.options.args[0],
			"What would you like to call the value converter?",
		)

		const fileName: string = this.project.makeFileName(name)
		const className: string = this.project.makeClassName(name)

		this.project.valueConverters.add(
			ProjectItem.text(`${ fileName }.ts`, this.generateSource(className, fileName)),
		)

		await this.project.commitChanges()
		await this.ui.log(`Created ${ fileName }.`)
	}

	generateSource (className: string, fileName: string): string {
		return `import { valueConverter } from "aurelia-framework"

@valueConverter("${ fileName }")
export class ${ className } {
	toView (value: any): any {}

	fromView (value: any): any {}
}
`
	}
}
