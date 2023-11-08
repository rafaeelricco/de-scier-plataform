import { CommentItemProps } from '@/components/common/Comment/Typing'

export function reducer_comments(StateComments: StateComments, ActionComments: ActionComments): StateComments {
   switch (ActionComments.type) {
      case 'store_comments_from_api':
         const comments = ActionComments.payload as unknown as CommentItemProps[]
         return {
            ...StateComments,
            comments: comments
         }
      case 'add_new_comment':
         const StateComments_comments = StateComments.comments || []
         const new_comment = ActionComments.payload as CommentItemProps

         return {
            ...StateComments,
            comments: [...StateComments_comments, new_comment]
         }
      case 'reject_comment':
         const StateComments_reject_comments = StateComments.comments || []
         const comment = ActionComments.payload as CommentItemProps
         const updated_comments = StateComments_reject_comments.map((item) => {
            if (item.id === comment.id) {
               return comment
            }
            return item
         })
         return {
            ...StateComments,
            comments: updated_comments
         }
      case 'approve_comment':
         const StateComments_approve_comments = StateComments.comments || []
         const comment_approve = ActionComments.payload as CommentItemProps
         const updated_approve_comments = StateComments_approve_comments.map((item) => {
            if (item.id === comment_approve.id) {
               return comment_approve
            }
            return item
         })
         return {
            ...StateComments,
            comments: updated_approve_comments
         }
      default:
         return StateComments
   }
}

export type StateComments = { comments?: CommentItemProps[] | null }

export type ActionComments = {
   type: 'store_comments_from_api' | 'add_new_comment' | 'reject_comment' | 'approve_comment'
   payload: CommentItemProps | null
}

export const comments_initial_state: StateComments = { comments: null }
