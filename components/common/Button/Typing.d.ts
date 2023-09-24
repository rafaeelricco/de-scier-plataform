import { ComponentProps } from 'react'

type ButtonProps = ComponentProps<'button'> & {
   variant?: 'primary' | 'outline' | 'disabled'
   loading?: boolean
   icon?: React.ReactNode
}

type LinkProps = {
   href: string
   children: React.ReactNode
}

export { ButtonProps, LinkProps }
