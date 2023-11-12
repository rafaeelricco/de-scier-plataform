'use client'

import EmailIcon from 'public/svgs/common/footer/icons-footer/email.svg'
import LocationIcon from 'public/svgs/common/footer/icons-footer/location.svg'
import WhatsApp from 'public/svgs/common/footer/icons-footer/whatsapp.svg'
import LogoDeScier from 'public/svgs/common/footer/logo-de-scier-footer.svg'
import React from 'react'

const Footer: React.FC = () => {
   return (
      <React.Fragment>
         <footer className="bg-[#110838] grid md:grid-flow-col justify-items-center gap-8 md:gap-40 w-full h-fit py-14 md:py-14 px-6 md:px-56">
            <div className="grid gap-4 items-center justify-items-center content-center">
               <LogoDeScier className="w-full max-w-[137px] md:max-w-[160px] lg:w-32 2xl:w-40" />
               <p className="text-sm text-neutral-light_gray max-w-[20ch] text-center">Copyright © deScier 2023. All rights reserved.</p>
            </div>
            <div className="grid gap-4 w-full content-start">
               <p className="text-lg font-semibold text-neutral-white">Social media</p>
               {social_media.map((item) => (
                  <Link href={item.link} target="_blank" rel="noopener noreferrer" key={item.id}>
                     <div className="flex items-center gap-6">
                        <span className="text-neutral-white">{item.icon}</span>
                        <p className="text-sm text-neutral-white font-semibold select-none hover:text-secundary-main cursor-pointer">{item.name}</p>
                     </div>
                  </Link>
               ))}
            </div>
            <div className="grid gap-4 w-full ontent-start">
               <p className="text-lg font-semibold text-neutral-white">Links</p>
               {links.map((item) => (
                  <Link href={item.link} target={item.link.includes(home_routes.home.index) ? '_self' : '_blank'} rel="noopener noreferrer" key={item.id}>
                     <div className="flex items-center gap-6">
                        <p className="text-sm text-neutral-white font-semibold select-none hover:text-secundary-main cursor-pointer">{item.name}</p>
                     </div>
                  </Link>
               ))}
            </div>
            <div className="grid gap-4 w-full content-start">
               <p className="text-lg font-semibold text-neutral-white">Contact</p>
               <Link href={'https://wa.me/5511983432131'} target="_blank" rel="noopener noreferrer" className="grid gap-1">
                  <div className="flex items-center gap-2">
                     <div className="flex items-center gap-3">
                        <WhatsApp className="w-4 h-4" />
                        <p className="text-sm text-neutral-white font-semibold select-none">Whatsapp</p>
                     </div>
                  </div>
               </Link>
               <Link href={'mailto:contact@descier.science'} className="grid gap-1">
                  <div className="flex items-center gap-3">
                     <EmailIcon className="w-4 h-4" />
                     <p className="text-sm text-neutral-white font-semibold select-none">E-mail</p>
                  </div>
                  <p className="text-sm text-neutral-white font-regular select-none hover:text-secundary-main cursor-pointer">contact@descier.science</p>
               </Link>
               <Link href={'https://maps.app.goo.gl/AMeEcTxsWRsABCAC6'} target="_blank" rel="noopener noreferrer" className="grid gap-1">
                  <div className="flex items-center gap-3">
                     <LocationIcon className="w-4 h-4" />
                     <p className="text-sm text-neutral-white font-semibold select-none">Adress:</p>
                  </div>
                  <p className="text-sm text-neutral-white font-regular select-none hover:text-secundary-main cursor-pointer">
                     1636 Paulista Avenue | Group 1504 | São Paulo
                  </p>
               </Link>
            </div>
         </footer>
      </React.Fragment>
   )
}

import { home_routes } from '@/routes/home'
import { uniqueId } from 'lodash'
import Link from 'next/link'
import InstagramIcon from 'public/svgs/common/footer/icons-footer/instagram.svg'
import LinkdlIcon from 'public/svgs/common/footer/icons-footer/linkdl.svg'
import XIcon from 'public/svgs/common/footer/icons-footer/x.svg'
import YoutubeIcon from 'public/svgs/common/footer/icons-footer/youtube.svg'

const social_media = [
   {
      id: 1,
      name: '/desciers',
      icon: <XIcon className="w-5 h-5" />,
      link: 'https://twitter.com/desciers'
   },
   {
      id: 2,
      name: '/descier',
      icon: <LinkdlIcon className="w-5 h-5" />,
      link: 'https://www.linkedin.com/company/descier'
   },
   {
      id: 3,
      name: '/descier.science',
      icon: <InstagramIcon className="w-5 h-5" />,
      link: 'https://instagram.com/descier.science'
   },
   {
      id: 4,
      name: '/@desciers',
      icon: <YoutubeIcon className="w-5 h-5" />,
      link: 'https://www.youtube.com/@desciers'
   }
]

const links = [
   {
      id: uniqueId(),
      name: 'Home',
      link: home_routes.home.index
   },
   {
      id: uniqueId(),
      name: 'Support',
      link: ''
   },
   {
      id: uniqueId(),
      name: 'Onboard Discord',
      link: ''
   },
   {
      id: uniqueId(),
      name: 'Join the community',
      link: 'https://app.gosh.sh/o/descier'
   },
   {
      id: uniqueId(),
      name: 'Privacy Policy',
      link: 'https://descier.science/policy/'
   },
   {
      id: uniqueId(),
      name: 'Terms',
      link: 'https://descier.science/terms/'
   }
]

export default Footer
