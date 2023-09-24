import * as Button from '@components/common/Button/Button'
import * as Input from '@components/common/Input/Input'
import '@styles/login.css'
import Image from 'next/image'
import Animation from 'public/svgs/modules/login/deScier - Login animation.svg'
import GoogleIcon from 'public/svgs/modules/login/google_icon.svg'
import deScierStamp from 'public/svgs/modules/login/selo.png'
import BlobShape from 'public/svgs/modules/login/shape.svg'
import React from 'react'

const LoginModal: React.FC = () => {
   return (
      <React.Fragment>
         <div className="grid grid-cols-2">
            <div className="w-full relative overflow-hidden login-animation-container">
               <div className="login-text">
                  <div className="grid gap-2">
                     <h2 className="font-semibold text-xl text-neutral-white">Welcome to our platform!</h2>
                     <p className="text-base text-neutral-white">
                        Easy scientific article publication, with <br /> 100% of the copyrights to the author,
                        <br /> protected by Blockchain technology.
                     </p>
                  </div>
                  <h2 className="font-semibold text-xl text-neutral-white">Join the DeSci movement!</h2>
               </div>
               <Animation className="login-animation" />
               <BlobShape className="login-blob-shape" />
               <Image width={116} height={116} src={deScierStamp} alt="deScier stamp" className="login-stamp" />
            </div>
            <div className="w-ful grid gap-6 py-16 px-14">
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
                  <Button.Button>Login</Button.Button>
                  <p className="text-secundary_blue-main text-sm text-center cursor-pointer transition-all hover:underline hover:text-primary-hover underline hover:font-semibold duration-300">
                     Forgot your password? Click here.
                  </p>
                  <div className="divider-h" />
               </div>
               <Button.Button variant="outline">Not a user? Register now</Button.Button>
            </div>
         </div>
      </React.Fragment>
   )
}

export default LoginModal
