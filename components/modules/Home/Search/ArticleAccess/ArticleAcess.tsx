import { formatDate } from '@/utils/date_format'
import formatPriceInUSD from '@/utils/format_price_in_usd'
import * as Button from '@components/common/Button/Button'
import { ArticleAcessProps } from '@components/modules/Home/Search/ArticleAccess/Typing'
import React from 'react'
import { Coin, Download } from 'react-bootstrap-icons'
import { twMerge } from 'tailwind-merge'

export const ArticleAcess: React.FC<ArticleAcessProps> = ({ access_type, date, value, className, onBuyDocument, onViewDocument }: ArticleAcessProps) => {
   return (
      <React.Fragment>
         <div className={twMerge('flex flex-col gap-4 bg-white rounded-xl h-fit w-[490px] p-6', className)}>
            {access_type === 'paid' ? (
               <div className="flex items-center">
                  <div className="flex flex-grow">
                     <h3 className="text-2xl font-semibold text-status-green">{formatPriceInUSD(value)}</h3>
                  </div>
                  <div className="flex flex-grow">
                     <div className="border border-neutral-stroke_light rounded-md px-2 py-1 w-full flex items-center flex-shrink gap-2 justify-center">
                        <div className="w-3 h-3 bg-secundary_purple-main rounded-full" />
                        <p className="text-sm select-none">Paid access</p>
                     </div>
                  </div>
               </div>
            ) : (
               <React.Fragment>
                  <div className="border border-neutral-stroke_light rounded-md px-2 py-1 w-full flex items-center flex-shrink gap-2 justify-center">
                     <div className="w-3 h-3 bg-status-green rounded-full" />
                     <p className="text-sm select-none">Open access</p>
                  </div>
               </React.Fragment>
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
            <p className="text-base text-center font-regular">Document published in {formatDate(date)}</p>
         </div>
      </React.Fragment>
   )
}
