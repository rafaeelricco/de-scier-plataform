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
               className="rounded-md"
               width={80}
               height={80}
               alt={title}
               style={{ objectFit: 'cover' }}
            />
            <div className="grid gap-2">
               <h6 className="text-lg font-semibold text-secundary_blue-main">{title}</h6>
               <div className="flex gap-2">
                  <div className="flex items-center gap-1">
                     <HandThumbsUpFill size={20} className="text-terciary-main" />
                     <span className="text-base text-neutral-gray">{likes}</span>
                  </div>
                  <span className="text-neutral-gray">•</span>
                  <div className="flex items-center gap-1">
                     <Eye size={20} className="text-terciary-main" />
                     <span className="text-base text-neutral-gray">{views}</span>
                  </div>
                  <span className="text-neutral-light_gray">•</span>
                  <p className="text-base text-neutral-gray">{date}</p>
               </div>
            </div>
         </div>
      </React.Fragment>
   )
}

export default PublicationItem
