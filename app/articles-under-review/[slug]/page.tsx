'use client'

import Box from '@/components/common/Box/Box'
import { Pills } from '@/components/common/Button/Pill/Pill'
import CommentItem from '@/components/common/Comment/Comment'
import Dropzone from '@/components/common/Dropzone/Dropzone'
import { File } from '@/components/common/File/File'
import { YouAreAuthor, YouAreReviwer } from '@/components/common/Flags/Author/AuthorFlags'
import Reasoning from '@/components/modules/deScier/Article/Reasoning'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { header_editor_reviewer } from '@/mock/article_under_review'
import { document_types } from '@/mock/document_types'
import { Author, Authorship, authors_headers, authors_mock, authorship_headers } from '@/mock/submit_new_document'
import { DocumentGetProps } from '@/services/document/getArticles'
import { useArticles } from '@/services/document/getArticles.service'
import { truncate } from '@/utils/format_texts'
import * as Button from '@components/common/Button/Button'
import * as Dialog from '@components/common/Dialog/Digalog'
import * as Input from '@components/common/Input/Input'
import { Reorder } from 'framer-motion'
import { isEqual } from 'lodash'
import mermaid from 'mermaid'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import CircleIcon from 'public/svgs/modules/new-document/circles.svg'
import React from 'react'
import { ArrowLeft, Check, FileEarmarkText, Pencil, PlusCircle, PlusCircleDotted, Trash, X } from 'react-bootstrap-icons'
import { CurrencyInput } from 'react-currency-mask'
import { twMerge } from 'tailwind-merge'

export default function ArticleInReviewPage({ params }: { params: { slug: string } }) {
   const router = useRouter()

   const { fetch_article } = useArticles()

   const [article, setArticle] = React.useState<DocumentGetProps | null>(null)
   const [items, setItems] = React.useState(authors_mock)
   const [share, setShare] = React.useState('')
   const [authors, setAuthors] = React.useState<Author[]>(authors_mock)
   const [authorship, setAuthorship] = React.useState<Authorship[]>([])
   const [access_type, setAccessType] = React.useState('open-access')
   const [authorship_settings, setAuthorshipSettings] = React.useState<Author>()
   const [mermaid_error, setMermaidError] = React.useState('' as string | null)
   const [popover, setPopover] = React.useState({ copy_link: false })
   const [dialog, setDialog] = React.useState({ author: false, share_split: false, edit_author: false, reasoning: false })

   const fetchSingleArticle = async (documentId: string) => {
      const fetchedArticle = await fetch_article(documentId).then((res) => {
         setArticle(res as DocumentGetProps)
         const access = res?.document.accessType === 'FREE' ? 'open-access' : 'paid-access'
         setAccessType(access)
      })
   }

   React.useEffect(() => {
      fetchSingleArticle(params.slug)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [params.slug])

   const onReorder = (newOrder: typeof items) => {
      setItems((prevItems) => [...newOrder])
   }

   const { data } = useSession()

   const [loading, setLoading] = React.useState(false)
   const [is_author, setIsAuthor] = React.useState(false)

   React.useEffect(() => {
      setLoading(true)
      const isAuthor = () => {
         const author_id = typeof data?.user?.userInfo?.id === 'string' ? data.user.userInfo.id.trim() : ''
         const document_author_id = typeof article?.document.userId === 'string' ? article.document.userId.trim() : ''

         if (isEqual(author_id, document_author_id)) {
            setIsAuthor(true)
         } else {
            setIsAuthor(false)
         }
         setLoading(false)
      }

      if (article?.document?.userId && data?.user?.userInfo?.id) {
         isAuthor()
      }
   }, [article?.document?.userId, data?.user?.userInfo?.id])

   React.useEffect(() => {
      const runMermaid = async () => {
         mermaid.initialize({ startOnLoad: false, fontSize: 25 })
         await mermaid.run({ querySelector: '.mermaid' }).catch((err) => {
            setMermaidError(err.message)
         })
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
            <Box className="grid gap-8 h-fit px-4 py-6 md:px-8">
               {loading ? (
                  <Skeleton className="flex items-center gap-2 w-72 py-1 px-3 rounded-md h-7" />
               ) : (
                  <React.Fragment>{is_author ? <YouAreAuthor /> : <YouAreReviwer />}</React.Fragment>
               )}
               <div className="grid gap-x-6 gap-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                     <Input.Root>
                        <Input.Label className="flex gap-2 items-center">
                           <span className="text-sm font-semibold">Title</span>
                           <span className="text-sm text-neutral-light_gray font-semibold">0/300 characters</span>
                        </Input.Label>
                        <Input.Input placeholder="Title of the article" defaultValue={article?.document.title} />
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
                        <Input.Input placeholder="Title of the field" defaultValue={article?.document.field} />
                     </Input.Root>
                  </div>
               </div>
               <div>
                  <div className="hidden lg:grid lg:gap-2">
                     <h3 className="text-sm font-semibold">Document type</h3>
                     <Pills items={document_types} />
                  </div>
                  <div className="block md:hidden">
                     <Input.Root>
                        <Input.Select label={'Document type'} options={document_types} placeholder="Title of the field" />
                     </Input.Root>
                  </div>
               </div>
               <Dropzone setSelectedFile={(file) => console.log(file)} />
               <Input.Root>
                  <Input.Label className="flex gap-2 items-center">
                     <span className="text-sm font-semibold">Abstract</span>
                     <span className="text-sm text-neutral-light_gray font-semibold">0/2000 words</span>
                  </Input.Label>
                  <Input.TextArea defaultValue={article?.document.abstract} rows={4} placeholder="Title of the field" />
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
                  {mermaid_error ? null : (
                     <React.Fragment>
                        {article?.document.abstractChart && (
                           <div className="mermaid flex w-full zoom-in-125 justify-center mt-4" key={article?.document.abstractChart}>
                              {article?.document.abstractChart}
                           </div>
                        )}
                     </React.Fragment>
                  )}
               </div>
               <div className="grid gap-4">
                  <p className="text-sm font-semibold">Cover</p>
                  <Dropzone thumbnail placeholder="Upload cover picture (.png, .jpg)" setSelectedFile={(file) => console.log(file)} />
               </div>
            </Box>
            <Box className="grid gap-8 h-fit px-4 py-6 md:px-8">
               <div className="grid gap-6">
                  <h3 className="text-lg md:text-xl text-primary-main font-semibold">Document file</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                     <Dropzone setSelectedFile={(file) => console.log(file)} />
                     <ScrollArea className="h-[200px] pr-2">
                        <div className="grid gap-4">
                           {article?.document?.documentVersions && article?.document?.documentVersions?.length > 0 ? (
                              article?.document?.documentVersions?.map((file) => (
                                 <File
                                    key={file.id}
                                    file_name={file.fileName || 'file.docx'}
                                    link={file.link}
                                    uploaded_at={new Date(file.createdAt).toLocaleDateString('pt-BR')}
                                    uploaded_by={data?.user?.userInfo.name || ''}
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
            <Box className="grid gap-8 h-fit px-4 py-6 md:px-8">
               <div className="grid gap-2">
                  <h3 className="text-lg md:text-xl text-primary-main font-semibold">Comments</h3>
                  <p className="text-sm">The reviewing team can publish comments, suggesting updates on your document.</p>
               </div>
               <div className="border rounded-md p-4">
                  <ScrollArea className="lg:h-[300px] 2xl:h-[400px] pr-2">
                     <div className="grid gap-4">
                        {article?.document.documentComments && article?.document.documentComments?.length > 0 ? (
                           article?.document.documentComments?.map((comment) => (
                              <React.Fragment key={comment.id}>
                                 <CommentItem
                                    comment_author={comment.user.name}
                                    comment_content={comment.comment}
                                    status={comment.approvedByAuthor as 'PENDING' | 'APPROVED' | 'REJECTED'}
                                    onApprove={() => console.log('approved', comment)}
                                    onReject={() => console.log('rejected', comment)}
                                    onSeeReasoning={() => setDialog({ ...dialog, reasoning: true })}
                                 />
                              </React.Fragment>
                           ))
                        ) : (
                           <p className="text-center col-span-2 text-gray-500 mt-8">There are no comments on this document.</p>
                        )}
                     </div>
                  </ScrollArea>
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
                     <Reorder.Group axis="y" values={authors} onReorder={onReorder}>
                        <div className="grid gap-2">
                           {article?.document.authorsOnDocuments?.map((item, index) => (
                              <Reorder.Item key={item.id} value={item} id={item.id}>
                                 <div className="grid md:grid-cols-3 items-center px-0 py-3 rounded-md cursor-grab">
                                    <div className="flex items-center gap-4">
                                       <div className="flex gap-0 items-center">
                                          <CircleIcon className="w-8" />
                                          <p className="text-sm text-blue-gray">{index + 1}º</p>
                                       </div>
                                       <div>
                                          <p className="text-sm text-secundary_blue-main font-semibold md:font-regular">{item.author?.name}</p>
                                          <div className="block md:hidden">
                                             <p className="text-sm text-secundary_blue-main">{item.author?.title}</p>
                                          </div>
                                          <div className="block md:hidden">
                                             <p className="text-sm text-secundary_blue-main">{item.author?.email}</p>
                                          </div>
                                       </div>
                                    </div>
                                    <div className="hidden md:block">
                                       <p className="text-sm text-secundary_blue-main">{item.author?.title}</p>
                                    </div>
                                    <div className="hidden md:flex items-center justify-between">
                                       <p className="text-sm text-secundary_blue-main">{item.author?.email}</p>
                                       {index !== 0 && (
                                          <React.Fragment>
                                             <div className="flex items-center gap-2">
                                                <Trash
                                                   className="fill-status-error w-5 h-full cursor-pointer hover:scale-110 transition-all duration-200"
                                                   onClick={() => {
                                                      //  const new_list = authors.filter((author) => author.id !== item.id)
                                                      //  setAuthors(new_list)
                                                   }}
                                                />
                                                <Pencil
                                                   className="fill-primary-main w-5 h-full cursor-pointer hover:scale-110 transition-all duration-200"
                                                   onClick={() => {
                                                      //  setAuthorToEdit(item as unknown as AuthorProps)
                                                      //  setDialog({ ...dialog, edit_author: true })
                                                   }}
                                                />
                                             </div>
                                          </React.Fragment>
                                       )}
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
                  <div className="hidden md:grid grid-cols-5">
                     {header_editor_reviewer.map((header, index) => (
                        <React.Fragment key={index}>
                           <p className="text-sm font-semibold">{header.label}</p>
                        </React.Fragment>
                     ))}
                  </div>
                  <div>
                     {article?.document.reviewersOnDocuments?.map((item, index) => (
                        <div key={item.id}>
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
                                       'text-sm text-secundary_blue-main first-letter:uppercase font-semibold',
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
                                       'text-sm text-secundary_blue-main first-letter:uppercase font-semibold border py-[2px] px-1 text-center rounded-md md:border-none md:py-0 md:px-0 md:rounded-none md:text-start',
                                       `${item.inviteStatus == 'PENDING' && 'text-status-pending'}`,
                                       `${item.inviteStatus == 'ACCEPTED' && 'text-status-green'}`
                                    )}
                                 >
                                    {item.inviteStatus}
                                 </p>
                              </div>
                           </div>
                        </div>
                     ))}
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
                              defaultValue={article?.document.price}
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
                              {article?.document.authorsOnDocuments?.map((author, index) => (
                                 <React.Fragment key={index}>
                                    <div className="grid gap-2 md:grid-cols-3 items-center py-3">
                                       <div>
                                          <p className="text-sm font-semibold text-secundary_blue-main">{author.author?.name}</p>
                                       </div>
                                       <div>
                                          {author.revenuePercent ? (
                                             <div className="flex gap-2 px-4 py-1 border rounded-md border-terciary-main w-fit">
                                                <p className="text-sm text-center text-terciary-main w-8">{author.revenuePercent}%</p>
                                                <p className="text-sm text-terciary-main">Authorship</p>
                                             </div>
                                          ) : (
                                             <Button.Button
                                                variant="outline"
                                                className="px-4 py-2 w-fit text-sm"
                                                onClick={() => {
                                                   setDialog({ ...dialog, share_split: true })
                                                   setAuthorshipSettings({
                                                      email: author.authorEmail || '',
                                                      id: author.id,
                                                      name: author.author?.name || '',
                                                      title: author.author?.title || '',
                                                      share: `${author.revenuePercent}`
                                                   })
                                                }}
                                             >
                                                Add authorship settings
                                                <PlusCircleDotted size={18} className="fill-primary-main" />
                                             </Button.Button>
                                          )}
                                       </div>
                                       <div className="w-fit">
                                          <p className="text-sm text-center text-black w-8">{author.author?.walletAddress}</p>
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
            <Box className="grid gap-4 h-fit px-4 py-6 md:px-8">
               <div className="flex items-center justify-between md:gap-12 md:justify-center">
                  <div className="flex items-center">
                     <h2 className="text-status-yellow font-semibold text-base md:text-lg">Reviewer</h2>
                     <Check className="w-8 h-8 hover:scale-125 transition-all duration-200 fill-status-green cursor-pointer" />
                     <Check className="w-8 h-8 hover:scale-125 transition-all duration-200 fill-status-green cursor-pointer" />
                  </div>
                  <div className="flex items-center">
                     <h2 className="text-terciary-main font-semibold text-base md:text-lg">Editor</h2>
                     <Check className="w-8 h-8 hover:scale-125 transition-all duration-200 fill-status-green cursor-pointer" />
                     <X className="w-8 h-8 hover:scale-125 transition-all duration-200 fill-status-error cursor-pointer" />
                  </div>
               </div>
               <Button.Button variant="primary" className="flex items-center">
                  <FileEarmarkText className="w-5 h-5" />
                  Publish document
               </Button.Button>
            </Box>
         </div>
      </React.Fragment>
   )
}
