'use client'

import { Dropdown } from '@/components/common/Dropdown/Dropdown'
import PaginationComponent from '@/components/common/Pagination/Pagination'
import { ArticleUnderReviewSkeleton } from '@/components/common/Publication/Item/ArticlesUnderReview'
import ReviewerItem from '@/components/modules/AsReviewer/ReviewerItem/ReviewerItem'
import { ReviewerItemProps } from '@/components/modules/AsReviewer/ReviewerItem/Typing'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import useDebounce from '@/hooks/useDebounce'
import { filter_order_by, filter_status } from '@/mock/dropdow_filter_options'
import { useArticleToReview } from '@/services/reviewer/fetchDocuments.service'
import * as Input from '@components/common/Input/Input'
import * as Title from '@components/common/Title/Page'
import React from 'react'

export default function AsReviewerPage() {
   const { articles, loading } = useArticleToReview()

   const per_page = 6
   const [page, setPage] = React.useState(1)
   const [results, setResults] = React.useState<ReviewerItemProps[]>([])
   const [totalPages, setTotalPages] = React.useState(Math.ceil(results.length / per_page))
   const [searchTerm, setSearchTerm] = React.useState('')
   const debouncedSearchTerm = useDebounce(searchTerm, 500)

   React.useEffect(() => {
      setResults(articles || [])
   }, [articles])

   /**
    * @notice Filters articles based on selected document type, status, and title search.
    * @dev This effect listens for changes in the articles, documentType, status, and debouncedSearchTerm states
    * and updates the results with the filtered list of articles. It filters articles based on the following criteria:
    * - Document Type: If a document type is selected, only articles with a matching document type will be displayed.
    * - Status: If a status is selected, only articles with a matching status will be displayed.
    * - Title Search: If a search term is provided, only articles with titles containing the search term (case-insensitive) will be displayed.
    */
   React.useEffect(() => {
      if (!articles) return

      let filteredArticles = [...articles]

      if (debouncedSearchTerm) {
         filteredArticles = filteredArticles.filter((article) => article.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
      }

      setResults(filteredArticles)
   }, [articles, debouncedSearchTerm])

   React.useEffect(() => {
      setTotalPages(Math.ceil(results.length / per_page))
   }, [results, per_page])

   console.log(results)

   return (
      <React.Fragment>
         <Title.Root>
            <Title.Title>As Reviewer/Editor</Title.Title>
         </Title.Root>
         <Tabs defaultValue="account">
            <div className="grid gap-6">
               <div className="grid gap-6">
                  <TabsList className="bg-transparent grid h-fit w-full items-start justify-normal">
                     <div className="grid sm:grid-flow-col gap-4 sm:gap-5 md:gap-6">
                        <TabsTrigger
                           className="bg-primary-main text-neutral-white py-2 px-8 text-sm md:text-lg font-semibold rounded-md border data-[state=inactive]:bg-transparent data-[state=inactive]:text-neutral-gray data-[state=inactive]:font-regular data-[state=active]:bg-primary-main data-[state=active]:text-white data-[state=inactive]:border-neutral-gray"
                           value="account"
                        >
                           Ongoing reviews
                        </TabsTrigger>
                        <TabsTrigger
                           className="bg-primary-main text-neutral-white py-2 px-8 text-sm md:text-lg font-semibold rounded-md border data-[state=inactive]:bg-transparent data-[state=inactive]:text-neutral-gray data-[state=inactive]:font-regular data-[state=active]:bg-primary-main data-[state=active]:text-white data-[state=inactive]:border-neutral-gray"
                           value="password"
                        >
                           Completed reviews
                        </TabsTrigger>
                     </div>
                  </TabsList>
                  <div className="flex items-center gap-2">
                     <Input.Search placeholder="Find articles with this terms" onChange={(e) => setSearchTerm(e.target.value)} />
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                     <Dropdown items={filter_order_by} label="Order by:" onSelect={(value) => console.log(value)} />
                     <Dropdown label="Status:" className="min-w-[180px]" items={filter_status} onSelect={(value) => console.log(value)} />
                  </div>
               </div>
               <div className="grid gap-8">
                  <div className="grid md:grid-cols-2 gap-4">
                     {loading ? (
                        <React.Fragment>
                           <ArticleUnderReviewSkeleton />
                           <ArticleUnderReviewSkeleton />
                           <ArticleUnderReviewSkeleton />
                           <ArticleUnderReviewSkeleton />
                        </React.Fragment>
                     ) : (
                        <React.Fragment>
                           {results.length === 0 ? (
                              <p className="text-center col-span-2 text-gray-500 mt-8">Não há artigos em revisão no momento.</p>
                           ) : (
                              results.slice((page - 1) * per_page, page * per_page).map((article) => (
                                 <React.Fragment key={article.id}>
                                    <ReviewerItem {...article} />
                                 </React.Fragment>
                              ))
                           )}
                        </React.Fragment>
                     )}
                  </div>
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
         </Tabs>
      </React.Fragment>
   )
}
