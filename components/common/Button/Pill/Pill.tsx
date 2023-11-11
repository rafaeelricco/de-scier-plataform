import { DocumentTypes } from '@/mock/document_types'
import React from 'react'
import { twMerge } from 'tailwind-merge'

type PillsProps = {
   items: DocumentTypes[]
   onSelect?: (value: DocumentTypes) => void
   selected?: string
}

export const Pills: React.FC<PillsProps> = ({ items, onSelect, selected }: PillsProps) => {
   const [active, setActive] = React.useState<number>(0)
   return (
      <div className="grid grid-flow-col">
         {items.map((item, index) => (
            <React.Fragment key={item.id}>
               <button
                  type="button"
                  data-active={active === index}
                  className={twMerge(
                     'text-sm text-neutral-gray px-4 py-2 border border-neutral-gray hover:text-status-green hover:border-status-green transition-all duration-200 ease-out',
                     `${index === 0 && 'rounded-l-full'}`,
                     `${index === items.length - 1 && 'rounded-r-full'}`,
                     `${selected === item.value && 'text-status-green border-status-green'}`,
                     `${active === index && 'text-status-green border-status-green'}`
                  )}
                  onClick={() => {
                     setActive(index)
                     onSelect && onSelect(item)
                  }}
               >
                  {item.label}
               </button>
            </React.Fragment>
         ))}
      </div>
   )
}
