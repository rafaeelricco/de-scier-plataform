'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import useDimension from '@/hooks/useWindowDimension'
import * as Button from '@components/common/Button/Button'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import ShapeDeScierHandBookBottom from 'public/svgs/modules/sidebar/Ellipse 46.svg'
import ShapeDeScierHandBookTop from 'public/svgs/modules/sidebar/Ellipse 48.svg'
import IllustrationHandBook from 'public/svgs/modules/sidebar/emojione-v1_document.svg'
import React from 'react'
import { CaretRight, PlusCircle } from 'react-bootstrap-icons'
import SubmitedItem from './SubmitedItem/SubmitedItem'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { home_routes } from '@/routes/home'

const Profile: React.FC = () => {
   // See more about in https://nextjs.org/docs/app/api-reference/functions/use-pathname

   const { data: session } = useSession()

   const router = useRouter()
   const { md } = useDimension()
   const currentPath = usePathname()

   return (
      <React.Fragment>
         <div className="hidden md:relative md:block overflow-hidden h-fit">
            <div className="flex flex-col gap-8 sticky h-[100vh] right-0 py-14 px-6 justify-between w-[17.5rem] bg-[#FEFEFE]">
               <div className="flex flex-col gap-6">
                  <div className="flex justify-between items-center">
                     <h3 className="text-xl font-semibold">My profile</h3>
                     <Link
                        href={home_routes.profile}
                        className="text-base text-secundary_purple-main font-regular hover:underline select-none cursor-pointer"
                     >
                        Edit profile
                     </Link>
                  </div>
                  <div className="grid gap-4">
                     <Image
                        src={session?.user?.userInfo.avatar || ''}
                        quality={50}
                        width={144}
                        height={144}
                        alt="profile-image"
                        className="w-36 h-36 bg-status-pending rounded-full mx-auto my-0 lg:w-24 lg:h-24 2xl:w-36 2xl:h-36"
                     />
                     <div className="grid gap-2 lg:gap-3 2xl:gap-2">
                        <h1 className="text-xl text-secundary_blue-main font-semibold flex justify-center lg:text-lg 2xl:text-xl">
                           {session?.user?.userInfo.name}
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
                     <ScrollArea className="lg:h-[300px] 2xl:h-[400px] pr-2">
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

export default Profile
