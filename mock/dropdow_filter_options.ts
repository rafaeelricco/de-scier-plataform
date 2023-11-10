export type FilterOption = {
   id: number
   label: string
   value: string
}

export const filter_order_by = [
   {
      id: 1,
      label: 'Newest',
      value: 'newest'
   },
   {
      id: 2,
      label: 'Oldest',
      value: 'oldest'
   },
   {
      id: 3,
      label: 'Most viewed',
      value: 'most_viewed'
   },
   {
      id: 4,
      label: 'Most liked',
      value: 'most_liked'
   }
]

export const filter_status = [
   {
      id: 1,
      label: 'Pending',
      value: 'pending'
   },
   {
      id: 2,
      label: 'Approved',
      value: 'approved'
   },
   {
      id: 3,
      label: 'Final approval pending',
      value: 'final_approved'
   },
   {
      id: 4,
      label: 'Rejected',
      value: 'rejected'
   },
   {
      id: 5,
      label: 'Published',
      value: 'submitted'
   }
]
