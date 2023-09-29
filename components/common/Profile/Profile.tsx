'use client'

import * as Button from '@components/common/Button/Button'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import ShapeDeScierHandBookBottom from 'public/svgs/modules/sidebar/Ellipse 46.svg'
import ShapeDeScierHandBookTop from 'public/svgs/modules/sidebar/Ellipse 48.svg'
import IllustrationHandBook from 'public/svgs/modules/sidebar/emojione-v1_document.svg'
import React from 'react'
import { CaretRight, PlusCircle } from 'react-bootstrap-icons'
import SubmitedItem from './SubmitedItem/SubmitedItem'

const Profile: React.FC = () => {
   // See more about in https://nextjs.org/docs/app/api-reference/functions/use-pathname
   const currentPath = usePathname()
   const router = useRouter()

   return (
      <React.Fragment>
         <div className="flex flex-col gap-8 sticky h-[100vh] right-0 pt-16 pb-14 px-6 w-[17.625rem] justify-between bg-[#FEFEFE]">
            <div className="flex flex-col gap-6">
               <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">My profile</h3>
                  <p className="text-base text-secundary_purple-main font-regular hover:underline select-none cursor-pointer">
                     Edit profile
                  </p>
               </div>
               <div className="grid gap-4">
                  <Image
                     src="/svgs/common/sidebar/placeholder-image.jpeg"
                     className="w-36 h-36 bg-status-pending rounded-full mx-auto my-0"
                     quality={50}
                     width={144}
                     height={144}
                     alt="profile-image"
                  />
                  <div className="grid gap-2">
                     <h1 className="text-xl text-secundary_blue-main font-semibold flex justify-center">
                        Caroline Nunes
                     </h1>
                     <Button.Button variant="outline" className="mx-auto px-2 py-3 my-0 text-sm">
                        Connect a wallet
                        <PlusCircle size={20} />
                     </Button.Button>
                  </div>
               </div>
               <div className="relative rounded-lg w-full p-4 h-20 gradient-grad-dark overflow-hidden">
                  <ShapeDeScierHandBookTop className="absolute top-[-0.5rem] left-0" />
                  <div className="flex gap-2 w-full p-3 items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                     <IllustrationHandBook />
                     <div className="grid items-center">
                        <p className="text-sm font-semibold text-[#F4F4F4]">Descier Handbook</p>
                        <div className="flex justify-between items-center">
                           <p className="text-[13px] text-[#F4F4F4]">Must-read for researchers!</p>
                           <CaretRight size={16} className="fill-[#F4F4F4]" />
                        </div>
                     </div>
                  </div>
                  <ShapeDeScierHandBookBottom className="absolute bottom-[-0.5rem] right-0" />
               </div>
               <div className="divider-h" />
               <div className="grid gap-4">
                  <p className="text-base font-semibold text-[#3F3F44]">Last Submitted</p>
                  {submited_item_mock.map((item) => (
                     <SubmitedItem
                        key={item.id}
                        date={item.date}
                        status={item.status as 'published' | 'in_review'}
                        title={item.title}
                     />
                  ))}
               </div>
            </div>
         </div>
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
   }
]

export default Profile
