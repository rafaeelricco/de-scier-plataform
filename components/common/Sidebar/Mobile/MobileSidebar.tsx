'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { items } from '@/mock/sidebar_items'
import { home_routes } from '@/routes/home'
import * as Button from '@components/common/Button/Button'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import LogoDeScier from 'public/svgs/common/logo/deScier - Logo copy.svg'
import React from 'react'
import { PlusCircle, X } from 'react-bootstrap-icons'
import Item from '../Item/Item'
import Logout from '../Logout/Logout'
import { SidesProps } from '../Typing'

export const MobileSidebarComponent: React.FC<SidesProps> = ({ onClose }: SidesProps) => {
   const router = useRouter()
   const currentPath = usePathname()
   const { data: session } = useSession()
   return (
      <React.Fragment>
         <ScrollArea className="h-[calc(100vh-7.5rem)]">
            <div className="flex flex-col gap-8 content-between">
               <div className="flex flex-col gap-6 flex-grow">
                  <div className="flex justify-between content-center items-center">
                     <LogoDeScier className="max-w-[56px] w-full h-full" />
                     <X
                        className="w-10 h-10 mb-2 cursor-pointer hover:text-status-error transition-all duration-500 ease-out md:hover:scale-110 md:hover:rotate-180 transform"
                        onClick={() => onClose()}
                     />
                  </div>
                  <Button.Link href={home_routes.summary_routes.new_document}>
                     <Button.Button variant="primary" className="mx-auto my-0 p-3 text-sm" onClick={() => onClose()}>
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
                                 onClick={() => onClose()}
                              />
                           </div>
                        )
                     )}
                  </div>
               </div>
               <Logout onLogout={() => router.push(home_routes.home.index)} />
            </div>
         </ScrollArea>
      </React.Fragment>
   )
}
