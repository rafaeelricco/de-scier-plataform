interface CommentItemProps {
   id?: string
   comment_author: string
   comment_content: string
   status?: 'PENDING' | 'APPROVED' | 'REJECTED'
   onApprove?: () => void
   onReject?: () => void
   onEdit?: () => void
   onSeeReasoning?: () => void
}

export { CommentItemProps }
