/**
 * @title useDimension Hook
 * @notice This hook is used to get the current window dimension and respective breakpoints
 * @dev The window dimension is updated whenever the window is resized
 */
import { useEffect, useState } from 'react'

const useDimension = () => {
   const [windowDimension, setWindowDimension] = useState<number | null>(null)

   useEffect(() => {
      setWindowDimension(window.innerWidth)
   }, [])

   useEffect(() => {
      const handleResize = () => {
         setWindowDimension(window.innerWidth)
      }

      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
   }, [])

   const sm = windowDimension ? windowDimension < 640 : false
   const md = windowDimension ? windowDimension < 768 : false
   const lg = windowDimension ? windowDimension >= 1024 : false
   const xl = windowDimension ? windowDimension >= 1280 : false
   const xxl = windowDimension ? windowDimension >= 1536 : false

   return { sm, md, lg, xl, xxl }
}

export default useDimension
