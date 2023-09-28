import * as Button from '@components/common/Button/Button'
import * as Input from '@components/common/Input/Input'
import '@styles/login.css'
import GoogleIcon from 'public/svgs/modules/login/google_icon.svg'
import React from 'react'
import { X } from 'react-bootstrap-icons'
import LoginAnimation from './Animation/Animation'
import { LoginModalProps } from './Typing'

const LoginModal: React.FC<LoginModalProps> = ({
   onClose,
   onForgotPassword,
   onLogin,
   onRegister
}: LoginModalProps) => {
   return (
      <React.Fragment>
         <div className="grid grid-cols-2">
            <LoginAnimation />
            <div className="w-ful grid gap-6 p-16 relative">
               <X
                  size={32}
                  className="absolute right-4 top-4 cursor-pointer hover:scale-110 transition-all duration-200"
                  onClick={onClose}
               />
               <h2 className="font-semibold text-1xl">Sign in</h2>
               <div className="grid gap-6">
                  <Button.Button variant="outline" className="rounded-full px-4 py-2">
                     <GoogleIcon className="w-6" />
                     <span className="text-base font-semibold">Login with Google</span>
                  </Button.Button>
                  <div className="grid gap-4">
                     <h2 className="font-semibold text-lg text-center text-neutral-gray">or</h2>
                     <Input.Root>
                        <Input.Label>E-mail</Input.Label>
                        <Input.Input type="email" placeholder="Type your best email" />
                     </Input.Root>
                     <Input.Root>
                        <Input.Label>Password</Input.Label>
                        <Input.Password placeholder="Type your password" />
                     </Input.Root>
                  </div>
                  <Button.Button onClick={onLogin}>Login</Button.Button>
                  <p
                     className="text-secundary_blue-main text-sm text-center cursor-pointer transition-all hover:underline hover:text-primary-hover underline hover:font-semibold duration-300"
                     onClick={onForgotPassword}
                  >
                     Forgot your password? Click here.
                  </p>
                  <div className="divider-h my-6" />
               </div>
               <Button.Button variant="outline" onClick={onRegister}>
                  Not a user? Register now
               </Button.Button>
            </div>
         </div>
      </React.Fragment>
   )
}

export default LoginModal
