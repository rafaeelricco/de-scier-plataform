'use client'
import Box from '@/components/common/Box/Box'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import * as Button from '@components/common/Button/Button'
import * as Input from '@components/common/Input/Input'
import * as Title from '@components/common/Title/Page'
import React from 'react'
import { PlusCircle } from 'react-bootstrap-icons'

export default function NewDocumentPage() {
   return (
      <React.Fragment>
         <Title.Root>
            <Title.Title>Submit new document</Title.Title>
         </Title.Root>
         <div className="grid gap-6">
            <Box className="grid gap-6 h-fit py-6 px-8">
               <h3 className="text-xl font-semibold lg:text-lg 2xl:text-xl">Upload new document</h3>
               <div className="grid gap-x-6 gap-y-4">
                  <div className="grid grid-cols-2 gap-6">
                     <Input.Root>
                        <Input.Label className="flex gap-2 items-center">
                           <span className="text-sm font-semibold">Title</span>
                           <span className="text-sm text-neutral-light_gray font-semibold">
                              0/300 characters
                           </span>
                        </Input.Label>
                        <Input.Input placeholder="Title of the article" />
                     </Input.Root>
                     <Input.Root>
                        <Input.Label>Add keywords (Max 5)</Input.Label>
                        <Input.Input
                           placeholder="Title of the article"
                           end
                           icon={
                              <React.Fragment>
                                 <Button.Button
                                    variant="outline"
                                    className="px-2 py-0 border-neutral-light_gray hover:bg-neutral-light_gray hover:bg-opacity-10 flex items-center gap-1 rounded-sm"
                                 >
                                    <PlusCircle className="w-3 fill-neutral-light_gray" />
                                    <span className="font-semibold text-xs text-neutral-light_gray">
                                       Add keyword
                                    </span>
                                 </Button.Button>
                              </React.Fragment>
                           }
                        />
                     </Input.Root>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                     <Input.Root>
                        <Input.Label className="flex gap-2 items-center">
                           <span className="text-sm font-semibold">Field</span>
                           <span className="text-sm text-neutral-light_gray font-semibold">
                              0/300 characters
                           </span>
                        </Input.Label>
                        <Input.Input placeholder="Title of the field" />
                     </Input.Root>
                  </div>
               </div>
               <h3 className="text-base font-semibold">Document type</h3>
               <Tabs defaultValue="account" className="w-[400px]">
                  <TabsList>
                     <TabsTrigger value="account">Account</TabsTrigger>
                     <TabsTrigger value="password">Password</TabsTrigger>
                  </TabsList>
               </Tabs>
            </Box>
         </div>
      </React.Fragment>
   )
}
