'use client'

import EmailIcon from 'public/svgs/common/footer/icons-footer/email.svg'
import LocationIcon from 'public/svgs/common/footer/icons-footer/location.svg'
import PhoneIcon from 'public/svgs/common/footer/icons-footer/phone.svg'
import WhatsApp from 'public/svgs/common/footer/icons-footer/whatsapp.svg'
import LogoDeScier from 'public/svgs/common/footer/logo-de-scier-footer.svg'
import React from 'react'

const Footer: React.FC = () => {
   return (
      <React.Fragment>
         <div className="bg-[#110838] flex gap-40 w-full h-fit py-14 px-56">
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
                        <p className="text-sm text-neutral-white font-semibold underline select-none hover:text-secundary-main cursor-pointer">
                           {item.name}
                        </p>
                     </div>
                  </React.Fragment>
               ))}
            </div>
            <div className="grid gap-4">
               <p className="text-lg font-semibold text-neutral-white">Links</p>
               {links.map((item) => (
                  <React.Fragment key={item.id}>
                     <div className="flex items-center gap-6">
                        <p className="text-sm text-neutral-white font-semibold underline select-none hover:text-secundary-main cursor-pointer">
                           {item.name}
                        </p>
                     </div>
                  </React.Fragment>
               ))}
            </div>
            <div className="grid gap-4">
               <p className="text-lg font-semibold text-neutral-white">Contact</p>
               <div className="grid gap-1">
                  <div className="flex items-center gap-3">
                     <LocationIcon className="w-4 h-4" />
                     <p className="text-sm text-neutral-white font-semibold underline select-none hover:text-secundary-main cursor-pointer">
                        Adress:
                     </p>
                  </div>
                  <p className="text-sm text-neutral-white font-regular select-none hover:text-secundary-main cursor-pointer">
                     R. da Consolação, 2302 - Consolação, São Paulo - SP, 01301-000
                  </p>
               </div>
               <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                     <div className="flex items-center gap-3">
                        <PhoneIcon className="w-4 h-4" />
                        <p className="text-sm text-neutral-white font-semibold select-none">
                           Phone
                        </p>
                     </div>
                     <span className="text-sm font-semibold text-neutral-white">/</span>
                     <div className="flex items-center gap-3">
                        <WhatsApp className="w-4 h-4" />
                        <p className="text-sm text-neutral-white font-semibold select-none">
                           Whatsapp
                        </p>
                     </div>
                  </div>
                  <p className="text-sm text-neutral-white font-regular select-none hover:text-secundary-main cursor-pointer">
                     +55 11 3129-5000
                  </p>
               </div>
               <div className="grid gap-1">
                  <div className="flex items-center gap-3">
                     <EmailIcon className="w-4 h-4" />
                     <p className="text-sm text-neutral-white font-semibold select-none">E-mail</p>
                  </div>
                  <p className="text-sm text-neutral-white font-regular select-none hover:text-secundary-main cursor-pointer">
                     contact@descier.science
                  </p>
               </div>
            </div>
         </div>
      </React.Fragment>
   )
}

import InstagramIcon from 'public/svgs/common/footer/icons-footer/instagram.svg'
import LinkdlIcon from 'public/svgs/common/footer/icons-footer/linkdl.svg'
import XIcon from 'public/svgs/common/footer/icons-footer/x.svg'
import YoutubeIcon from 'public/svgs/common/footer/icons-footer/youtube.svg'

const social_media = [
   {
      id: 1,
      name: '/descier',
      icon: <XIcon className="w-5 h-5" />,
      link: ''
   },
   {
      id: 2,
      name: '/descier',
      icon: <LinkdlIcon className="w-5 h-5" />,
      link: ''
   },
   {
      id: 3,
      name: '/descier.science',
      icon: <InstagramIcon className="w-5 h-5" />,
      link: ''
   },
   {
      id: 4,
      name: '/@desciers',
      icon: <YoutubeIcon className="w-5 h-5" />,
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

export default Footer
