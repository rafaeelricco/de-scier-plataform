import { formatDate } from '@/utils/date_format'
import formatPriceInUSD from '@/utils/format_price_in_usd'
import * as Button from '@components/common/Button/Button'
import { ArticleAcessProps } from '@components/modules/Home/Search/ArticleAccess/Typing'
import React from 'react'
import { Coin, Download, Person, Tag } from 'react-bootstrap-icons'
import { twMerge } from 'tailwind-merge'

export const ArticleAcess: React.FC<ArticleAcessProps> = ({ access_type, date, value, className, onBuyDocument, onViewDocument }: ArticleAcessProps) => {
   return (
      <React.Fragment>
         <div className={twMerge('flex flex-col gap-4 bg-white rounded-xl h-fit w-full lg:w-[490px] p-6', className)}>
            {access_type === 'author' ? (
               <React.Fragment>
                  <div className="flex items-center gap-6">
                     <div className="flex items-center gap-2 flex-grow">
                        <Person className="w-5 h-5" />
                        <p className="text-base">Author</p>
                     </div>
                     <div className="flex flex-grow">
                        <Badge access_type={access_type} />
                     </div>
                  </div>
               </React.Fragment>
            ) : (
               <React.Fragment>
                  {access_type === 'purchased' ? (
                     <React.Fragment>
                        <div className="flex items-center gap-6">
                           <div className="flex items-center gap-2 flex-grow">
                              <Tag className="w-5 h-5" />
                              <p className="text-base">Purchased</p>
                           </div>
                           <div className="flex flex-grow">
                              <Badge access_type={'paid'} />
                           </div>
                        </div>
                        <Button.Button className="flex gap-4 px-4 py-2" onClick={onViewDocument}>
                           View document
                           <Download className="w-5 h-5" />
                        </Button.Button>
                     </React.Fragment>
                  ) : (
                     <ArticleType access_type={access_type} value={value} onBuyDocument={onBuyDocument} onViewDocument={onViewDocument} />
                  )}
               </React.Fragment>
            )}
            <div>
               {access_type === 'paid' && <p className="text-sm text-center text-neutral-light_gray mb-1">This value goes to the author.</p>}
               <p className="text-base text-center? font-regular">Document published in {formatDate(date)}</p>
            </div>
         </div>
      </React.Fragment>
   )
}

interface ArticleTypeProps {
   access_type: string
   value: number
   onBuyDocument?: () => void
   onViewDocument?: () => void
}

const ArticleType: React.FC<ArticleTypeProps> = ({ access_type, value, onBuyDocument, onViewDocument }: ArticleTypeProps) => {
   return (
      <React.Fragment>
         {access_type === 'paid' ? (
            <div className="flex items-center">
               <div className="flex flex-grow">
                  <h3 className="text-2xl font-semibold text-status-green">{formatPriceInUSD(value)}</h3>
               </div>
               <Badge access_type={'paid'} />
            </div>
         ) : (
            <Badge access_type={'open'} />
         )}
         {access_type === 'paid' ? (
            <Button.Button className="flex gap-4 px-4 py-2" onClick={onBuyDocument}>
               Purchase document to view
               <Coin className="w-5 h-5" />
            </Button.Button>
         ) : (
            <Button.Button className="flex gap-4 px-4 py-2" onClick={onViewDocument}>
               View document
               <Download className="w-5 h-5" />
            </Button.Button>
         )}
      </React.Fragment>
   )
}

interface BadgeProps {
   access_type: ArticleAcessProps['access_type']
}

const Badge: React.FC<BadgeProps> = ({ access_type }: BadgeProps) => {
   return (
      <React.Fragment>
         {access_type === 'paid' ? (
            <React.Fragment>
               <div className="flex flex-grow">
                  <div className="border border-neutral-stroke_light rounded-md px-2 py-1 w-full flex items-center flex-shrink gap-2 justify-center">
                     <div className="w-3 h-3 bg-secundary_purple-main rounded-full" />
                     <p className="text-sm select-none">Paid access</p>
                  </div>
               </div>
            </React.Fragment>
         ) : (
            <React.Fragment>
               <div className="border border-neutral-stroke_light rounded-md px-2 py-1 w-full flex items-center flex-shrink gap-2 justify-center">
                  <div className="w-3 h-3 bg-status-green rounded-full" />
                  <p className="text-sm select-none">Open access</p>
               </div>
            </React.Fragment>
         )}
      </React.Fragment>
   )
}
