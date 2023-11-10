'use client'

import ForgotPasswordModal from '@/components/modules/ForgotPassword/ForgotPassword'
import LoginModal from '@/components/modules/Login/Login'
import RegisterModal from '@/components/modules/Register/Register'
import { links } from '@/mock/sidebar_home_items'
import * as Button from '@components/common/Button/Button'
import * as Dialog from '@components/common/Dialog/Digalog'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import DeScierLogo from 'public/svgs/common/logo/deScier - Logo.svg'
import React from 'react'
import { twMerge } from 'tailwind-merge'

const Header: React.FC = () => {
   // See more about in https://nextjs.org/docs/app/api-reference/functions/use-pathname
   const currentPath = usePathname()
   const url_splited = currentPath.split('/')
   const array_path = url_splited.filter((item) => item !== 'home' && item !== '')

   function verifyPath(path: string): boolean {
      if (path === 'home') {
         return array_path.length === 0
      } else if (path === 'search') {
         return array_path.includes('search')
      } else {
         return false
      }
   }

   const login_component = 'login'
   const register_component = 'register'
   const forgot_password_component = 'forgot_password'

   const [component, setComponent] = React.useState(login_component)
   const [open, setOpen] = React.useState(false)
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
         <div className="py-3 px-8 bg-white flex items-center gap-8 rounded-full shadow-search w-fit justify-center">
            <div className="flex items-center gap-8">
               <DeScierLogo className="w-10 h-fit" />
               <div className="grid grid-cols-5 justify-items-center items-center">
                  {links.map((link) => (
                     <div className="flex justify-center min-w-[149px] py-2 px-4" key={link.id}>
                        <Link
                           href={link.link}
                           className={twMerge(
                              'text-base text-terciary-main hover:text-secundary_blue-main transition-all duration-200',
                              `${verifyPath(link.label.toLowerCase()) && 'font-semibold text-secundary_blue-main'}`
                           )}
                        >
                           {link.label}
                        </Link>
                     </div>
                  ))}
               </div>
            </div>
            <div className="flex items-center gap-4">
               <Button.Button
                  variant="outline"
                  className="rounded-full py-2 px-8 text-sm"
                  onClick={() => {
                     setOpen(true)
                     setComponent(login_component)
                  }}
               >
                  Login
               </Button.Button>
               <Button.Button
                  variant="primary"
                  className="rounded-full py-2 px-8 text-sm"
                  onClick={() => {
                     setOpen(true)
                     setComponent(register_component)
                  }}
               >
                  Register
               </Button.Button>
            </div>
         </div>
      </React.Fragment>
   )
}

export default Header
