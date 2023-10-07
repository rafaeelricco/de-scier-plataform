import EarningsIllustration from 'public/svgs/modules/statistics/earnings.svg'
import React from 'react'

const Earnings: React.FC = () => {
   return (
      <React.Fragment>
         <div className="flex gap-y-4 gap-x-6 my-4">
            <EarningsIllustration className="max-w-[14rem] w-full lg:max-w-[8rem] 2xl:max-w-[14rem]" />
            <div>
               <div className="grid gap-2 justify-items-center lg:gap-6 2xl:gap-2">
                  <p className="text-lg text-secundary_blue-main text-center h-[27px] lg:text-base 2xl:text-lg">
                     Total earning from sales
                  </p>
                  <h3 className="gradient-grad-yellow font-bold text-3xl lg:text-1xl 2xl:text-3xl">$403.330,00</h3>
               </div>
               <div className="divider-h my-4" />
               <div className="grid gap-2 justify-items-center lg:gap-6 2xl:gap-2">
                  <p className="text-lg text-secundary_blue-main text-center h-[27px] lg:text-base 2xl:text-lg">
                     Weekly earning from sales
                  </p>
                  <h3 className="gradient-grad-2 font-bold text-3xl lg:text-1xl 2xl:text-3xl">$330,00</h3>
               </div>
            </div>
         </div>
      </React.Fragment>
   )
}

export default Earnings
