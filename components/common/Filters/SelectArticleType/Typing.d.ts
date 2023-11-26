interface SelectArticleTypeProps {
   onValueChange: (value: string) => void
   selected: string | null
   placeholder?: string
   no_selected?: boolean
}

export { SelectArticleTypeProps }