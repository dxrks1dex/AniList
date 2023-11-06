import { useEffect } from 'react'

export const useOutsideDetect = (ref, setIsListOpen): void => {
  useEffect(() => {
    function isClickOutside (e): void {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsListOpen(false)
      }
    }
    document.addEventListener('mousedown', isClickOutside)
    return () => {
      document.removeEventListener('mousedown', isClickOutside)
    }
  }, [ref, setIsListOpen])
}
