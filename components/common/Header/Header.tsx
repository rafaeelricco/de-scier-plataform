'use client'

import { home_routes } from '@/routes/home'
import * as Button from '@components/common/Button/Button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import DeScierLogo from 'public/svgs/common/logo/deScier - Logo.svg'
import React from 'react'
import sha256 from 'sha256'
import { twMerge } from 'tailwind-merge'

const Header: React.FC = () => {
   // See more about in https://nextjs.org/docs/app/api-reference/functions/use-pathname
   const currentPath = usePathname()

   return (
      <React.Fragment>
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
                              `${currentPath.endsWith(link.link) && 'font-semibold text-secundary_blue-main'}`
                           )}
                        >
                           {link.label}
                        </Link>
                     </div>
                  ))}
               </div>
            </div>
            <div className="flex items-center gap-4">
               <Button.Button variant="outline" className="rounded-full py-2 px-8 text-sm">
                  Login
               </Button.Button>
               <Button.Button variant="primary" className="rounded-full py-2 px-8 text-sm">
                  Register
               </Button.Button>
            </div>
         </div>
      </React.Fragment>
   )
}

const links = [
   {
      id: sha256('1'),
      label: 'Home',
      link: home_routes.home.index
   },
   {
      id: sha256('2'),
      label: 'Search',
      link: home_routes.home.search
   },
   {
      id: sha256('3'),
      label: 'About us',
      link: '/about-us'
   },
   {
      id: sha256('4'),
      label: 'Dashboard',
      link: '/dashboard'
   },
   {
      id: sha256('5'),
      label: 'My IP',
      link: '/my-ip'
   }
]

export default Header
