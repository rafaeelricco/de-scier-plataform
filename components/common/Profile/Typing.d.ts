interface ProfileProps {
   className?: string
   onClose?: () => void
}

interface BadgeProps {
   status: string
}

interface SubmitedItemProps {
   id?: number
   title: string
   date: string
   status: string
}

export { BadgeProps, ProfileProps, SubmitedItemProps }
