import { CLIOptions, Project, ProjectItem, UI } from "aurelia-cli"
import { inject } from "aurelia-dependency-injection"

@inject(Project, CLIOptions, UI)
export default class GeneratorGenerator {
	constructor (private readonly project: Project, private readonly options: CLIOptions, private readonly ui: UI) {}

	async execute (): Promise<void> {
		const name: string = await this.ui.ensureAnswer(
			this.options.args[0],
			"What would you like to call the generator?",
		)

		const fileName: string = this.project.makeFileName(name)
		const className: string = this.project.makeClassName(name)

		this.project.generators.add(
			ProjectItem.text(`${ fileName }.ts`, this.generateSource(className)),
		)

		await this.project.commitChanges()
		await this.ui.log(`Created ${ fileName }.`)
	}

	generateSource (className: string): string {
		return `import { inject } from "aurelia-dependency-injection"
import { Project, ProjectItem, CLIOptions, UI } from "aurelia-cli"

@inject(Project, CLIOptions, UI)
export default class ${ className }Generator {
	constructor (project, options, ui) {
		this.project = project
		this.options = options
		this.ui = ui
	}

	async execute (): Promise<void> {
		return this.ui
			.ensureAnswer(this.options.args[0], "What would you like to call the new item?")
			.then(name => {
				const fileName: string = this.project.makeFileName(name)
				const className: string = this.project.makeClassName(name)

				this.project.elements.add(
					ProjectItem.text(\`\${ fileName }.ts\`, this.generateSource(className, fileName))
				)

				return this.project.commitChanges()
					.then(() => this.ui.log(\`Created \${ fileName }.\`))
			})
	}

	generateSource (className: string, fileName: string): string {
return \`import { bindable, bindingMode, customElement } from "aurelia-framework"

@customElement("\${ fileName }")
export class \${ className } {
	@bindable({ defaultBindingMode: bindingMode.twoWay })
	value: any

	valueChanged (current: \${ className }["value"], previous: \${ className }["value"]): any {}
}
\`
	}
}
`
	}
}
