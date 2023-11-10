'use client'

import Box from '@/components/common/Box/Box'
import CommentItem from '@/components/common/Comment/Comment'
import { File } from '@/components/common/File/File'
import { YouAreAuthor, YouAreReviwer } from '@/components/common/Flags/Author/AuthorFlags'
import EditComment from '@/components/modules/deScier/Article/EditComment'
import Reasoning from '@/components/modules/deScier/Article/Reasoning'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { header_editor_reviewer } from '@/mock/article_under_review'
import { Author, authors_headers, authors_mock, authorship_headers } from '@/mock/submit_new_document'
import { AddCommentProps, addCommentSchema } from '@/schemas/comments'
import { downloadDocumentVersionService } from '@/services/document/download.service'
import { DocumentGetProps } from '@/services/document/getArticles'
import { addCommentService } from '@/services/reviewer/addComment.service'
import { updateDocumentApproveStatusService } from '@/services/reviewer/approve.service'
import { useArticleToReview } from '@/services/reviewer/fetchDocuments.service'
import { updateCommentService } from '@/services/reviewer/updateComment.service'
import { ActionComments, comments_initial_state, reducer_comments } from '@/states/reducer_comments'
import { truncate } from '@/utils/format_texts'
import { keywordsArray } from '@/utils/keywords_format'
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
import { ArrowLeft, Check, PlusCircleDotted, X } from 'react-bootstrap-icons'
import { CurrencyInput } from 'react-currency-mask'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { twMerge } from 'tailwind-merge'

export default function AsReviwerPageDetails({ params }: { params: { slug: string } }) {
   const router = useRouter()
   const { data } = useSession()
   const { fetch_article } = useArticleToReview()

   const [state, dispatch] = useReducer(reducer_comments, comments_initial_state)
   console.log('state', state)

   const [article, setArticle] = React.useState<DocumentGetProps | null>(null)
   console.log(article)
   const [items, setItems] = React.useState(authors_mock)
   const [authors, setAuthors] = React.useState<Author[]>(authors_mock)
   const [access_type, setAccessType] = React.useState('open-access')
   const [authorship_settings, setAuthorshipSettings] = React.useState<Author>()
   const [popover, setPopover] = React.useState({ copy_link: false })
   const [dialog, setDialog] = React.useState({ author: false, share_split: false, edit_author: false, reasoning: false, edit_comment: false })
   const [chartError, setChartError] = React.useState<boolean>(false)
   const [buttonLoading, setButtonLoading] = React.useState({
      comment: false
   })

   const fetchSingleArticle = async (documentId: string) => {
      await fetch_article(documentId).then((res) => {
         if (res?.document?.documentComments && res?.document?.documentComments.length > 0) {
            // Crie um array com todos os comentários mapeados para o formato esperado pelo reducer
            const commentsPayload = res.document.documentComments.map((comment) => ({
               id: comment.id,
               comment_author: comment.user.name,
               comment_content: comment.comment,
               reason: comment.authorComment,
               status: comment.approvedByAuthor as 'PENDING' | 'APPROVED' | 'REJECTED'
            }))

            // Despache uma única ação com todos os comentários
            dispatch({
               type: 'store_comments_from_api',
               payload: commentsPayload
            } as ActionComments)
         }

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

   const [loading, setLoading] = React.useState(false)
   const [is_author, setIsAuthor] = React.useState(false)

   const handleApproveDocument = async (approve: boolean) => {
      setLoading(true)
      const response = await updateDocumentApproveStatusService({
         documentId: article?.document.id!,
         approve
      })

      setLoading(false)
      if (!response.success) {
         toast.error(response.message)
         return
      }

      const status = approve ? 'approved' : 'rejected'
      toast.success(`Document ${status} successgully`)
   }

   const handleAddComment = async () => {
      setButtonLoading({
         comment: true
      })
      const response = await addCommentService({
         documentId: article?.document.id!,
         comment: getValues('comment')
      })

      setButtonLoading({
         comment: false
      })

      if (!response.success) {
         toast.error(response.message)
         return
      }

      dispatch({
         type: 'add_new_comment',
         payload: {
            id: uniqueId(watch('comment') + '_'),
            comment_author: data?.user?.name,
            comment_content: watch('comment'),
            status: 'PENDING'
         }
      } as ActionComments)

      setValue('comment', '')
   }

   const handleEditComment = async (commentId: string, newComment: string) => {
      setButtonLoading({
         comment: true
      })
      const response = await updateCommentService({
         commentId: commentId,
         comment: newComment
      })

      setButtonLoading({
         comment: false
      })

      if (!response.success) {
         toast.error(response.message)
         return
      }

      dispatch({
         type: 'update_comment',
         payload: {
            id: commentId as string,
            comment_author: data?.user?.userInfo.name as string,
            status: 'PENDING' as 'PENDING' | 'APPROVED' | 'REJECTED',
            comment_content: newComment
         }
      } as ActionComments)

      setValue('comment', '')
   }

   const getReviewStatus = () => {
      const review = article?.document.reviewersOnDocuments?.find((item) => item.reviewerEmail === data?.user?.email)
      return review?.approvedStatus || 'PENDING'
   }

   const handleDownloadDocument = async (fileId: string, filename: string) => {
      console.log('download...')
      const response = await downloadDocumentVersionService({
         documentId: article?.document.id!,
         fileId,
         userId: data?.user?.userInfo.id!
      })

      if (!response.success) {
         toast.error(response.message)
         return
      }

      const url = URL.createObjectURL(response.file!)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      link.click()
      URL.revokeObjectURL(url)

      toast.success('Download will start...')
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
         try {
            mermaid.initialize({ startOnLoad: false })
            await mermaid.run({ querySelector: '.mermaid' }).catch((error) => {
               console.log('Erro ao renderizar o Mermaid: ', error)
               setChartError(true)
            })
         } catch (error) {
            console.error('Erro ao renderizar o Mermaid: ', error)
            setChartError(true)
         }
      }

      if (article?.document.abstractChart) {
         runMermaid()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [article?.document.abstractChart])

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
   } = useForm<AddCommentProps>({
      resolver: zodResolver(addCommentSchema),
      values: {
         comment: '',
         documentId: article?.document.id || ''
      }
   })
   return (
      <React.Fragment>
         <Dialog.Root open={dialog.reasoning || dialog.edit_comment}>
            <Dialog.Overlay />
            <Dialog.Content className="py-14 px-16 max-w-[600px]">
               {dialog.reasoning && (
                  <Reasoning
                     message={state.comment_to_edit?.reason || ''}
                     documentAuthor={article?.document.user?.name}
                     onClose={() => setDialog({ ...dialog, reasoning: false })}
                     onConfirm={() => setDialog({ ...dialog, reasoning: false })}
                  />
               )}
               {dialog.edit_comment && (
                  <EditComment
                     comment={state.comment_to_edit?.comment_content as string}
                     onConfirm={(value) => {
                        handleEditComment(state.comment_to_edit?.id!, value)

                        setDialog({ ...dialog, edit_comment: false })
                        dispatch({ type: 'comment_to_edit', payload: null })
                     }}
                     onClose={() => setDialog({ ...dialog, edit_comment: false })}
                  />
               )}
            </Dialog.Content>
         </Dialog.Root>
         <div className="grid gap-8">
            <div className="flex items-center gap-4">
               <ArrowLeft size={32} className="hover:scale-110 transition-all cursor-pointer" onClick={() => router.back()} />
               <h1 className="text-1xl font-semibold">Article in review</h1>
            </div>
            <Box className="grid gap-8 h-fit py-6 px-8">
               {loading ? (
                  <Skeleton className="flex items-center gap-2 w-72 py-1 px-3 rounded-md h-7" />
               ) : (
                  <React.Fragment>{is_author ? <YouAreAuthor /> : <YouAreReviwer />}</React.Fragment>
               )}
               <div className="grid grid-cols-2 gap-6">
                  <div className="grid grid-cols-1">
                     <span className="text-sm font-semibold">Title</span>
                     <span className="text-sm">{article?.document?.title}</span>
                  </div>

                  <div className="grid gap-2">
                     <p className="text-sm font-semibold">Add keywords</p>
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
                  <p className="text-sm font-regular">{article?.document.documentType}</p>
               </div>

               <div className="grid gap-2">
                  <h3 className="text-sm font-semibold">Abstract</h3>
                  <p className="text-sm font-regular">{article?.document.abstract}</p>
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
                  <p className="text-sm font-semibold">Last updated on 29/09/2023 - 14:34</p>
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
                                    onDownload={() => {
                                       handleDownloadDocument(file.id, file.fileName!)
                                    }}
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
               <div className="grid gap-6">
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
                                       onEdit={() => {
                                          dispatch({
                                             type: 'comment_to_edit',
                                             payload: {
                                                id: comment.id,
                                                comment_author: comment.comment_author,
                                                comment_content: comment.comment_content,
                                                status: 'PENDING'
                                             }
                                          } as ActionComments)
                                          setDialog({ ...dialog, edit_comment: true })
                                       }}
                                       onSeeReasoning={() => {
                                          dispatch({
                                             type: 'comment_to_edit',
                                             payload: {
                                                id: comment.id,
                                                comment_author: comment.comment_author,
                                                comment_content: comment.comment_content,
                                                reason: comment.reason,
                                                status: 'REJECTED'
                                             }
                                          } as ActionComments)
                                          setDialog({ ...dialog, reasoning: true })
                                       }}
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
                  <div className="flex items-center gap-4">
                     <div className="flex-grow">
                        <Input.Root>
                           <Input.Input
                              className="border p-2 rounded-md focus:border-primary-main"
                              placeholder="Type your comment"
                              {...register('comment')}
                           />
                        </Input.Root>
                     </div>
                     <Button.Button className="px-4 py-2 h-[43px]" onClick={handleAddComment} loading={buttonLoading.comment}>
                        Add commentss
                     </Button.Button>
                  </div>
               </div>
            </Box>
            <Box className="grid gap-8 h-fit py-6 px-8">
               <div className="grid ">
                  <h3 className="text-xl text-terciary-main font-semibold lg:text-lg 2xl:text-xl">Authors</h3>
               </div>
               <div className="grid gap-6">
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
                           {article?.document.authorsOnDocuments?.map((item, index) => (
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
                                       <p className="text-sm text-secundary_blue-main">{item.author?.title}</p>
                                    </div>
                                    <div>
                                       <p className="text-sm text-secundary_blue-main">{item.authorEmail}</p>
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
                        <div className="max-w-[400px]">
                           <p className="text-sm font-semibold text-blue-500 underline truncate ..." id="link-to-copy">
                              {article?.document.reviewerInviteLink}
                           </p>
                        </div>
                        <HoverCard open={popover.copy_link}>
                           <HoverCardTrigger>
                              <Button.Button variant="outline" className="px-4 py-1 text-sm w-fit" onClick={copyToClipboard}>
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
                     {article?.document.reviewersOnDocuments?.map((item, index) => (
                        <div key={item.id}>
                           <div className="grid grid-cols-5  items-center px-0 py-3 rounded-md">
                              <div className="flex items-center gap-4">
                                 <div>
                                    <p className="text-sm text-secundary_blue-main">{item.reviewer.name}</p>
                                 </div>
                              </div>
                              <div>
                                 <p className="text-sm text-secundary_blue-main">{item.reviewer.title}</p>
                              </div>
                              <div>
                                 <p className="text-sm text-secundary_blue-main">{truncate(item.reviewerEmail, 16)}</p>
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
                                       'text-sm text-secundary_blue-main font-semibold border py-[2px] px-1 text-center rounded-md md:border-none md:py-0 md:px-0 md:rounded-none md:text-start first-letter:uppercase lowercase',
                                       `${item.inviteStatus == 'PENDING' && 'text-status-pending'}`,
                                       `${item.inviteStatus == 'APPROVED' && 'text-status-green'}`
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
               {getReviewStatus() === 'PENDING' && (
                  <h3 className="text-lg font-semibold text-status-pending flex justify-center">Your approval is still pending</h3>
               )}
               {getReviewStatus() === 'REJECTED' && (
                  <h3 className="text-lg font-semibold text-status-error flex justify-center">Your rejected the document</h3>
               )}
               {getReviewStatus() === 'APPROVED' && (
                  <h3 className="text-lg font-semibold text-status-green flex justify-center">Your approved the document</h3>
               )}

               <div className="flex items-center justify-center gap-12">
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
               {getReviewStatus() !== 'APPROVED' && (
                  <>
                     <Button.Button variant="primary" className="flex items-center" onClick={() => handleApproveDocument(true)} loading={loading}>
                        <Check className="w-5 h-5" />
                        Approve document
                     </Button.Button>
                  </>
               )}
               {getReviewStatus() === 'APPROVED' && (
                  <>
                     <Button.Button
                        variant="primary"
                        disabled
                        className="flex items-center bg-status-disable_bg text-status-disable_text"
                        onClick={() => handleApproveDocument(true)}
                        loading={loading}
                     >
                        <Check className="w-5 h-5" />
                        Approve document
                     </Button.Button>
                  </>
               )}
            </Box>
         </div>
      </React.Fragment>
   )
}
