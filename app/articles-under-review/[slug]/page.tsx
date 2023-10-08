'use client'

import Box from '@/components/common/Box/Box'
import { Pills } from '@/components/common/Button/Pill/Pill'
import CommentItem from '@/components/common/Comment/Comment'
import Dropzone from '@/components/common/Dropzone/Dropzone'
import { File } from '@/components/common/File/File'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ScrollArea } from '@/components/ui/scroll-area'
import { document_types } from '@/mock/document_types'
import { Author, Authorship, authors_headers, authors_mock, authorship_headers } from '@/mock/submit_new_document'
import { truncate } from '@/utils/format_texts'
import * as Button from '@components/common/Button/Button'
import * as Input from '@components/common/Input/Input'
import { Reorder } from 'framer-motion'
import { useRouter } from 'next/navigation'
import CircleIcon from 'public/svgs/modules/new-document/circles.svg'
import React from 'react'
import { ArrowLeft, Check, FileEarmarkText, Person, PlusCircle, PlusCircleDotted, X } from 'react-bootstrap-icons'
import { CurrencyInput } from 'react-currency-mask'

export default function ArticleInReview({ params }: { params: { slug: string } }) {
   const router = useRouter()

   const [items, setItems] = React.useState(authors_mock)
   const [share, setShare] = React.useState('')
   const [authors, setAuthors] = React.useState<Author[]>(authors_mock)
   const [authorship, setAuthorship] = React.useState<Authorship[]>([])
   const [typeOfAccess, setTypeOfAccess] = React.useState('open-access')
   const [authorship_settings, setAuthorshipSettings] = React.useState<Author>()
   const [popover, setPopover] = React.useState({ copy_link: false })
   const [dialog, setDialog] = React.useState({ author: false, share_split: false, edit_author: false })

   const onReorder = (newOrder: typeof items) => {
      setItems((prevItems) => [...newOrder])
   }

   function copyToClipboard() {
      const textToCopy = document.getElementById('link-to-copy')!.innerText

      navigator.clipboard
         .writeText(textToCopy)
         .then(() => {
            setPopover({ ...popover, copy_link: true })
            setTimeout(() => {
               setPopover({ ...popover, copy_link: false })
            }, 3000)
         })
         .catch((err) => {
            console.error('Erro ao copiar texto: ', err)
         })
   }

   return (
      <React.Fragment>
         <div className="grid gap-8">
            <div className="flex items-center gap-4">
               <ArrowLeft size={32} className="hover:scale-110 transition-all cursor-pointer" onClick={() => router.back()} />
               <h1 className="text-1xl font-semibold">Article in review</h1>
            </div>
            <Box className="grid gap-8 h-fit py-6 px-8">
               <div className="flex items-center gap-2 border border-neutral-stroke_light w-fit py-1 px-4 rounded-md">
                  <Person className="text-primary-light" />
                  <p className="text-sm text-primary-light font-semibold select-none">You are the Author of the document</p>
               </div>
               <div className="grid grid-cols-2 gap-6">
                  <Input.Root>
                     <Input.Label className="flex gap-2 items-center">
                        <span className="text-sm font-semibold">Title</span>
                        <span className="text-sm text-neutral-light_gray font-semibold">0/300 characters</span>
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
                                 <span className="font-semibold text-xs text-neutral-light_gray">Add keyword</span>
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
                        <span className="text-sm text-neutral-light_gray font-semibold">0/300 characters</span>
                     </Input.Label>
                     <Input.Input placeholder="Title of the field" />
                  </Input.Root>
               </div>
               <div className="grid gap-2">
                  <h3 className="text-sm font-semibold">Document type</h3>
                  <Pills items={document_types} />
               </div>
               <Dropzone setSelectedFile={(file) => console.log(file)} />
               <Input.Root>
                  <Input.Label className="flex gap-2 items-center">
                     <span className="text-sm font-semibold">Abstract</span>
                     <span className="text-sm text-neutral-light_gray font-semibold">0/2000 words</span>
                  </Input.Label>
                  <Input.TextArea
                     defaultValue={
                        'Microplastic pollution has emerged as a critical environmental concern, posing significant threats to coastal ecosystems worldwide. This comprehensive study investigates the origins, ecological impacts, and innovative mitigation approaches for microplastic contamination. Through extensive field surveys and laboratory analyses, we identify key sources of microplastics, including plastic debris breakdown and wastewater discharge. Furthermore, our research elucidates the detrimental effects of microplastics on marine organisms, emphasizing disruptions in food chains and potential health risks to humans through seafood consumption. In response to these challenges, we evaluate various mitigation strategies, such as advanced filtration technologies, biodegradable polymers, and public awareness campaigns. Our findings underscore the urgent need for interdisciplinary efforts to curb microplastic pollution and protect the integrity of coastal ecosystems.'
                     }
                     rows={4}
                     placeholder="Title of the field"
                  />
               </Input.Root>
               <div className="flex items-center gap-4">
                  <Button.Button variant="outline" className="px-4 py-3 w-fit text-sm">
                     Generate abstract with AI
                     <PlusCircleDotted size={18} className="fill-primary-main" />
                  </Button.Button>
                  <p className="text-sm">Careful! You can only generate the abstract once per file.</p>
               </div>
               <div className="grid gap-4">
                  <div className="grid gap-2">
                     <p className="text-sm font-semibold">Visual Abstract</p>
                     <p className="text-sm font-regular">
                        With the information from the abstract, a summary diagram (Visual Abstract) can be generated to describe the main points inside
                        this document, with a illustration.
                     </p>
                  </div>
                  <RadioGroup className="flex items-center gap-4" defaultValue={visual_abstract_options[0].value}>
                     {visual_abstract_options.map((option) => (
                        <React.Fragment key={option.id}>
                           <div className="flex items-center gap-2">
                              <RadioGroupItem value={option.value} id={option.value} />
                              <Label htmlFor="r1">{option.label}</Label>
                           </div>
                        </React.Fragment>
                     ))}
                  </RadioGroup>
                  <div className="flex items-center gap-4 w-full h-36 relative overflow-hidden py-2">
                     {/* eslint-disable-next-line @next/next/no-img-element */}
                     <img src="/images/visual-abstract.png" alt="placeholder" className="absolute object-cover w-fit h-36" />
                  </div>
               </div>
               <div className="grid gap-4">
                  <p className="text-sm font-semibold">Cover</p>
                  <Dropzone placeholder="Upload cover picture (.png, .jpg)" setSelectedFile={(file) => console.log(file)} />
               </div>
            </Box>
            <Box className="grid gap-8 h-fit py-6 px-8">
               <h3 className="text-xl text-primary-main font-semibold lg:text-lg 2xl:text-xl">Document file</h3>
               <div className="grid grid-cols-2 gap-6">
                  <Dropzone setSelectedFile={(file) => console.log(file)} />
                  <ScrollArea className="h-[200px] pr-2">
                     <div className="grid gap-4">
                        {files.map((file) => (
                           <File
                              key={file.file_name + file.uploaded_at}
                              file_name={file.file_name}
                              link="www.google.com"
                              uploaded_at={file.uploaded_at}
                              uploaded_by={file.uploaded_by}
                           />
                        ))}
                     </div>
                  </ScrollArea>
               </div>
            </Box>
            <Box className="grid gap-8 h-fit py-6 px-8">
               <div className="grid gap-2">
                  <h3 className="text-xl text-primary-main font-semibold lg:text-lg 2xl:text-xl">Comments</h3>
                  <p className="text-sm">The reviewing team can publish comments, suggesting updates on your document.</p>
               </div>
               <div className="border rounded-md p-4">
                  <ScrollArea className="lg:h-[300px] 2xl:h-[400px] pr-2">
                     <div className="grid gap-4">
                        {comments.map((comment) => (
                           <React.Fragment key={comment.id}>
                              <CommentItem {...comment} />
                           </React.Fragment>
                        ))}
                     </div>
                  </ScrollArea>
               </div>
            </Box>
            <Box className="grid gap-8 h-fit py-6 px-8">
               <div className="grid ">
                  <h3 className="text-xl text-terciary-main font-semibold lg:text-lg 2xl:text-xl">Authors</h3>
               </div>
               <div className="grid gap-6">
                  <Button.Button variant="outline" className="px-4 py-3 w-full text-sm">
                     Select Authors for the paper
                     <PlusCircle
                        className="w-4 fill-primary-main 
                     "
                     />
                  </Button.Button>
                  <p className="text-sm">Drag the authors_mock to reorder the list.</p>
                  <div className="grid gap-2">
                     <div className="grid grid-cols-3">
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
                                 <div className="grid grid-cols-3 gap-4 items-center px-0 py-3 rounded-md cursor-grab hover:bg-[#F1FFFF]">
                                    <div className="flex items-center gap-4">
                                       <div className="flex items-center gap-0">
                                          <CircleIcon className="w-8 cursor-grab" />
                                          <p className="text-sm text-blue-gray">{item.id}º</p>
                                       </div>
                                       <div>
                                          <p className="text-sm text-secundary_blue-main">{item.name}</p>
                                       </div>
                                    </div>
                                    <div>
                                       <p className="text-sm text-secundary_blue-main">{item.title}</p>
                                    </div>
                                    <div>
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
            <Box className="grid gap-8 h-fit py-6 px-8">
               <div className="grid gap-4">
                  <div className="grid gap-2">
                     <h3 className="text-xl text-primary-main font-semibold lg:text-lg 2xl:text-xl">Editors / Reviewers</h3>
                     <p className="text-sm">
                        At least 1 editor and 2 reviewers’ approval are required to publish the paper. The editors and reviewers cannot be authors in the
                        project. Invite them to the platform through the link:
                     </p>
                  </div>
                  <div>
                     <p className="text-sm font-semibold">Invite Link</p>
                     <div className="flex items-center gap-4">
                        <p className="text-sm font-semibold text-blue-500 underline" id="link-to-copy">
                           https://descier.com/948902riopwskf
                        </p>
                        <HoverCard open={popover.copy_link}>
                           <HoverCardTrigger>
                              <Button.Button variant="outline" className="px-4 py-1 text-sm" onClick={copyToClipboard}>
                                 Copy Link
                              </Button.Button>
                           </HoverCardTrigger>
                           <HoverCardContent className="w-fit px-4 py-2">
                              <h4 className="text-xs font-semibold text-status-green">O link foi copiado para a área de transferência!</h4>
                           </HoverCardContent>
                        </HoverCard>
                     </div>
                  </div>
               </div>
               <div>
                  <div className="grid grid-cols-5">
                     {header_editor_reviewer.map((header, index) => (
                        <React.Fragment key={index}>
                           <p className="text-sm font-semibold">{header.label}</p>
                        </React.Fragment>
                     ))}
                  </div>
                  <div>
                     {authors_mock.map((item, index) => (
                        <div key={item.id}>
                           <div className="grid grid-cols-5  items-center px-0 py-3 rounded-md">
                              <div className="flex items-center gap-4">
                                 <div>
                                    <p className="text-sm text-secundary_blue-main">{item.name}</p>
                                 </div>
                              </div>
                              <div>
                                 <p className="text-sm text-secundary_blue-main">{item.title}</p>
                              </div>
                              <div>
                                 <p className="text-sm text-secundary_blue-main">{truncate(item.email, 12)}</p>
                              </div>
                              <div>
                                 <p className="text-sm text-secundary_blue-main">{item.role}</p>
                              </div>
                              <div>
                                 <p className="text-sm text-secundary_blue-main">{item.status}</p>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </Box>
            <Box className="grid gap-8 h-fit py-6 px-8">
               <div className="grid gap-2">
                  <h3 className="text-xl text-status-green font-semibold lg:text-lg 2xl:text-xl">Authorship</h3>
                  <p className="text-sm">
                     Decide if the project is <span className="text-terciary-main font-semibold">Open Access</span>,{' '}
                     <span className="text-[#EFB521] font-semibold">Paid Access</span>
                  </p>
               </div>
               <div className="grid grid-cols-2 items-start gap-6">
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
            <Box className="grid gap-4 h-fit py-6 px-8">
               <div className="flex items-center justify-center gap-12">
                  <div className="flex items-center">
                     <h2 className="text-status-yellow font-semibold text-lg">Reviewer</h2>
                     <Check className="w-8 h-8 hover:scale-125 transition-all duration-200 fill-status-green cursor-pointer" />
                     <Check className="w-8 h-8 hover:scale-125 transition-all duration-200 fill-status-green cursor-pointer" />
                  </div>
                  <div className="flex items-center">
                     <h2 className="text-terciary-main font-semibold text-lg">Editor</h2>
                     <Check className="w-8 h-8 hover:scale-125 transition-all duration-200 fill-status-green cursor-pointer" />
                     <X className="w-8 h-8 hover:scale-125 transition-all duration-200 fill-status-error cursor-pointer" />
                  </div>
               </div>
               <Button.Button variant="primary">
                  Publish document
                  <FileEarmarkText className="w-5" />
               </Button.Button>
            </Box>
         </div>
      </React.Fragment>
   )
}

const visual_abstract_options = [
   {
      id: 1,
      label: 'Use Visual Abstract on publication',
      value: 'use_visual_abstract'
   },
   {
      id: 2,
      label: 'Don’t show the Visual abstract',
      value: 'dont_show_visual_abstract'
   }
]

const files = [
   {
      file_name: 'documento1.txt',
      uploaded_at: '2023-10-01T12:00:00Z',
      uploaded_by: 'usuarioA',
      link: 'http://exemplo.com/documento1'
   },
   {
      file_name: 'imagem2.jpg',
      uploaded_at: '2023-10-02T13:00:00Z',
      uploaded_by: 'usuarioB',
      link: 'http://exemplo.com/imagem2'
   },
   {
      file_name: 'planilha3.xlsx',
      uploaded_at: '2023-10-03T14:00:00Z',
      uploaded_by: 'usuarioC',
      link: 'http://exemplo.com/planilha3'
   },
   {
      file_name: 'apresentacao4.ppt',
      uploaded_at: '2023-10-04T15:00:00Z',
      uploaded_by: 'usuarioD',
      link: 'http://exemplo.com/apresentacao4'
   },
   {
      file_name: 'video5.mp4',
      uploaded_at: '2023-10-05T16:00:00Z',
      uploaded_by: 'usuarioE',
      link: 'http://exemplo.com/video5'
   },
   {
      file_name: 'audio6.mp3',
      uploaded_at: '2023-10-06T17:00:00Z',
      uploaded_by: 'usuarioF',
      link: 'http://exemplo.com/audio6'
   },
   {
      file_name: 'documento7.pdf',
      uploaded_at: '2023-10-07T18:00:00Z',
      uploaded_by: 'usuarioG',
      link: 'http://exemplo.com/documento7'
   },
   {
      file_name: 'imagem8.png',
      uploaded_at: '2023-10-08T19:00:00Z',
      uploaded_by: 'usuarioH',
      link: 'http://exemplo.com/imagem8'
   },
   {
      file_name: 'planilha9.ods',
      uploaded_at: '2023-10-09T20:00:00Z',
      uploaded_by: 'usuarioI',
      link: 'http://exemplo.com/planilha9'
   },
   {
      file_name: 'apresentacao10.odp',
      uploaded_at: '2023-10-10T21:00:00Z',
      uploaded_by: 'usuarioJ',
      link: 'http://exemplo.com/apresentacao10'
   },
   {
      file_name: 'video11.webm',
      uploaded_at: '2023-10-11T22:00:00Z',
      uploaded_by: 'usuarioK',
      link: 'http://exemplo.com/video11'
   },
   {
      file_name: 'audio12.ogg',
      uploaded_at: '2023-10-12T23:00:00Z',
      uploaded_by: 'usuarioL',
      link: 'http://exemplo.com/audio12'
   },
   {
      file_name: 'documento13.docx',
      uploaded_at: '2023-10-13T00:00:00Z',
      uploaded_by: 'usuarioM',
      link: 'http://exemplo.com/documento13'
   },
   {
      file_name: 'imagem14.gif',
      uploaded_at: '2023-10-14T01:00:00Z',
      uploaded_by: 'usuarioN',
      link: 'http://exemplo.com/imagem14'
   },
   {
      file_name: 'planilha15.csv',
      uploaded_at: '2023-10-15T02:00:00Z',
      uploaded_by: 'usuarioO',
      link: 'http://exemplo.com/planilha15'
   },
   {
      file_name: 'apresentacao16.key',
      uploaded_at: '2023-10-16T03:00:00Z',
      uploaded_by: 'usuarioP',
      link: 'http://exemplo.com/apresentacao16'
   },
   {
      file_name: 'video17.avi',
      uploaded_at: '2023-10-17T04:00:00Z',
      uploaded_by: 'usuarioQ',
      link: 'http://exemplo.com/video17'
   },
   {
      file_name: 'audio18.wav',
      uploaded_at: '2023-10-18T05:00:00Z',
      uploaded_by: 'usuarioR',
      link: 'http://exemplo.com/audio18'
   },
   {
      file_name: 'documento19.rtf',
      uploaded_at: '2023-10-19T06:00:00Z',
      uploaded_by: 'usuarioS',
      link: 'http://exemplo.com/documento19'
   },
   {
      file_name: 'imagem20.bmp',
      uploaded_at: '2023-10-20T07:00:00Z',
      uploaded_by: 'usuarioT',
      link: 'http://exemplo.com/imagem20'
   }
]

const comments = [
   {
      id: 'c1',
      comment_author: 'John',
      comment_content: 'This is a great article! Very enlightening.'
   },
   {
      id: 'c2',
      comment_author: 'Mary',
      comment_content: 'I disagree with some points, but the writing is good.'
   },
   {
      id: 'c3',
      comment_author: 'Peter',
      comment_content: "Interesting. I've never thought about it this way."
   },
   {
      id: 'c4',
      comment_author: 'Anna',
      comment_content: 'Could you expand more on this topic?'
   },
   {
      id: 'c5',
      comment_author: 'Steve',
      comment_content: 'Well written! Thanks for sharing.'
   },
   {
      id: 'c6',
      comment_author: 'Lucy',
      comment_content: 'I found this very helpful. Thanks!'
   },
   {
      id: 'c7',
      comment_author: 'Tom',
      comment_content: "I'm not sure about this. Can you provide more references?"
   },
   {
      id: 'c8',
      comment_author: 'Sophie',
      comment_content: 'This clarified a lot of things for me. Great job!'
   },
   {
      id: 'c9',
      comment_author: 'Mike',
      comment_content: "I've been looking for something like this. Perfect!"
   },
   {
      id: 'c10',
      comment_author: 'Linda',
      comment_content: "I think this could be improved, but it's a good start."
   },
   {
      id: 'c11',
      comment_author: 'Robert',
      comment_content: 'Very insightful. I learned a lot.'
   },
   {
      id: 'c12',
      comment_author: 'Julia',
      comment_content: 'This is a controversial topic, but you handled it well.'
   },
   {
      id: 'c13',
      comment_author: 'Brian',
      comment_content: 'I have a few questions about this. Can we discuss?'
   },
   {
      id: 'c14',
      comment_author: 'Grace',
      comment_content: 'This is a must-read for everyone. Highly recommended!'
   },
   {
      id: 'c15',
      comment_author: 'Paul',
      comment_content: "I've read better articles on this topic, but this is okay."
   },
   {
      id: 'c16',
      comment_author: 'Ella',
      comment_content: 'Thanks for shedding light on this issue.'
   },
   {
      id: 'c17',
      comment_author: 'James',
      comment_content: "I'm bookmarking this for future reference. Great work!"
   },
   {
      id: 'c18',
      comment_author: 'Olivia',
      comment_content: "I have mixed feelings about this. Let's see how it goes."
   },
   {
      id: 'c19',
      comment_author: 'David',
      comment_content: 'I appreciate the effort, but I think it lacks depth.'
   },
   {
      id: 'c20',
      comment_author: 'Emma',
      comment_content: 'Keep it up! Looking forward to more articles from you.'
   }
]

const header_editor_reviewer = [
   {
      id: 1,
      label: 'Name',
      value: 'name'
   },
   {
      id: 2,
      label: 'Title',
      value: 'title'
   },
   {
      id: 3,
      label: 'E-mail',
      value: 'email'
   },
   {
      id: 4,
      label: 'Role',
      value: 'role'
   },
   {
      id: 5,
      label: 'Status',
      value: 'status'
   }
]
