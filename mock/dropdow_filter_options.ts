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

export const filter_access = [
   {
      id: 1,
      label: 'Open',
      value: 'open'
   },
   {
      id: 2,
      label: 'Paid',
      value: 'paid'
   }
]

export const filter_document_type = [
   {
      id: 1,
      label: 'Manuscript',
      value: 'manuscript'
   },
   {
      id: 2,
      label: 'Paper',
      value: 'paper'
   },
   {
      id: 3,
      label: 'Report',
      value: 'report'
   },
   {
      id: 4,
      label: 'Review',
      value: 'review'
   },
   {
      id: 5,
      label: 'Conference abstract',
      value: 'conference abstract'
   }
]

export const filter_field = [
   {
      id: 1,
      label: 'Biology',
      value: 'biology'
   },
   {
      id: 2,
      label: 'Technology',
      value: 'technology'
   },
   {
      id: 3,
      label: 'Mathematics',
      value: 'mathematics'
   },
   {
      id: 4,
      label: 'Physics',
      value: 'physics'
   },
   {
      id: 5,
      label: 'Chemistry',
      value: 'chemistry'
   }
]
