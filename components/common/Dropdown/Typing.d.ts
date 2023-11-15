interface DropdownProps {
   label: string
   className?: string
   items: FilterOption[]
   no_selected?: boolean
   custom_intial_value?: string
   onSelect?: (value: string) => void
}

export { DropdownProps }
