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
               <h6 className="text-sm md:text-base font-semibold text-secundary_blue-main">{title}</h6>
               <div className="flex flex-col md:flex-row items-center md:justify-start gap-2">
                  <div className="flex flex-grow justify-center gap-1 items-center border p-1 rounded-md w-full md:border-none md:p-0 md:justify-start md:w-fit md:flex-grow-0">
                     {ready_to_publish ? (
                        <p className="text-xs sm:text-base font-semibold text-status-green">Ready to publish</p>
                     ) : (
                        <>
                           {status_editor == 'approved' && <p className="text-xs sm:text-base font-semibold text-status-green">Editor Approval</p>}
                           {status_editor == 'pending' && <p className="text-xs sm:text-base font-semibold text-status-pending">Editor pending</p>}
                           <span className="text-xs sm:text-sm font-semibold text-neutral-light_gray">/</span>
                           {status_reviewer == 'approved' && <p className="text-xs sm:text-base font-semibold text-status-green">Reviewer approval</p>}
                           {status_reviewer == 'pending' && <p className="text-xs sm:text-base font-semibold text-status-pending">Reviewer pending</p>}
                        </>
                     )}
                  </div>
                  <span className="hidden md:block text-neutral-light_gray">•</span>
                  <p className="text-xs sm:text-sm md:hidden text-center text-neutral-gray">Under review since {date}</p>
                  <p className="hidden md:block text-sm sm:text-base text-neutral-gray">{date}</p>
               </div>
            </div>
         </div>
      </React.Fragment>
   )
}

export default InReviewItem
