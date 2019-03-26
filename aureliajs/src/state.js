import { lobbyDefault } from './modules/lobby-form'
import { tableDefault } from './modules/table-form'
import { characterDefault } from './modules/character-form'
import { monsterDefault } from './modules/monster-form'

export const initialState = {
  token: null,
  username: null,
  lobby:     { ...lobbyDefault },
  table:     { ...tableDefault },
  character: { ...characterDefault },
  monster:   { ...monsterDefault },
}
