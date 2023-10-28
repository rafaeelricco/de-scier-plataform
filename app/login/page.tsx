/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import ForgotPasswordModal from '@/components/modules/ForgotPassword/ForgotPassword'
import LoginModal from '@/components/modules/Login/Login'
import RegisterModal from '@/components/modules/Register/Register'
import { ConfirmProfileRequestProps, confirmProfileService } from '@/services/user/confirmProfile.service'
import * as Dialog from '@components/common/Dialog/Digalog'
import { useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { twMerge } from 'tailwind-merge'

export default function LoginPage() {
   const queryParams = useSearchParams()

   const login_component = 'login'
   const register_component = 'register'
   const forgot_password_component = 'forgot_password'

   const [component, setComponent] = useState(login_component)

   const [isProfileConfirmed, setIsProfileConfirmed] = useState(false)

   useEffect(() => {
      const encodedConfirmProfileData = queryParams.get('data')
      if (encodedConfirmProfileData) {
         const confirmProfile = async (confirmProfileData: ConfirmProfileRequestProps) => {
            if (!isProfileConfirmed) {
               const response = await confirmProfileService(confirmProfileData)
               if (response.success) {
                  toast.success(' Your registration is now confirmed')
                  setIsProfileConfirmed(true)
                  return
               }
            }
         }
         const decodedConfirmProfileData = JSON.parse(Buffer.from(encodedConfirmProfileData, 'base64').toString('ascii'))
         confirmProfile(decodedConfirmProfileData)
      }
   }, [])

   return (
      <React.Fragment>
         <Suspense>
            <Dialog.Root open={true}>
               <Dialog.Overlay />
               <Dialog.Content className={twMerge('w-[80%] max-w-[1200px] p-0', component === forgot_password_component && 'max-w-[500px]')}>
                  {component === login_component && (
                     <React.Fragment>
                        <LoginModal
                           onClose={() => setComponent('')}
                           onForgotPassword={() => setComponent(forgot_password_component)}
                           onLogin={() => setComponent(login_component)}
                           onRegister={() => setComponent(register_component)}
                        />
                     </React.Fragment>
                  )}
                  {component === register_component && (
                     <RegisterModal
                        onBack={() => setComponent(login_component)}
                        onClose={() => console.log('close event')}
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
         </Suspense>
      </React.Fragment>
   )
}
