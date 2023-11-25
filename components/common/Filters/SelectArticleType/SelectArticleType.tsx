import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from '@/components/ui/select'
import { articles_types_filter } from '@/mock/articles_types'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import { SelectArticleTypeProps } from './Typing'

/**
 * @title SelectArticleType Component
 * @notice This component renders a dropdown select for choosing an article type.
 * @dev Component for selecting an article type from a predefined list of options.
 */
export const SelectArticleType: React.FC<SelectArticleTypeProps> = ({
   onValueChange,
   selected: selected_value,
   no_selected,
   placeholder
}: SelectArticleTypeProps) => {
   /**
    * @dev Determines the initial selected value based on props.
    * @dev If `no_selected` is true, there is no initial selection, otherwise it uses `selected_value` or the first item in `items`.
    */
   const initialSelected = no_selected ? null : selected_value

   /** @dev State hook for managing the currently selected item. */
   const [selected, setSelected] = React.useState<string | null>(initialSelected)

   /** @dev Effect hook to update the `selected` state when `selected_value`  prop changes. */
   React.useEffect(() => {
      if (selected_value !== undefined) {
         setSelected(selected_value)
      }
   }, [selected_value])
   return (
      <React.Fragment>
         <Select onValueChange={(value) => onValueChange(value)}>
            <SelectTrigger
               className={twMerge(
                  'flex items-center gap-1 justify-center py-2 px-4 text-sm rounded-full min-w-[200px] w-fit border-[1px] border-primary-main text-primary-main hover:scale-105 transition-all duration- bg-transparent font-semibold'
               )}
            >
               <span className="text-sm font-semibold text-primary-main">
                  {placeholder} {articles_types_filter.find((item) => item.type === 'item' && item.value === selected)?.label}
               </span>
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
