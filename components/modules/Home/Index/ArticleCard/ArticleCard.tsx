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
         <div className={twMerge('max-w-[240px] grid gap-4 items-start', className, `${responsive && 'max-w-full'}`)}>
            <div className={twMerge('w-60 h-52 overflow-hidden rounded-md relative', `${responsive && 'w-full'}`)}>
               <Image
                  priority
                  quality={100}
                  width={240}
                  height={240}
                  src={image}
                  alt="placeholder"
                  className={twMerge('w-60 h-60 object-cover absolute inset-0', `${responsive && 'w-full'}`)}
               />
            </div>
            <div className="grid gap-2">
               <div className="flex items-center gap-1 flex-wrap">
                  <p className="text-sm text-[#5E6992]">{formatAuthors(authors)}</p>
               </div>
               <p className="text-base text-secundary_blue-main font-semibold">{title}</p>
               {!likes && !views ? null : (
                  <div className="flex items-center gap-4">
                     <div className="flex items-center gap-1">
                        <HandThumbsUpFill className="text-terciary-main w-5 h-5" />
                        <p className="text-sm text-neutral-gray">{likes}</p>
                     </div>
                     <div className="flex items-center gap-1">
                        <Eye className="text-terciary-main w-5 h-5" />
                        <p className="text-sm text-neutral-gray">{views}</p>
                     </div>
                  </div>
               )}
               {!tags ? null : (
                  <div className="flex flex-wrap gap-2">
                     {tags.map((tag) => (
                        <div className="border rounded-md border-neutral-stroke_light flex items-center px-2 py-[2px] bg-white" key={tag.id}>
                           <span className="text-xs text-primary-main">{tag.name}</span>
                        </div>
                     ))}
                  </div>
               )}
            </div>
         </div>
      </div>
   )
}