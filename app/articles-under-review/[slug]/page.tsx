'use client'

import Box from '@/components/common/Box/Box'
import { Pills } from '@/components/common/Button/Pill/Pill'
import CommentItem from '@/components/common/Comment/Comment'
import Dropzone from '@/components/common/Dropzone/Dropzone'
import { StoredFile } from '@/components/common/Dropzone/Typing'
import { File } from '@/components/common/File/File'
import { YouAreAuthor, YouAreReviwer } from '@/components/common/Flags/Author/AuthorFlags'
import Reasoning from '@/components/modules/deScier/Article/Reasoning'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { header_editor_reviewer } from '@/mock/article_under_review'
import { document_types } from '@/mock/document_types'
import { Author, authors_headers, authors_mock, authorship_headers } from '@/mock/submit_new_document'
import { home_routes } from '@/routes/home'
import { UpdateDocumentProps, UpdateDocumentSchema } from '@/schemas/update_document'
import { finalSubmitDocumentService } from '@/services/document/finalSubmit.service'
import { DocumentGetProps } from '@/services/document/getArticles'
import { useArticles } from '@/services/document/getArticles.service'
import { uploadDocumentFileService } from '@/services/file/file.service'
import { ActionComments, comments_initial_state, reducer_comments } from '@/states/reducer_comments'
import { truncate } from '@/utils/format_texts'
import * as Button from '@components/common/Button/Button'
import * as Dialog from '@components/common/Dialog/Digalog'
import * as Input from '@components/common/Input/Input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Reorder } from 'framer-motion'
import { isEqual, uniqueId } from 'lodash'
import mermaid from 'mermaid'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import CircleIcon from 'public/svgs/modules/new-document/circles.svg'
import React, { useReducer } from 'react'
import { ArrowLeft, Check, FileEarmarkText, Pencil, PlusCircle, PlusCircleDotted, Trash, X } from 'react-bootstrap-icons'
import { CurrencyInput } from 'react-currency-mask'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { twMerge } from 'tailwind-merge'

export default function ArticleInReviewPage({ params }: { params: { slug: string } }) {
   const { data } = useSession()

   const router = useRouter()

   const { fetch_article } = useArticles()
   const [state, dispatch] = useReducer(reducer_comments, comments_initial_state)
   console.log('State comments', state)

   const [article, setArticle] = React.useState<DocumentGetProps | null>(null)
   const [items, setItems] = React.useState(authors_mock)
   const [authors, setAuthors] = React.useState<Author[]>(authors_mock)
   const [access_type, setAccessType] = React.useState('open-access')
   const [authorship_settings, setAuthorshipSettings] = React.useState<Author>()
   const [mermaid_error, setMermaidError] = React.useState('' as string | null)
   const [popover, setPopover] = React.useState({ copy_link: false })
   const [dialog, setDialog] = React.useState({ author: false, share_split: false, edit_author: false, reasoning: false })
   const [loading, setLoading] = React.useState(false)
   const [submitLoading, setSubmitLoading] = React.useState(false)
   const [saveLoading, setSaveLoading] = React.useState(false)
   const [is_author, setIsAuthor] = React.useState(false)
   const [documentSaved, setDocumentSaved] = React.useState(false)
   const [keywords_temp, setKeywordsTemp] = React.useState<string | undefined>()

   const [file, setFile] = React.useState<StoredFile | null>()
   const [files, setFiles] = React.useState<StoredFile[]>([])

   const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
      setValue,
      trigger,
      getValues,
      control,
      clearErrors,
      setError
   } = useForm<UpdateDocumentProps>({
      resolver: zodResolver(UpdateDocumentSchema),
      defaultValues: {
         abstract: article?.document.abstract || '',
         abstractChart: '',
         accessType: (article?.document.accessType as 'FREE' | 'PAID') || 'FREE',
         documentType: article?.document.documentType,
         field: article?.document.field,
         price: String(article?.document.price) || '0',
         title: article?.document.title,
         file: [],
         authors: [{}],
         keywords: article?.document.keywords?.split(';').map((item) => ({ id: uniqueId('keyword'), name: item })) || []
      }
   })

   const { append, remove, fields: keywords } = useFieldArray({ name: 'keywords', control: control })

   const fetchSingleArticle = async (documentId: string) => {
      await fetch_article(documentId).then((res) => {
         setArticle(res as DocumentGetProps)
         const access = res?.document.accessType === 'FREE' ? 'open-access' : 'paid-access'
         setAccessType(access)
         const keywords = res?.document.keywords?.split(';')
         if (keywords) {
            setValue(
               'keywords',
               keywords.map((item) => ({ id: uniqueId('keywords'), name: item }))
            )
            trigger('keywords')
         }
         if (res?.document.documentVersions) {
         }
         if (article?.document.documentVersions) {
            const documentFiles: StoredFile[] = article.document.documentVersions?.map((item) => ({
               lastModified: 0,
               lastModifiedDate: new Date(item.createdAt),
               name: item.fileName || '',
               path: item.link,
               preview: '',
               size: 0,
               type: item.fileName?.split('.')[1] || ''
            }))
            setValue('file', documentFiles)
            trigger('file')
         }
         if (article?.document?.documentComments && article?.document?.documentComments?.length > 0) {
            {
               article?.document.documentComments?.map((comment) => {
                  dispatch({
                     type: 'store_comments_from_api',
                     payload: {
                        id: comment.id,
                        comment_author: comment.user.name,
                        comment_content: comment.comment,
                        status: comment.approvedByAuthor as 'PENDING' | 'APPROVED' | 'REJECTED'
                     }
                  } as ActionComments)
               })
            }
         }
      })
   }

   React.useEffect(() => {
      fetchSingleArticle(params.slug)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [params.slug])

   const onReorder = (newOrder: typeof items) => {
      setItems((prevItems) => [...newOrder])
   }

   const handleSubmitDocument = async () => {
      if (!article || !article.document) {
         toast.error('Article not found.')
         return
      }

      if (!article.document.documentVersions) {
         toast.error('Upload a pdf file to final submit.')
         return
      }

      setSubmitLoading(true)

      const response = await finalSubmitDocumentService({
         documentId: article.document.id
      })
      setSubmitLoading(false)

      if (!response.success) {
         toast.error(response.message)
         return
      }

      toast.success(response.message)
      router.push(home_routes.articles_under_review)
   }

   const handleSaveDocument = async () => {
      if (!article) return
      setSaveLoading(true)
      if (file) {
         const response = await uploadDocumentFileService({
            fileLocalUrl: file.preview,
            filename: file.name,
            mimetype: file.type,
            documentId: article.document.id
         })

         if (!response) {
            setSaveLoading(false)
            toast.error('Error in upload file.')
            return
         }
      }

      toast.success('Document updated successfully')
      setDocumentSaved(true)

      setSaveLoading(false)
      fetchSingleArticle(article.document.id)
   }

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
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [article?.document.abstractChart])

   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.keyCode === 13) {
         if (keywords_temp && keywords_temp.trim() !== '') {
            e.preventDefault()
            append({ id: uniqueId('key'), name: keywords_temp as string })
            setKeywordsTemp('')
         } else {
            setError('keywords', {
               type: 'manual',
               message: 'Keyword is required.'
            })
         }
      }
   }

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
                  <div className="grid md:grid-cols-2 items-start gap-6">
                     <Input.Root>
                        <Input.Label className="flex gap-2 items-center">
                           <span className="text-sm font-semibold">Title</span>
                           <span className="text-sm text-neutral-light_gray">0/300 characters</span>
                        </Input.Label>
                        <Input.Input placeholder="Title of the article" defaultValue={article?.document.title} {...register('title')} />
                     </Input.Root>
                     <Input.Root>
                        <Input.Label className="text-sm font-semibold">Add keywords</Input.Label>
                        <Input.Input
                           placeholder="Title of the article"
                           value={keywords_temp}
                           onKeyDown={(e) => handleKeyDown(e)}
                           onInput={(e) => setKeywordsTemp(e.currentTarget.value)}
                           end
                           icon={
                              <React.Fragment>
                                 <Button.Button
                                    variant="outline"
                                    className="px-2 py-0 border-neutral-light_gray hover:bg-neutral-light_gray hover:bg-opacity-10 flex items-center gap-1 rounded-sm"
                                    onClick={() => {
                                       append({ id: uniqueId('key'), name: keywords_temp as string })
                                       setKeywordsTemp('')
                                    }}
                                 >
                                    <PlusCircle className="w-3 fill-neutral-light_gray" />
                                    <span className="font-semibold text-xs text-neutral-light_gray">Add keyword</span>
                                 </Button.Button>
                              </React.Fragment>
                           }
                        />
                        <Input.Error>{errors.keywords?.message}</Input.Error>
                        <div className="flex flex-wrap gap-1">
                           {watch('keywords')?.map((keyword, index) => (
                              <div
                                 className="border rounded-md border-neutral-stroke_light flex items-center px-1 sm:px-2 py-[2px] bg-white w-fit"
                                 key={keyword.id}
                              >
                                 <X
                                    className="w-5 h-fit fill-neutral-stroke_light hover:fill-status-error cursor-pointer transition-all duration-200 hover:scale-110"
                                    onClick={() => remove(index)}
                                 />
                                 <span className="text-xxs sm:text-xs text-primary-main">{keyword.name}</span>
                              </div>
                           ))}
                        </div>
                     </Input.Root>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                     <Input.Root>
                        <Input.Label className="flex gap-2 items-center">
                           <span className="text-sm font-semibold">Field</span>
                           <span className="text-sm text-neutral-light_gray">0/300 characters</span>
                        </Input.Label>
                        <Input.Input placeholder="Title of the field" defaultValue={article?.document.field} />
                     </Input.Root>
                  </div>
               </div>
               <div>
                  <div className="hidden lg:grid lg:gap-2">
                     <h3 className="text-sm font-semibold">Document type</h3>
                     <Pills items={document_types} selected={article?.document.documentType?.toLowerCase() || 'manuscript'} />
                  </div>
                  <div className="block md:hidden">
                     <Input.Root>
                        <Input.Select
                           label={'Document type'}
                           defaultValue={article?.document.documentType}
                           options={document_types}
                           placeholder="Title of the field"
                        />
                     </Input.Root>
                  </div>
               </div>
               <Input.Root>
                  <Input.Label className="flex gap-2 items-center">
                     <span className="text-sm font-semibold">Abstract</span>
                     <span className="text-sm text-neutral-light_gray">0/2000 words</span>
                  </Input.Label>
                  <Input.TextArea defaultValue={article?.document.abstract} rows={4} placeholder="Title of the field" />
               </Input.Root>
               <div className="grid gap-4">
                  <p className="text-sm font-semibold">Cover</p>
                  <Dropzone thumbnail placeholder="Upload cover picture (.png, .jpg)" setSelectedFile={(file) => console.log(file)} />
               </div>
            </Box>
            <Box className="grid gap-8 h-fit px-4 py-6 md:px-8">
               <div className="grid gap-6">
                  <h3 className="text-lg md:text-xl text-primary-main font-semibold">Document file</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                     <Dropzone setSelectedFile={(file) => setFile(file)} thumbnail placeholder="Upload a new document version (.docx, .pdf)" />
                     <ScrollArea className="h-[200px] pr-2">
                        <div className="grid gap-4">
                           {article?.document?.documentVersions && article?.document?.documentVersions?.length > 0 ? (
                              article?.document?.documentVersions?.map((file) => (
                                 <File
                                    key={file.id}
                                    file_name={file.fileName || 'file.docx'}
                                    link={file.link}
                                    uploaded_at={new Date(file.createdAt)?.toLocaleDateString('pt-BR')}
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
                  <ScrollArea className="h-[342px]">
                     <div className="grid gap-4">
                        {state.comments && state.comments.length > 0 ? (
                           state.comments?.map((comment) => (
                              <React.Fragment key={comment.id}>
                                 <CommentItem
                                    comment_author={comment.comment_author}
                                    comment_content={comment.comment_content}
                                    status={comment.status as 'PENDING' | 'APPROVED' | 'REJECTED'}
                                    onApprove={() => {
                                       /* use this dispatch to approve on state */
                                       /*  dispatch({ type: 'approve_comment', payload: { id: comment.id } } as ActionComments) */
                                    }}
                                    onReject={() => {
                                       /* use this dispatch to reject on state */
                                       /* dispatch({ type: 'reject_comment', payload: { id: comment.id } } as ActionComments) */
                                    }}
                                    onSeeReasoning={() => setDialog({ ...dialog, reasoning: true })}
                                 />
                                 <hr className="divider-h mt-1" />
                              </React.Fragment>
                           ))
                        ) : (
                           <p className="text-center col-span-2 text-gray-500">There are no comments on this document.</p>
                        )}
                     </div>
                  </ScrollArea>
               </div>
            </Box>
            <Box className="grid gap-8 h-fit px-4 py-6 md:px-8">
               <div className="grid gap-2">
                  <div className="grid ">
                     <h3 className="text-lg md:text-xl text-terciary-main font-semibold">Authors</h3>
                  </div>
                  <div className="grid gap-6">
                     {/* <Button.Button variant="outline" className="px-4 py-3 w-full text-sm">
                     Select Authors for the paper
                     <PlusCircle
                        className="w-4 fill-primary-main 
                     "
                     />
                  </Button.Button> */}
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
                     <h2 className="text-status-yellow font-semibold text-lg">Reviewer</h2>
                     {article?.document.reviewersOnDocuments
                        ?.filter((item) => item.role === 'reviewer')
                        ?.map((item) =>
                           item.approvedStatus === 'APPROVED' ? (
                              <Check key={item.id} className="w-8 h-8 hover:scale-125 transition-all duration-200 fill-status-green cursor-pointer" />
                           ) : (
                              <X key={item.id} className="w-8 h-8 hover:scale-125 transition-all duration-200 fill-status-error cursor-pointer" />
                           )
                        )}
                  </div>
                  <div className="flex items-center">
                     <h2 className="text-terciary-main font-semibold text-lg">Editor</h2>
                     {article?.document.reviewersOnDocuments
                        ?.filter((item) => item.role === 'editor')
                        ?.map((item) =>
                           item.approvedStatus === 'APPROVED' ? (
                              <Check key={item.id} className="w-8 h-8 hover:scale-125 transition-all duration-200 fill-status-green cursor-pointer" />
                           ) : (
                              <X key={item.id} className="w-8 h-8 hover:scale-125 transition-all duration-200 fill-status-error cursor-pointer" />
                           )
                        )}
                  </div>
               </div>

               <Button.Button variant="primary" className="flex items-center" onClick={handleSubmitDocument} loading={submitLoading}>
                  <FileEarmarkText className="w-5 h-5" />
                  Publish document
               </Button.Button>

               <Button.Button variant="outline" className="flex items-center" onClick={handleSaveDocument} loading={saveLoading}>
                  Save
               </Button.Button>
               {documentSaved && <p className="text-lg text-center text-status-green"> Changes saved successfully </p>}
            </Box>
         </div>
      </React.Fragment>
   )
}
