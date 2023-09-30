import { useEffect, useState } from 'react'
import { CaretLeft, CaretLeftSquare, CaretRight, CaretRightSquare } from 'react-bootstrap-icons'
import { PaginationProps } from './Typing'

export default function PaginationComponent({
   total,
   current,
   perPage,
   handleNextPage,
   handlePreviousPage,
   handleFirstPage,
   handleLastPage
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

   return (
      <>
         <div className="flex items-center gap-2">
            <CaretLeftSquare
               size={24}
               className="transition-all duration-200 hover:scale-110 rounded-xs fill-[#5E6992] cursor-pointer"
               onClick={() => handleFirstPage?.()}
            />
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
            <p className="lg:text-sm 2xl:text-base">Página</p>
            <p className="w-8 h-8 border border-blue-gray rounded-xs grid justify-items-center items-center fill-blue-gray lg:w-6 lg:h-6 lg:text-sm 2xl:text-base 2xl:h-8 2xl:w-8">
               {currentPage}
            </p>
            <p className="lg:text-sm 2xl:text-base">de</p>
            <p className="lg:text-sm 2xl:text-base">{totalPages()}</p>
            <CaretRight
               size={24}
               className="transition-all duration-200 hover:scale-110 rounded-xs fill-[#5E6992] cursor-pointer"
               style={{
                  cursor: 'pointer',
                  pointerEvents: currentPage === totalPages() ? 'none' : 'auto',
                  opacity: currentPage === totalPages() ? 0.5 : 1
               }}
               onClick={() => handleNextPage?.()}
            />
            <CaretRightSquare
               size={24}
               className="transition-all duration-200 hover:scale-110 rounded-xs fill-[#5E6992] cursor-pointer"
               onClick={() => handleLastPage?.()}
            />
         </div>
      </>
   )
}
