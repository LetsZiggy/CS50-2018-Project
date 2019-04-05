// Get value
export function deepGet (keys, state) {
  for (let i = 0; i < keys.length; i++) {
    let obj = null

    if (i !== (keys.length - 1)) {
      obj = deepAssign(keys.slice((i + 1)), state[keys[0]])
    }
    else {
      obj = state[keys[0]]
    }

    return obj
  }
}

// Set value according to schema
export function deepAssign (keys, val) {
  for (let i = 0; i < keys.length; i++) {
    let obj = {}

    if (i !== (keys.length - 1)) {
      obj[keys[i]] = deepAssign(keys.slice((i + 1)), val)
    }
    else {
      obj[keys[i]] = val
    }

    return obj
  }
}

// Calculate die roll
export function calculateDie (die) {
  return (Math.floor(Math.random() * die) + 1)
}
