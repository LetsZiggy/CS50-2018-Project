export const roomDefault = {
  id: null,
  owner: ``,
  name: `Room Name`,
  visible: false,
  passcode: ``,
  maxUsers: 4,
  users: [],
  macros: [],
  messages: [],
  // messagesDateTimeFirst: null,
  // messagesDateTimeLast: null,
}

export const roomBooleanKeys = [
  `visible`,
]

export const roomArrayKeys = [
  `users`,
]

export const roomNumberKeys = [
  `id`,
  `maxUsers`,
]
