import CommentItem from '@/components/common/Comment/Comment'
import { ScrollArea } from '@/components/ui/scroll-area'
import { DocumentGetProps } from '@/services/document/getArticles'
import { comments_initial_state, reducer_comments } from '@/states/reducer_comments'
import React, { useReducer } from 'react'
import { CommentItemProps } from '../Comment/Typing'

export const CommentsList: React.FC<EditorReviewListProps> = ({ article, onApprove, onReject, onSeeReasoning }: EditorReviewListProps) => {
   const [state, dispatch] = useReducer(reducer_comments, comments_initial_state)
   return (
      <React.Fragment>
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
                                 onApprove && onApprove(comment)
                              }}
                              onReject={() => {
                                 onReject && onReject(comment)
                              }}
                              onSeeReasoning={() => {
                                 onSeeReasoning && onSeeReasoning(comment)
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
      </React.Fragment>
   )
}
interface EditorReviewListProps {
   article: DocumentGetProps | null
   onApprove: (comment: CommentItemProps) => void
   onReject?: (comment: CommentItemProps) => void
   onSeeReasoning?: (comment: CommentItemProps) => void
}
