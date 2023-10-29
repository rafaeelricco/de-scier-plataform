'use client'

import { Dropdown } from '@/components/common/Dropdown/Dropdown'
import PaginationComponent from '@/components/common/Pagination/Pagination'
import { ArticleUnderReview, ArticleUnderReviewProps, ArticleUnderReviewSkeleton } from '@/components/common/Publication/Item/ArticlesUnderReview'
import { filter_order_by, filter_status } from '@/mock/dropdow_filter_options'
import { home_routes } from '@/routes/home'
import { useArticles } from '@/services/document/getArticles.service'
import * as Input from '@components/common/Input/Input'
import * as Title from '@components/common/Title/Page'
import React from 'react'
import slug from 'slug'

export default function ArticlesUnderReviewPage() {
   const { articles, loading } = useArticles()
   console.log(articles)

   const per_page = 8
   const [page, setPage] = React.useState(1)
   const [results, setResults] = React.useState<ArticleUnderReviewProps[]>([])
   const [totalPages, setTotalPages] = React.useState(Math.ceil(results.length / per_page))

   React.useEffect(() => {
      setResults(articles || [])
   }, [articles])

   return (
      <React.Fragment>
         <Title.Root>
            <Title.Title>My articles under review</Title.Title>
         </Title.Root>
         <div className="grid gap-6">
            <div className="grid gap-6">
               <div className="flex items-center gap-2">
                  <Input.Search placeholder="Find articles with this terms" />
               </div>
               <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <Dropdown items={filter_order_by} label="Order by:" onSelect={(value) => console.log(value)} />
                  <Dropdown label="Status:" className="min-w-[180px]" items={filter_status} onSelect={(value) => console.log(value)} />
               </div>
            </div>
            <div className="min-h-[calc(100vh-50vh)] md:min-h-[calc(100vh-30vh)] relative">
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
                                       link={home_routes.articles.in_review + '/' + slug(article.title)}
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
               <div className="flex justify-center absolute bottom-0 left-0 w-full">
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
