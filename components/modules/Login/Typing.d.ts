interface LoginModalProps {
   withLink?: boolean
   onClose: () => void
   noRedirect?: boolean
   onRegister?: () => void
   onForgotPassword?: () => void
   onLogin?: () => void
}

export { LoginModalProps }
