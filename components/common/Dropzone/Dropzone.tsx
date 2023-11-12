'use client'
import * as Button from '@components/common/Button/Button'
import Image from 'next/image'
import React from 'react'
import { FileEarmarkText, Upload } from 'react-bootstrap-icons'
import { Accept, useDropzone } from 'react-dropzone'
import { twMerge } from 'tailwind-merge'
import { DropzoneProps, StoredFile } from './Typing'

const Dropzone = React.forwardRef(({ setSelectedFile, setValue, placeholder, message, thumbnail = true, accept }: DropzoneProps) => {
   const [files, setFiles] = React.useState<Array<StoredFile>>([])

   const createFilePreview = (file: StoredFile) => {
      const fileWithPreview = {
         path: file.name,
         name: file.name,
         lastModified: file.lastModified,
         lastModifiedDate: file.lastModifiedDate,
         size: file.size,
         type: file.type,
         preview: URL.createObjectURL(file as unknown as Blob)
      }
      return fileWithPreview
   }

   const handleAcceptedFiles = (acceptedFiles: Array<StoredFile>) => {
      acceptedFiles.forEach((fileWithPreview: StoredFile) => {
         setFiles((prev) => [...prev, fileWithPreview])
      })
      setSelectedFile?.(acceptedFiles[0])
      setValue?.('file.attachment', acceptedFiles[0]?.name as string)
      setValue?.('file.name', acceptedFiles[0]?.name as string)
   }

   const onDrop = (acceptedFiles: Array<File>) => {
      handleAcceptedFiles(acceptedFiles.map((file) => createFilePreview(file as unknown as StoredFile)))
   }
   const allowedExtensions: Record<'images' | 'documents', string[]> = {
      images: ['.jpeg', '.png', '.webp', '.jpg'],
      documents: ['.docx', '.pdf']
   }

   const allowedTypes: Accept = {
      images: ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'],
      documents: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/pdf']
   }

   const getAcceptedMimeTypes = (acceptType: keyof typeof allowedExtensions): Accept => {
      const type = acceptType || 'documents'
      const mimeTypes = allowedTypes[type]
      const extensions = allowedExtensions[type]
      return mimeTypes.reduce<Accept>((acc, mimeType, index) => {
         acc[mimeType] = [extensions[index]]
         return acc
      }, {})
   }

   // get files from dropzone using useDropzone hook
   // see more about useDropzone here: https://react-dropzone.js.org/
   const { getRootProps, getInputProps, isDragAccept, isDragActive, isDragReject, isFocused } = useDropzone({
      onDrop,
      multiple: false,
      accept: getAcceptedMimeTypes(accept || 'documents')
   })
   return (
      <>
         <div>
            <div
               className={twMerge(
                  'grid border-[1px] border-dashed border-blue-light rounded-lg p-4 transition duration-300 ease-in-out items-center bg-[#F1FFFF] py-6 min-h-[140px]',
                  `${thumbnail && 'h-44 w-full p-0'}`
               )}
            >
               <div {...getRootProps({ className: 'dropzone flex flex-col gap-2' })} className="overflow-hidden relative">
                  <input {...getInputProps()} />
                  {files.length === 0 ? (
                     <React.Fragment>
                        <div className="grid justify-items-center gap-4">
                           <div className="grid gap-2">
                              <div>
                                 <p className="text-sm font-semibold text-center">{placeholder || 'Upload article file (.docx)'}</p>
                                 <p className="text-sm font-regular text-center">{message || 'Drop your file here or'}</p>
                              </div>
                              <Button.Button variant="outline" className="py-2 px-6 text-xs sm:text-sm w-fit mx-auto my-0">
                                 <Upload size={18} />
                                 Select a file from my computer
                              </Button.Button>
                           </div>
                        </div>
                     </React.Fragment>
                  ) : (
                     <React.Fragment>
                        <div className="flex flex-col items-center justify-center gap-2">
                           {thumbnail ? (
                              <Image
                                 width={1920}
                                 height={1080}
                                 src={files[0]?.preview}
                                 alt="Thumbnail"
                                 className="w-full h-44 object-cover rounded-md brightness-50"
                              />
                           ) : null}
                           <div className={twMerge('grid gap-2 items-center content-center absolute', `${thumbnail === false && 'relative'}`)}>
                              <div className="grid justify-item-center gap-2 grid-flow-col justify-center items-center">
                                 <FileEarmarkText
                                    className={twMerge('w-4 h-4 sm:w-5 sm:h-5 sm:mb-[2px] fill-white', `${thumbnail === false && 'fill-black'}`)}
                                 />
                                 <p
                                    className={twMerge(
                                       'text-xs sm:text-sm font-semibold text-white text-center',
                                       `${thumbnail === false && 'text-black'}`
                                    )}
                                 >
                                    {files[0]?.name}
                                 </p>
                              </div>
                              <Button.Button
                                 variant="outline"
                                 className={twMerge(
                                    'py-2 px-6 text-sm w-fit mx-auto my-0 border-white text-white hover:bg-transparent',
                                    `${thumbnail === false && 'border-primary-main text-primary-main hover:bg-transparent'}`
                                 )}
                                 onClick={() => {
                                    setFiles([])
                                    setSelectedFile?.(null)
                                    setValue?.('file.attachment', '')
                                    setValue?.('file.name', '')
                                 }}
                              >
                                 Change uploaded file
                                 <Upload className="w-5 h-5" />
                              </Button.Button>
                           </div>
                        </div>
                     </React.Fragment>
                  )}
               </div>
            </div>
         </div>
      </>
   )
})

Dropzone.displayName = 'Dropzone'

export default Dropzone
