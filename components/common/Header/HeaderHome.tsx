'use client'

import { links } from '@/mock/sidebar_home_items'
import { home_routes } from '@/routes/home'
import * as Button from '@components/common/Button/Button'
import * as Drawer from '@components/common/Drawer/Drawer'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LogoDeScier from 'public/svgs/common/logo/deScier - Logo copy.svg'
import React from 'react'
import { X } from 'react-bootstrap-icons'
import { twMerge } from 'tailwind-merge'

export function HeaderMobile() {
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

   const [openNav, setOpenNav] = React.useState<'sidebar' | 'profile' | false>(false)

   return (
      <React.Fragment>
         <aside className="lg:hidden z-50">
            <div className="mx-auto max-w-screen-xl px-6 py-3 rounded-none bg-white shadow-ligh">
               <div className="flex items-center justify-between">
                  <div className="flex justify-start items-center flex-grow gap-2">
                     <button className="relative group" onClick={() => setOpenNav('sidebar')}>
                        <div className="relative flex overflow-hidden items-center justify-center rounded-full w-[45px] h-[45px] transform transition-all ring-0 hover:ring-8 group-focus:ring-4 ring-opacity-60 ring-primary-main duration-200">
                           <div className="flex flex-col justify-between w-[24px] h-[18px] transform transition-all duration-300 origin-center overflow-hidden">
                              <div className="bg-primary-main h-[2px] w-7 transform transition-all duration-300 origin-left group-focus:translate-x-10" />
                              <div className="bg-primary-main h-[2px] w-7 rounded transform transition-all duration-300 group-focus:translate-x-10 delay-75" />
                              <div className="bg-primary-main h-[2px] w-7 transform transition-all duration-300 origin-left group-focus:translate-x-10 delay-150" />
                              <div className="absolute items-center justify-between transform transition-all duration-500 top-2.5 -translate-x-10 group-focus:translate-x-0 flex w-0 group-focus:w-12">
                                 <div className="absolute bg-primary-main h-[2px] w-5 transform transition-all duration-500 rotate-0 delay-300 group-focus:rotate-45" />
                                 <div className="absolute bg-primary-main h-[2px] w-5 transform transition-all duration-500 -rotate-0 delay-300 group-focus:-rotate-45" />
                              </div>
                           </div>
                        </div>
                     </button>
                     <Link href={home_routes.home.index}>
                        <LogoDeScier data-name="logo_deScier" id="logo_deScier" className="w-9 h-9 mt-1" />
                     </Link>
                  </div>
                  <button
                     className="w-fit h-fit bg-purple px-4 py-2 cursor-pointer ring-0 hover:ring-8 group-focus:ring-4 ring-opacity-60 ring-primary-main duration-200 rounded-full p-2 text-sm font-semibold text-white shadow-sm"
                     onClick={() => {}}
                  >
                     Join deScier
                  </button>
               </div>
            </div>
         </aside>
         <Drawer.Root open={openNav === 'sidebar'}>
            <Drawer.Overlay />
            <Drawer.Content position={'left'} className={twMerge('p-6')}>
               <div className="grid gap-6">
                  <div className="flex justify-between content-center items-center">
                     <LogoDeScier className="max-w-[56px] w-full h-full" />
                     <X
                        className="w-10 h-10 mb-2 cursor-pointer hover:text-status-error transition-all duration-500 ease-out md:hover:scale-110 md:hover:rotate-180 transform"
                        onClick={() => setOpenNav(false)}
                     />
                  </div>
                  <div className="grid gap-4">
                     <Button.Button className="rounded-full px-4 w-full py-2">Register</Button.Button>
                     <Button.Button variant="outline" className="rounded-full px-4 w-full py-2">
                        Login
                     </Button.Button>
                  </div>
                  <div className="grid gap-2">
                     {links.map((link) => (
                        <div className="flex" key={link.id}>
                           <Link
                              href={link.link}
                              className={twMerge(
                                 'text-base text-neutral-light_gray hover:text-primary-main transition-all duration-200 p-2',
                                 `${verifyPath(link.label.toLowerCase()) && 'font-semibold text-primary-main'}`
                              )}
                              onClick={() => setOpenNav(false)}
                           >
                              {link.label}
                           </Link>
                        </div>
                     ))}
                  </div>
               </div>
            </Drawer.Content>
         </Drawer.Root>
      </React.Fragment>
   )
}
