import { formatDate } from '@/utils/date_format'
import React from 'react'
import { Download, FileEarmarkText } from 'react-bootstrap-icons'
import { FileProps } from './Typing'

/**
 * @title File Component
 * @notice Handles the display and download functionality for a single file.
 * @dev This component takes in file properties and renders UI for file information and download option.
 */
const File: React.FC<FileProps> = ({ file_name, onDownload, uploaded_at, uploaded_by }: FileProps) => {
   return (
      <React.Fragment>
         <div className="flex justify-between items-center">
            <div className="grid grid-flow-col justify-start gap-4 items-center">
               <FileEarmarkText className="w-6 h-6" />
               <div>
                  <p className="text-sm font-semibold select-none">{file_name}</p>
                  <p className="text-xs font-regular select-none">
                     Uploaded in {formatDate(uploaded_at)} by {uploaded_by}
                  </p>
               </div>
            </div>
            <button onClick={onDownload}>
               <Download className="w-5 h-5 cursor-pointer hover:text-status-green transition-all duration-200 ease-out" />
            </button>
         </div>
      </React.Fragment>
   )
}

export { File }
