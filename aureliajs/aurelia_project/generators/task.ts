import { CLIOptions, Project, ProjectItem, UI } from "aurelia-cli"
import { inject } from "aurelia-dependency-injection"

@inject(Project, CLIOptions, UI)
export default class TaskGenerator {
	constructor (private readonly project: Project, private readonly options: CLIOptions, private readonly ui: UI) {}

	async execute (): Promise<void> {
		const name: string = await this.ui.ensureAnswer(
			this.options.args[0],
			"What would you like to call the task?",
		)

		const fileName: string = this.project.makeFileName(name)
		const functionName: string = this.project.makeFunctionName(name)

		this.project.tasks.add(
			ProjectItem.text(`${ fileName }.ts`, this.generateSource(functionName)),
		)

		await this.project.commitChanges()
		await this.ui.log(`Created ${ fileName }.`)
	}

	generateSource (functionName: string): string {
		return `import * as gulp from "gulp"
import * as project from "../aurelia.json"

export default function ${ functionName } (): any {
	return gulp
		.src(project.paths.???)
		.pipe(gulp.dest(project.paths.output))
}
`
	}
}
