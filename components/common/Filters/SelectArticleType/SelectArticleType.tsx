import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { articles_types_filter } from '@/mock/articles_types'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import { SelectArticleTypeProps } from './Typing'

/**
 * @title SelectArticleType Component
 * @notice This component renders a dropdown select for choosing an article type.
 * @dev Component for selecting an article type from a predefined list of options.
 */
export const SelectArticleType: React.FC<SelectArticleTypeProps> = ({ onValueChange, selected, placeholder }: SelectArticleTypeProps) => {
   return (
      <React.Fragment>
         <Select
            onValueChange={(value) => {
               onValueChange(value)
            }}
         >
            <SelectTrigger
               className={twMerge(
                  'flex items-center gap-1 justify-center py-2 px-4 text-sm rounded-full min-w-[200px] w-fit border-[1px] border-primary-main text-primary-main hover:scale-105 transition-all duration- bg-transparent font-semibold'
               )}
            >
               <SelectValue placeholder={placeholder || 'Article type:'} />
            </SelectTrigger>
            <SelectContent>
               <SelectGroup>
                  {articles_types_filter.map((item, index) => (
                     <React.Fragment key={item.id}>
                        {item.type === 'label' && (
                           <React.Fragment>
                              {index !== 0 && <DropdownMenuSeparator />}
                              <SelectLabel className="px-4">{item.label}</SelectLabel>
                           </React.Fragment>
                        )}
                        {item.type === 'item' && (
                           <SelectItem
                              value={item.value as string}
                              onClick={(e) => {}}
                              className="px-4 text-sm font-semibold text-primary-main hover:text-primary-hover cursor-pointer"
                           >
                              {item.label}
                           </SelectItem>
                        )}
                     </React.Fragment>
                  ))}
               </SelectGroup>
            </SelectContent>
         </Select>
      </React.Fragment>
   )
}
