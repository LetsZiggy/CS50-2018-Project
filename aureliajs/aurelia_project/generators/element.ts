import { CLIOptions, Project, ProjectItem, UI } from "aurelia-cli"
import { inject } from "aurelia-dependency-injection"

@inject(Project, CLIOptions, UI)
export default class ElementGenerator {
	constructor (private readonly project: Project, private readonly options: CLIOptions, private readonly ui: UI) {}

	async execute (): Promise<void> {
		const name: string = await this.ui.ensureAnswer(
			this.options.args[0],
			"What would you like to call the custom element?",
		)

		const fileName: string = this.project.makeFileName(name)
		const className: string = this.project.makeClassName(name)

		this.project.elements.add(
			ProjectItem.text(`${ fileName }.ts`, this.generateJSSource(className, fileName)),
			ProjectItem.text(`${ fileName }.html`, this.generateHTMLSource(className)),
		)

		await this.project.commitChanges()
		await this.ui.log(`Created ${ fileName }.`)
	}

	generateHTMLSource (className: string): string {
		return `<template>
	<h1>\${ value }</h1>
</template>
`
	}

	generateJSSource (className: string, fileName: string): string {
		return `import { bindable, bindingMode, customElement } from "aurelia-framework"

@customElement("${ fileName }")
export class ${ className } {
	@bindable({ defaultBindingMode: bindingMode.twoWay })
	value: any

	valueChanged (current: ${ className }["value"], previous: ${ className }["value"]): any {}
}
`
	}
}
