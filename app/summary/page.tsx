'use client'

import Box from '@/components/common/Box/Box'
import Earnings from '@/components/modules/Summary/Earnings/Earnings'
import Publications from '@/components/modules/Summary/Publications/Publications'
import Statistics from '@/components/modules/Summary/Statistics/Statistics'
import Submission from '@/components/modules/Summary/Submission/Submission'
import TopPapers from '@/components/modules/Summary/TopPapers/TopPapers'
import * as Title from '@components/common/Title/Page'
import '@styles/summary.css'
import React from 'react'

export default function HomePage() {
   return (
      <React.Fragment>
         <Title.Root>
            <Title.Title>My performance</Title.Title>
         </Title.Root>
         <div className="grid gap-8">
            <Box className="flex flex-col w-full md:flex-row gap-5 items-center px-4 py-6 md:py-6 md:px-8">
               <div className="w-full md:w-fit flex-shrink-0">
                  <Submission />
               </div>
               <div className="divider-v" />
               <div className="w-full md:flex-grow">
                  <Publications />
               </div>
            </Box>
            <div className="grid md:grid-cols-2 gap-8">
               <Box className="h-full px-4 py-6 md:py-6 md:px-8">
                  <h3 className="text-xl font-[500] lg:text-lg 2xl:text-xl">Statistics</h3>
                  <Statistics />
               </Box>
               <Box className="h-fit px-4 py-6 md:py-6 md:px-8">
                  <h3 className="text-xl font-[500] lg:text-lg 2xl:text-xl">Earnings</h3>
                  <Earnings />
               </Box>
            </div>
            <Box className="h-fit w-full px-4 py-6 md:py-6 md:px-8">
               <TopPapers />
            </Box>
         </div>
      </React.Fragment>
   )
}
