import EarningsIllustration from 'public/svgs/modules/statistics/earnings.svg'
import React from 'react'

const Earnings: React.FC = () => {
   return (
      <React.Fragment>
         <div className="flex flex-col items-center lg:flex-row gap-y-6 md:gap-y-4 gap-x-6 my-4">
            <EarningsIllustration className="max-w-[170px] md:max-w-[14rem] w-full" />
            <div>
               <div className="grid justify-items-center">
                  <p className="text-lg text-secundary_blue-main text-center lg:text-base">Total earning from sales</p>
                  <h3 className="gradient-grad-yellow font-bold text-3xl ">$403.330,00</h3>
               </div>
               <div className="divider-h my-4" />
               <div className="grid justify-items-center">
                  <p className="text-lg text-secundary_blue-main text-center lg:text-base">Weekly earning from sales</p>
                  <h3 className="gradient-grad-2 font-bold text-3xl ">$330,00</h3>
               </div>
            </div>
         </div>
      </React.Fragment>
   )
}

export default Earnings
