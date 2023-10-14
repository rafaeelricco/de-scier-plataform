import { formatDate } from '@/utils/date_format'
import { truncate } from 'lodash'
import Image from 'next/image'
import React from 'react'
import { Eye, HandThumbsUpFill } from 'react-bootstrap-icons'
import './ArticleItem.css'
import { ArticleItemProps } from './Typing'

const ArticleItem: React.FC<ArticleItemProps> = ({ image, title, access_type, likes, published_date, views, tags, authors }: ArticleItemProps) => {
   return (
      <div className="grid gap-2 bg-[#fff] py-3 px-4 rounded-lg">
         <div className="grid-article-item justify-start items-center gap-4">
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
               <div className="grid gap-2">
                  <div className="grid gap-2">
                     <h6 className="text-lg font-semibold text-secundary_blue-main lg:text-sm 2xl:text-lg">{truncate(title, { length: 40 })}</h6>
                  </div>
                  <div className="flex flex-wrap gap-2">
                     {tags.map((tag) => (
                        <div className="border rounded-md border-neutral-stroke_light flex items-center px-2 py-[2px]" key={tag.id}>
                           <span className="text-xs text-primary-main">{tag.name}</span>
                        </div>
                     ))}
                  </div>
               </div>
               <div className="grid gap-1">
                  <div className="flex items-center gap-1">
                     {authors.map((author, index) => (
                        <React.Fragment key={author.id}>
                           <p className="text-sm text-[#5E6992]">
                              {author.name}
                              {index < authors.length - 1 && <span className="text-[#5E6992]">,</span>}
                           </p>
                        </React.Fragment>
                     ))}
                  </div>
                  <div>
                     <PublishedStatus published_date={published_date} access_type={access_type} likes={likes} views={views} />
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

interface PublishedStatusProps {
   published_date: string
   access_type?: 'open' | 'paid' | null
   likes?: number | null
   views?: number | null
}

const PublishedStatus: React.FC<PublishedStatusProps> = ({ published_date, access_type, likes, views }: PublishedStatusProps) => {
   return (
      <React.Fragment>
         <div className="grid gap-1">
            <div className="grid gap-2">
               {access_type == 'open' ? (
                  <React.Fragment>
                     <div className="flex gap-2 items-center">
                        <div className="w-3 h-3 bg-status-green rounded-full" />
                        <p className="text-sm">Open access</p>
                        <span className="text-neutral-gray">•</span>
                        <div className="flex items-center gap-1">
                           <HandThumbsUpFill className="text-terciary-main lg:w-4 2xl:w-5" />
                           <p className="text-sm text-neutral-gray">{likes}</p>
                        </div>
                        <div className="flex items-center gap-1">
                           <Eye className="text-terciary-main lg:w-4 2xl:w-5" />
                           <p className="text-sm text-neutral-gray">{views}</p>
                        </div>
                        <span className="text-neutral-gray">•</span>
                        <p className="text-sm text-neutral-gray">{formatDate(published_date)}</p>
                     </div>
                  </React.Fragment>
               ) : (
                  <React.Fragment>
                     <div className="flex gap-2 items-center">
                        <div className="w-3 h-3 bg-secundary_purple-main rounded-full" />
                        <p className="text-sm">Paid access</p>
                        <div className="flex items-center gap-1">
                           <HandThumbsUpFill className="text-terciary-main lg:w-4 2xl:w-5" />
                           <p className="text-sm text-neutral-gray">{likes}</p>
                        </div>
                        <span className="text-neutral-gray">•</span>
                        <div className="flex items-center gap-1">
                           <Eye className="text-terciary-main lg:w-4 2xl:w-5" />
                           <p className="text-sm text-neutral-gray">{views}</p>
                        </div>
                     </div>
                  </React.Fragment>
               )}
            </div>
         </div>
      </React.Fragment>
   )
}

export default ArticleItem
