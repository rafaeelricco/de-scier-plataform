'use client'

import Box from '@/components/common/Box/Box'
import { Pills } from '@/components/common/Button/Pill/Pill'
import Dropzone from '@/components/common/Dropzone/Dropzone'
import { document_types } from '@/mock/document_types'
import { Author, Authorship, authors_headers, authors_mock, authorship_headers } from '@/mock/submit_new_document'
import { CreateDocumentProps } from '@/schemas/createDocument'
import * as Button from '@components/common/Button/Button'
import * as Dialog from '@components/common/Dialog/Digalog'
import * as Input from '@components/common/Input/Input'
import * as Title from '@components/common/Title/Page'
import { Reorder } from 'framer-motion'
import CircleIcon from 'public/svgs/modules/new-document/circles.svg'
import React, { useState } from 'react'
import { Clipboard, PlusCircle, PlusCircleDotted } from 'react-bootstrap-icons'
import { CurrencyInput } from 'react-currency-mask'
import { useForm, SubmitHandler } from 'react-hook-form'

export default function SubmitNewPaperPage() {
   const [typeOfAccess, setTypeOfAccess] = useState('open-access')
   const [items, setItems] = React.useState(authors_mock.map((author, index) => ({ ...author, id: index + 1 })))
   const [share, setShare] = useState('')
   const [authors, setAuthors] = useState<Author[]>(authors_mock)
   const [authorship, setAuthorship] = useState<Authorship[]>([])
   const [authorship_settings, setAuthorshipSettings] = useState<Author>()
   const [dialog, setDialog] = useState({
      author: false,
      share_split: false,
      edit_author: false
   })

   const { register, handleSubmit } = useForm<CreateDocumentProps>({
      defaultValues: {
         abstract: '',
         abstractChart: '',
         accessType: 'FREE',
         documentType: '',
         field: '',
         price: 0,
         title: ''
      }
   })

   const onReorder = (newOrder: typeof items) => {
      setItems((prevItems) => [...newOrder])
   }

   return (
      <React.Fragment>
         <Dialog.Root open={dialog.author || dialog.share_split || dialog.edit_author}>
            <Dialog.Overlay />
            <Dialog.Content className="px-16 py-14">
               {dialog.author && (
                  <React.Fragment>
                     <Dialog.Title title="New author" onClose={() => setDialog({ ...dialog, author: false })} />
                     <div className="grid gap-6">
                        <div className="flex items-center gap-6">
                           <Input.Root>
                              <Input.Label>Name</Input.Label>
                              <Input.Input placeholder="Full name of the author" />
                           </Input.Root>
                           <Input.Root>
                              <Input.Label>Title</Input.Label>
                              <Input.Input placeholder="Ex: Biologist" />
                           </Input.Root>
                        </div>
                        <div className="grid grid-cols-2 items-center gap-6">
                           <Input.Root>
                              <Input.Label>E-mail</Input.Label>
                              <Input.Input placeholder="Ex: email@example.com" />
                           </Input.Root>
                        </div>
                        <Button.Button variant="primary">Add Author</Button.Button>
                     </div>
                  </React.Fragment>
               )}
               {dialog.share_split && (
                  <React.Fragment>
                     <div className="grid gap-6">
                        <Dialog.Title title="Share split" onClose={() => setDialog({ ...dialog, share_split: false })} />
                        <div className="grid gap-6">
                           <div className="flex items-center gap-6">
                              <Input.Root>
                                 <Input.Label>Share</Input.Label>
                                 <Input.Input
                                    type="number"
                                    placeholder="% of the revenue"
                                    onChange={(e) => {
                                       setShare(e.target.value)
                                    }}
                                 />
                              </Input.Root>
                              <Input.Root>
                                 <Input.Label optional>Wallet</Input.Label>
                                 <Input.Input placeholder="Crypto wallet adress to recieve the revenue" />
                              </Input.Root>
                           </div>
                           <Button.Button
                              variant="primary"
                              onClick={() => {
                                 if (!authorship_settings!.id) {
                                    console.error('Authorship settings does not have an ID!')
                                    return
                                 }

                                 const updatedAuthor: Author = {
                                    ...authorship_settings!,
                                    id: authorship_settings!.id,
                                    name: authorship_settings!.name,
                                    title: authorship_settings!.title,
                                    email: authorship_settings!.email,
                                    wallet: authorship_settings!.wallet,
                                    share: share.includes('%') ? share : share + '%'
                                 }

                                 const authorIndex = authors.findIndex((author) => author.id === authorship_settings!.id)

                                 const updatedAuthors = [...authors]
                                 updatedAuthors[authorIndex] = updatedAuthor
                                 setAuthors(updatedAuthors)

                                 setDialog({ ...dialog, share_split: false })
                              }}
                           >
                              Add share split
                           </Button.Button>
                        </div>
                     </div>
                  </React.Fragment>
               )}
               {dialog.edit_author && (
                  <React.Fragment>
                     <Dialog.Title title="Edit author" onClose={() => setDialog({ ...dialog, edit_author: false })} />
                     <div className="grid gap-6">
                        <div className="flex items-center gap-6">
                           <Input.Root>
                              <Input.Label>Name</Input.Label>
                              <Input.Input placeholder="Full name of the author" />
                           </Input.Root>
                           <Input.Root>
                              <Input.Label>Title</Input.Label>
                              <Input.Input placeholder="Ex: Biologist" />
                           </Input.Root>
                        </div>
                        <div className="grid grid-cols-2 items-center gap-6">
                           <Input.Root>
                              <Input.Label>E-mail</Input.Label>
                              <Input.Input placeholder="Ex: email@example.com" />
                           </Input.Root>
                        </div>
                        <Button.Button variant="primary">Update author</Button.Button>
                     </div>
                  </React.Fragment>
               )}
            </Dialog.Content>
         </Dialog.Root>
         <Title.Root>
            <Title.Title>Submit new document</Title.Title>
         </Title.Root>
         <div className="grid gap-6 pb-14">
            <Box className="grid gap-8 h-fit px-4 py-6 md:px-8">
               <h3 className="text-lg md:text-xl font-semibold">Upload new document</h3>
               <div className="grid gap-x-6 gap-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                     <Input.Root>
                        <Input.Label className="flex gap-2 items-center">
                           <span className="text-sm font-semibold">Title</span>
                           <span className="text-sm text-neutral-light_gray font-semibold">0/300 characters</span>
                        </Input.Label>
                        <Input.Input placeholder="Title of the article" {...register('title')} />
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
                                    <span className="font-semibold text-xs text-neutral-light_gray">Add keyword</span>
                                 </Button.Button>
                              </React.Fragment>
                           }
                        />
                     </Input.Root>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                     <Input.Root>
                        <Input.Label className="flex gap-2 items-center">
                           <span className="text-sm font-semibold">Field</span>
                           <span className="text-sm text-neutral-light_gray font-semibold">0/300 characters</span>
                        </Input.Label>
                        <Input.Input placeholder="Title of the field" />
                     </Input.Root>
                  </div>
               </div>
               <div className="grid gap-2">
                  <div className="hidden md:block">
                     <h3 className="text-sm font-semibold">Document type</h3>
                     <Pills items={document_types} />
                  </div>
                  <Input.Root>
                     <Input.Select label={'Document type'} options={document_types} placeholder="Title of the field" />
                  </Input.Root>
               </div>
               <Dropzone setSelectedFile={(file) => console.log(file)} />
               <Input.Root>
                  <Input.Label className="flex gap-2 items-center">
                     <span className="text-sm font-semibold">Abstract</span>
                     <span className="text-sm text-neutral-light_gray font-semibold">0/2000 words</span>
                  </Input.Label>
                  <Input.TextArea rows={4} placeholder="Title of the field" />
               </Input.Root>
               <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <Button.Button variant="outline" className="px-4 py-3 md:w-fit text-sm">
                     Generate abstract with AI
                     <PlusCircleDotted size={18} className="fill-primary-main" />
                  </Button.Button>
                  <p className="text-sm text-neutral-gray">Careful! You can only generate the abstract once per file.</p>
               </div>
               <div className="grid gap-2">
                  <p className="text-sm font-semibold">Visual Abstract</p>
                  <p className="text-sm font-regular">
                     With the information from the abstract, a summary diagram (Visual Abstract) can be generated to describe the main points inside this
                     document, with a illustration.
                  </p>
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                     <Button.Button className="px-4 py-3 md:w-fit text-sm">
                        Generate Visual Abstract
                        <PlusCircleDotted size={18} className="fill-neutral-white" />
                     </Button.Button>
                     <p className="text-sm text-neutral-gray">Careful! You can only generate the visual abstract once per file.</p>
                  </div>
               </div>
               <div className="grid gap-4">
                  <p className="text-sm font-semibold">Cover</p>
                  <Dropzone placeholder="Upload cover picture (.png, .jpg)" setSelectedFile={(file) => console.log(file)} />
               </div>
            </Box>
            <Box className="grid gap-8 h-fit px-4 py-6 md:px-8">
               <div className="grid ">
                  <h3 className="text-lg md:text-xl text-terciary-main font-semibold">Authors</h3>
               </div>
               <div className="grid gap-6">
                  <Button.Button variant="outline" className="px-4 py-3 w-full text-sm">
                     Select Authors for the paper
                     <PlusCircle
                        className="w-4 fill-primary-main 
                     "
                     />
                  </Button.Button>
                  <p className="text-sm">Drag the authors to reorder the list.</p>
                  <div className="grid gap-2">
                     <div className="hidden md:grid grid-cols-3">
                        {authors_headers.map((header, index) => (
                           <React.Fragment key={index}>
                              <p className="text-sm font-semibold">{header.label}</p>
                           </React.Fragment>
                        ))}
                     </div>
                     <Reorder.Group axis="y" values={items} onReorder={onReorder}>
                        <div className="grid gap-2">
                           {items.map((item) => (
                              <Reorder.Item key={item.id} value={item}>
                                 <div className="grid md:grid-cols-3 gap-4 items-center px-0 py-3 rounded-md cursor-grab">
                                    <div className="flex items-start gap-4">
                                       <div className="flex gap-0 items-center">
                                          <CircleIcon className="w-8 cursor-grab" />
                                          <p className="text-sm text-blue-gray">{item.id}º</p>
                                       </div>
                                       <div>
                                          <p className="text-sm text-secundary_blue-main font-semibold md:font-regular">{item.name}</p>
                                          <div className="block md:hidden">
                                             <p className="text-sm text-secundary_blue-main">{item.title}</p>
                                          </div>
                                          <div className="block md:hidden">
                                             <p className="text-sm text-secundary_blue-main">{item.email}</p>
                                          </div>
                                       </div>
                                    </div>
                                    <div className="hidden md:block">
                                       <p className="text-sm text-secundary_blue-main">{item.title}</p>
                                    </div>
                                    <div className="hidden md:block">
                                       <p className="text-sm text-secundary_blue-main">{item.email}</p>
                                    </div>
                                 </div>
                              </Reorder.Item>
                           ))}
                        </div>
                     </Reorder.Group>
                  </div>
               </div>
            </Box>
            <Box className="grid gap-8 h-fit px-4 py-6 md:px-8">
               <div className="grid gap-4">
                  <div className="grid gap-2">
                     <h3 className="text-lg md:text-xl text-primary-main font-semibold">Editors / Reviewers</h3>
                     <p className="text-sm">
                        At least 1 editor and 2 reviewers’ approval are required to publish the paper. The editors and reviewers cannot be authors_mock in
                        the project. Invite them to the platform through a link, that will be generated after you submit it for review.
                     </p>
                  </div>
                  <div>
                     <p className="text-sm font-semibold">Invite Link</p>
                     <p className="text-sm font-semibold text-neutral-gray">The link will be created after submitting for review.</p>
                  </div>
               </div>
            </Box>
            <Box className="grid gap-8 h-fit px-4 py-6 md:px-8">
               <div className="grid gap-2">
                  <h3 className="text-lg md:text-xl text-status-green font-semibold">Authorship</h3>
                  <p className="text-sm">
                     Decide if the project is <span className="text-terciary-main font-semibold">Open Access</span>,{' '}
                     <span className="text-[#EFB521] font-semibold">Paid Access</span>
                  </p>
               </div>
               <div className="grid md:grid-cols-2 items-start gap-6">
                  <Input.Root>
                     <Input.Select
                        label={'Type of access'}
                        placeholder="Select the type of access"
                        onValueChange={(value) => setTypeOfAccess(value)}
                        value={typeOfAccess}
                        options={[
                           {
                              label: 'Open Access',
                              value: 'open-access'
                           },
                           {
                              label: 'Paid Access',
                              value: 'paid-access'
                           }
                        ]}
                     />
                  </Input.Root>
                  {typeOfAccess == 'open-access' && (
                     <Input.Root>
                        <Input.Label className="text-neutral-gray text-sm font-semibold pl-2">Valor total</Input.Label>
                        <Input.Input disabled placeholder="R$" />
                     </Input.Root>
                  )}
                  {typeOfAccess == 'paid-access' && (
                     <React.Fragment>
                        <Input.Root>
                           <Input.Label>Price</Input.Label>
                           <CurrencyInput
                              currency="USD"
                              onChangeValue={(event, originalValue, maskedValue) => console.log(maskedValue)}
                              InputElement={<Input.Input placeholder="USD" />}
                           />
                        </Input.Root>
                     </React.Fragment>
                  )}
               </div>
               {typeOfAccess == 'paid-access' && (
                  <React.Fragment>
                     <div className="grid gap-2">
                        <p className="text-sm font-semibold">Authorship settings</p>
                        <p className="text-sm font-regular">The total added up authorship value must be 100%</p>
                     </div>
                     <div className="grid gap-2">
                        <div className="grid grid-cols-3">
                           {authorship_headers.map((header, index) => (
                              <React.Fragment key={index}>
                                 <p className="text-sm font-semibold">{header.label}</p>
                              </React.Fragment>
                           ))}
                        </div>
                        <div>
                           <div>
                              {authors.map((author, index) => (
                                 <React.Fragment key={index}>
                                    <div className="grid grid-cols-3 items-center py-3">
                                       <div>
                                          <p className="text-sm text-secundary_blue-main">{author.name}</p>
                                       </div>
                                       <div>
                                          {author.share ? (
                                             <div className="flex gap-2 px-4 py-1 border rounded-md border-terciary-main w-fit">
                                                <p className="text-sm text-center text-terciary-main w-8">{author.share}</p>
                                                <p className="text-sm text-terciary-main">Authorship</p>
                                             </div>
                                          ) : (
                                             <Button.Button
                                                variant="outline"
                                                className="px-4 py-2 w-fit text-sm"
                                                onClick={() => {
                                                   setDialog({ ...dialog, share_split: true })
                                                   setAuthorshipSettings(author)
                                                }}
                                             >
                                                Add authorship settings
                                                <PlusCircleDotted size={18} className="fill-primary-main" />
                                             </Button.Button>
                                          )}
                                       </div>
                                    </div>
                                    <hr className="divider-h" />
                                 </React.Fragment>
                              ))}
                           </div>
                        </div>
                     </div>
                  </React.Fragment>
               )}
            </Box>
            <Button.Button variant="primary">
               Submit paper for review
               <Clipboard className="w-5" />
            </Button.Button>
         </div>
      </React.Fragment>
   )
}
