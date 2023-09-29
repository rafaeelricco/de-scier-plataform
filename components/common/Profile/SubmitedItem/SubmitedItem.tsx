import React from 'react'

type SubmitedItemProps = {
   id?: number
   title: string
   date: string
   status: 'published' | 'in_review'
}

const SubmitedItem: React.FC<SubmitedItemProps> = ({
   id,
   title,
   date,
   status
}: SubmitedItemProps) => {
   return (
      <div>
         <p className="text-sm">{title}</p>
         <div className="flex items-center justify-between">
            <p className="text-sm text-neutral-light_gray">{date}</p>
            <Badge status={status} />
         </div>
      </div>
   )
}

type BadgeProps = { status: 'published' | 'in_review' }

const Badge: React.FC<BadgeProps> = ({ status }: BadgeProps) => {
   const status_text = status.charAt(0).toUpperCase() + status.slice(1)

   return (
      <React.Fragment>
         {status === 'published' && (
            <div className="bg-[#ECF8E5] py-1 px-2 rounded-[2px]">
               <p className="font-semibold text-sm text-status-green">{status_text}</p>
            </div>
         )}
         {status === 'in_review' && (
            <div className="bg-[#FFF7E7] py-1 px-2 rounded-[2px]">
               <p className="font-semibold text-sm text-status-pending">{status_text}</p>
            </div>
         )}
      </React.Fragment>
   )
}

export default SubmitedItem
