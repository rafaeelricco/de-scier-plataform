'use client'

import { items } from '@/mock/sidebar_items'
import { home_routes } from '@/routes/home'
import * as Button from '@components/common/Button/Button'
import { usePathname, useRouter } from 'next/navigation'
import LogoDeScier from 'public/svgs/common/logo/deScier - Logo.svg'
import React from 'react'
import { PlusCircle } from 'react-bootstrap-icons'
import Item from './Item/Item'
import Logout from './Logout/Logout'

const Sidebar: React.FC = () => {
   // See more about in https://nextjs.org/docs/app/api-reference/functions/use-pathname
   const router = useRouter()
   const currentPath = usePathname()

   return (
      <React.Fragment>
         <aside className="hidden md:flex flex-col gap-8 left-0 sticky h-[100vh] pt-10 pb-14 px-6 w-[17.5rem] justify-between bg-[#FEFEFE] z-50">
            <div className="flex flex-col gap-8">
               <LogoDeScier className="w-20 h-20 mx-auto my-0" />
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
            <Logout onLogout={() => router.push(home_routes.home.index)} />
         </aside>
      </React.Fragment>
   )
}

export default Sidebar
