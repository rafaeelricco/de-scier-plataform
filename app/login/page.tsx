'use client'

import ForgotPasswordModal from '@/components/modules/ForgotPassword/ForgotPassword'
import LoginModal from '@/components/modules/Login/Login'
import RegisterModal from '@/components/modules/Register/Register'
import { ConfirmProfileRequestProps, confirmProfileService } from '@/services/user/confirmProfile.service'
import * as Dialog from '@components/common/Dialog/Digalog'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

export default function LoginPage() {
   const login_component = 'login'
   const register_component = 'register'
   const forgot_password_component = 'forgot_password'

   const queryParams = useSearchParams()

   useEffect(() => {
      const encodedConfirmProfileData = queryParams.get('data')
      if (encodedConfirmProfileData) {
         const decodedConfirmProfileData = JSON.parse(Buffer.from(encodedConfirmProfileData, 'base64').toString('ascii'))
         confirmProfile(decodedConfirmProfileData)
      }
   }, [queryParams])

   const confirmProfile = async (confirmProfileData: ConfirmProfileRequestProps) => {
      const response = await confirmProfileService(confirmProfileData)
      if (response.success) {
         alert('logado')
         return
      }
   }

   const [component, setComponent] = useState(login_component)

   return (
      <main className="container">
         <Dialog.Root open={true}>
            <Dialog.Overlay />
            <Dialog.Content className={twMerge('w-[80%] max-w-[1200px] p-0', component === forgot_password_component && 'max-w-[500px]')}>
               {component === login_component && (
                  <LoginModal
                     onClose={() => setComponent('')}
                     onForgotPassword={() => setComponent(forgot_password_component)}
                     onLogin={() => setComponent(login_component)}
                     onRegister={() => setComponent(register_component)}
                  />
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
      </main>
   )
}
