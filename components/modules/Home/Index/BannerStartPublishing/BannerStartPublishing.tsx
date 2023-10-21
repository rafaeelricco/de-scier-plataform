import * as Button from '@components/common/Button/Button'
import '@styles/home.css'
import IllustrationBannerFooter from 'public/svgs/modules/home/banner-footer/illustrations-banner.svg'
import React from 'react'

export const BannerStartPublishing: React.FC = () => {
   return (
      <React.Fragment>
         <div className="bg-secundary_blue-main p-6 lg:py-6 lg:px-12 flex justify-center rounded-md">
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
               <IllustrationBannerFooter className="w-60 shrink-0" />
               <div className="flex flex-col gap-4">
                  <div className="grid gap-2">
                     <p className="text-lg font-semibold text-white">Want to publish a scientific paper?</p>
                     <p className="text-base font-regular text-white">
                        Publishing in DeScier is fast and easy, with peer selected review, and 100% author owned copyright. Join the movement now!
                     </p>
                  </div>
                  <div className="lg:flex lg:justify-end">
                     <Button.Button className="py-3 px-10 lg:w-fit w-full">Start publishing now!</Button.Button>
                  </div>
               </div>
            </div>
         </div>
      </React.Fragment>
   )
}
