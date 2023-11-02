'use client'

import Box from '@/components/common/Box/Box'
import Earnings from '@/components/modules/Summary/Earnings/Earnings'
import Publications from '@/components/modules/Summary/Publications/Publications'
import Statistics from '@/components/modules/Summary/Statistics/Statistics'
import Submission from '@/components/modules/Summary/Submission/Submission'
import TopPapers from '@/components/modules/Summary/TopPapers/TopPapers'
import * as Title from '@components/common/Title/Page'
import * as Dialog from '@components/common/Dialog/Digalog'
import '@styles/summary.css'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import WithLink from '@/components/modules/Login/Modals/WithLink/WithLink'

export default function HomePage() {
   const queryParams = useSearchParams()

   const [open, setOpen] = useState(false)
   const [inviteData, setInviteData] = useState({
      article: '',
      author: '',
      inviteCode: ''
   })

   useEffect(() => {
      const encodedInviteData = queryParams.get('invite')
      if (encodedInviteData) {
         const decodedInviteData = JSON.parse(Buffer.from(encodedInviteData, 'base64').toString('ascii'))
         setInviteData({
            article: decodedInviteData.documentTitle,
            author: decodedInviteData.user,
            inviteCode: decodedInviteData.inviteCode
         })
         setOpen(true)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return (
      <React.Fragment>
         <Dialog.Root open={open}>
            <Dialog.Overlay />
            <Dialog.Content className="w-[80%]">
               <WithLink
                  onClose={() => setOpen(false)}
                  article_name={inviteData.article}
                  invited_by={inviteData.author}
                  inviteCode={inviteData.inviteCode}
               />
            </Dialog.Content>
         </Dialog.Root>
         <div>
            <Title.Root>
               <Title.Title>My performance</Title.Title>
            </Title.Root>
            <div className="grid gap-8">
               <Box className="flex flex-col w-full lg:flex-row gap-5 items-center px-4 py-6 md:py-6 md:px-8">
                  <div className="w-full md:w-fit flex-shrink-0">
                     <Submission />
                  </div>
                  <div className="divider-v" />
                  <div className="w-full md:flex-grow">
                     <Publications />
                  </div>
               </Box>
               <div className="grid lg:grid-cols-2 gap-8">
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
         </div>
      </React.Fragment>
   )
}
