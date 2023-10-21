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
         <div className="grid md:grid-cols-max-min-auto md:justify-start items-center gap-4 bg-[#fff] py-3 px-4 rounded-lg">
            <Image src={image} width={400} height={400} alt={title} style={{ objectFit: 'cover' }} className="rounded-md h-20 w-full object-cover" />
            <hr className="hidden md:block divider-v" />
            <hr className="block md:hidden divider-h" />
            <div className="grid gap-2 mt-[-8px]">
               <div>
                  <Link href={link}>
                     <h6 className="text-base sm:text-lg font-semibold text-secundary_blue-main">{truncate(title, { length: 40 })}</h6>
                  </Link>
                  <div className="flex items-center gap-2">
                     <p className="text-sm text-neutral-gray lg:text-sm 2xl:text-base">Under review since</p>
                     <p className="text-base font-semibold lg:text-sm 2xl:text-base">{since}</p>
                  </div>
               </div>
               <div className="border-[1px] rounded-md px-2 border-neutral-stroke_light md:w-fit">
                  <div className="grid grid-flow-col items-center justify-center md:justify-start">
                     <div
                        className="grid grid-flow-col gap-2
                      md:gap-1 items-center "
                     >
                        {status_editor == 'approved' && <p className="text-sm md:text-base font-semibold text-status-green">Editor Approval</p>}
                        {status_editor == 'pending' && <p className="text-sm md:text-base font-semibold text-status-pending">Editor pending</p>}
                        <span className="text-sm md:text-base font-semibold text-neutral-light_gray">/</span>
                        {status_reviewer == 'approved' && <p className="text-sm md:text-base font-semibold text-status-green">Reviewer approval</p>}
                        {status_reviewer == 'pending' && <p className="text-sm md:text-base font-semibold text-status-pending">Reviewer pending</p>}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </React.Fragment>
   )
}

export default ArticleUnderReview
