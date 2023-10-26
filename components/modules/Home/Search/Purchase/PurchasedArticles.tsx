import PaginationComponent from '@/components/common/Pagination/Pagination'
import useDebounce from '@/hooks/useDebounce'
import useDimension from '@/hooks/useWindowDimension'
import { articles } from '@/mock/articles_published'
import * as Button from '@components/common/Button/Button'
import * as Input from '@components/common/Input/Input'
import '@styles/home.css'
import React from 'react'
import { Person, Search, X } from 'react-bootstrap-icons'
import { ArticleCheckout } from './ArticleCheckout'

interface PurchasedArticlesProps {
   onClose: () => void
}

export const PurchasedArticles: React.FC<PurchasedArticlesProps> = ({ onClose }: PurchasedArticlesProps) => {
   const { lg } = useDimension()
   const per_page = lg == true ? 8 : 6
   const [page, setPage] = React.useState(1)
   const [results, setResults] = React.useState(articles)
   const [totalPages, setTotalPages] = React.useState(Math.ceil(results.length / per_page))
   const [searchTerm, setSearchTerm] = React.useState('')
   const debouncedSearchTerm = useDebounce(searchTerm, 500)

   return (
      <React.Fragment>
         <X
            className="w-8 h-8 absolute top-4 right-4 cursor-pointer hover:text-status-error transition-all duration-500 ease-out hover:scale-110 hover:rotate-180 transform"
            onClick={onClose}
         />
         <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
               <h3 className="text-xl font-semibold">Purchased articles</h3>
               <div className="max-w-full bg-white grid sm:grid-flow-col sm:items-center gap-3 lg:gap-4 rounded-xl lg:rounded-full h-fit ">
                  <Input.Input
                     className="rounded-full py-2 md:py-3 px-3 md:px-4 border-neutral-stroke_light bg-transparent shadow-none border focus:outline-none focus:border-neutral-stroke_light text-xs md:text-sm w-full"
                     placeholder="Find articles with terms"
                     icon={
                        <React.Fragment>
                           <Search className="w-4 md:w-5 h-4 md:h-5 ml-1 text-neutral-light_gray" />
                        </React.Fragment>
                     }
                  />
                  <Input.Input
                     className="rounded-full py-2 md:py-3 px-3 md:px-4 border-neutral-stroke_light bg-transparent shadow-none border focus:outline-none focus:border-neutral-stroke_light text-xs md:text-sm w-full"
                     placeholder="Search for an author"
                     icon={
                        <React.Fragment>
                           <Person className="w-4 md:w-5 h-4 md:h-5 ml-1 text-neutral-light_gray" />
                        </React.Fragment>
                     }
                  />
                  <Button.Button variant="outline" className="rounded-full py-2 md:py-3 px-5 md:px-6 text-xs md:text-sm w-full">
                     Search
                     <Search className="w-4 md:w-5 h-4 md:h-5 ml-1" />
                  </Button.Button>
               </div>
            </div>
            <div className="grid gap-4 sm:gap-6 lg:gap-10">
               <div className="grid gap-3 sm:gap-4 md:gap-6 lg:gap-x-6 gap-y-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {results
                     .filter((article) => article.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
                     .slice((page - 1) * per_page, page * per_page)
                     .map((article, index) => (
                        <React.Fragment key={article.id}>
                           <div className="grid gap-4 sm:gap-6 lg:grid-flow-col">
                              <ArticleCheckout responsive id={article.id} authors={article.authors} image={article.image} title={article.title} />
                              {index !== 3 && index !== 7 && <div className="h-full w-[1px] bg-neutral-stroke_light md:hidden" />}
                           </div>
                        </React.Fragment>
                     ))}
                  <div className="flex items-center justify-center gap-3 sm:gap-4 lg:gap-4 col-span-full">
                     <PaginationComponent
                        key={totalPages}
                        current={page}
                        perPage={per_page}
                        total={results.length}
                        handleFirstPage={() => setPage(1)}
                        handleNextPage={() => setPage(page + 1)}
                        handlePreviousPage={() => setPage(page - 1)}
                        handleLastPage={() => setPage(totalPages)}
                     />
                  </div>
               </div>
            </div>
         </div>
      </React.Fragment>
   )
}

const CardArticlePurchased: React.FC = () => {
   return <React.Fragment></React.Fragment>
}
