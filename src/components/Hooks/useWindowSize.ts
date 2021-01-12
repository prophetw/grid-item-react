import { useEffect, useState } from 'react'
import { debounce } from 'lodash'

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  })
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    const debounceResize = debounce(handleResize, 100)
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', debounceResize)
  }, [])
  return windowSize
}
export { useWindowSize }
