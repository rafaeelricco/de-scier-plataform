import { truncate } from '@/utils/truncate'
import Image from 'next/image'
import React from 'react'
import { CardText, Pencil } from 'react-bootstrap-icons'
import './ReviewerItem.css'
import { ReviewerItemProps } from './Typing'

const ReviewerItem: React.FC<ReviewerItemProps> = ({
   since,
   link,
   status,
   image,
   title,
   added_as,
   id,
   published
}: ReviewerItemProps) => {
   return (
      <div className="grid gap-2 bg-[#fff] py-3 px-4 rounded-lg">
         <div className="grid gap-1 items-center">
            <div>
               {added_as == 'reviewer' && (
                  <div className="flex items-center gap-2">
                     <CardText className="text-yellow-400 lg:text-base" />
                     <p className="text-base font-semibold  text-yellow-400">Added as Reviewer</p>
                  </div>
               )}
               {added_as == 'editor' && (
                  <div className="flex items-center gap-2">
                     <Pencil className="text-terciary-main lg:text-sm" />
                     <p className="text-base font-semibold text-terciary-main">Added as Reviewer</p>
                  </div>
               )}
            </div>
            <hr className="divider-h" />
         </div>
         <div className="grid-article-under-review  justify-start items-center gap-4">
            <Image
               src={image}
               width={80}
               height={80}
               alt={title}
               style={{ objectFit: 'cover' }}
               className="rounded-md lg:w-18 lg:h-18 2xl:w-20 2xl:h-20"
            />
            <hr className="divider-v" />
            <div className="grid gap-2">
               <h6 className="text-lg font-semibold text-secundary_blue-main lg:text-sm 2xl:text-lg">
                  {truncate(title, 40)}
               </h6>
               <div className="flex items-center gap-2">
                  <p className="text-sm text-neutral-gray lg:text-sm 2xl:text-base">
                     Under review since
                  </p>
                  <p className="text-base font-semibold lg:text-sm 2xl:text-base">{since}</p>
               </div>
               <div className="border-[1px] rounded-md px-2 border-neutral-stroke_light w-fit">
                  <div className="grid grid-flow-col items-center justify-start">
                     <div className="grid grid-flow-col gap-1 items-center">
                        {status == 'approved' && (
                           <p className="text-base font-semibold text-status-green lg:text-xs 2xl:text-base">
                              You approved
                           </p>
                        )}
                        {status == 'pending' && (
                           <p className="text-base font-semibold text-status-pending lg:text-xs 2xl:text-base">
                              Approval pending
                           </p>
                        )}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

const PublishedStatus: React.FC<ReviewerItemProps> = ({
   published_date,
   access_type
}: ReviewerItemProps) => {
   return (
      <React.Fragment>
         <div>
            <p className="text-sm text-neutral-gray lg:text-sm 2xl:text-base">
               Published in {published_date}
            </p>
            <div>
               {access_type == 'open' ? (
                  <React.Fragment>
                     <div />
                     <p className="text-sm">Open access</p>
                  </React.Fragment>
               ) : (
                  <React.Fragment></React.Fragment>
               )}
            </div>
         </div>
      </React.Fragment>
   )
}

export default ReviewerItem
