'use client'

import { items } from '@/mock/sidebar_items'
import { home_routes } from '@/routes/home'
import * as Button from '@components/common/Button/Button'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import LogoDeScier from 'public/svgs/common/logo/deScier - Logo.svg'
import React from 'react'
import { PlusCircle } from 'react-bootstrap-icons'
import Item from './Item/Item'
import Logout from './Logout/Logout'

const Sidebar: React.FC = () => {
   const { data: session } = useSession()

   // See more about in https://nextjs.org/docs/app/api-reference/functions/use-pathname
   const router = useRouter()
   const currentPath = usePathname()

   return (
      <React.Fragment>
         <aside className="hidden md:flex flex-col gap-8 left-0 sticky h-[100vh] pt-10 pb-14 px-6 justify-between bg-[#FEFEFE] z-50">
            <div className="flex flex-col gap-8">
               <LogoDeScier className="w-20 h-20 mx-auto my-0" />
               <Button.Link href={home_routes.summary_routes.new_document}>
                  <Button.Button variant="primary" className="mx-auto my-0 p-3 text-sm">
                     Submit new article
                     <PlusCircle size={20} />
                  </Button.Button>
               </Button.Link>
               <div>
                  {items.map((item) =>
                     session?.user?.userInfo.role !== 'ADMIN' && item.text === 'Admin' ? null : (
                        <div className="grid" key={item.id}>
                           <Item
                              key={item.id}
                              icon={item.icon}
                              href={item.path}
                              divider={item.divider}
                              icon_end={item.icon_end}
                              text={item.text as string}
                              active={currentPath.includes(item.path as string)}
                           />
                        </div>
                     )
                  )}
               </div>
            </div>
            <Logout onLogout={() => router.push(home_routes.home.index)} />
         </aside>
      </React.Fragment>
   )
}

export default Sidebar
