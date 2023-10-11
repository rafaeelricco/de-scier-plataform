'use client'

import Box from '@/components/common/Box/Box'
import * as Title from '@components/common/Title/Page'
import Image from 'next/image'
import React from 'react'
import { BoxArrowRight, Envelope, Lock, Pencil } from 'react-bootstrap-icons'

export default function ProfilePage() {
   return (
      <React.Fragment>
         <Title.Root>
            <Title.Title>My profile</Title.Title>
         </Title.Root>
         <Box className="h-fit py-10 px-8">
            <div className="grid gap-8">
               <div className="grid gap-6">
                  <Image
                     src="/svgs/common/sidebar/placeholder-image.jpeg"
                     quality={50}
                     width={144}
                     height={144}
                     alt="profile-image"
                     className="w-36 h-36 bg-status-pending rounded-full mx-auto my-0 lg:w-24 lg:h-24 2xl:w-36 2xl:h-36"
                  />
                  <div className="grid gap-2">
                     <h1 className="text-xl text-secundary_blue-main font-semibold flex justify-center lg:text-lg 2xl:text-xl">Caroline Nunes</h1>
                     <div className="grid grid-flow-col items-center justify-center gap-4">
                        <p className="text-sm text-primary-main font-regular">Biologist</p>
                        <hr className="divider-v" />
                        <div className="flex items-center gap-2">
                           <Envelope className="w-4 h-5 fill-neutral-gray" />
                           <p className="text-sm text-neutral-gray">caroline@emanagroup.com</p>
                        </div>
                     </div>
                  </div>
               </div>
               <hr className="divider-h" />
               <div className="grid gap-4">
                  <div className="grid gap-4">
                     <h3 className="text-lg font-semibold">Settings</h3>
                     <div className="grid grid-cols-2 gap-6">
                        <div className="border py-14 px-2 flex items-center justify-center gap-4 rounded-lg">
                           <Pencil className="w-5 h-5 fill-neutral-gray" />
                           <p className="text-base text-neutral-gray">Edit profile</p>
                        </div>

                        <div className="border py-14 px-2 flex items-center justify-center gap-4 rounded-lg">
                           <Envelope className="w-5 h-5 fill-neutral-gray" />
                           <p className="text-base text-neutral-gray">Change e-mail</p>
                        </div>

                        <div className="border py-14 px-2 flex items-center justify-center gap-4 rounded-lg">
                           <Lock className="w-5 h-5 fill-neutral-gray" />
                           <p className="text-base text-neutral-gray">Change password</p>
                        </div>

                        <div className="border py-14 px-2 flex items-center justify-center gap-4 rounded-lg">
                           <BoxArrowRight className="w-5 h-5 fill-neutral-gray" />
                           <p className="text-base text-neutral-gray">Log out</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </Box>
      </React.Fragment>
   )
}
