import { truncate } from 'lodash'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import './Item.css'

export interface ArticleUnderReviewProps {
   id?: string
   status_editor?: 'pending' | 'approved'
   status_reviewer?: 'pending' | 'approved'
   image: string
   since: string
   title: string
   link: string
}

const ArticleUnderReview: React.FC<ArticleUnderReviewProps> = ({
   since,
   link,
   status_editor,
   status_reviewer,
   image,
   title
}: ArticleUnderReviewProps) => {
   return (
      <React.Fragment>
         <div className="grid-article-under-review  justify-start items-center gap-4 bg-[#fff] py-3 px-4 rounded-lg">
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
               <Link href={link}>
                  <h6 className="text-lg font-semibold text-secundary_blue-main lg:text-sm 2xl:text-lg">{truncate(title, { length: 40 })}</h6>
               </Link>
               <div className="flex items-center gap-2">
                  <p className="text-sm text-neutral-gray lg:text-sm 2xl:text-base">Under review since</p>
                  <p className="text-base font-semibold lg:text-sm 2xl:text-base">{since}</p>
               </div>
               <div className="border-[1px] rounded-md px-2 border-neutral-stroke_light w-fit">
                  <div className="grid grid-flow-col items-center justify-start">
                     <div className="grid grid-flow-col gap-1 items-center">
                        {status_editor == 'approved' && (
                           <p className="text-base font-semibold text-status-green lg:text-xs 2xl:text-base">Editor Approval</p>
                        )}
                        {status_editor == 'pending' && (
                           <p className="text-base font-semibold text-status-pending lg:text-xs 2xl:text-base">Editor pending</p>
                        )}
                        <span className="text-base font-semibold text-neutral-light_gray lg:text-xs 2xl:text-base">/</span>
                        {status_reviewer == 'approved' && (
                           <p className="text-base font-semibold text-status-green lg:text-xs 2xl:text-base">Reviewer approval</p>
                        )}
                        {status_reviewer == 'pending' && (
                           <p className="text-base font-semibold text-status-pending lg:text-xs 2xl:text-base">Reviewer pending</p>
                        )}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </React.Fragment>
   )
}

export default ArticleUnderReview
