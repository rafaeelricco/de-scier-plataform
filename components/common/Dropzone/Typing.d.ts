import { UseFormSetValue } from 'react-hook-form'

interface DropzoneProps {
   setSelectedFile?: (file: FileWithPreview | null) => void
   error_message?: any
   fileName?: FileWithPreview['name']
   setValue?: UseFormSetValue<any>
   viewSelected?: boolean
   placeholder?: string
   message?: string
   thumbnail?: boolean
}

interface FileWithPreview {
   preview?: string
}

interface BorderProps {
   isDragAccept?: boolean
   isDragReject?: boolean
   isFocused?: boolean
   isDragActive?: boolean
}

interface StoredFile {
   path: string
   name: string
   lastModified: number
   lastModifiedDate: Date
   size: number
   type: string
   preview: string
}

export type { BorderProps, DropzoneProps, FileWithPreview, StoredFile }
