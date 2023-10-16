import PaginationComponent from '@/components/common/Pagination/Pagination'
import useDebounce from '@/hooks/useDebounce'
import { articles } from '@/mock/articles_published'
import * as Button from '@components/common/Button/Button'
import * as Input from '@components/common/Input/Input'
import '@styles/home.css'
import React from 'react'
import { Person, Search, X } from 'react-bootstrap-icons'
import { ArticleCard } from '../../Index/ArticleCard/ArticleCard'

interface PurchasedArticlesProps {
   onClose: () => void
}

export const PurchasedArticles: React.FC<PurchasedArticlesProps> = ({ onClose }: PurchasedArticlesProps) => {
   const per_page = 8
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
            <h3 className="text-xl font-semibold">Purchased articles</h3>
            <div className="flex items-center w-full gap-6">
               <div className="w-full flex-grow">
                  <Input.Input
                     className="rounded-full py-3 px-4 border-neutral-stroke_light bg-transparent shadow-none border focus:outline-none focus:border-neutral-stroke_light text-sm bg-white"
                     placeholder="Find articles with terms"
                     icon={
                        <React.Fragment>
                           <Search className="w-5 h-5 ml-1 text-neutral-light_gray" />
                        </React.Fragment>
                     }
                  />
               </div>
               <div className="w-full flex-grow">
                  <Input.Input
                     className="rounded-full py-3 px-4 border-neutral-stroke_light bg-transparent shadow-none border focus:outline-none focus:border-neutral-stroke_light text-sm bg-white w-full flex-grow"
                     placeholder="Search for an author"
                     icon={
                        <React.Fragment>
                           <Person className="w-5 h-5 ml-1 text-neutral-light_gray" />
                        </React.Fragment>
                     }
                  />
               </div>
               <Button.Button variant="outline" className="rounded-full py-3 px-6 text-sm w-fit">
                  Search
                  <Search className="w-5 h-5" />
               </Button.Button>
            </div>
            <div className="flex flex-col gap-6 mt-6">
               <div className="grid grid-cols-4 gap-6">
                  {results
                     .filter((article) => article.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
                     .slice((page - 1) * per_page, page * per_page)
                     .map((article, index) => (
                        <React.Fragment key={article.id}>
                           <div className="grid grid-cols-auto-min gap-6">
                              <ArticleCard responsive id={article.id} authors={article.authors} image={article.image} title={article.title} />
                              {index !== 3 && index !== 7 && <hr className="h-full w-[1px] bg-neutral-stroke_light" />}
                           </div>
                        </React.Fragment>
                     ))}
               </div>
               <div className="flex justify-center">
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
      </React.Fragment>
   )
}

const CardArticlePurchased: React.FC = () => {
   return <React.Fragment></React.Fragment>
}
