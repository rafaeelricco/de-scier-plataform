import { ComponentProps } from 'react'

type ButtonProps = ComponentProps<'button'> & {
   variant?: 'primary' | 'outline' | 'disabled'
   loading?: boolean
   icon?: React.ReactNode
}

interface LinkProps {
   href: string
   children: React.ReactNode
}

interface BackProps {
   text?: string
}

export { BackProps, ButtonProps, LinkProps }
