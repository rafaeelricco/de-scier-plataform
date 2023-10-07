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

const PublicationItem: React.FC<PublicationItemProps> = ({
   date,
   link,
   likes,
   views,
   id,
   title,
   image
}: PublicationItemProps) => {
   return (
      <React.Fragment>
         <div className="grid grid-flow-col justify-start items-center gap-4">
            <Image
               src={image}
               width={80}
               height={80}
               alt={title}
               style={{ objectFit: 'cover' }}
               className="rounded-md lg:w-16 lg:h-16 2xl:w-20 2xl:h-20"
            />
            <div className="grid gap-2">
               <h6 className="text-lg font-semibold text-secundary_blue-main lg:text-sm 2xl:text-lg">{title}</h6>
               <div className="flex gap-2 items-center">
                  <div className="flex items-center gap-1">
                     <HandThumbsUpFill className="text-terciary-main lg:w-4 2xl:w-5" />
                     <p className="text-base text-neutral-gray lg:text-sm 2xl:text-base">{likes}</p>
                  </div>
                  <span className="text-neutral-gray">•</span>
                  <div className="flex items-center gap-1">
                     <Eye className="text-terciary-main lg:w-4 2xl:w-5" />
                     <p className="text-base text-neutral-gray lg:text-sm 2xl:text-base">{views}</p>
                  </div>
                  <span className="text-neutral-light_gray">•</span>
                  <p className="text-base text-neutral-gray lg:text-sm 2xl:text-base">{date}</p>
               </div>
            </div>
         </div>
      </React.Fragment>
   )
}

export default PublicationItem
