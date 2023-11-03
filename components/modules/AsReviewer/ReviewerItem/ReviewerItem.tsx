import useDimension from '@/hooks/useWindowDimension'
import { truncate } from 'lodash'
import Image from 'next/image'
import React from 'react'
import { CardText, Eye, HandThumbsUpFill, Pencil } from 'react-bootstrap-icons'
import { ReviewerItemProps } from './Typing'

const ReviewerItem: React.FC<ReviewerItemProps> = ({
   since,
   link,
   status,
   image,
   title,
   added_as,
   id,
   published,
   access_type,
   likes,
   published_date,
   views
}: ReviewerItemProps) => {
   const { md } = useDimension()
   return (
      <div className="grid gap-2 bg-[#fff] py-3 px-4 rounded-lg">
         <div className="grid gap-1 items-center">
            <div>
               {added_as == 'reviewer' && (
                  <div className="flex items-center gap-2">
                     <CardText className="text-[#EFB521] lg:text-base" />
                     <p className="text-sm lg:text-sm font-semibold text-[#EFB521]">Added as Reviewer</p>
                  </div>
               )}
               {added_as == 'editor' && (
                  <div className="flex items-center gap-2">
                     <Pencil className="text-terciary-main lg:text-sm" />
                     <p className="text-sm lg:text-sm font-semibold text-terciary-main">Added as Editor</p>
                  </div>
               )}
            </div>
            <hr className="divider-h" />
         </div>
         <div className="grid md:grid-cols-max-min-auto md:justify-start items-center gap-2 md:gap-4">
            <Image src={image} width={400} height={400} alt={title} style={{ objectFit: 'cover' }} className="rounded-md w-full h-20" />
            <hr className="divider-v hidden md:block" />
            <hr className="divider-h mt-1 md:hidden" />
            <div className="grid gap-2">
               <div>
                  <h6 className="text-sm font-semibold text-secundary_blue-main lg:text-base cursor-pointer">{truncate(title, { length: 40 })}</h6>
                  {access_type != 'open' && access_type != 'paid' && (
                     <div className="flex items-center gap-2">
                        <p className="text-sm text-neutral-gray lg:text-sm 2xl:text-base">Under review since</p>
                        <p className="text-base font-semibold lg:text-sm 2xl:text-base">{since}</p>
                     </div>
                  )}
               </div>
               {access_type == 'open' || access_type == 'paid' ? (
                  <React.Fragment>
                     <PublishedStatus access_type={access_type} published_date={published_date} likes={likes} views={views} />
                  </React.Fragment>
               ) : (
                  <React.Fragment>
                     <div className="border-[1px] rounded-md px-2 border-neutral-stroke_light w-full md:w-fit">
                        <div className="grid grid-flow-col items-center md:justify-start justify-center">
                           <div className="grid grid-flow-col gap-1 items-center">
                              {status == 'APPROVED' && <p className="text-sm lg:text-sm font-semibold  text-status-green">You approved</p>}
                              {status == 'PENDING' && <p className="text-sm lg:text-sm font-semibold  text-status-pending">Approval pending</p>}
                              {status == 'REJECTED' && <p className="text-sm lg:text-sm font-semibold  text-status-error">Rejected</p>}
                           </div>
                        </div>
                     </div>
                  </React.Fragment>
               )}
            </div>
         </div>
      </div>
   )
}

interface PublishedStatusProps {
   published_date?: string | null
   access_type?: 'open' | 'paid' | null
   likes?: number | null
   views?: number | null
}

const PublishedStatus: React.FC<PublishedStatusProps> = ({ published_date, access_type, likes, views }: PublishedStatusProps) => {
   return (
      <React.Fragment>
         <div className="grid gap-1">
            <p className="text-sm text-neutral-gray lg:text-sm 2xl:text-base">Published in {published_date}</p>
            <div className="grid gap-2">
               {access_type == 'open' ? (
                  <React.Fragment>
                     <div className="flex gap-2 items-center">
                        <div className="w-2 h-2 md:w-3 md:h-3 bg-status-green rounded-full" />
                        <p className="text-sm">Open access</p>
                        <span className="text-neutral-gray">•</span>
                        <div className="flex items-center gap-1">
                           <HandThumbsUpFill className="text-terciary-main w-4 h-4 md:w-5 md:h-5" />
                           <p className="text-sm md:text-base text-neutral-gray">{likes}</p>
                        </div>
                        <div className="flex items-center gap-1">
                           <Eye className="text-terciary-main w-4 h-4 md:w-5 md:h-5" />
                           <p className="text-sm md:text-base text-neutral-gray">{views}</p>
                        </div>
                     </div>
                  </React.Fragment>
               ) : (
                  <React.Fragment>
                     <div className="flex gap-2 items-center">
                        <div className="w-2 h-2 md:w-3 md:h-3 bg-secundary_purple-main rounded-full" />
                        <p className="text-sm">Paid access</p>
                        <div className="flex items-center gap-1">
                           <HandThumbsUpFill className="text-terciary-main w-4 h-4 md:w-5 md:h-5" />
                           <p className="text-sm md:text-base text-neutral-gray">{likes}</p>
                        </div>
                        <span className="text-neutral-gray">•</span>
                        <div className="flex items-center gap-1">
                           <Eye className="text-terciary-main w-4 h-4 md:w-5 md:h-5" />
                           <p className="text-sm md:text-base text-neutral-gray">{views}</p>
                        </div>
                     </div>
                  </React.Fragment>
               )}
            </div>
         </div>
      </React.Fragment>
   )
}

export default ReviewerItem
