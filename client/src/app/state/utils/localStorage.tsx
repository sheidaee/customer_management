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

type customers = {
  customers: [];
}

export const saveState = (state: customers) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (err) {
    // Catch any errors to prevent crash app
    // Ignore write errors
  }
}