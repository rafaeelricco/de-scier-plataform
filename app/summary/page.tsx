'use client'

import Box from '@/components/common/Box/Box'
import Earnings from '@/components/modules/Summary/Earnings/Earnings'
import Publications from '@/components/modules/Summary/Publications/Publications'
import Statistics from '@/components/modules/Summary/Statistics/Statistics'
import Submission from '@/components/modules/Summary/Submission/Submission'
import TopPapers from '@/components/modules/Summary/TopPapers/TopPapers'
import * as Title from '@components/common/Title/Page'
import React from 'react'
import './summary.css'

export default function HomePage() {
   return (
      <React.Fragment>
         <Title.Root>
            <Title.Title>My performance</Title.Title>
         </Title.Root>
         <div className="grid gap-8">
            <Box className="submission-layout h-fit py-6 px-8">
               <Submission />
               <Publications />
            </Box>
            <div className="grid grid-cols-2 gap-8">
               <Box className="h-full py-6 px-8">
                  <h3 className="text-xl font-[500] lg:text-lg 2xl:text-xl">Statistics</h3>
                  <Statistics />
               </Box>
               <Box className="h-fit py-6 px-8">
                  <h3 className="text-xl font-[500] lg:text-lg 2xl:text-xl">Earnings</h3>
                  <Earnings />
               </Box>
            </div>
            <Box className="h-fit w-full py-6 px-8">
               <TopPapers />
            </Box>
         </div>
      </React.Fragment>
   )
}
