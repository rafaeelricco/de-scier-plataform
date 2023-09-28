import PieChartComponent from '@/components/common/PieChart/PieChart'
import * as Button from '@components/common/Button/Button'
import React from 'react'
import { PlusCircle } from 'react-bootstrap-icons'

const Submission: React.FC = () => {
   return (
      <React.Fragment>
         <div className="grid gap-12">
            <h3 className="text-xl font-[500]">Submissions</h3>
            <div className="mx-auto my-0">
               <PieChartComponent />
            </div>
            <div className="grid gap-6">
               <div className="grid grid-cols-2 gap-6 items-center justify-items-center">
                  <div className="flex items-center gap-3">
                     <div className="w-3 h-3 bg-status-pending rounded-full" />
                     <p className="text-base text-secundary_blue-main">Under Review</p>
                  </div>
                  <div className="flex items-center gap-3">
                     <div className="w-3 h-3 bg-blue-light rounded-full" />
                     <p className="text-base text-secundary_blue-main">Published</p>
                  </div>
               </div>
               <div className="divider-h" />
               <Button.Button variant="outline" className="py-3 px-4">
                  Submit new paper
                  <PlusCircle className="w-4" />
               </Button.Button>
            </div>
         </div>
      </React.Fragment>
   )
}

export default Submission
