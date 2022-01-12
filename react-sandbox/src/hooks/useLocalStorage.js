import { useState } from "react"

function useLocalStorage(key, initialValue) {
  const [localStorageValue, setLocalStorageValue] = useState(() =>
    getLocalStorageValue(key, initialValue)
  )

  const setValue = value => {
    // check if value is a function
    const valueToStore =
      value instanceof Function ? value(localStorageValue) : value

    // set to state
    setLocalStorageValue(value)

    // set to local storage
    localStorage.setItem(key, JSON.stringify(valueToStore))
  }

  return [localStorageValue, setValue]
}

function getLocalStorageValue(key, initialValue) {
  const itemFromLS = localStorage.getItem(key)
  return itemFromLS ? JSON.parse(itemFromLS) : initialValue
}

export default useLocalStorage
