interface DropdownProps {
   label: string
   className?: string
   items: FilterOption[]
   no_selected?: boolean
   onSelect?: (value: string) => void
}

export { DropdownProps }
