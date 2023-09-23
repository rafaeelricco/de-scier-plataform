import '@styles/loading.css'

/**
 * @notice The Spinner component provides a visual representation of a loading state.
 * @param {Object} props The properties provided to the component.
 * @param {string} [props.color='white'] The color of the spinner.
 * @param {string} [props.size='24px'] The width and height of the spinner.
 * @param {string} [props.borderWidth='3px'] The border width of the spinner.
 */
const Spinner = ({ color = 'white', size = '24px', borderWidth = '3px' }) => {
   const style = {
      width: size,
      height: size,
      borderWidth: borderWidth
   }

   return <span className="spinner" style={style}></span>
}

export default Spinner
