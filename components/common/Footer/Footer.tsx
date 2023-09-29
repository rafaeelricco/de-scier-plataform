'use client'

import LogoDeScier from 'public/svgs/common/footer/logo-de-scier-footer.svg'
import React from 'react'

const Footer: React.FC = () => {
   return (
      <React.Fragment>
         <div className="bg-[#110838] flex gap-40 w-full h-fit py-14 px-60">
            <div className="grid gap-4">
               <LogoDeScier className="w-40" />
               <p className="text-sm text-neutral-light_gray max-w-[20ch] text-center">
                  Copyright © deScier 2023. All rights reserved.
               </p>
            </div>
            <div className="grid gap-4">
               <p className="text-lg font-semibold text-neutral-white">Social media</p>
               {social_media.map((item) => (
                  <React.Fragment key={item.id}>
                     <div className="flex items-center gap-6">
                        <span className="text-neutral-white">{item.icon}</span>
                        <p className="text-sm text-neutral-white font-semibold">{item.name}</p>
                     </div>
                  </React.Fragment>
               ))}
            </div>
            <div className="grid gap-4">
               <p className="text-lg font-semibold text-neutral-white">Links</p>
               {links.map((item) => (
                  <React.Fragment key={item.id}>
                     <div className="flex items-center gap-6">
                        <p className="text-sm text-neutral-white font-semibold underline">
                           {item.name}
                        </p>
                     </div>
                  </React.Fragment>
               ))}
            </div>
         </div>
      </React.Fragment>
   )
}

const social_media = [
   {
      id: 1,
      name: '/descier',
      icon: 'x',
      link: ''
   },
   {
      id: 2,
      name: '/descier',
      icon: 'linkdl',
      link: ''
   },
   {
      id: 3,
      name: '/descier.science',
      icon: 'instagram',
      link: ''
   },
   {
      id: 4,
      name: '/@desciers',
      icon: 'youtube',
      link: ''
   }
]

const links = [
   {
      id: 1,
      name: 'Home',
      link: ''
   },
   {
      id: 2,
      name: 'Support',
      link: ''
   },
   {
      id: 3,
      name: 'Onboard Discord',
      link: ''
   },
   {
      id: 4,
      name: 'Join our DAO',
      link: ''
   }
]

const contact = [{}]

export default Footer
