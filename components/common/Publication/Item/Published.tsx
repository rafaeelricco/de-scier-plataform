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
         <div className="flex flex-col lg:flex-row lg:items-center lg:gap-4 gap-2">
            <Image src={image} width={420} height={420} alt={title} style={{ objectFit: 'cover' }} className="rounded-md h-20 lg:w-20 object-cover" />
            <div className="grid gap-2">
               <h6 className="text-sm md:text-base font-semibold text-secundary_blue-main truncate">{title}</h6>
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
                  <span className="text-neutral-gray">•</span>
                  <p className="text-sm md:text-base text-neutral-gray truncate">{date}</p>
               </div>
            </div>
         </div>
      </React.Fragment>
   )
}

export default PublicationItem
