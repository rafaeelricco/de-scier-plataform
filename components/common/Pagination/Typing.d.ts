interface PaginationProps {
   total: number
   current: number
   perPage: number
   handleNextPage: () => void
   handlePreviousPage: () => void
}

export type { PaginationProps }
