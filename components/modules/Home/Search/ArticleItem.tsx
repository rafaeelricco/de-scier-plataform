import { truncate } from 'lodash'
import Image from 'next/image'
import React from 'react'
import { Eye, HandThumbsUpFill } from 'react-bootstrap-icons'
import './ArticleItem.css'
import { ArticleItemProps } from './Typing'

const ArticleItem: React.FC<ArticleItemProps> = ({
   since,
   link,
   status,
   image,
   title,
   id,
   published,
   access_type,
   likes,
   published_date,
   views
}: ArticleItemProps) => {
   return (
      <div className="grid gap-2 bg-[#fff] py-3 px-4 rounded-lg">
         <div className="grid-article-item  justify-start items-center gap-4">
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
               <h6 className="text-lg font-semibold text-secundary_blue-main lg:text-sm 2xl:text-lg">{truncate(title, { length: 40 })}</h6>
               {access_type != 'open' && access_type != 'paid' && (
                  <div className="flex items-center gap-2">
                     <p className="text-sm text-neutral-gray lg:text-sm 2xl:text-base">Under review since</p>
                     <p className="text-base font-semibold lg:text-sm 2xl:text-base">{since}</p>
                  </div>
               )}
               {access_type == 'open' || access_type == 'paid' ? (
                  <React.Fragment>
                     <PublishedStatus access_type={access_type} published_date={published_date} likes={likes} views={views} />
                  </React.Fragment>
               ) : (
                  <React.Fragment>
                     <div className="border-[1px] rounded-md px-2 border-neutral-stroke_light w-fit">
                        <div className="grid grid-flow-col items-center justify-start">
                           <div className="grid grid-flow-col gap-1 items-center">
                              {status == 'approved' && <p className="text-base font-semibold text-status-green lg:text-xs 2xl:text-base">You approved</p>}
                              {status == 'pending' && (
                                 <p className="text-base font-semibold text-status-pending lg:text-xs 2xl:text-base">Approval pending</p>
                              )}
                              {status == 'final_approved' && (
                                 <p className="text-base font-semibold text-status-pending lg:text-xs 2xl:text-base">Final approval pending</p>
                              )}
                              {status == 'rejected' && <p className="text-base font-semibold text-status-error lg:text-xs 2xl:text-base">Rejected</p>}
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
                        <div className="w-3 h-3 bg-status-green rounded-full" />
                        <p className="text-sm">Open access</p>
                        <span className="text-neutral-gray">•</span>
                        <div className="flex items-center gap-1">
                           <HandThumbsUpFill className="text-terciary-main lg:w-4 2xl:w-5" />
                           <p className="text-base text-neutral-gray lg:text-sm 2xl:text-base">{likes}</p>
                        </div>
                        <div className="flex items-center gap-1">
                           <Eye className="text-terciary-main lg:w-4 2xl:w-5" />
                           <p className="text-base text-neutral-gray lg:text-sm 2xl:text-base">{views}</p>
                        </div>
                     </div>
                  </React.Fragment>
               ) : (
                  <React.Fragment>
                     <div className="flex gap-2 items-center">
                        <div className="w-3 h-3 bg-secundary_purple-main rounded-full" />
                        <p className="text-sm">Paid access</p>
                        <div className="flex items-center gap-1">
                           <HandThumbsUpFill className="text-terciary-main lg:w-4 2xl:w-5" />
                           <p className="text-base text-neutral-gray lg:text-sm 2xl:text-base">{likes}</p>
                        </div>
                        <span className="text-neutral-gray">•</span>
                        <div className="flex items-center gap-1">
                           <Eye className="text-terciary-main lg:w-4 2xl:w-5" />
                           <p className="text-base text-neutral-gray lg:text-sm 2xl:text-base">{views}</p>
                        </div>
                     </div>
                  </React.Fragment>
               )}
            </div>
         </div>
      </React.Fragment>
   )
}

export default ArticleItem
