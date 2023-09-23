import { TitleProps } from '@/components/common/Dialog/Typing'
import * as Dialog from '@radix-ui/react-dialog'
import '@styles/dialog.css'
import React from 'react'
import { X } from 'react-bootstrap-icons'
/**
 * @notice A utility function imported from the 'tailwind-merge' library.
 * It is used to merge multiple tailwind classes into a single string that can be applied as a className to a component.
 * It avoids conflicts between different tailwind classes and ensures the proper cascading of styles.
 * @param {...string} classes - The tailwind classes to be merged
 * @returns {string} A single string of merged tailwind classes
 */
import { twMerge } from 'tailwind-merge'

/**
 * @notice The Root component is a wrapper component that encapsulates dialog functionalities.
 * @dev This component uses the React.FC functional component type and accepts the DialogProps props type from @radix-ui/react-dialog.
 * @param props Contains the properties provided to the component.
 * @param props.children React children nodes passed to this component.
 */
const Root: React.FC<Dialog.DialogProps> = ({ children, ...props }: Dialog.DialogProps) => {
   return (
      <React.Fragment>
         <Dialog.Root {...props}>{children}</Dialog.Root>
      </React.Fragment>
   )
}

/**
 * @notice The Overlay component is used to provide an overlay effect around the dialog.
 * @dev This component uses the React.FC functional component type and accepts the DialogOverlayProps props type from @radix-ui/react-dialog.
 * @param props Contains the properties provided to the component.
 * @param props.className An additional CSS class that can be applied to the component.
 * @param props.children React children nodes passed to this component.
 */
const Overlay: React.FC<Dialog.DialogOverlayProps> = ({ children, className, ...props }: Dialog.DialogOverlayProps) => {
   return (
      <React.Fragment>
         <Dialog.Overlay className={twMerge('overlay', className)} {...props}>
            {children}
         </Dialog.Overlay>
      </React.Fragment>
   )
}

/**
 * @notice The Content component is used to render the content of the dialog.
 * @dev This component uses the React.FC functional component type and accepts the DialogContentProps props type from @radix-ui/react-dialog.
 * @param props Contains the properties provided to the component.
 * @param props.className An additional CSS class that can be applied to the component.
 * @param props.children React children nodes passed to this component.
 */
const Content: React.FC<Dialog.DialogContentProps> = ({ children, className, ...props }: Dialog.DialogContentProps) => {
   return (
      <React.Fragment>
         <Dialog.Content className={twMerge('content', 'bg-background-primary', className)} {...props}>
            {children}
         </Dialog.Content>
      </React.Fragment>
   )
}

/**
 * @notice This component renders the title of a dialog. It provides an interface for the user to clear filters and close the dialog.
 * @dev The Title component uses the `TitleProps` type to specify the expected properties. It includes callback functions for clearing filters and closing the dialog, and a title property for the dialog's title.
 *
 * @param {Function} onClear - A callback function triggered when the user wants to clear filters.
 * @param {Function} onClose - A callback function triggered when the user wants to close the dialog.
 * @param {string} title - The title of the dialog. If not provided, defaults to 'Filtros'.
 */
const Title: React.FC<TitleProps> = ({ onClear, onClose, title }: TitleProps) => {
   return (
      <div className="flex justify-between items-center">
         <h2 className="text-2xl font-semibold mb-1">{title || 'Filtros'}</h2>
         <div className="flex items-center gap-4">
            {onClear && (
               <p className="text-lg text-status-blue font-semibold select-none cursor-pointer" onClick={onClear}>
                  Limpar Filtros
               </p>
            )}
            <X className="w-h-8 h-8 cursor-pointer transform duration-300 transition-transform hover:rotate-360" onClick={onClose} />
         </div>
      </div>
   )
}

export { Content, Overlay, Root, Title }
