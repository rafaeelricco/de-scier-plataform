'use client'

import Box from '@/components/common/Box/Box'
import CommentItem from '@/components/common/Comment/Comment'
import { File } from '@/components/common/File/File'
import Reasoning from '@/components/modules/deScier/Article/Reasoning'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { header_editor_reviewer } from '@/mock/article_under_review'
import { Author, Authorship, authors_headers, authors_mock, authorship_headers } from '@/mock/submit_new_document'
import { useFetchAdminArticles } from '@/services/admin/fetchDocuments.service'
import { AuthorsOnDocuments, DocumentComment, DocumentGetProps } from '@/services/document/getArticles'
import { truncate } from '@/utils/format_texts'
import { keywordsArray } from '@/utils/keywords_format'
import * as Button from '@components/common/Button/Button'
import * as Dialog from '@components/common/Dialog/Digalog'
import * as Input from '@components/common/Input/Input'
import { format } from 'date-fns'
import { Reorder } from 'framer-motion'
import mermaid from 'mermaid'
import { useRouter } from 'next/navigation'
import CircleIcon from 'public/svgs/modules/new-document/circles.svg'
import React from 'react'
import { ArrowLeft, Check, Person, PlusCircleDotted, X } from 'react-bootstrap-icons'
import { CurrencyInput } from 'react-currency-mask'
import { twMerge } from 'tailwind-merge'

export default function ArticleForApprovalPage({ params }: { params: { slug: string } }) {
   const router = useRouter()

   const { fetch_article } = useFetchAdminArticles()

   const [article, setArticle] = React.useState<DocumentGetProps | null>(null)
   const [items, setItems] = React.useState(authors_mock)
   const [share, setShare] = React.useState('')
   const [authors, setAuthors] = React.useState<Author[]>(authors_mock)
   const [authorship, setAuthorship] = React.useState<Authorship[]>([])
   const [access_type, setAccessType] = React.useState('open-access')
   const [authorship_settings, setAuthorshipSettings] = React.useState<Author>()
   const [popover, setPopover] = React.useState({ copy_link: false })
   const [dialog, setDialog] = React.useState({ author: false, share_split: false, edit_author: false, reasoning: false })

   const onReorder = (newOrder: typeof items) => setItems((prevItems) => [...newOrder])

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

   const fetchSingleArticle = async (documentId: string) => {
      await fetch_article(documentId).then((res) => {
         setArticle(res as DocumentGetProps)
         const access = res?.document.accessType === 'FREE' ? 'open-access' : 'paid-access'
         setAccessType(access)
         console.log(res)
      })
   }

   React.useEffect(() => {
      fetchSingleArticle(params.slug)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [params.slug])

   React.useEffect(() => {
      const runMermaid = async () => {
         mermaid.initialize({ startOnLoad: false })
         await mermaid.run({ querySelector: '.mermaid' })
      }

      if (article?.document.abstractChart) {
         runMermaid()
      } else {
         console.log('no chart')
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [article?.document.abstractChart])

   return (
      <React.Fragment>
         <Dialog.Root open={dialog.reasoning}>
            <Dialog.Overlay />
            <Dialog.Content className="py-14 px-16 max-w-[600px]">
               <Reasoning
                  reason=""
                  onClose={() => setDialog({ ...dialog, reasoning: false })}
                  onConfirm={() => setDialog({ ...dialog, reasoning: false })}
               />
            </Dialog.Content>
         </Dialog.Root>
         <div className="grid gap-8">
            <div className="flex items-center gap-4">
               <ArrowLeft size={32} className="hover:scale-110 transition-all cursor-pointer" onClick={() => router.back()} />
               <h1 className="text-1xl font-semibold">Article in review</h1>
            </div>
            <Box className="grid gap-8 h-fit py-6 px-8">
               <ArticleStatus />
               <div className="grid grid-cols-2 gap-6">
                  <div className="grid grid-cols-1">
                     <span className="text-sm font-semibold">Title</span>
                     <span className="text-sm">{article?.document?.title}</span>
                  </div>
                  <div className="grid gap-2">
                     <p className="text-sm font-semibold">Add keywords (Max 5)</p>
                     <div className="flex flex-wrap gap-1 sm:gap-2">
                        {keywordsArray(article?.document.keywords as string)?.length > 0 ? (
                           <React.Fragment>
                              {keywordsArray(article?.document.keywords as string).map((tag, index) => (
                                 <div
                                    className="border rounded-md border-neutral-stroke_light flex items-center px-1 sm:px-2 py-[2px] bg-white"
                                    key={index}
                                 >
                                    <span className="text-xxs sm:text-xs text-primary-main">{tag}</span>
                                 </div>
                              ))}
                           </React.Fragment>
                        ) : (
                           <p className="text-sm text-gray-500 mt-8">There are no keywords inserted into this document.</p>
                        )}
                     </div>
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-6">
                  <div className="grid grid-cols-1">
                     <span className="text-sm font-semibold">Field</span>
                     <span className="text-sm">{article?.document?.field}</span>
                  </div>
               </div>
               <div className="grid gap-2">
                  <h3 className="text-sm font-semibold">Document type</h3>
                  <p className="text-sm font-regular first-letter:uppercase lowercase">{article?.document.documentType}</p>
               </div>

               <div className="grid gap-2">
                  <h3 className="text-sm font-semibold">Abstract</h3>
                  <p className="text-sm font-regular">{article?.document.abstract}</p>
               </div>

               <div className="grid gap-4">
                  <div className="grid gap-2">
                     <p className="text-sm font-semibold">Visual Abstract</p>
                  </div>
                  <div className="flex items-center gap-4 w-full h-36 relative overflow-hidden py-2">
                     {article?.document.abstractChart !== '' && (
                        <div className="mermaid flex w-full justify-center mt-4" key={article?.document.id}>
                           {article?.document.abstractChart}
                        </div>
                     )}
                  </div>
               </div>
               <div className="grid gap-4">
                  <p className="text-sm font-semibold">Cover</p>
                  <div className="w-full h-56 rounded-md overflow-hidden relative">
                     {/* eslint-disable-next-line @next/next/no-img-element */}
                     <img
                        loading="lazy"
                        src={article?.document.cover || '/images/4fa38f086cfa1a2289fabfdd7337c09d.jpeg'}
                        alt="cover-preview"
                        className="absolute w-full h-full object-cover"
                     />
                  </div>
                  {article?.document.updatedAt && (
                     <p className="text-sm font-regular">
                        Last updated on {format(new Date(article?.document.updatedAt as unknown as string), 'dd/MM/yyyy - HH:mm')}
                     </p>
                  )}
               </div>
            </Box>
            <Box className="grid gap-8 h-fit py-6 px-8">
               <div className="grid gap-6">
                  <h3 className="text-xl text-primary-main font-semibold lg:text-lg 2xl:text-xl">Document file</h3>
                  <div>
                     <ScrollArea className="h-[200px] w-full pr-2">
                        <div className="grid gap-4">
                           {article?.document.documentVersions && article.document.documentVersions.length > 0 ? (
                              article?.document.documentVersions?.map((file) => (
                                 <File
                                    key={file.id}
                                    file_name={file.fileName || 'file.docx'}
                                    link={file.link || ''}
                                    uploaded_at={new Date(file.createdAt).toLocaleDateString('pt-BR')}
                                    uploaded_by={article.document.user?.name || ''}
                                 />
                              ))
                           ) : (
                              <p className="text-center col-span-2 text-gray-500 mt-8">There are no files inserted into this document.</p>
                           )}
                        </div>
                     </ScrollArea>
                  </div>
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
                        {article?.document.documentComments && article?.document?.documentComments?.length > 0 ? (
                           article?.document.documentComments?.map((comment: DocumentComment) => (
                              <React.Fragment key={comment.id}>
                                 <CommentItem
                                    comment_author={comment.comment_author}
                                    comment_content={comment.comment}
                                    status={comment.approvedByAuthor as 'APPROVED' | 'REJECTED' | 'PENDING'}
                                    onApprove={() => console.log('approved', comment)}
                                    onReject={() => console.log('rejected', comment)}
                                    onSeeReasoning={() => setDialog({ ...dialog, reasoning: true })}
                                 />
                              </React.Fragment>
                           ))
                        ) : (
                           <p className="text-center col-span-2 text-gray-500 mt-8">There are no comments inserted into this document.</p>
                        )}
                     </div>
                  </ScrollArea>
               </div>
            </Box>
            <Box className="grid gap-8 h-fit py-6 px-8">
               <div className="grid gap-6">
                  <div className="grid gap-2">
                     <h3 className="text-xl text-terciary-main font-semibold lg:text-lg 2xl:text-xl">Authors</h3>
                     <p className="text-sm">Drag the authors_mock to reorder the list.</p>
                  </div>
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
                           {article?.document.authorsOnDocuments && article?.document.authorsOnDocuments?.length > 0 ? (
                              <>
                                 {article?.document.authorsOnDocuments.map((item: AuthorsOnDocuments, index) => (
                                    <Reorder.Item key={item.id} value={item}>
                                       <div className="grid grid-cols-3 gap-4 items-center px-0 py-3 rounded-md cursor-grab hover:bg-[#F1FFFF]">
                                          <div className="flex items-center gap-4">
                                             <div className="flex items-center gap-0">
                                                <CircleIcon className="w-8 cursor-grab" />
                                                <p className="text-sm text-blue-gray">{index + 1}º</p>
                                             </div>
                                             <div>
                                                <p className="text-sm text-secundary_blue-main">{item.author?.name}</p>
                                             </div>
                                          </div>
                                          <div>
                                             <p className="text-sm text-secundary_blue-main">{item.author?.title == '' ? '-' : item.author?.title}</p>
                                          </div>
                                          <div>
                                             <p className="text-sm text-secundary_blue-main">{item.authorEmail}</p>
                                          </div>
                                       </div>
                                    </Reorder.Item>
                                 ))}
                              </>
                           ) : (
                              <></>
                           )}
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
                     <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <p className="text-sm font-semibold text-blue-500 max-w-[50ch] underline truncate ..." id="link-to-copy">
                           {article?.document.reviewerInviteLink}
                        </p>
                        <HoverCard open={popover.copy_link}>
                           <HoverCardTrigger>
                              <Button.Button
                                 variant="outline"
                                 className="px-4 py-1 text-sm"
                                 onClick={() => {
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
                                 }}
                              >
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
                     {article?.document.reviewersOnDocuments?.map((item) => (
                        <React.Fragment key={item.id}>
                           <div className="grid md:grid-cols-5  items-center px-0 py-3 rounded-md">
                              <div className="flex items-center gap-4">
                                 <div>
                                    <p className="text-sm text-secundary_blue-main font-regular">{item.reviewer.name}</p>
                                 </div>
                              </div>
                              <div>
                                 <p className="text-sm text-secundary_blue-main">{item.reviewer.title}</p>
                              </div>
                              <div>
                                 <p className="text-sm text-secundary_blue-main">{truncate(item.reviewer.email, 16)}</p>
                              </div>
                              <div>
                                 <p
                                    className={twMerge(
                                       'text-sm text-secundary_blue-main first-letter:uppercase font-semibold lowercase',
                                       `${item.role == 'reviewer' && 'text-[#EFB521]'}`,
                                       `${item.role == 'editor' && 'text-terciary-main'}`
                                    )}
                                 >
                                    {item.role}
                                 </p>
                              </div>
                              <div>
                                 <p
                                    className={twMerge(
                                       'text-sm text-secundary_blue-main first-letter:uppercase font-semibold border py-[2px] px-1 text-center rounded-md md:border-none md:py-0 md:px-0 md:rounded-none md:text-start lowercase',
                                       `${item.inviteStatus == 'PENDING' && 'text-status-pending'}`,
                                       `${item.inviteStatus == 'ACCEPTED' && 'text-status-green'}`
                                    )}
                                 >
                                    {item.inviteStatus}
                                 </p>
                              </div>
                           </div>
                        </React.Fragment>
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
                        onValueChange={(value) => setAccessType(value)}
                        value={access_type}
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
                  {access_type == 'open-access' && (
                     <Input.Root>
                        <Input.Label className="text-neutral-gray text-sm font-semibold pl-2">Valor total</Input.Label>
                        <Input.Input disabled placeholder="R$" />
                     </Input.Root>
                  )}
                  {access_type == 'paid-access' && (
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
               {access_type == 'paid-access' && (
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
               <h3 className="text-lg font-semibold text-status-pending flex justify-center">Your approval is still pending</h3>
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
               <Button.Button variant="primary" className="flex items-center">
                  <Check className="w-5 h-5" />
                  Approve document
               </Button.Button>
               <Button.Button variant="outline" className="flex items-center">
                  Reject document
               </Button.Button>
            </Box>
         </div>
      </React.Fragment>
   )
}

const ArticleStatus: React.FC = () => {
   return (
      <React.Fragment>
         <div className="flex items-center gap-2 border border-neutral-stroke_light w-fit py-1 px-4 rounded-md">
            <Person className="text-primary-light" />
            <p className="text-sm text-primary-light font-semibold select-none">Final approve pending</p>
         </div>
      </React.Fragment>
   )
}
