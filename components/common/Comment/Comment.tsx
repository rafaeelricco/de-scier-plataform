import React from 'react'
import { Check, X } from 'react-bootstrap-icons'

interface CommentItemProps {
   id?: string
   comment_author: string
   comment_content: string
   onApprove?: () => void
   onReject?: () => void
}

const CommentItem: React.FC<CommentItemProps> = ({
   comment_author,
   comment_content,
   id,
   onApprove,
   onReject
}: CommentItemProps) => {
   return (
      <React.Fragment>
         <div className="grid gap-2">
            <div className="flex justify-between items-center">
               <p className="text-base font-semibold">{comment_author}</p>
               <div className="flex items-center">
                  <div onClick={onReject}>
                     <X className="w-6 h-6 hover:scale-125 transition-all duration-200 fill-status-error cursor-pointer" />
                  </div>
                  <div onClick={onApprove}>
                     <Check className="w-6 h-6 hover:scale-125 transition-all duration-200 fill-status-green cursor-pointer" />
                  </div>
               </div>
            </div>
            <div>
               <p className="text-sm">{comment_content}</p>
            </div>
            <hr className="divider-h mt-1" />
         </div>
      </React.Fragment>
   )
}

export default CommentItem
