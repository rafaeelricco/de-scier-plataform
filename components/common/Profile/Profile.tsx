'use client'

import * as Button from '@components/common/Button/Button'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { PlusCircle } from 'react-bootstrap-icons'

const Profile: React.FC = () => {
   // See more about in https://nextjs.org/docs/app/api-reference/functions/use-pathname
   const currentPath = usePathname()
   const router = useRouter()

   return (
      <React.Fragment>
         <div className="flex flex-col gap-8 fixed right-0 h-full pt-10 pb-14 px-6 w-[17.625rem] justify-between bg-[#FEFEFE]">
            <div className="flex flex-col gap-8">
               <div className="flex justify-between items-center">
                  <h3 className="text-xl font-[500]">My profile</h3>
                  <p className="text-base text-secundary_purple-main font-regular">Edit profile</p>
               </div>
               <div className="w-40 h-40 bg-status-pending rounded-full mx-auto my-0" />
               <div className="grid gap-2">
                  <h1 className="text-1xl text-secundary_blue-main font-semibold flex justify-center">
                     Caroline Nunes
                  </h1>
                  <Button.Button variant="outline" className="mx-auto px-2 py-3 my-0 text-sm">
                     Connect a wallet
                     <PlusCircle size={20} />
                  </Button.Button>
               </div>
               <div className="bg-terciary-main rounded-lg w-full p-4 h-20" />
               <div className="divider-h" />
               <div>
                  <p className="text-base font-semibold text-[#3F3F44]">Last Submitted</p>
               </div>
            </div>
         </div>
      </React.Fragment>
   )
}

export default Profile
