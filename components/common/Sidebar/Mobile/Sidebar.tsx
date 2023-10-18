'use client'

import { items } from '@/mock/sidebar_items'
import { home_routes } from '@/routes/home'
import * as Button from '@components/common/Button/Button'
import { Drawer } from '@material-tailwind/react'
import { usePathname, useRouter } from 'next/navigation'
import LogoDeScier from 'public/svgs/common/logo/deScier - Logo copy.svg'
import React from 'react'
import { Person, PlusCircle, X } from 'react-bootstrap-icons'
import Item from '../Item/Item'
import Logout from '../Logout/Logout'

export function SidebarMobile() {
   const router = useRouter()
   const currentPath = usePathname()
   const [openNav, setOpenNav] = React.useState(false)

   const openDrawerLeft = () => setOpenNav(true)
   const closeDrawerLeft = () => setOpenNav(false)

   return (
      <React.Fragment>
         <aside className="md:hidden z-20">
            <div className="mx-auto max-w-screen-xl px-6 py-3 rounded-none bg-white shadow-ligh">
               <div className="flex items-center justify-between">
                  <button className="relative group" onClick={openDrawerLeft}>
                     <div className="relative flex overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all bg-slate-700 ring-0 hover:ring-8 group-focus:ring-4 ring-opacity-60 ring-primary-main duration-200">
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
                  <div className="flex items-center justify-center flex-grow gap-2">
                     <LogoDeScier data-name="logo_deScier" id="logo_deScier" className="w-9 h-9" />
                     <p className="text-neutral-gray mb-1">Dashboard</p>
                  </div>
                  <Person className="w-fit h-8 fill-[#644E94]" />
               </div>
            </div>
         </aside>
         <Drawer placement="left" open={openNav} onClose={closeDrawerLeft} className="p-6" size={728}>
            <div className="flex flex-col content-between h-full">
               <div className="flex flex-col gap-8 flex-grow">
                  <div className="flex justify-between items-center">
                     <LogoDeScier className="w-14 h-w-14" />
                     <X
                        className="w-10 h-fit mb-2 cursor-pointer hover:text-status-error transition-all duration-500 ease-out hover:scale-110 hover:rotate-180 transform"
                        onClick={() => setOpenNav(false)}
                     />
                  </div>
                  <Button.Link href={home_routes.summary_routes.new_document}>
                     <Button.Button variant="primary" className="mx-auto my-0 p-3 text-sm">
                        Submit new document
                        <PlusCircle size={20} />
                     </Button.Button>
                  </Button.Link>
                  <div>
                     {items.map((item) => (
                        <Item key={item.id} text={item.text} icon={item.icon} href={item.path} active={currentPath.includes(item.path)} />
                     ))}
                  </div>
               </div>
               <Logout onLogout={() => router.push('/login')} />
            </div>
         </Drawer>
      </React.Fragment>
   )
}
