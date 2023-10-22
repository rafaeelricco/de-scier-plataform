import React from 'react'
import { twJoin, twMerge } from 'tailwind-merge'

interface DrawerRootProps {
   className?: string
   children?: React.ReactNode
   open?: boolean
}

interface DrawerOverlayProps {
   className?: string
   checked?: boolean
}

const Overlay: React.FC<DrawerOverlayProps> = ({ className, checked }: DrawerOverlayProps) => {
   return (
      <React.Fragment>
         <div
            className={twMerge(
               'fixed w-screen h-screen top-0 z-50 bg-black bg-opacity-0 opacity-0 backdrop-blur-[2px] backdrop-brightness-95 transition-opacity duration-500 pointer-events-none',
               className
            )}
            data-checked={checked}
         />
      </React.Fragment>
   )
}

const Root: React.FC<DrawerRootProps> = ({ children, className, open = false }: DrawerRootProps) => {
   React.useEffect(() => {
      if (open) {
         document.body.style.overflow = 'hidden'
      } else {
         document.body.style.overflow = 'auto'
      }
      return () => {
         document.body.style.overflow = 'auto'
      }
   }, [open])
   return (
      <React.Fragment>
         <div className="flex">
            <input type="checkbox" id="drawer-toggle" className="relative sr-only peer" defaultChecked={open} />
            <label
               htmlFor="drawer-toggle"
               className="absolute top-0 left-0 inline-block p-4 transition-all duration-500 bg-indigo-500 rounded-lg peer-checked:rotate-180 peer-checked:left-64 z-0"
            />
            <Overlay className="peer-checked:opacity-100" checked={open} />
            {children}
         </div>
      </React.Fragment>
   )
}

interface DrawerContentProps {
   className?: string
   children?: React.ReactNode
   position?: 'left' | 'right'
}

const Content: React.FC<DrawerContentProps> = ({ children, className, position = 'right' }: DrawerContentProps) => {
   return (
      <React.Fragment>
         <div
            className={twJoin(
               'fixed top-0 z-50 w-[80%] h-full transition-all duration-500 bg-white shadow-lg peer-checked:translate-x-0',
               `${position == 'left' && 'left-0 transform -translate-x-full'}`,
               `${position == 'right' && 'right-0 transform translate-x-full'}`,
               className
            )}
         >
            {children}
         </div>
      </React.Fragment>
   )
}

export { Content, Overlay, Root }
