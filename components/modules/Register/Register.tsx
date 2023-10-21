import { useLoading } from '@/hooks/useLoading'
import * as Button from '@components/common/Button/Button'
import * as Input from '@components/common/Input/Input'
import '@styles/login.css'
import GoogleIcon from 'public/svgs/modules/login/google_icon.svg'
import SuccessIllustration from 'public/svgs/modules/login/register-success.svg'
import React from 'react'
import { ArrowLeft, BoxArrowRight, X } from 'react-bootstrap-icons'
import LoginAnimation from '../Login/Animation/Animation'
import { RegisterModalProps } from './Typing'

const RegisterModal: React.FC<RegisterModalProps> = ({ onClose, onRegister, onBack, onLogin, onReturnToLogin }: RegisterModalProps) => {
   const { loading, start, stop } = useLoading()

   const success_component = 'success'
   const [component, setComponent] = React.useState('')

   const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      start('loading')

      setTimeout(() => {
         stop('loading')
      }, 2000)

      setComponent(success_component)
   }

   return (
      <form onSubmit={onSubmit}>
         <div className="grid md:grid-cols-2 relative">
            <LoginAnimation />
            <X
               size={32}
               className="md:hidden absolute z-20 bg-white rounded-md right-4 top-4 cursor-pointer hover:scale-110 transition-all duration-200"
               onClick={onClose}
            />
            <div className="w-ful grid gap-6 md:p-16 relative p-6 pb-12">
               {component !== success_component && (
                  <React.Fragment>
                     <X
                        size={32}
                        className="hidden md:absolute right-4 top-4 cursor-pointer hover:scale-110 transition-all duration-200"
                        onClick={onClose}
                     />
                     <div className="flex items-center gap-4">
                        <ArrowLeft size={28} onClick={onBack} />
                        <h2 className="font-semibold text-1xl">Register</h2>
                     </div>
                  </React.Fragment>
               )}
               {component === success_component && (
                  <React.Fragment>
                     <h2 className="font-semibold text-1xl">Almost there!</h2>
                     <SuccessIllustration className="w-96" />
                     <div className="grid gap-6">
                        <p className="text-base">Your account creation is almost complete -We’ve sent an account validation link to your e-mail inbox.</p>
                        <Button.Button variant="outline" onClick={onReturnToLogin}>
                           Return to login
                        </Button.Button>
                     </div>
                  </React.Fragment>
               )}
               {component !== success_component && (
                  <div className="grid gap-6">
                     <Button.Button variant="outline" className="rounded-full px-4 py-2">
                        <GoogleIcon className="w-6" />
                        <span className="text-base font-semibold">Register with Google</span>
                     </Button.Button>
                     <div className="grid gap-4">
                        <h2 className="font-semibold text-lg text-center text-neutral-gray">or</h2>
                        <Input.Root>
                           <Input.Label>Name</Input.Label>
                           <Input.Input type="text" placeholder="Type your name" />
                        </Input.Root>
                        <Input.Root>
                           <Input.Label>E-mail</Input.Label>
                           <Input.Input type="email" placeholder="Type your best email" />
                        </Input.Root>
                        <Input.Root>
                           <Input.Label>Password</Input.Label>
                           <Input.Password placeholder="Type your password" />
                        </Input.Root>
                        <Input.Root>
                           <Input.Label>Password confirmation</Input.Label>
                           <Input.Password placeholder="Type your password again" />
                        </Input.Root>
                     </div>
                     <Button.Button loading={loading.loading} type="submit" onClick={onRegister}>
                        Register now
                        <BoxArrowRight size={24} />
                     </Button.Button>
                     <p
                        className="text-secundary_blue-main text-sm text-center cursor-pointer transition-all hover:underline hover:text-primary-hover underline hover:font-semibold duration-300"
                        onClick={onLogin}
                     >
                        Already have an account? Login here.
                     </p>
                  </div>
               )}
            </div>
         </div>
      </form>
   )
}

export default RegisterModal
