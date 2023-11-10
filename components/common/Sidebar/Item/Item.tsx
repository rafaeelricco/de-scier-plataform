import '@styles/sidebar.css'
import Link from 'next/link'
import React from 'react'

type ItemProps = {
   icon: React.ReactNode
   icon_end?: React.ReactNode
   text: string
   active?: boolean
   href: string
   onClick?: () => void
}

const Item: React.FC<ItemProps> = ({ icon, icon_end, text, active = false, href, onClick }: ItemProps) => {
   return (
      <React.Fragment>
         <Link href={href} onClick={onClick}>
            <div
               data-active={active}
               className="relative hover:bg-[#F4E8FF] rounded-md hover:transition-colors duration-200 dark:hover:transition-colors"
            >
               {active && <div className="h-full w-1 bg-black-primary absolute" />}
               <div className="flex items-center gap-4 py-3 px-2 md:py-2 md:px-2 cursor-pointer min-h-[2.875rem] item-p">
                  <div data-active={active} className="w-6 first:fill-neutral-light_gray item">
                     {React.cloneElement(icon as React.ReactElement)}
                  </div>
                  <div className="flex items-center gap-2">
                     <p
                        data-active={active}
                        className="font-regular text-neutral-light_gray text-base data-[active=true]:font-semibold data-[active=true]:text-primary-main"
                     >
                        {text}
                     </p>
                     {icon_end && <div className="w-6 last:fill-neutral-light_gray item">{React.cloneElement(icon_end as React.ReactElement)}</div>}
                  </div>
               </div>
            </div>
         </Link>
      </React.Fragment>
   )
}

export default Item
