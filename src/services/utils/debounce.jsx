import { useState, useEffect } from "react"

function debounce(value, delay) {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const getData = setTimeout(() => {
      setDebounceValue(value)
    }, delay)
    return () => clearTimeout(getData)
  }, [value, delay])

  return debounceValue
}

export default debounce