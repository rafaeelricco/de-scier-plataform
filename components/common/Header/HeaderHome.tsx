'use client'

import * as Drawer from '@components/common/Drawer/Drawer'
import LogoDeScier from 'public/svgs/common/logo/deScier - Logo copy.svg'
import React from 'react'
import { twMerge } from 'tailwind-merge'

export function HeaderMobile() {
   const [openNav, setOpenNav] = React.useState<'sidebar' | 'profile' | false>(false)

   return (
      <React.Fragment>
         <aside className="md:hidden z-50">
            <div className="mx-auto max-w-screen-xl px-6 py-3 rounded-none bg-white shadow-ligh">
               <div className="flex items-center justify-between">
                  <div className="flex justify-start items-center flex-grow gap-2">
                     <button
                        className="relative group"
                        onClick={() => {
                           setOpenNav('sidebar')
                        }}
                     >
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

                     <LogoDeScier data-name="logo_deScier" id="logo_deScier" className="w-9 h-9" />
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
               Header mobile home
            </Drawer.Content>
         </Drawer.Root>
      </React.Fragment>
   )
}
