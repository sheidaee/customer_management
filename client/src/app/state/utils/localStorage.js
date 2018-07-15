export const loadState = () => {
  // for user privacy - if it was disabled
  try {
    const serializedState = localStorage.getItem('state')

    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch(err) {
    // let reducer to initialize the app
    return undefined
  }
}

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (err) {
    // Catch any errors to prevent crash app
    // Ignore write errors
  }
}