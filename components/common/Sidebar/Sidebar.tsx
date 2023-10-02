'use client'

import * as Button from '@components/common/Button/Button'
import { usePathname, useRouter } from 'next/navigation'
import LogoDeScier from 'public/svgs/common/logo/deScier - Logo.svg'
import React from 'react'
import Item from './Item/Item'

const Sidebar: React.FC = () => {
   // See more about in https://nextjs.org/docs/app/api-reference/functions/use-pathname
   const currentPath = usePathname()
   const router = useRouter()

   return (
      <React.Fragment>
         <div className="flex flex-col gap-8 left-0 sticky h-[100vh] pt-10 pb-14 px-6 w-fit justify-between bg-[#FEFEFE]">
            <div className="flex flex-col gap-8">
               <LogoDeScier className="w-20 h-20 mx-auto my-0" />
               <Button.Link href={home_routes.summary_routes.new_document}>
                  <Button.Button variant="primary" className="mx-auto my-0 p-3 text-sm">
                     Submit new document
                     <PlusCircle size={20} />
                  </Button.Button>
               </Button.Link>
               <div>
                  {items.map((item) => (
                     <Item
                        key={item.id}
                        text={item.text}
                        icon={item.icon}
                        href={item.path}
                        active={currentPath.includes(item.path)}
                     />
                  ))}
               </div>
            </div>
            <Logout onLogout={() => router.push('/login')} />
         </div>
      </React.Fragment>
   )
}

import { home_routes } from '@/routes/home'
import AboutUsIcon from 'public/svgs/common/sidebar/Icons/about-us.svg'
import ArticlesIcon from 'public/svgs/common/sidebar/Icons/articles.svg'
import AsReviewerIcon from 'public/svgs/common/sidebar/Icons/as-reviewer.svg'
import HomeIcon from 'public/svgs/common/sidebar/Icons/home.svg'
import MyIPIcon from 'public/svgs/common/sidebar/Icons/my-ip.svg'
import ProfileIcon from 'public/svgs/common/sidebar/Icons/profile.svg'
import SummaryIcon from 'public/svgs/common/sidebar/Icons/summary.svg'
import { PlusCircle } from 'react-bootstrap-icons'
import Logout from './Logout/Logout'

const items = [
   {
      id: 1,
      text: 'Summary',
      icon: <SummaryIcon className="w-6 fill-neutral-light_gray lg:w-5 2xl:w-6" />,
      path: home_routes.summary
   },
   {
      id: 2,
      text: 'Articles under Review',
      icon: <ArticlesIcon className="w-6 fill-neutral-light_gray lg:w-5 2xl:w-6" />,
      path: home_routes.articles_under_review
   },
   {
      id: 8,
      text: 'As Reviewer/Editor',
      icon: <AsReviewerIcon className="w-6 fill-neutral-light_gray lg:w-5 2xl:w-6" />,
      path: home_routes.as_reviewer
   },
   {
      id: 3,
      text: 'Profile',
      icon: <ProfileIcon className="w-6 fill-neutral-light_gray lg:w-5 2xl:w-6" />,
      path: home_routes.profile
   },
   {
      id: 4,
      text: 'Home',
      icon: <HomeIcon className="w-6 fill-neutral-light_gray lg:w-5 2xl:w-6" />,
      path: home_routes.home
   },
   {
      id: 5,
      text: 'About us',
      icon: <AboutUsIcon className="w-6 fill-neutral-light_gray lg:w-5 2xl:w-6" />,
      path: home_routes.about_us
   },
   {
      id: 6,
      text: 'My IP',
      icon: <MyIPIcon className="w-6 fill-neutral-light_gray lg:w-5 2xl:w-6" />,
      path: home_routes.my_ip
   }
]

export default Sidebar
