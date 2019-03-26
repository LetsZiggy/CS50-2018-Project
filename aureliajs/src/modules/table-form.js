import { formStatistics } from './form-statistics'
import { characterForm } from './character-form'
import { monsterForm } from './monster-form'

export const tableForm = {
  table: {
    statistics: [ ...formStatistics ]
  },
  character: {
    levels: [ ...characterForm.levels ],
    savingThrowProficiencies: [ ...characterForm.formSavingThrowProficiencies ],
    dependants: [ ...characterForm.dependants ],
    classes: characterForm.classes
      .map((value) => value[1])
      .reduce((acc, value) => [ ...acc, ...value ], []),
    weaponProficiencies: characterForm.weaponProficiencies
      .map((value) => value[1])
      .reduce((acc, value) => [ ...acc, ...value ], []),
    armorProficiencies: characterForm.armorProficiencies
      .map((value) => value[1])
      .reduce((acc, value) => [ ...acc, ...value ], []),
    toolProficiencies: characterForm.toolProficiencies
      .map((value) => value[1])
      .reduce((acc, value) => [ ...acc, ...value ], []),
    languageProficiencies: characterForm.languageProficiencies
      .map((value) => value[1])
      .reduce((acc, value) => [ ...acc, ...value ], []),
  },
  monster: {
    savingThrowProficiencies: [ ...monsterForm.formSavingThrowProficiencies ],
    dependents: [ ...monsterForm.dependents ],
    acTypes: monsterForm.acTypes
      .map((value) => value[1])
      .reduce((acc, value) => [ ...acc, ...value ], []),
  },
}

export const tableDefault = {
  id: null,
  owner: ``,
  name: `Table Name`,
  published: false,
  passcode: ``,
  maxPlayers: 4,
  players: [],
  charactersIDs: [],
  charactersList: [],
  charactersData: [],
  monstersIDs: [],
  monstersList: [],
  monstersData: [],
  messages: [],
  // messagesDateTimeFirst: null,
  // messagesDateTimeLast: null,
}

export const tableBooleanKeys = [
  `published`,
]

export const tableArrayKeys = [
  `players`,
  `charactersIDs`,
  `monstersIDs`,
  `initiatives`,
]

export const tableJSONKeys = [
  [`charactersData`, `array`],
  [`monstersData`, `array`],
]

export const tableNumberKeys = [
  `id`,
  `maxPlayers`,
  `charactersIDs`,
  `monstersIDs`,
]
