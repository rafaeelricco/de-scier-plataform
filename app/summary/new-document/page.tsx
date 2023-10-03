'use client'
import Box from '@/components/common/Box/Box'
import { Pills } from '@/components/common/Button/Pill/Pill'
import Dropzone from '@/components/common/Dropzone/Dropzone'
import { document_types } from '@/mock/document_types'
import * as Button from '@components/common/Button/Button'
import * as Input from '@components/common/Input/Input'
import * as Title from '@components/common/Title/Page'
import { Reorder } from 'framer-motion'
import CircleIcon from 'public/svgs/modules/new-document/circles.svg'
import React, { useState } from 'react'
import { PlusCircle, PlusCircleDotted } from 'react-bootstrap-icons'

export default function NewDocumentPage() {
   const [items, setItems] = useState([0, 1, 2, 3])

   return (
      <React.Fragment>
         <Title.Root>
            <Title.Title>Submit new document</Title.Title>
         </Title.Root>
         <div className="grid gap-6">
            <Box className="grid gap-8 h-fit py-6 px-8">
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
               <div className="grid gap-2">
                  <h3 className="text-sm font-semibold">Document type</h3>
                  <Pills items={document_types} />
               </div>
               <Dropzone />
               <Input.Root>
                  <Input.Label className="flex gap-2 items-center">
                     <span className="text-sm font-semibold">Abstract</span>
                     <span className="text-sm text-neutral-light_gray font-semibold">
                        0/2000 words
                     </span>
                  </Input.Label>
                  <Input.TextArea placeholder="Title of the field" />
               </Input.Root>
               <div className="flex items-center gap-4">
                  <Button.Button className="px-4 py-3 w-fit text-sm" disabled>
                     Generate abstract with AI
                     <PlusCircleDotted
                        className="w-4 fill-neutral-light_gray 
                    "
                     />
                  </Button.Button>
                  <p className="text-sm">
                     Careful! You can only generate the abstract once per file.
                  </p>
               </div>
               <div className="grid gap-2">
                  <p className="text-sm font-semibold">Visual Abstract</p>
                  <p className="text-sm font-regular">
                     With the information from the abstract, a summary diagram (Visual Abstract) can
                     be generated to describe the main points inside this document, with a
                     illustration.
                  </p>
                  <div className="flex items-center gap-4">
                     <Button.Button className="px-4 py-3 w-fit text-sm" disabled>
                        Generate Visual Abstract
                        <PlusCircleDotted className="w-4 fill-neutral-light_gray" />
                     </Button.Button>
                     <p className="text-sm">
                        Careful! You can only generate the abstract once per file.
                     </p>
                  </div>
               </div>
            </Box>
            <Box className="grid gap-8 h-fit py-6 px-8">
               <div className="grid ">
                  <h3 className="text-xl text-terciary-main font-semibold lg:text-lg 2xl:text-xl">
                     Authors
                  </h3>
               </div>
               <div className="grid gap-6">
                  <Button.Button variant="outline" className="px-4 py-3 w-full text-base">
                     Select Authors for the paper
                     <PlusCircle
                        className="w-4 fill-primary-main 
                     "
                     />
                  </Button.Button>
                  <p className="text-sm">Drag the authors to reorder the list.</p>
                  <div className="grid gap-2">
                     <div className="grid grid-cols-3">
                        {headers_authors_order.map((header, index) => (
                           <React.Fragment key={index}>
                              <p className="text-sm font-semibold">{header.label}</p>
                           </React.Fragment>
                        ))}
                     </div>
                     <Reorder.Group axis="y" values={items} onReorder={setItems}>
                        {items.map((item, index) => (
                           <Reorder.Item key={item} value={item} className="grid gap-4">
                              <div className="grid grid-cols-3 gap-4 items-center px-0 py-3 cursor-grab">
                                 <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-0">
                                       <CircleIcon className="w-8 cursor-grab" />
                                       <p className="text-sm text-blue-gray">{item}º</p>
                                    </div>
                                    <div>
                                       <p className="text-sm text-secundary_blue-main">
                                          Caroline Nunes
                                       </p>
                                    </div>
                                 </div>
                                 <div>
                                    <p className="text-sm text-secundary_blue-main">Neurologist</p>
                                 </div>
                                 <div>
                                    <p className="text-sm text-secundary_blue-main">
                                       carol@company.com
                                    </p>
                                 </div>
                              </div>
                           </Reorder.Item>
                        ))}
                     </Reorder.Group>
                  </div>
               </div>
            </Box>
         </div>
      </React.Fragment>
   )
}

const headers_authors_order = [
   {
      id: 1,
      label: 'Name'
   },
   {
      id: 1,
      label: 'Title'
   },
   {
      id: 1,
      label: 'E-mail'
   }
]
