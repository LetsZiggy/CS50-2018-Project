import { monsterForm } from './monster-form'

export const lobbyForm = {
  challengeRatings: [
    [ -1, `All` ],
    ...monsterForm.challengeRatings,
  ],
}

export const lobbyDefault = {
  currentLobby: `show-tables`,
  filterTables: [],
  filterMonsters: -1,
  tablesList: [],
  charactersList: [],
  monstersList: [],
}
