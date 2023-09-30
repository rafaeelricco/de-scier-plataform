import PieChartComponent from '@/components/common/PieChart/PieChart'
import * as Button from '@components/common/Button/Button'
import React from 'react'
import { PlusCircle } from 'react-bootstrap-icons'

const Submission: React.FC = () => {
   return (
      <React.Fragment>
         <div className="grid gap-12 content-start">
            <h3 className="text-xl font-[500] lg:text-lg 2xl:text-xl">Submissions</h3>
            <div className="grid justify-items-center gap-4">
               <div className="mx-auto my-0">
                  <PieChartComponent />
               </div>
               <div className="grid gap-6">
                  <div className="grid gap-2 items-center justify-items-center lg:gap-2 2xl:gap-2">
                     <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-blue-light rounded-full" />
                        <p className="text-base text-neutral-gray font-semibold lg:text-sm 2xl:text-base">
                           54
                        </p>
                        <p className="text-base text-secundary_blue-main lg:text-sm 2xl:text-base">
                           Published
                        </p>
                     </div>
                     <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-status-pending rounded-full" />
                        <p className="text-base text-neutral-gray font-semibold lg:text-sm 2xl:text-base">
                           33
                        </p>
                        <p className="text-base font-regular ext-secundary_blue-main lg:text-sm 2xl:text-base">
                           Under Review
                        </p>
                     </div>
                  </div>
                  <div className="divider-h" />
                  <Button.Button variant="outline" className="py-3 px-4 lg:text-sm 2xl:text-base">
                     Submit new document
                     <PlusCircle className="w-4" />
                  </Button.Button>
               </div>
            </div>
         </div>
      </React.Fragment>
   )
}

export default Submission
