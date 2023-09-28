'use client'

import Box from '@/components/common/Box/Box'
import Publications from '@/components/modules/Summary/Publications/Publications'
import Submission from '@/components/modules/Summary/Submission/Submission'
import * as Title from '@components/common/Title/Page'
import React from 'react'
import './summary.css'

export default function HomePage() {
   return (
      <React.Fragment>
         <Title.Root>
            <Title.Title>My performance</Title.Title>
         </Title.Root>
         <div className="grid gap-8 h-full">
            <Box className="submission-layout h-fit py-6 px-8">
               <Submission />
               <Publications />
            </Box>
            <div className="grid grid-cols-2 gap-8">
               <Box className="h-full">
                  <h3 className="text-lg font-regular">Statistics</h3>
               </Box>
               <Box className="h-full">
                  <h3 className="text-lg font-regular">My top Papers</h3>
               </Box>
            </div>
         </div>
      </React.Fragment>
   )
}
