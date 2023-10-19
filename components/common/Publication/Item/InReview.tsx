import Image from 'next/image'
import React from 'react'
import './Item.css'

export interface InReviewItemProps {
   id?: string
   status_editor?: 'pending' | 'approved'
   status_reviewer?: 'pending' | 'approved'
   ready_to_publish?: boolean
   image: string
   date: string
   title: string
   link: string
}

const InReviewItem: React.FC<InReviewItemProps> = ({ date, link, ready_to_publish, status_editor, status_reviewer, image, title }: InReviewItemProps) => {
   return (
      <React.Fragment>
         <div className="grid md:grid-cols-max-auto md:justify-start items-center gap-4">
            <Image src={image} width={420} height={80} alt={title} style={{ objectFit: 'cover' }} className="rounded-md h-20 w-full object-cover" />
            <div className="grid gap-2">
               <h6 className="text-lg font-semibold text-secundary_blue-main lg:text-sm 2xl:text-lg">{title}</h6>
               <div className="grid grid-flow-col items-center justify-start gap-2">
                  <div className="grid grid-flow-col gap-1 items-center">
                     {ready_to_publish ? (
                        <p className="text-base font-semibold text-status-green lg:text-xs 2xl:text-base">Ready to publish</p>
                     ) : (
                        <>
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
                        </>
                     )}
                  </div>
                  <span className="text-neutral-light_gray">•</span>
                  <p className="text-base text-neutral-gray lg:text-sm 2xl:text-base">{date}</p>
               </div>
            </div>
         </div>
      </React.Fragment>
   )
}

export default InReviewItem
