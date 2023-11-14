/**
 * @title useDimension Hook
 * @author [Seu Nome]
 * @notice This hook is used to get and monitor the current window dimensions to determine responsive breakpoints.
 * @dev The hook returns an object with boolean values for standard breakpoints (sm, md, lg, xl, xxl) and the current window width. It updates the window dimensions on window resize events. 'windowDimension' provides the exact width of the window in pixels.
 */
import { useEffect, useState } from 'react'

const useDimension = () => {
   /** @dev State to store the current window width in pixels. */
   const [windowDimension, setWindowDimension] = useState<number | null>(null)

   useEffect(() => {
      /** @dev Set initial window dimension on component mount. */
      setWindowDimension(window.innerWidth)
   }, [])

   useEffect(() => {
      /** @dev Function to update window dimension on window resize. */
      const handleResize = () => {
         setWindowDimension(window.innerWidth)
      }

      window.addEventListener('resize', handleResize)
      /** @dev Cleanup function to remove the event listener. */
      return () => window.removeEventListener('resize', handleResize)
   }, [])

   /** @dev Breakpoint checks based on the current window dimension. */
   const sm = windowDimension ? windowDimension < 640 : false
   const md = windowDimension ? windowDimension < 768 : false
   const lg = windowDimension ? windowDimension >= 1024 : false
   const xl = windowDimension ? windowDimension >= 1280 : false
   const xxl = windowDimension ? windowDimension >= 1536 : false

   /** @return Object containing boolean values for breakpoints and the current window width. */
   return { sm, md, lg, xl, xxl, windowDimension }
}

export default useDimension
