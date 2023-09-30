import React from 'react'
import { twMerge } from 'tailwind-merge'

/**
 * @description Root Component.
 * Root is a reusable wrapper component that accepts child elements.
 * It styles its children with specific properties (grid layout, gap, flow direction, alignment)
 * and then renders them.
 *
 * @param {React.ReactNode} children - Child elements to be rendered within the Root component.
 *
 */
const Root: React.FC<{
   children: React.ReactNode
   className?: string
}> = ({ children, className }: { children: React.ReactNode; className?: string }) => {
   return (
      <React.Fragment>
         <div
            className={twMerge(
               'grid gap-4 grid-flow-col justify-start items-center mb-8',
               className
            )}
         >
            {children}
         </div>
      </React.Fragment>
   )
}

/**
 * @description Title Component.
 * Title is a reusable component that accepts child elements.
 * It styles its children with specific properties (font size and weight)
 * and then renders them within an h1 tag.
 *
 * @param {React.ReactNode} children - Child elements to be rendered within the Title component.
 *
 */
const Title: React.FC<{ children: React.ReactNode }> = ({
   children
}: {
   children: React.ReactNode
}) => {
   return (
      <React.Fragment>
         <h1 className="text-2xl font-semibold lg:text-1xl 2xl:text-2xl">{children}</h1>
      </React.Fragment>
   )
}

/**
 * @description Icon Component.
 * Icon is a reusable component that accepts child elements.
 * It doesn't add any styles, but provides a way to group icon elements for better semantics.
 *
 * @param {React.ReactNode} children - Child elements to be rendered within the Icon component.
 *
 */
const Icon: React.FC<{ children: React.ReactNode }> = ({
   children
}: {
   children: React.ReactNode
}) => {
   return <React.Fragment>{children} </React.Fragment>
}

export { Icon, Root, Title }
