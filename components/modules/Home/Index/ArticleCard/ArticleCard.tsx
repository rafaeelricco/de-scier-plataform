import { ArticleCardProps } from '@components/modules/Home/Index/ArticleCard/Typing'
import '@styles/home.css'
import Image from 'next/image'
import React from 'react'
import { Eye, HandThumbsUpFill } from 'react-bootstrap-icons'

export const ArticleCard: React.FC<ArticleCardProps> = ({ authors, id, likes, tags, title, views, image }: ArticleCardProps) => {
   return (
      <React.Fragment>
         <div className="max-w-[240px] grid gap-4">
            <div className="w-60 h-52 overflow-hidden rounded-md relative">
               <Image priority quality={100} width={240} height={240} src={image} alt="placeholder" className="w-60 h-60 object-cover absolute inset-0" />
            </div>
            <div className="grid gap-2">
               {authors.map((author) => (
                  <React.Fragment key={author.id}>
                     <p className="text-sm text-[#5E6992]">{author.name}</p>
                  </React.Fragment>
               ))}
               <p className="text-base text-secundary_blue-main font-semibold">{title}</p>
               <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                     <HandThumbsUpFill className="text-terciary-main w-5 h-5" />
                     <p className="text-sm text-neutral-gray">{likes}k</p>
                  </div>
                  <div className="flex items-center gap-1">
                     <Eye className="text-terciary-main w-5 h-5" />
                     <p className="text-sm text-neutral-gray">{views}k</p>
                  </div>
               </div>
               <div className="flex gap-2 flex-wrap">
                  {tags.map((tag) => (
                     <React.Fragment key={tag.id}>
                        <span className="text-xs text-primary-main bg-white px-2 py-1 rounded-[4px]">{tag.name}</span>
                     </React.Fragment>
                  ))}
               </div>
            </div>
         </div>
      </React.Fragment>
   )
}
