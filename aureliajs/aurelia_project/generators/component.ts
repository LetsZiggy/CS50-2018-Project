import * as path from "node:path"
import { CLIOptions, Project, ProjectItem, UI } from "aurelia-cli"
import { inject } from "aurelia-dependency-injection"

@inject(Project, CLIOptions, UI)
export default class ElementGenerator {
	constructor (private readonly project: Project, private readonly options: CLIOptions, private readonly ui: UI) {}

	async execute (): Promise<void> {
		const name: string = await this.ui.ensureAnswer(
			this.options.args[0],
			"What would you like to call the component?",
		)

		const subFolders: string = await this.ui.ensureAnswer(
			this.options.args[1],
			`What sub-folder would you like to add it to?\nIf it doesn't exist it will be created for you.\n\nDefault folder is "." relative to the source folder src/`, ".",
		)

		const fileName: string = this.project.makeFileName(name)
		const className: string = this.project.makeClassName(name)

		this.project.root.add(
			ProjectItem.text(path.join(subFolders, `${ fileName }.ts`), this.generateJSSource(className)),
			ProjectItem.text(path.join(subFolders, `${ fileName }.html`), this.generateHTMLSource(className)),
		)

		await this.project.commitChanges()
		await this.ui.log(`Created ${ name } in the "${ path.join(this.project.root.name, subFolders) }" folder`)
	}

	generateHTMLSource (className: string): string {
		return `<template>
	<h1>\${ message }</h1>
</template>
`
	}

	generateJSSource (className: string): string {
		return `export class ${ className } {
	private readonly message: string = "Hello world"

	constructor () {}
}
`
	}
}
