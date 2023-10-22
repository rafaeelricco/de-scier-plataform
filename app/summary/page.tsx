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
         <React.Fragment>
            <div className="flex">
               <input type="checkbox" id="drawer-toggle" className="relative sr-only peer" checked={true} />
               <label
                  htmlFor="drawer-toggle"
                  className="absolute top-0 left-0 inline-block p-4 transition-all duration-500 bg-indigo-500 rounded-lg peer-checked:rotate-180 peer-checked:left-64"
               >
                  <div className="w-6 h-1 mb-3 -rotate-45 bg-white rounded-lg"></div>
                  <div className="w-6 h-1 rotate-45 bg-white rounded-lg"></div>
               </label>
               <div className="fixed top-0 left-0 z-20 w-64 h-full transition-all duration-500 transform -translate-x-full bg-white shadow-lg peer-checked:translate-x-0">
                  <div className="px-6 py-4">
                     <h2 className="text-lg font-semibold">Drawer</h2>
                     <p className="text-gray-500">This is a drawer.</p>
                  </div>
               </div>
            </div>
         </React.Fragment>
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
         Re
      </React.Fragment>
   )
}
