import { bootstrap } from "aurelia-bootstrapper"
import { StageComponent } from "aurelia-testing"
// import { sleep } from "test/unit/test-utility"
import type { ComponentTester } from "aurelia-testing"

xdescribe("Shell: app", () => {
	let component: ComponentTester

	beforeEach((done) => {
		component = StageComponent
			.withResources("app")
			.inView(`
				<app>
				</app>
			`)
			.boundTo({})

		done()
	})

	afterEach((done) => {
		component
			.dispose()

		done()
	})

	it("TODO", function () { pending("TODO") })

	xdescribe("[methodName]", () => {
		xit("should ...", (done) => {
			component
				.create(bootstrap)
				.then(async () => {
					done()
				})
				.catch((error: any) => {
					fail(error)
					done()
				})
		})
	})
})
