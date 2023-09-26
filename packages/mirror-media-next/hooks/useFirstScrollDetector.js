import { useEffect, useState } from 'react'

const useFirstScrollDetector = () => {
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    console.log('useEffect in custom hook useFirstScrollDetector')
    const handleScroll = () => {
      console.log('handleScroll in custom hook useFirstScrollDetector')
      setHasScrolled(true)
      window.removeEventListener('scroll', handleScroll)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return hasScrolled
}

export default useFirstScrollDetector
