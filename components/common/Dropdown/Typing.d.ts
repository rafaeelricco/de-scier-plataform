interface DropdownProps {
   label: string
   className?: string
   items: FilterOption[]
   onSelect?: (value: string) => void
}

export { DropdownProps }
