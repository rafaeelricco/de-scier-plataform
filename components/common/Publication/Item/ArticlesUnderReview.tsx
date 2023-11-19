import { Skeleton } from '@/components/ui/skeleton'
import { truncate } from 'lodash'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import './Item.css'

export interface ArticleUnderReviewProps {
   id?: string
   status_editor?: 'pending' | 'approved'
   status_reviewer?: 'pending' | 'approved'
   status?: string
   image: string
   since: string
   title: string
   link: string
   document_type?: string
}

export const ArticleUnderReview: React.FC<ArticleUnderReviewProps> = ({
   since,
   link,
   status_editor,
   status_reviewer,
   image,
   title
}: ArticleUnderReviewProps) => {
   return (
      <React.Fragment>
         <Link href={link}>
            <div className="grid md:grid-cols-max-min-auto md:justify-start items-center gap-4 bg-[#fff] py-3 px-4 rounded-lg">
               <div className="relative w-full md:w-20 h-20">
                  <Image
                     fill
                     src={image || 'https://random.imagecdn.app/150/150'}
                     alt={title}
                     quality={50}
                     style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                     className="rounded-md object-cover"
                  />
               </div>
               <hr className="hidden md:block divider-v" />
               <hr className="block md:hidden divider-h" />
               <div className="grid gap-2 mt-[-8px]">
                  <div>
                     <Link href={link}>
                        <h6 className="text-sm font-semibold text-secundary_blue-main lg:text-base cursor-pointer hover:text-primary-main hover:underline transition-all duration-200">
                           {truncate(title, { length: 40 })}
                        </h6>
                     </Link>
                     <div className="flex items-center gap-2">
                        <p className="text-sm text-neutral-gray lg:text-sm">Under review since</p>
                        <p className="text-base font-semibold lg:text-sm 2xl:text-base">{since}</p>
                     </div>
                  </div>
                  <div className="border-[1px] rounded-md px-2 border-neutral-stroke_light md:w-fit">
                     <div className="grid grid-flow-col items-center justify-center md:justify-start">
                        <div className="grid grid-flow-col gap-2 md:gap-1 items-center">
                           {status_editor === 'approved' && status_reviewer === 'approved' ? (
                              <p className="text-sm 2xl:text-base font-semibold text-status-green">Published</p>
                           ) : (
                              <React.Fragment>
                                 {status_editor === 'approved' && (
                                    <p className="text-sm 2xl:text-base font-semibold text-status-green">Approved by editor</p>
                                 )}
                                 {status_editor === 'pending' && (
                                    <p className="text-sm 2xl:text-base font-semibold text-status-pending truncate">Editor pending</p>
                                 )}
                                 <span className="text-sm md:text-base font-semibold text-neutral-light_gray">/</span>
                                 {status_reviewer === 'approved' && (
                                    <p className="text-sm 2xl:text-base font-semibold text-status-green truncate">Reviewer approval</p>
                                 )}
                                 {status_reviewer === 'pending' && (
                                    <p className="text-sm 2xl:text-base font-semibold text-status-pending truncate">Reviewer pending</p>
                                 )}
                              </React.Fragment>
                           )}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </Link>
      </React.Fragment>
   )
}

export const ArticleUnderReviewSkeleton: React.FC = () => {
   return (
      <React.Fragment>
         <div className="grid md:grid-cols-max-min-auto items-center gap-4 bg-[#fff] py-3 px-4 rounded-lg">
            <Skeleton className="rounded-md h-20 w-full md:w-20 object-cover" />
            <div className="hidden md:block divider-v" />
            <div className="block md:hidden divider-h" />
            <div className="grid gap-2 mt-[-8px]">
               <div className="grid gap-2">
                  <Skeleton className="w-1/2 h-4" />
                  <Skeleton className="w-[90%] h-2" />
                  <Skeleton className="w-[80%] h-2" />
                  <div className="border-[1px] rounded-md px-2 border-neutral-stroke_light">
                     <div className="flex gap-2 items-center justify-items-center">
                        <Skeleton className="w-full h-2" />
                        <span className="text-xs font-semibold text-slate-200">/</span>
                        <Skeleton className="w-full h-2" />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </React.Fragment>
   )
}
