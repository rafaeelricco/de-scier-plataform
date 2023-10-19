import Image from 'next/image'
import React from 'react'
import { Eye, HandThumbsUpFill } from 'react-bootstrap-icons'

export interface PublicationItemProps {
   id?: string
   date: string
   likes: string
   views: string
   title: string
   link: string
   image: string
}

const PublicationItem: React.FC<PublicationItemProps> = ({ date, link, likes, views, id, title, image }: PublicationItemProps) => {
   return (
      <React.Fragment>
         <div className="grid md:grid-flow-col md:justify-start items-center gap-4">
            <Image src={image} width={420} height={80} alt={title} style={{ objectFit: 'cover' }} className="rounded-md h-20 w-full object-cover" />
            <div className="grid gap-2">
               <h6 className="text-sm md:text-base lg:text-lg font-semibold text-secundary_blue-main">{title}</h6>
               <div className="flex gap-2 items-center">
                  <div className="flex items-center gap-1">
                     <HandThumbsUpFill className="text-terciary-main lg:w-4 2xl:w-5" />
                     <p className="text-sm md:text-base text-neutral-gray">{likes}</p>
                  </div>
                  <span className="text-neutral-gray">•</span>
                  <div className="flex items-center gap-1">
                     <Eye className="text-terciary-main lg:w-4 2xl:w-5" />
                     <p className="text-sm md:text-base text-neutral-gray">{views}</p>
                  </div>
                  <span className="text-neutral-light_gray">•</span>
                  <p className="text-sm md:text-base text-neutral-gray">{date}</p>
               </div>
            </div>
         </div>
      </React.Fragment>
   )
}

export default PublicationItem
