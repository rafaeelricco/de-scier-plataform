import { useEffect, useState } from 'react'
import { CaretLeft, CaretRight } from 'react-bootstrap-icons'
import { PaginationProps } from './Typing'

export default function PaginationComponent({
   total,
   current,
   perPage,
   handleNextPage,
   handlePreviousPage
}: PaginationProps) {
   // States for pagination component
   const [totalRecords, setTotalRecords] = useState(total)
   const [currentPage, setCurrentPage] = useState(current)

   // Define max number of records per page
   const maxPerPage = perPage

   // Define a number of pages
   const totalPages = () => {
      return Math.ceil(totalRecords / maxPerPage)
   }

   // Synchronize currentPage state with current prop
   useEffect(() => {
      setCurrentPage(current)
   }, [current])

   // Handle input change
   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newPage = parseInt(e.target.value, 10)
      if (newPage > 0 && newPage <= totalPages()) {
         setCurrentPage(newPage)
         if (newPage > current) {
            handleNextPage()
         } else if (newPage < current) {
            handlePreviousPage()
         }
      }
   }

   return (
      <>
         <div className="flex items-center gap-2">
            <CaretLeft
               size={24}
               className="transition-all duration-200 hover:scale-110"
               style={{
                  cursor: 'pointer',
                  pointerEvents: currentPage === 1 ? 'none' : 'auto',
                  opacity: currentPage === 1 ? 0.5 : 1
               }}
               onClick={() => handlePreviousPage?.()}
            />
            <p>Página</p>
            <div className="w-8 h-8 border border-blue-gray rounded-xs grid justify-items-center items-center fill-blue-gray">
               {currentPage}
            </div>
            <p>de</p>
            <p>{totalPages()}</p>
            <CaretRight
               size={24}
               className="transition-all duration-200 hover:scale-110 fill-blue-gray"
               style={{
                  cursor: 'pointer',
                  pointerEvents: currentPage === totalPages() ? 'none' : 'auto',
                  opacity: currentPage === totalPages() ? 0.5 : 1
               }}
               onClick={() => handleNextPage?.()}
            />
         </div>
      </>
   )
}
