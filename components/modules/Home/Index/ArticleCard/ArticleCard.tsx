import { formatAuthors } from '@/utils/format_authors'
import { ArticleCardProps } from '@components/modules/Home/Index/ArticleCard/Typing'
import '@styles/home.css'
import Image from 'next/image'
import React from 'react'
import { Eye, HandThumbsUpFill } from 'react-bootstrap-icons'
import { twMerge } from 'tailwind-merge'

export const ArticleCard: React.FC<ArticleCardProps> = ({ authors, id, likes, tags, title, views, image, className, responsive }: ArticleCardProps) => {
   return (
      <div className="grid items-start">
         <div
            className={twMerge(
               'max-w-full sm:max-w-[180px] md:max-w-[200px] lg:max-w-[240px] grid gap-3 sm:gap-4 items-start',
               className,
               `${responsive && 'max-w-full'}`
            )}
         >
            <div className={twMerge('w-full h-20 sm:h-48 md:h-52 lg:h-60 overflow-hidden rounded-md relative', `${responsive && 'w-full'}`)}>
               <Image
                  priority
                  quality={100}
                  width={240}
                  height={240}
                  src={image}
                  alt="placeholder"
                  className={twMerge('w-full h-full object-cover absolute inset-0', `${responsive && 'w-full'}`)}
               />
            </div>
            <div className="grid gap-1 sm:gap-2">
               <div className="flex items-center gap-1 flex-wrap">
                  <p className="text-xs sm:text-sm text-[#5E6992]">{formatAuthors(authors)}</p>
               </div>
               <p className="text-sm sm:text-base text-secundary_blue-main font-semibold">{title}</p>
               {!likes && !views ? null : (
                  <div className="flex items-center gap-2 sm:gap-4">
                     <div className="flex items-center gap-1">
                        <HandThumbsUpFill className="text-terciary-main w-4 sm:w-5 h-4 sm:h-5" />
                        <p className="text-xs sm:text-sm text-neutral-gray">{likes}</p>
                     </div>
                     <div className="flex items-center gap-1">
                        <Eye className="text-terciary-main w-4 sm:w-5 h-4 sm:h-5" />
                        <p className="text-xs sm:text-sm text-neutral-gray">{views}</p>
                     </div>
                  </div>
               )}
               {!tags ? null : (
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                     {tags.map((tag) => (
                        <div className="border rounded-md border-neutral-stroke_light flex items-center px-1 sm:px-2 py-[2px] bg-white" key={tag.id}>
                           <span className="text-xxs sm:text-xs text-primary-main">{tag.name}</span>
                        </div>
                     ))}
                  </div>
               )}
            </div>
         </div>
      </div>
   )
}
