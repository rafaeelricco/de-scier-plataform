import ForgotPasswordModal from '@/components/modules/ForgotPassword/ForgotPassword'
import LoginModal from '@/components/modules/Login/Login'
import RegisterModal from '@/components/modules/Register/Register'
import * as Button from '@components/common/Button/Button'
import * as Dialog from '@components/common/Dialog/Digalog'
import '@styles/home.css'
import IllustrationBannerFooter from 'public/svgs/modules/home/banner-footer/illustrations-banner.svg'
import React from 'react'
import { twMerge } from 'tailwind-merge'

export const BannerStartPublishing: React.FC = () => {
   const login_component = 'login'
   const register_component = 'register'
   const forgot_password_component = 'forgot_password'

   const [open, setOpen] = React.useState(false)
   const [component, setComponent] = React.useState(login_component)
   return (
      <React.Fragment>
         <Dialog.Root open={open}>
            <Dialog.Overlay />
            <Dialog.Content className={twMerge('w-[80%] max-w-[1200px] p-0', component === forgot_password_component && 'max-w-[554px]')}>
               {component === login_component && (
                  <LoginModal
                     onClose={() => setOpen(false)}
                     onForgotPassword={() => setComponent(forgot_password_component)}
                     onLogin={() => setComponent(login_component)}
                     onRegister={() => setComponent(register_component)}
                  />
               )}
               {component === register_component && (
                  <RegisterModal
                     onBack={() => setComponent(login_component)}
                     onClose={() => {
                        setOpen(false)
                        setComponent(login_component)
                     }}
                     onLogin={() => setComponent(login_component)}
                     onRegister={() => setComponent(register_component)}
                     onReturnToLogin={() => setComponent(login_component)}
                  />
               )}
               {component === forgot_password_component && (
                  <ForgotPasswordModal onBack={() => setComponent(login_component)} onClose={() => setComponent(login_component)} />
               )}
            </Dialog.Content>
         </Dialog.Root>
         <div className="bg-secundary_blue-main p-6 lg:py-6 lg:px-12 flex justify-center rounded-md">
            <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-20">
               <IllustrationBannerFooter className="w-48 lg:w-60 shrink-0 mb-4 md:mb-0" />
               <div className="flex flex-col gap-4">
                  <div className="grid gap-2">
                     <p className="text-base md:text-lg font-semibold text-white">Want to publish a scientific paper?</p>
                     <p className="text-sm md:text-base font-regular text-white">
                        Publishing in DeScier is fast and easy, with peer selected review, and 100% author owned copyright. Join the movement now!
                     </p>
                  </div>
                  <div className="lg:flex lg:justify-end">
                     <Button.Button
                        className="py-3 px-10 lg:w-fit w-full text-sm lg:text-base"
                        onClick={() => {
                           setOpen(true)
                           setComponent(login_component)
                        }}
                     >
                        Start publishing now!
                     </Button.Button>
                  </div>
               </div>
            </div>
         </div>
      </React.Fragment>
   )
}
