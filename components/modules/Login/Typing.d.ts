interface LoginModalProps {
   withLink?: boolean
   authorName?: string
   onClose: () => void
   noRedirect?: boolean
   onRegister?: () => void
   onForgotPassword?: () => void
   onLogin?: () => void
}

export { LoginModalProps }
