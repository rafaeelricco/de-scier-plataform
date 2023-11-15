'use client'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { FilterOption } from '@/mock/dropdow_filter_options'
import React from 'react'
import { CaretDown } from 'react-bootstrap-icons'
import { twMerge } from 'tailwind-merge'
import { DropdownProps } from './Typing'

const Dropdown: React.FC<DropdownProps> = ({ label, className, items, no_selected = false, custom_intial_value, onSelect }: DropdownProps) => {
   const [selected, setSelected] = React.useState<string | null>(no_selected === true ? null : items[0].label)
   return (
      <React.Fragment>
         <DropdownMenu>
            <DropdownMenuTrigger>
               <div
                  className={twMerge(
                     'flex items-center justify-center py-2 px-4 text-sm rounded-full min-w-[200px] border-[1px] border-primary-main text-primary-main hover:scale-105 transition-all duration-200',
                     className
                  )}
               >
                  <span className="text-sm font-semibold text-primary-main">
                     {label} {selected} {custom_intial_value}
                  </span>
                  <CaretDown className="ml-2" />
               </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={twMerge('min-w-[200px]', className)}>
               {items.map((item: FilterOption) => (
                  <React.Fragment key={item.id}>
                     <DropdownMenuItem
                        aria-valuetext={item.value}
                        onClick={(e) => {
                           const value = e.currentTarget.getAttribute('aria-valuetext')
                           setSelected(item.label)
                           onSelect && onSelect(value as string)
                        }}
                     >
                        <DropdownMenuLabel>{item.label}</DropdownMenuLabel>
                     </DropdownMenuItem>
                  </React.Fragment>
               ))}
            </DropdownMenuContent>
         </DropdownMenu>
      </React.Fragment>
   )
}

export { Dropdown }
