'use client'

import * as Button from '@components/common/Button/Button'
import * as Input from '@components/common/Input/Input'
import * as Title from '@components/common/Title/Page'
import React from 'react'
import { CaretDown, Search } from 'react-bootstrap-icons'

export default function ArticlesUnderReviewPage() {
   return (
      <React.Fragment>
         <Title.Root>
            <Title.Title>My articles under review</Title.Title>
         </Title.Root>
         <div className="grid gap-6">
            <div className="flex items-center gap-2">
               <Input.Search placeholder="Find articles with this terms" />
               <Button.Button className="px-4 py-3 h-fit text-sm">
                  Search
                  <Search className="" />
               </Button.Button>
            </div>
            <div className="flex items-center gap-2">
               <button className="flex items-center py-2 px-4 text-sm rounded-full w-fit border-[1px] border-primary-main text-primary-main hover:scale-105 transition-all duration-200">
                  <span className="text-sm font-semibold text-primary-main">Order by: Newest</span>
                  <CaretDown className="ml-2" />
               </button>
               <button className="flex items-center py-2 px-4 text-sm rounded-full w-fit border-[1px] border-primary-main text-primary-main hover:scale-105 transition-all duration-200">
                  <span className="text-sm font-semibold text-primary-main">Status</span>
                  <CaretDown className="ml-2" />
               </button>
            </div>
         </div>
      </React.Fragment>
   )
}
