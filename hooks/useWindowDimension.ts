/**
 * @title useWindowDimension Hook
 * @notice This hook is used to get the current window dimension
 * @dev The window dimension is updated whenever the window is resized
 */
import { useEffect, useState } from 'react'

const useWindowDimension = () => {
  /**
   * @notice This state is used to hold the current window dimension
   * @dev It is initialized as null and updated with the actual window width on component mount and window resize
   */
  const [windowDimension, setWindowDimension] = useState<number | null>(null)

  /**
   * @notice This effect sets the initial window dimension on component mount
   * @dev It only runs once on component mount
   */
  useEffect(() => {
    setWindowDimension(window.innerWidth)
  }, [])

  /**
   * @notice This effect updates the window dimension whenever the window is resized
   * @dev It sets up an event listener for the window resize event on component mount and cleans it up on component unmount
   */
  useEffect(() => {
    const handleResize = () => {
      setWindowDimension(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  /**
   * @notice The current window dimension is returned by the hook
   * @return Current window dimension
   */
  return windowDimension
}

export default useWindowDimension
