import React from 'react'
import { twMerge } from 'tailwind-merge'

/**
 * @dev Box is a reusable wrapper component that accepts child elements.
 * It styles its children with specific properties (rounded corners,
 * shadow, padding and background color) and then renders them.
 *
 * @param {React.ReactNode} children - Child elements to be rendered within the box.
 */
const Box: React.FC<{ children: React.ReactNode; className?: string }> = ({
   children,
   className
}: {
   children: React.ReactNode
   className?: string
}) => {
   return (
      <React.Fragment>
         <div
            className={twMerge(
               'inline-grid w-full box-border rounded-md bg-neutral-white shadow-box py-4 px-6 ',
               className
            )}
         >
            {children}
         </div>
      </React.Fragment>
   )
}

export default Box
