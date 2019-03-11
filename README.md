# CS50 2018 - Project

#### Guides

[Instruction](https://docs.cs50.net/2018/x/project/project.html) | [Week's Syllabus](https://courses.edx.org/courses/course-v1:HarvardX+CS50+X/courseware/bdc606f10e7347f6a61a341c4544bbf7/b3a373c224534dea9e7630566af461e6/)

---

#### Usage

`PLACEHOLDER`

---

#### Setup

1. Setup Aurelia.js
	1. `cd <ROOT>/aureliajs`
	2. `mkdir scripts`
	3. `npm install`
2. Setup Adonis.js
	1. `cd <ROOT>/adonisjs`
	2. Create and edit `.env` (Use `.env.example` as example)
	3. Install database package (`pg` has been added to `package.json` by default)
	4. `npm install`
3. Create scripts folder symlink
	- Linux: `ln -s <ABSOLUTE PATH ROOT>/aureliajs/scripts <ABSOLUTE PATH ROOT>/adonisjs/public`
	- Windows: `mklink /D <ABSOLUTE PATH ROOT>/aureliajs/scripts <ABSOLUTE PATH ROOT>/adonisjs/public`

---

#### Run

1. Aurelia.js
	1. Open new terminal
	2. `cd <ROOT>/aureliajs`
	3. `au build [--watch]`
2. Adonis.js
	1. Open new terminal
	2. `cd <ROOT>/adonisjs`
	3. `adonis migration:run`
	4. `adonis serve [--dev]`

---

#### Testing

- Aurelia.js
	1. `cd <ROOT>/aureliajs`
	2. `au test [--watch]`
- Adonis.js
	1. `cd <ROOT>/adonisjs`
	2. `adonis test`
