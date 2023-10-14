import * as Button from '@components/common/Button/Button'
import '@styles/home.css'
import IllustrationBannerFooter from 'public/svgs/modules/home/banner-footer/illustrations-banner.svg'
import React from 'react'

export const BannerStartPublishing: React.FC = () => {
   return (
      <React.Fragment>
         <div className="bg-secundary_blue-main py-6 px-12 rounded-md">
            <div className="flex items-center gap-20">
               <IllustrationBannerFooter className="w-60 shrink-0" />
               <div className="flex flex-col gap-4">
                  <div className="grid gap-2">
                     <p className="text-lg font-semibold text-white">Want to publish a scientific paper?</p>
                     <p className="text-base font-regular text-white">
                        Publishing in DeScier is fast and easy, with peer selected review, and 100% author owned copyright. Join the movement now!
                     </p>
                  </div>
                  <div className="flex justify-end">
                     <Button.Button className="py-3 px-10 w-fit ">Start publishing now!</Button.Button>
                  </div>
               </div>
            </div>
         </div>
      </React.Fragment>
   )
}
