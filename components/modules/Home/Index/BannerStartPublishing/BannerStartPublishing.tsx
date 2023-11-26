import ForgotPasswordModal from '@/components/modules/ForgotPassword/ForgotPassword'
import LoginModal from '@/components/modules/Login/Login'
import RegisterModal from '@/components/modules/Register/Register'
import { home_routes } from '@/routes/home'
import * as Button from '@components/common/Button/Button'
import * as Dialog from '@components/common/Dialog/Digalog'
import '@styles/home.css'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import IllustrationBannerFooter from 'public/svgs/modules/home/banner-footer/illustrations-banner.svg'
import React from 'react'
import { twMerge } from 'tailwind-merge'

/** @title BannerStartPublishing Component
 *  @notice This component displays a banner with options to start publishing. It includes modals for login, registration, and password recovery.
 */
export const BannerStartPublishing: React.FC = () => {
   /** @dev Initialize router and session status */
   const router = useRouter()
   const { status } = useSession()

   /** @dev Define component names */
   const login_component = 'login'
   const register_component = 'register'
   const forgot_password_component = 'forgot_password'

   /** @dev Initialize state for dialog open status and current component */
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
                     <p className="text-base md:text-lg font-semibold text-white">Want to publish a paper?</p>
                     <p className="text-sm md:text-base font-regular text-white">
                        Publishing with deScier is affordable, fast and easy, with selected peer-review and, 100% author-owned copyright. A variety of
                        articles genres are welcome for publication. Choose deScier, where your research meets affordability, fairness and community. Your
                        ideas, your terms, your future.
                     </p>
                  </div>
                  <div className="lg:flex lg:justify-end">
                     <Button.Button
                        className="py-3 px-10 lg:w-fit w-full text-sm lg:text-base"
                        onClick={() => {
                           if (status === 'unauthenticated') {
                              setOpen(true)
                              setComponent(login_component)
                           } else {
                              router.push(home_routes.summary)
                           }
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
