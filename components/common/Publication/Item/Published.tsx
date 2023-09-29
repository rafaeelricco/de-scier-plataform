import React from 'react'
import { Eye, HandThumbsUpFill } from 'react-bootstrap-icons'

export interface PublicationItemProps {
   id?: string
   date: string
   likes: string
   views: string
   title: string
   link: string
}

const PublicationItem: React.FC<PublicationItemProps> = ({
   date,
   link,
   likes,
   views,
   id,
   title
}: PublicationItemProps) => {
   return (
      <React.Fragment>
         <div className="flex items-center gap-4">
            <div className="h-20 w-20 bg-status-pending rounded-md" />
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
