'use client'

import Box from '@/components/common/Box/Box'
import Submission from '@/components/modules/Summary/Submission/Submission'
import * as Title from '@components/common/Title/Page'
import React from 'react'

export default function HomePage() {
   return (
      <React.Fragment>
         <Title.Root>
            <Title.Title>My performance</Title.Title>
         </Title.Root>
         <div className="grid gap-8 h-full">
            <Box className="grid grid-flow-col gap-6 justify-start h-fit py-6 px-8">
               <Submission />
               <div className="divider-v" />
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
