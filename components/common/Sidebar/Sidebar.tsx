'use client'

import { PurchasedArticles } from '@/components/modules/Home/Search/Purchase/PurchasedArticles'
import { admin_key, article_key, items } from '@/mock/sidebar_items'
import { home_routes } from '@/routes/home'
import * as Button from '@components/common/Button/Button'
import * as Dialog from '@components/common/Dialog/Digalog'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import LogoDeScier from 'public/svgs/common/logo/deScier - Logo.svg'
import React from 'react'
import { PlusCircle } from 'react-bootstrap-icons'
import { twMerge } from 'tailwind-merge'
import Item from './Item/Item'
import Logout from './Logout/Logout'

const Sidebar: React.FC = () => {
   const { data: session } = useSession()

   const router = useRouter()
   const currentPath = usePathname()

   const [purchased, setPurchased] = React.useState(false)

   const isAdministrator = session?.user?.userInfo.role !== 'ADMIN'

   return (
      <React.Fragment>
         <Dialog.Root open={purchased}>
            <Dialog.Overlay />
            <Dialog.Content className={twMerge('max-w-[1024px] w-full h-fit', `${purchased && 'max-w-[80%]'}`)}>
               {purchased && <PurchasedArticles onClose={() => setPurchased(false)} />}
            </Dialog.Content>
         </Dialog.Root>
         <aside className="hidden md:flex flex-col gap-8 left-0 sticky  pt-10 pb-14 px-6 justify-between bg-[#FEFEFE] z-50 md:h-screen xxl:min-h-full 2xl:h-screen 2xl:min-h-screen">
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
                     isAdministrator && item.text === admin_key ? null : (
                        <div className="grid" key={item.id}>
                           <Item
                              key={item.id}
                              icon={item.icon}
                              href={item.path}
                              divider={item.divider}
                              icon_end={item.icon_end}
                              text={item.text as string}
                              active={currentPath.includes(item.path as string)}
                              onClick={() => item.text === article_key && setPurchased(true)}
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
