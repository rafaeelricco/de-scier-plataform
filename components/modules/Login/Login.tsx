import * as Button from '@components/common/Button/Button'
import * as Input from '@components/common/Input/Input'
import '@styles/login.css'
import GoogleIcon from 'public/svgs/modules/login/google_icon.svg'
import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { X } from 'react-bootstrap-icons'
import LoginAnimation from './Animation/Animation'
import { LoginModalProps } from './Typing'
import { useForm, SubmitHandler } from 'react-hook-form'
import { LoginProps } from '@/schemas/login'
import { toast } from 'react-toastify'
import { home_routes } from '@/routes/home'
import { useRouter } from 'next/navigation'

const LoginModal: React.FC<LoginModalProps> = ({ withLink = false, onClose, onForgotPassword, onLogin, onRegister }: LoginModalProps) => {
   const router = useRouter()

   const [loading, setLoading] = useState(false)

   const {
      register,
      handleSubmit,
      watch,
      formState: { errors }
   } = useForm<LoginProps>({
      defaultValues: {
         email: '',
         password: ''
      }
   })

   const onSubmit: SubmitHandler<LoginProps> = async (data) => {
      setLoading(true)
      const authResult = await signIn('credentials', {
         redirect: false,
         email: data.email,
         password: data.password
      })

      setLoading(false)

      if (authResult?.error) {
         toast.error('Login error. Check your credentials.')
         return
      }

      toast.success('Successful login')
      router.push(home_routes.summary)
   }

   const loginWithGoogle = async (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault()
      await signIn('google', {
         callbackUrl: '/summary'
      })
   }

   return (
      <React.Fragment>
         <div className="grid md:grid-cols-2 relative">
            <X
               size={32}
               className="absolute z-20 bg-white rounded-md right-4 top-4 cursor-pointer hover:scale-110 transition-all duration-200"
               onClick={onClose}
            />
            <LoginAnimation />
            <div className="w-ful grid gap-6 md:p-16 relative p-6 pb-12">
               <X size={32} className="hidden md:absolute right-4 top-4 cursor-pointer hover:scale-110 transition-all duration-200" onClick={onClose} />
               <h2 className="font-semibold text-1xl">Sign in</h2>
               {withLink && (
                  <React.Fragment>
                     <p className="text-sm font-regular">
                        Marcelo Santana invited you to be a reviewer/editor for “Article name”, sign in or register to continue.
                     </p>
                  </React.Fragment>
               )}
               <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
                  <Button.Button variant="outline" className="rounded-full px-4 py-2" onClick={loginWithGoogle}>
                     <GoogleIcon className="w-6" />
                     <span className="text-base font-semibold">Login with Google</span>
                  </Button.Button>
                  <div className="grid gap-4">
                     <h2 className="font-semibold text-lg text-center text-neutral-gray">or</h2>
                     <Input.Root>
                        <Input.Label>E-mail</Input.Label>
                        <Input.Input type="email" placeholder="Type your best email" {...register('email')} />
                     </Input.Root>
                     <Input.Root>
                        <Input.Label>Password</Input.Label>
                        <Input.Password placeholder="Type your password" {...register('password')} />
                     </Input.Root>
                  </div>
                  <Button.Button type="submit" loading={loading}>
                     Login
                  </Button.Button>
                  <p
                     className="text-secundary_blue-main text-sm text-center cursor-pointer transition-all hover:underline hover:text-primary-hover underline hover:font-semibold duration-300"
                     onClick={onForgotPassword}
                  >
                     Forgot your password? Click here.
                  </p>
                  <div className="divider-h my-6" />
               </form>
               <Button.Button variant="outline" onClick={onRegister}>
                  Not a user? Register now
               </Button.Button>
            </div>
         </div>
      </React.Fragment>
   )
}

export default LoginModal
