import { DocumentGetProps } from '@/services/document/getArticles'
import { truncate } from '@/utils/format_texts'
import React from 'react'
import { Check, Clock } from 'react-bootstrap-icons'
import { twMerge } from 'tailwind-merge'

export const EditorReviewList: React.FC<EditorReviewListProps> = ({ article }: EditorReviewListProps) => {
   return (
      <React.Fragment>
         <div>
            {article?.document.reviewersOnDocuments?.map((item, index) => (
               <div key={item.id}>
                  <div className="grid grid-cols-5  items-center px-0 py-3 rounded-md">
                     <div className="flex items-center gap-4">
                        <div>
                           <p className="text-sm text-secundary_blue-main">{item.reviewer.name}</p>
                        </div>
                     </div>
                     <div>
                        <p className="text-sm text-secundary_blue-main">{item.reviewer.title}</p>
                     </div>
                     <div>
                        <p className="text-sm text-secundary_blue-main">{truncate(item.reviewerEmail, 16)}</p>
                     </div>
                     <div>
                        <p
                           className={twMerge(
                              'text-sm text-secundary_blue-main first-letter:uppercase font-semibold lowercase',
                              `${item.role == 'reviewer' && 'text-[#B07F03]'}`,
                              `${item.role == 'editor' && 'text-terciary-main'}`
                           )}
                        >
                           {item.role}
                        </p>
                     </div>
                     <div>
                        <p
                           className={twMerge(
                              'text-sm text-secundary_blue-main font-semibold border py-[2px] px-1 text-center rounded-md md:border-none md:py-0 md:px-0 md:rounded-none md:text-start first-letter:uppercase lowercase'
                           )}
                        >
                           {item.inviteStatus === 'ACCEPTED' ? (
                              <Check size={24} className="fill-status-green" />
                           ) : (
                              <Clock size={24} className="fill-status-pending" />
                           )}
                        </p>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </React.Fragment>
   )
}

interface EditorReviewListProps {
   article: DocumentGetProps | null
}