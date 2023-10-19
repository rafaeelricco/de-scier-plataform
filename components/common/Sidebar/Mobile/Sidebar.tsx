'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { items } from '@/mock/sidebar_items'
import { home_routes } from '@/routes/home'
import * as Button from '@components/common/Button/Button'
import { Drawer } from '@material-tailwind/react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import LogoDeScier from 'public/svgs/common/logo/deScier - Logo copy.svg'
import ShapeDeScierHandBookBottom from 'public/svgs/modules/sidebar/Ellipse 46.svg'
import ShapeDeScierHandBookTop from 'public/svgs/modules/sidebar/Ellipse 48.svg'
import IllustrationHandBook from 'public/svgs/modules/sidebar/emojione-v1_document.svg'
import React from 'react'
import { CaretRight, Person, PlusCircle, X } from 'react-bootstrap-icons'
import SubmitedItem from '../../Profile/SubmitedItem/SubmitedItem'
import Item from '../Item/Item'
import Logout from '../Logout/Logout'
import { SidesProps } from '../Typing'

export function SidebarMobile() {
   const [openNav, setOpenNav] = React.useState<'sidebar' | 'profile' | false>(false)

   const handleSidebarClick = () => setOpenNav('sidebar')
   const handleProfileClick = () => setOpenNav('profile')

   return (
      <React.Fragment>
         <aside className="md:hidden z-20">
            <div className="mx-auto max-w-screen-xl px-6 py-3 rounded-none bg-white shadow-ligh">
               <div className="flex items-center justify-between">
                  <button className="relative group" onClick={handleSidebarClick}>
                     <div className="relative flex overflow-hidden items-center justify-center rounded-full w-[45px] h-[45px] transform transition-all bg-slate-700 ring-0 hover:ring-8 group-focus:ring-4 ring-opacity-60 ring-primary-main duration-200">
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
                  <Person
                     className="w-[45px] h-[45px] fill-[#644E94] cursor-pointer ring-0 hover:ring-8 group-focus:ring-4 ring-opacity-60 ring-primary-main duration-200 rounded-full p-2"
                     onClick={handleProfileClick}
                  />
               </div>
            </div>
         </aside>
         {openNav === 'sidebar' && (
            <Sidebar
               onClose={() => {
                  setTimeout(() => {
                     setOpenNav(false)
                  }, 600)
               }}
            />
         )}
         {openNav === 'profile' && (
            <Profile
               onClose={() => {
                  setTimeout(() => {
                     setOpenNav(false)
                  }, 600)
               }}
            />
         )}
      </React.Fragment>
   )
}

const Sidebar: React.FC<SidesProps> = ({ onClose }: SidesProps) => {
   const router = useRouter()
   const currentPath = usePathname()
   const [openNav, setOpenNav] = React.useState(true)

   return (
      <React.Fragment>
         <Drawer
            placement="left"
            open={openNav}
            onClose={() => {
               setOpenNav(false)
               onClose()
            }}
            className="p-6 "
            size={728 * 0.8}
         >
            <ScrollArea className="h-[calc(100vh-7.5rem)]">
               <div className="flex flex-col gap-8 content-between">
                  <div className="flex flex-col gap-6 flex-grow">
                     <div className="flex justify-between content-center items-center">
                        <LogoDeScier className="max-w-[56px] w-full h-full" />
                        <X
                           className="w-10 h-min mb-2 cursor-pointer hover:text-status-error transition-all duration-500 ease-out md:hover:scale-110 md:hover:rotate-180 transform"
                           onClick={() => {
                              setOpenNav(false)
                              onClose()
                           }}
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
            </ScrollArea>
         </Drawer>
      </React.Fragment>
   )
}

const Profile: React.FC<SidesProps> = ({ onClose }: SidesProps) => {
   const [openNav, setOpenNav] = React.useState(true)
   return (
      <React.Fragment>
         <Drawer
            placement="right"
            open={openNav}
            className="p-6"
            size={728 * 0.8}
            onClose={() => {
               setOpenNav(false)
               onClose()
            }}
         >
            <ScrollArea className="h-[calc(100vh-7.5rem)]">
               <div className="grid gap-4 content-start">
                  <div className="flex justify-between items-center">
                     <h3 className="text-xl font-semibold">My profile</h3>
                     <X
                        className="w-10 h-min mb-2 cursor-pointer hover:text-status-error transition-all duration-500 ease-out md:hover:scale-110 md:hover:rotate-180 transform"
                        onClick={() => {
                           setOpenNav(false)
                           onClose()
                        }}
                     />
                  </div>
                  <div className="flex flex-col gap-8 h-full right-0 justify-between bg-[#FEFEFE] z-[9998] relative">
                     <div className="flex flex-col gap-6">
                        <p className="text-lg text-secundary_purple-main font-regular hover:underline select-none cursor-pointer text-center">
                           Edit profile
                        </p>
                        <div className="grid gap-4">
                           <Image
                              src="/svgs/common/sidebar/placeholder-image.jpeg"
                              quality={50}
                              width={144}
                              height={144}
                              alt="profile-image"
                              className="w-36 h-36 bg-status-pending rounded-full mx-auto my-0 lg:w-24 lg:h-24 2xl:w-36 2xl:h-36"
                           />
                           <div className="grid gap-2 lg:gap-3 2xl:gap-2">
                              <h1 className="text-xl text-secundary_blue-main font-semibold flex justify-center lg:text-lg 2xl:text-xl">
                                 Caroline Nunes
                              </h1>
                              <Button.Button variant="outline" className="mx-auto px-2 py-3 my-0 text-sm">
                                 Connect a wallet
                                 <PlusCircle className="w-4" />
                              </Button.Button>
                           </div>
                        </div>
                        <div className="relative rounded-lg w-full p-4 h-20 gradient-grad-dark overflow-hidden">
                           <ShapeDeScierHandBookTop className="absolute top-[-0.5rem] left-0" />
                           <div className="flex gap-2 w-full p-3 items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                              <IllustrationHandBook />
                              <div className="grid items-center">
                                 <p className="text-sm font-semibold text-[#F4F4F4] select-none">deScier handbook</p>
                                 <div className="flex justify-between items-center">
                                    <p className="text-[13px] select-none text-[#F4F4F4]">Must-read for researchers!</p>
                                    <CaretRight size={16} className="fill-[#F4F4F4] cursor-pointer hover:scale-125 transition-all duration-200" />
                                 </div>
                              </div>
                           </div>
                           <ShapeDeScierHandBookBottom className="absolute bottom-[-0.5rem] right-0" />
                        </div>
                        <hr className="divider-h" />
                        <div className="grid gap-4 pb-8">
                           <p className="text-base font-semibold text-[#3F3F44]">Last Submitted</p>
                           <ScrollArea className=" h-[200px] lg:h-[300px] 2xl:h-[400px] pr-2">
                              <div className="grid gap-4">
                                 {submited_item_mock.map((item) => (
                                    <SubmitedItem key={item.id} date={item.date} status={item.status as 'published' | 'in_review'} title={item.title} />
                                 ))}
                              </div>
                           </ScrollArea>
                        </div>
                     </div>
                  </div>
               </div>
            </ScrollArea>
         </Drawer>
      </React.Fragment>
   )
}

const submited_item_mock = [
   {
      id: 1,
      title: 'LCDs - How the technology was concieved ....',
      date: 'Aug 21, 2021',
      status: 'published'
   },
   {
      id: 2,
      title: 'Blockchain and financial technology - How can we integrate with the te...',
      date: 'Aug 21, 2021',
      status: 'in_review'
   },
   {
      id: 3,
      title: 'Biology and isolated islands - How are the spieces influenciated by scarrce',
      date: 'Aug 21, 2021',
      status: 'published'
   },
   {
      id: 4,
      title: 'Solar energy - Harnessing the power of the sun for a sustainable future...',
      date: 'Aug 22, 2021',
      status: 'published'
   },
   {
      id: 5,
      title: 'Artificial Intelligence - The rise and implications of machine learning...',
      date: 'Aug 22, 2021',
      status: 'in_review'
   },
   {
      id: 6,
      title: 'Space exploration - The journey to Mars and beyond...',
      date: 'Aug 23, 2021',
      status: 'published'
   },
   {
      id: 7,
      title: 'Quantum computing - The next frontier in computational power...',
      date: 'Aug 23, 2021',
      status: 'in_review'
   },
   {
      id: 8,
      title: 'Augmented Reality - Blending the digital and physical worlds...',
      date: 'Aug 24, 2021',
      status: 'published'
   }
]
