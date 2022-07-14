import { useEffect, useState } from 'react'

function useDebounce (value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    // Cancel the timeout if value changes
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])
  return debouncedValue
}

export { useDebounce }
