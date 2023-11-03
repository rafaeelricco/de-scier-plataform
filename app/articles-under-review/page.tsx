'use client'

import { Dropdown } from '@/components/common/Dropdown/Dropdown'
import PaginationComponent from '@/components/common/Pagination/Pagination'
import { ArticleUnderReview, ArticleUnderReviewProps, ArticleUnderReviewSkeleton } from '@/components/common/Publication/Item/ArticlesUnderReview'
import useDebounce from '@/hooks/useDebounce'
import { document_types } from '@/mock/document_types'
import { filter_status } from '@/mock/dropdow_filter_options'
import { home_routes } from '@/routes/home'
import { useArticles } from '@/services/document/getArticles.service'
import * as Input from '@components/common/Input/Input'
import * as Title from '@components/common/Title/Page'
import React from 'react'

export default function ArticlesUnderReviewPage() {
   /**
    * @notice Fetch the articles and their loading state.
    * @dev Using a custom hook "useArticles" to fetch articles.
    */
   const { articles, loading } = useArticles()

   /** @dev Number of articles displayed per page. */
   const per_page = 8

   /** @notice Current page number state.*/
   const [page, setPage] = React.useState(1)

   /** @notice State for the selected document type filter. */
   const [documentType, setDocumentType] = React.useState<string | null>(null)

   /** @notice State for the search term. */
   const [searchTerm, setSearchTerm] = React.useState('')

   /** @notice Debounces the search term. */
   const debouncedSearchTerm = useDebounce(searchTerm, 500)

   /** @notice State for the selected status filter. */
   const [status, setStatus] = React.useState<string | null>(null)

   /** @notice Holds the list of filtered articles to be displayed. */
   const [results, setResults] = React.useState<ArticleUnderReviewProps[]>([])

   /** @notice Holds the total number of pages based on the number of results and articles per page. */
   const [totalPages, setTotalPages] = React.useState(Math.ceil(results.length / per_page))

   /**
    * @notice Updates the results state whenever articles data changes.
    * @dev This effect listens for changes in the articles data and updates the results accordingly.
    */
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

      if (documentType) {
         filteredArticles = filteredArticles.filter((article) => article.document_type?.toLowerCase() == documentType?.toLowerCase())
      }

      if (status) {
         filteredArticles = filteredArticles.filter((article) => article.status?.toLocaleLowerCase() == status?.toLowerCase())
      }

      if (debouncedSearchTerm) {
         filteredArticles = filteredArticles.filter((article) => article.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
      }

      setResults(filteredArticles)
   }, [articles, documentType, status, debouncedSearchTerm])

   /**
    * @notice Recalculates the total number of pages whenever the list of results changes.
    * @dev This effect listens for changes in the results and per_page states and recalculates the total pages accordingly.
    */
   React.useEffect(() => {
      setTotalPages(Math.ceil(results.length / per_page))
   }, [results, per_page])

   console.log(results)

   return (
      <React.Fragment>
         <Title.Root>
            <Title.Title>My articles under review</Title.Title>
         </Title.Root>
         <div className="grid gap-6">
            <div className="grid gap-6">
               <div className="flex items-center gap-2">
                  <Input.Search placeholder="Find articles with this terms" onChange={(e) => setSearchTerm(e.target.value)} />
               </div>
               <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <Dropdown items={document_types} label="Order by:" onSelect={(value) => setDocumentType(value)} />
                  <Dropdown label="Status:" className="min-w-[180px]" items={filter_status} onSelect={(value) => setStatus(value)} />
               </div>
            </div>
            <div className="flex flex-col gap-6 min-h-[calc(50vh)]">
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
                                    <ArticleUnderReview
                                       title={article.title}
                                       since={article.since}
                                       image={article.image}
                                       link={home_routes.articles.in_review + '/' + article.id}
                                       status_editor={article.status_editor as 'pending' | 'approved'}
                                       status_reviewer={article.status_reviewer as 'pending' | 'approved'}
                                    />
                                 </React.Fragment>
                              ))
                           )}
                        </React.Fragment>
                     )}
                  </div>
               </div>
               <div className="flex justify-center h-full w-full">
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
