import React from 'react'

export interface InReviewItemProps {
   id?: string
   status_editor?: 'pending' | 'approved'
   status_reviewer?: 'pending' | 'approved'
   ready_to_publish?: boolean
   date: string
   title: string
   link: string
}

const InReviewItem: React.FC<InReviewItemProps> = ({
   date,
   link,
   ready_to_publish,
   status_editor,
   status_reviewer,
   title
}: InReviewItemProps) => {
   return (
      <React.Fragment>
         <div className="flex items-center gap-4">
            <div className="h-20 w-20 bg-status-pending rounded-md" />
            <div className="grid gap-2">
               <h6 className="text-lg font-semibold text-secundary_blue-main">{title}</h6>
               <div className="flex items-center gap-2">
                  <div className="flex gap-2">
                     {ready_to_publish ? (
                        <p className="text-base font-semibold text-status-green">
                           Ready to publish
                        </p>
                     ) : (
                        <>
                           {status_editor == 'approved' && (
                              <p className="text-base font-semibold text-status-green">
                                 Editor Approval
                              </p>
                           )}
                           {status_editor == 'pending' && (
                              <p className="text-base font-semibold text-status-pending">
                                 Editor pending
                              </p>
                           )}
                           <span className="text-base font-semibold text-neutral-light_gray">
                              /
                           </span>
                           {status_reviewer == 'approved' && (
                              <p className="text-base font-semibold text-status-green">
                                 Reviewer approval
                              </p>
                           )}
                           {status_reviewer == 'pending' && (
                              <p className="text-base font-semibold text-status-pending">
                                 Reviewer pending
                              </p>
                           )}
                        </>
                     )}
                  </div>
                  <span className="text-neutral-light_gray">•</span>
                  <p className="text-base text-neutral-gray">{date}</p>
               </div>
            </div>
         </div>
      </React.Fragment>
   )
}

export default InReviewItem
