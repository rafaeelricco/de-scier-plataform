'use client'

import { AuthorsListDragabble } from '@/components/common/AuthorsListDraggable/AuthorsListDraggable'
import Box from '@/components/common/Box/Box'
import { NewAuthor } from '@/components/modules/Summary/NewArticle/Authors/NewAuthor'
import { access_type_options } from '@/mock/access_type'
import { article_categories } from '@/mock/article_category'
import { article_types } from '@/mock/article_type'
import { Author, authors_headers, authorship_headers } from '@/mock/submit_new_document'
import { home_routes } from '@/routes/home'
import { AuthorProps, CreateDocumentProps, CreateDocumentSchema } from '@/schemas/create_document'
import { submitNewDocumentService } from '@/services/document/submit.service'
import { uploadDocumentFileService } from '@/services/file/file.service'
import { ErrorMessage } from '@/utils/error_message'
import * as Button from '@components/common/Button/Button'
import * as Dialog from '@components/common/Dialog/Digalog'
import * as Input from '@components/common/Input/Input'
import * as Title from '@components/common/Title/Page'
import * as Tooltip from '@components/common/Tooltip/Tooltip'
import { zodResolver } from '@hookform/resolvers/zod'
import { uniqueId } from 'lodash'
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Clipboard, Pencil, PlusCircle, PlusCircleDotted, Trash, X } from 'react-bootstrap-icons'
import { CurrencyInput } from 'react-currency-mask'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { twMerge } from 'tailwind-merge'

const Dropzone = dynamic(() => import('@/components/common/Dropzone/Dropzone'), { ssr: false })

export default function SubmitNewPaperPage() {
   const router = useRouter()
   const { data: session, update: updateSession } = useSession()

   const [loading, setLoading] = useState(false)
   const [dialog, setDialog] = useState({ author: false, share_split: false, edit_author: false, edit_share_split: false })
   const [access_type, setAccessType] = useState('open-access')
   const [share, setShare] = useState('')
   const [wallet, setWallet] = useState('')
   const [authors, setAuthors] = useState<Author[]>([])
   console.log('authors', authors)
   const [edit_share_split, setEditShare] = useState<Author | null>()
   const [authorship_settings, setAuthorshipSettings] = useState<Author>()
   const [author_to_edit, setAuthorToEdit] = useState<Author | undefined>(undefined)
   const [keywords_temp, setKeywordsTemp] = useState<string | undefined>()
   const [abstractChart, setAbstractChart] = useState<string>('')

   const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
      setValue,
      trigger,
      getValues,
      control,
      setError
   } = useForm<CreateDocumentProps>({
      resolver: zodResolver(CreateDocumentSchema),
      defaultValues: {
         abstract: '',
         abstractChart: '',
         accessType: 'FREE',
         documentType: '',
         field: '',
         price: '0',
         title: '',
         file: {
            lastModified: 0,
            lastModifiedDate: new Date(),
            name: '',
            path: '',
            preview: '',
            size: 0,
            type: ''
         },
         cover: {
            lastModified: 0,
            lastModifiedDate: new Date(),
            name: '',
            path: '',
            preview: '',
            size: 0,
            type: ''
         },
         category: '',
         authors: [{}],
         keywords: []
      }
   })

   console.log('watch', watch())

   const { append, remove, fields: keywords } = useFieldArray({ name: 'keywords', control: control })

   const onReorder = (newOrder: typeof authors) => setAuthors((prevItems) => [...newOrder])

   const handleSubmitDocument: SubmitHandler<CreateDocumentProps> = async (data) => {
      setLoading(true)
      const requestData = {
         abstract: data.abstract,
         accessType: access_type === 'open-access' ? 'FREE' : 'PAID',
         documentType: data.documentType,
         field: data.field,
         price: access_type === 'open-access' ? 0 : Number(data.price),
         title: data.title,
         abstractChart: abstractChart,
         keywords: data.keywords.map((item) => item.name),
         category: data.category
      }

      const documentAuthors = authors.map((item) => ({
         email: item.email,
         name: item.name,
         revenuePercent: access_type === 'open-access' ? 0 : Number(item.share?.substring(0, item.share.length - 1)) || 0,
         title: item.title,
         walletAddress: item.wallet || ''
      }))

      const response = await submitNewDocumentService({
         ...requestData,
         abstract: data.abstract || '',
         authors: documentAuthors
      })

      if (!response.success) {
         toast.error(response.message)
         setLoading(false)
         return
      }

      const uploadDocumentSuccess = await uploadDocumentFileService({
         documentId: response.documentId,
         fileLocalUrl: watch('file').preview,
         filename: watch('file').name,
         mimetype: watch('file').type
      })

      if (!uploadDocumentSuccess) {
         toast.warning('There was an error uploading your file. But you can upload later.')
      }

      const uploadCoverSuccess = await uploadDocumentFileService({
         documentId: response.documentId,
         fileLocalUrl: watch('cover').preview,
         filename: watch('cover').name,
         mimetype: watch('cover').type
      })

      if (!uploadCoverSuccess) {
         toast.warning('There was an error uploading your cover file. But you can upload later.')
      }

      if (response.success) {
         toast.success(response.message)
         router.push(home_routes.articles_under_review)
         setLoading(false)
      }
   }

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

   useEffect(() => {
      if (session?.user) {
         const author = {
            id: uniqueId('author_'),
            email: session?.user?.email,
            name: session?.user?.userInfo.name,
            revenuePercent: '0',
            title: session?.user?.userInfo.title || '',
            walletAddress: session?.user?.userInfo.walletAddress || ''
         }
         setValue('authors', [author])
         setAuthors([author])
      }
   }, [session?.user, setValue])

   const calculateRemainingShare = (currentAuthorId: string, newAuthorShare: string) => {
      const newShareValue = parseFloat(newAuthorShare.replace('%', ''))
      console.log('newShareValue', authors.length === 1 && getValues('authors').length === 1)

      if (authors.length === 1 && getValues('authors').length === 1) {
         setAuthors(authors.map((author) => ({ ...author, share: '100%' })))
      } else {
         let totalShared = newShareValue

         const updatedAuthors = authors.map((author) => {
            if (author.id === currentAuthorId) {
               return { ...author, share: `${newShareValue}%` }
            } else {
               if (!author.share) return author
               totalShared += parseFloat(author.share.replace('%', ''))
               return author
            }
         })

         if (totalShared > 100) {
            updatedAuthors.forEach((author) => {
               if (author.id !== currentAuthorId) {
                  const currentShare = parseFloat(author.share!.replace('%', ''))
                  const adjustedShare = currentShare - (totalShared - 100)
                  author.share = `${adjustedShare}%`
               }
            })
         }

         setAuthors(updatedAuthors)
         setValue('authors', [...updatedAuthors])
         setEditShare(null)
      }
   }

   const onSaveShareSettings = () => {
      if (edit_share_split && share) {
         const shareValue = parseInt(share.replace('%', ''))

         if (shareValue <= 100) {
            calculateRemainingShare(edit_share_split.id, share)
         } else {
            console.error('Share value cannot be more than 100%')
         }

         setDialog({ ...dialog, share_split: false, edit_author: false })
         setEditShare(null)
      }
   }

   useEffect(() => {
      if (authors.length === 1 && authors[0].share !== '100%') {
         const updatedAuthors = [{ ...authors[0], share: '100%' }]

         setAuthors(updatedAuthors)
         setValue('authors', updatedAuthors)
      }
   }, [authors, setValue])

   return (
      <React.Fragment>
         <Dialog.Root open={dialog.author || dialog.share_split || dialog.edit_author || dialog.edit_share_split}>
            <Dialog.Overlay />
            <Dialog.Content className={twMerge('md:px-16 md:py-14 pb-20')}>
               {dialog.author && (
                  <NewAuthor
                     onAddAuthor={(value) => {
                        const newAuthor: AuthorProps = {
                           id: value.id,
                           name: value.name,
                           title: value.title,
                           email: value.email,
                           revenuePercent: value.revenuePercent
                        }
                        setAuthors((prevItems) => [...prevItems, newAuthor])
                        setValue('authors', [...authors, newAuthor])
                     }}
                     onClose={() => setDialog({ ...dialog, author: false })}
                  />
               )}
               {dialog.edit_author && (
                  <NewAuthor
                     onEditAuthor={author_to_edit}
                     onUpdateAuthor={(updatedAuthor) => {
                        setAuthors((prevItems) => {
                           return prevItems.map((item) => (item.id === author_to_edit?.id ? { ...item, ...updatedAuthor } : item))
                        })
                     }}
                     onClose={() => setDialog({ ...dialog, edit_author: false })}
                  />
               )}
               {dialog.share_split && (
                  <React.Fragment>
                     <div className="grid gap-6">
                        <Dialog.Title title="Share split" onClose={() => setDialog({ ...dialog, share_split: false })} />
                        <div className="grid gap-6">
                           <div className="flex items-center gap-6">
                              <Input.Root>
                                 <Input.Label>Share</Input.Label>
                                 <Input.Percentage
                                    defaultValue={edit_share_split?.share?.replace('%', '') || undefined}
                                    placeholder="% of the revenue"
                                    onValueChange={(value) => {
                                       setShare(value as string)
                                    }}
                                 />
                              </Input.Root>
                              <Input.Root>
                                 <Input.Label optional>Wallet</Input.Label>
                                 <Input.Input
                                    defaultValue={edit_share_split?.wallet || undefined}
                                    placeholder="Crypto wallet adress to recieve the revenue"
                                    onChange={(e) => setWallet(e.target.value)}
                                 />
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
                                 updatedAuthors[authorIndex].share = share.includes('%') ? share : share + '%'
                                 updatedAuthors[authorIndex].wallet = wallet
                                 setAuthors(updatedAuthors)

                                 onSaveShareSettings()
                              }}
                           >
                              Add share split
                           </Button.Button>
                        </div>
                     </div>
                  </React.Fragment>
               )}
            </Dialog.Content>
         </Dialog.Root>
         <Title.Root>
            <Title.Title>Submit new article</Title.Title>
         </Title.Root>
         <form onSubmit={handleSubmit(handleSubmitDocument)} className="grid gap-6 pb-14">
            <Box className="grid gap-8 h-fit px-4 py-6 md:px-8">
               <div className="grid gap-x-6 gap-y-4">
                  <div className="grid md:grid-cols-2 items-start gap-6">
                     <Input.Root>
                        <Input.Label className="flex gap-2 items-center">
                           <span className="text-sm font-semibold">Title</span>
                           <span className="text-sm text-neutral-light_gray">up to 15 words</span>
                        </Input.Label>
                        <Input.Input placeholder="Title of the article" {...register('title')} />
                        <Input.Error>{errors.title?.message}</Input.Error>
                     </Input.Root>
                     <Input.Root>
                        <Input.Label
                           className="text-sm font-semibold"
                           tooltip_message="Add up to 5 keywords that best describe the content and focus of your document. This helps others discover your work."
                        >
                           Add keywords
                        </Input.Label>
                        <Input.Input
                           placeholder="Title of the article"
                           value={keywords_temp}
                           onKeyDown={(e) => handleKeyDown(e)}
                           onInput={(e) => setKeywordsTemp(e.currentTarget.value)}
                           end
                           icon={
                              <React.Fragment>
                                 <Button.Button
                                    type="button"
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
                           {keywords.map((keyword, index) => (
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
                  <div className="grid md:grid-cols-2 items-start gap-6">
                     <Input.Root>
                        <Input.Label className="flex gap-2 items-center">
                           <span className="text-sm  font-semibold">Field</span>
                           <span className="text-sm text-neutral-light_gray">0/300 characters</span>
                        </Input.Label>
                        <Input.Input placeholder="Title of the field" {...register('field')} />
                        <Input.Error>{errors.field?.message}</Input.Error>
                     </Input.Root>
                  </div>
               </div>
               <div className="grid md:grid-cols-2 items-start gap-6">
                  <Input.Root>
                     <Input.Select
                        label={'Article category'}
                        options={article_categories}
                        placeholder="Select a category"
                        onValueChange={(value) => {
                           setValue('category', value), trigger('category')
                        }}
                     />
                     <Input.Error>{errors.documentType?.message}</Input.Error>
                  </Input.Root>
                  <Input.Root>
                     <Input.Select
                        label={'Article type'}
                        options={article_types}
                        placeholder="Select the article type"
                        onValueChange={(value) => {
                           setValue('documentType', value), trigger('documentType')
                        }}
                     />
                     <Input.Error>{errors.documentType?.message}</Input.Error>
                  </Input.Root>
               </div>
               <div className="flex flex-col gap-2">
                  <Dropzone
                     accept="documents"
                     placeholder="Upload document file (.docx)"
                     thumbnail={false}
                     setSelectedFile={(file) => {
                        if (file) {
                           setValue('file', file)
                           trigger('file')
                        }
                     }}
                  />
                  <div className="flex w-full justify-center">
                     <Input.Error>
                        {ErrorMessage({
                           error: errors.file?.name?.type,
                           message: 'File is required.'
                        })}
                     </Input.Error>
                  </div>
               </div>
               <Input.Root>
                  <Input.Label className="flex gap-2 items-center">
                     <span className="text-sm font-semibold">Abstract</span>
                     <span className="text-sm text-neutral-light_gray">up to 250 words</span>
                     <span className="text-sm text-neutral-light_gray italic">Optional</span>
                  </Input.Label>
                  <Input.TextArea {...register('abstract')} rows={4} placeholder="Type your abstract" />
                  <Input.Error>{errors.abstract?.message}</Input.Error>
               </Input.Root>
               <div className="grid gap-4">
                  <p className="text-sm font-semibold">Cover</p>
                  <Dropzone
                     accept="images"
                     placeholder="Upload cover picture (.png, .jpg)"
                     setSelectedFile={(file) => {
                        if (file) {
                           setValue('cover', file)
                           trigger('cover')
                        }
                     }}
                  />
                  <div className="flex justify-center w-full">
                     <Input.Error>
                        {ErrorMessage({
                           error: errors.cover?.type,
                           message: 'Cover is required.'
                        })}
                     </Input.Error>
                  </div>
               </div>
            </Box>
            <Box className="grid gap-8 h-fit px-4 py-6 md:px-8">
               <div className="grid gap-2">
                  <div className="grid">
                     <h3 className="text-lg md:text-xl text-terciary-main font-semibold">Authorship</h3>
                  </div>
                  <div className="grid gap-6">
                     <Button.Button
                        type="button"
                        variant="outline"
                        className="px-4 py-3 w-full text-sm"
                        onClick={() => {
                           setDialog({ ...dialog, author: true })
                        }}
                     >
                        Add authors for this paper
                        <PlusCircle className="w-4 fill-primary-main" />
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
                        <AuthorsListDragabble
                           article={null}
                           authors={authors}
                           onReorder={onReorder}
                           onDelete={(item) => {
                              const new_list = authors.filter((author) => author.id !== item.id)
                              setAuthors(new_list)
                              setValue('authors', new_list)
                           }}
                           onEdit={(item) => {
                              setAuthorToEdit(item as AuthorProps)
                              setDialog({ ...dialog, edit_author: true })
                           }}
                        />
                     </div>
                  </div>
               </div>
            </Box>
            <Box className="grid gap-8 h-fit px-4 py-6 md:px-8">
               <div className="grid gap-4">
                  <div className="grid gap-2">
                     <h3 className="text-lg md:text-xl text-primary-main font-semibold">Editors / Reviewers</h3>
                     <p className="text-sm">
                        Article approval requirements vary according to the article type: typically, you will need the endorsement of at least one Editor
                        and, depending on the type, one or two Reviewers. Editors and Reviewers cannot be Authors. After submitting your article for
                        review, you will be able to send Reviewers an invitation to join this platform via a link that will be automatically generated.
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
                  <h3 className="text-lg md:text-xl text-status-green font-semibold">Access type</h3>
                  <p className="text-sm">
                     Decide if the project is <span className="text-[#53AA22] font-semibold">Open Access</span>,{' '}
                     <span className="text-[#AE66E6] font-semibold">Paid Access</span>
                  </p>
               </div>
               <div className="grid md:grid-cols-2 items-start gap-6">
                  <Input.Root>
                     <Input.Select
                        label={'Type of access'}
                        placeholder="Select if Open or Paid Acess"
                        onValueChange={(value) => {
                           const value_access = value as unknown as CreateDocumentProps['accessType']

                           if (value_access === 'FREE') {
                              setAccessType(value)
                              setAuthorshipSettings(undefined)
                              setAuthors(authors.map((author) => ({ ...author, share: '0%' })))
                           } else {
                              setAccessType(value)
                           }
                        }}
                        value={access_type}
                        options={access_type_options}
                     />
                  </Input.Root>
                  {access_type == 'open-access' && (
                     <Input.Root>
                        <Input.Label className="text-neutral-gray text-sm font-semibold pl-2">Total value</Input.Label>
                        <Input.Input disabled placeholder="R$" />
                     </Input.Root>
                  )}
                  {access_type == 'paid-access' && (
                     <React.Fragment>
                        <Input.Root>
                           <Input.Label className="text-sm font-semibold">Price</Input.Label>
                           <CurrencyInput
                              currency="USD"
                              onChangeValue={(event, originalValue, maskedValue) => setValue('price', originalValue.toString())}
                              InputElement={<Input.Input placeholder="$10" />}
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
                              <div className="flex items-center justify-start gap-2" key={index}>
                                 <p className="text-sm font-semibold">{header.label}</p>
                                 {header.tooltip && <Tooltip.Information content={header.tooltip} />}
                              </div>
                           ))}
                        </div>
                        <div className="grid gap-4">
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
                                                   setEditShare(author)
                                                }}
                                             >
                                                Add authorship settings
                                                <PlusCircleDotted size={18} className="fill-primary-main" />
                                             </Button.Button>
                                          )}
                                       </div>
                                       <div className="w-full flex items-center justify-between">
                                          <p className="text-base text-center text-black w-8">{author.wallet || '-'}</p>
                                          <div className="flex items-center gap-2">
                                             <Trash
                                                size={20}
                                                className=" fill-status-error hover:scale-110 transition-all duration-200 cursor-pointer"
                                                onClick={() => {
                                                   const author_whitout_share = authors.filter((item) => item.id !== author.id)

                                                   const author_updated: AuthorProps = {
                                                      email: author.email,
                                                      id: author.id,
                                                      name: author.name,
                                                      title: author.title,
                                                      revenuePercent: '0',
                                                      walletAddress: author.wallet || ''
                                                   }

                                                   setAuthors((prevItems) => [...author_whitout_share, author_updated])
                                                }}
                                             />
                                             <Pencil
                                                size={20}
                                                className=" fill-primary-main hover:scale-110 transition-all duration-200 cursor-pointer"
                                                onClick={() => {
                                                   setEditShare(author)
                                                   setDialog({ ...dialog, share_split: true })
                                                }}
                                             />
                                          </div>
                                       </div>
                                    </div>
                                    <hr className="divider-h" />
                                 </React.Fragment>
                              ))}
                           </div>
                           <div className="grid grid-cols-3">
                              <p className="text-sm font-regular">Total authorship</p>
                              {authors.length > 0 && (
                                 <React.Fragment>
                                    <p className="text-sm font-regular">
                                       {authors.reduce((acc, author) => {
                                          return acc + (author.share ? parseFloat(author.share.replace('%', '')) : 0)
                                       }, 0)}
                                       %
                                    </p>
                                 </React.Fragment>
                              )}
                           </div>
                        </div>
                     </div>
                  </React.Fragment>
               )}
            </Box>
            <Button.Button type="submit" variant="primary" loading={loading}>
               Submit article for review
               <Clipboard className="w-5" />
            </Button.Button>
         </form>
      </React.Fragment>
   )
}
