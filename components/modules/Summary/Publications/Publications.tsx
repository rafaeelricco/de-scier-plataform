import PaginationComponent from '@/components/common/Pagination/Pagination'
import { InReviewItem } from '@/components/common/Publication/Item/InReview'
import { PublicationItem } from '@/components/common/Publication/Item/Published'
import { DocumentBasicProps } from '@/services/document/getStatistics.service'
import { addNumberSuffix } from '@/utils/format_number'
import React from 'react'

const Publications: React.FC<PublicationsProps> = ({ pendingDocuments, publishedDocuments }: PublicationsProps) => {
   const [underReview, setUnderReview] = React.useState(false)
   const [publications, setPublications] = React.useState(true)

   const per_page = 3

   const [page, setPage] = React.useState(1)
   const [pageReview, setPageReview] = React.useState(1)

   const [results, setResults] = React.useState<DocumentBasicProps[]>(publishedDocuments)
   const [resultsReview, setResultsReview] = React.useState<DocumentBasicProps[]>(pendingDocuments)

   const [totalPages, setTotalPages] = React.useState(Math.ceil(results.length / per_page))
   const [totalPagesReview, setTotalPagesReview] = React.useState(Math.ceil(resultsReview.length / per_page))

   return (
      <React.Fragment>
         <div className="flex flex-col gap-4 h-full">
            <div className="grid md:grid-cols-2 items-start w-full h-fit">
               <button
                  data-active={publications}
                  className="py-2 px-4 font-semibold text-base text-[#009EAB] rounded-[32px] w-full data-[active='true']:bg-[#F1FFFF] transition-all duration-200 data-[active='false']:text-neutral-light_gray data-[active='false']:font-regular lg:text-sm 2xl:text-base select-none truncate"
                  onClick={() => {
                     setPublications(true)
                     setUnderReview(false)
                     setPage(1)
                     setResults(publishedDocuments)
                     setTotalPages(Math.ceil(publishedDocuments.length / per_page))
                  }}
               >
                  Published articles
               </button>
               <button
                  data-active={underReview}
                  className="py-2 px-4 font-semibold text-base text-[#FA9963] rounded-[32px] w-full data-[active='true']:bg-[#FFF4DE] transition-all duration-200 data-[active='false']:text-neutral-light_gray data-[active='false']:font-regular lg:text-sm 2xl:text-base select-none truncate"
                  onClick={() => {
                     setPublications(false)
                     setUnderReview(true)
                     setPageReview(1)
                     setResultsReview(pendingDocuments)
                     setTotalPagesReview(Math.ceil(pendingDocuments.length / per_page))
                  }}
               >
                  Under review
               </button>
            </div>
            {publications && (
               <div className="bg-[#F1FFFF] h-full rounded-md transition-all duration-200 p-3 md:p-4 min-h-[371px] grid">
                  <div className="grid gap-4 h-full">
                     {publishedDocuments?.length === 0 ? (
                        <div className="flex items-center justify-center">
                           <p className="text-neutral-gray">No published articles found.</p>
                        </div>
                     ) : (
                        <React.Fragment>
                           {publishedDocuments?.slice((page - 1) * per_page, page * per_page).map((item) => (
                              <React.Fragment key={item.id}>
                                 <PublicationItem
                                    key={item.id}
                                    date={new Date(item.createdAt).toLocaleDateString('pt-BR')}
                                    link={''}
                                    likes={addNumberSuffix(item.likes)}
                                    title={item.title}
                                    views={addNumberSuffix(item.views)}
                                    image={item.cover || ''}
                                 />
                                 <hr className="divider-h" />
                              </React.Fragment>
                           ))}
                           <div className="mx-auto my-0">
                              <PaginationComponent
                                 key={totalPages}
                                 current={page}
                                 perPage={per_page}
                                 total={publishedDocuments?.length || 1}
                                 handleFirstPage={() => setPage(1)}
                                 handleNextPage={() => setPage(page + 1)}
                                 handlePreviousPage={() => setPage(page - 1)}
                                 handleLastPage={() => setPage(totalPages)}
                              />
                           </div>
                        </React.Fragment>
                     )}
                  </div>
               </div>
            )}
            {underReview && (
               <div className="bg-[#FFF4DE] h-full rounded-md transition-all duration-200  p-3 md:p-4 min-h-[371px] grid">
                  <div className="grid gap-4 h-full">
                     {pendingDocuments?.length === 0 ? (
                        <div className="flex items-center justify-center">
                           <p className="text-neutral-gray">No published articles found.</p>
                        </div>
                     ) : (
                        <React.Fragment>
                           {pendingDocuments?.slice((pageReview - 1) * per_page, pageReview * per_page).map((item) => (
                              <React.Fragment key={item.id}>
                                 <InReviewItem
                                    key={item.id}
                                    date={new Date(item.createdAt).toLocaleDateString('pt-BR')}
                                    link={''}
                                    title={item.title}
                                    image={item.cover || ''}
                                    status_editor={item.editorsApprovals >= 1 ? 'approved' : 'pending'}
                                    status_reviewer={item.reviewerApprovals >= 1 ? 'approved' : 'pending'}
                                    ready_to_publish={item.editorsApprovals >= 1 && item.reviewerApprovals >= 1 ? true : false}
                                 />
                                 <hr className="divider-h" />
                              </React.Fragment>
                           ))}
                           <div className="mx-auto my-0">
                              <PaginationComponent
                                 perPage={per_page}
                                 current={pageReview}
                                 key={totalPagesReview}
                                 total={pendingDocuments?.length || 1}
                                 handlePreviousPage={() => setPageReview(pageReview - 1)}
                                 handleFirstPage={() => setPageReview(1)}
                                 handleLastPage={() => setPageReview(totalPagesReview)}
                                 handleNextPage={() => setPageReview(pageReview + 1)}
                              />
                           </div>
                        </React.Fragment>
                     )}
                  </div>
               </div>
            )}
         </div>
      </React.Fragment>
   )
}

type PublicationsProps = {
   publishedDocuments: DocumentBasicProps[]
   pendingDocuments: DocumentBasicProps[]
}

export default Publications
