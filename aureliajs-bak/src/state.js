import { lobbyDefault } from './modules/lobby-form'
import { roomDefault } from './modules/room-form'

export const initialState = {
  token: null,
  username: null,
  lobby: { ...lobbyDefault },
  room:  { ...roomDefault },
}
