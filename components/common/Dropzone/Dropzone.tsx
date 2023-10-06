import * as Button from '@components/common/Button/Button'
import React from 'react'
import { FileEarmarkText, Upload } from 'react-bootstrap-icons'
import { useDropzone } from 'react-dropzone'
import { DropzoneProps, StoredFile } from './Typing'

const Dropzone = React.forwardRef(
   ({ setSelectedFile, setValue, placeholder, message }: DropzoneProps) => {
      const [files, setFiles] = React.useState<Array<StoredFile>>([])

      // function to create file preview
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

      // function to handle accepted files
      const handleAcceptedFiles = (acceptedFiles: Array<StoredFile>) => {
         acceptedFiles.forEach((fileWithPreview: StoredFile) => {
            setFiles((prev) => [...prev, fileWithPreview])
         })
         setSelectedFile?.(acceptedFiles[0])
         setValue?.('file.attachment', acceptedFiles[0]?.name as string)
         setValue?.('file.name', acceptedFiles[0]?.name as string)
      }

      // function to handle files dropped in dropzone
      const onDrop = (acceptedFiles: Array<File>) => {
         //  if (files.length + acceptedFiles.length > 10) {
         //alert('Você pode enviar no máximo 10 arquivos.')
         //return
         //  }
         handleAcceptedFiles(
            acceptedFiles.map((file) => createFilePreview(file as unknown as StoredFile))
         )
      }

      // get files from dropzone using useDropzone hook
      // see more about useDropzone here: https://react-dropzone.js.org/
      const { getRootProps, getInputProps, isDragAccept, isDragActive, isDragReject, isFocused } =
         useDropzone({
            onDrop,
            multiple: false
         })

      return (
         <>
            <div>
               <div className="grid border-[1px] border-dashed border-blue-light bg-[#F1FFFF] rounded-lg p-4 transition duration-300 ease-in-out items-center">
                  <div {...getRootProps({ className: 'dropzone' })}>
                     <input {...getInputProps()} />
                     {files.length === 0 ? (
                        <React.Fragment>
                           <div className="justify-items-center gap-4">
                              <div className="grid gap-2">
                                 <div>
                                    <p className="text-sm font-semibold text-center">
                                       {placeholder || 'Upload Paper File (.docx)'}
                                    </p>
                                    <p className="text-sm font-regular text-center">
                                       {message || 'Drop your file here or'}
                                    </p>
                                 </div>
                                 <Button.Button
                                    variant="outline"
                                    className="py-2 px-4 text-sm w-fit mx-auto my-0"
                                 >
                                    <Upload size={18} />
                                    Select a file from my computer
                                 </Button.Button>
                              </div>
                           </div>
                        </React.Fragment>
                     ) : (
                        <React.Fragment>
                           <div className="grid justify-items-center gap-2">
                              <div className="grid justify-items-center gap-2 grid-flow-col justify-center items-center">
                                 <FileEarmarkText size={18} />
                                 <p className="text-sm font-semibold text-center">
                                    {files[0]?.name}
                                 </p>
                              </div>
                              <Button.Button
                                 variant="outline"
                                 className="px-4 p-2 text-sm w-fit"
                                 onClick={() => {
                                    setFiles([])
                                    setSelectedFile?.(null)
                                    setValue?.('file.attachment', '')
                                    setValue?.('file.name', '')
                                 }}
                              >
                                 Swap uploaded file
                                 <Upload size={18} />
                              </Button.Button>
                           </div>
                        </React.Fragment>
                     )}
                  </div>
               </div>
            </div>
         </>
      )
   }
)

Dropzone.displayName = 'Dropzone'

export default Dropzone