'use client'
import { Dropdown } from '@/components/common/Dropdown/Dropdown'
import PaginationComponent from '@/components/common/Pagination/Pagination'
import { BannerStartPublishing } from '@/components/modules/Home/Index/BannerStartPublishing/BannerStartPublishing'
import ArticleItem from '@/components/modules/Home/Search/ArticleItem/ArticleItem'
import useDebounce from '@/hooks/useDebounce'
import { filter_order_by, filter_status } from '@/mock/dropdow_filter_options'
import { useArticles } from '@/services/document/fetchPublic.service'
import * as Input from '@components/common/Input/Input'
import * as Title from '@components/common/Title/Page'
import '@styles/home.css'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { Person, Search } from 'react-bootstrap-icons'

export default function SearchArticlesPage() {
   const { articles, loading } = useArticles()

   const searchQueries = useSearchParams()

   const per_page = 10
   const [page, setPage] = React.useState(1)
   const [results, setResults] = React.useState(articles)
   const [totalPages, setTotalPages] = React.useState(1)
   const [searchTerm, setSearchTerm] = React.useState('')
   const debouncedSearchTerm = useDebounce(searchTerm, 500)
   const [searchAuthor, setSearchAuthor] = React.useState('')

   function handleSearchArticles() {
      if (articles && searchTerm && !searchAuthor) {
         const filteredArticles = articles.filter((article) => article.title.toLowerCase().includes(searchTerm.toLowerCase()))
         setResults(filteredArticles)
         setTotalPages(Math.ceil(filteredArticles.length / per_page))
      }

      if (articles && searchAuthor && !searchTerm) {
         const filteredArticles = articles.filter((article) => {
            return article.authors.some((author) => author.name.toLowerCase().includes(searchAuthor.toLowerCase()))
         })
         setResults(filteredArticles)
         setTotalPages(Math.ceil(filteredArticles.length / per_page))
      }

      if (articles && searchAuthor && searchTerm) {
         const filteredArticles = articles
            .filter((article) => article.title.toLowerCase().includes(searchTerm.toLowerCase()))
            .filter((article) => {
               return article.authors.some((author) => author.name.toLowerCase().includes(searchAuthor.toLowerCase()))
            })
         setResults(filteredArticles)
         setTotalPages(Math.ceil(filteredArticles.length / per_page))
      }
   }

   React.useEffect(() => {
      if (articles) {
         setResults(articles)
         setTotalPages(Math.ceil(articles.length / per_page))
      }
   }, [articles])

   React.useEffect(() => {
      if (searchQueries) {
         const term = searchQueries.get('term') || ''
         const author = searchQueries.get('author') || ''

         setSearchTerm(term)
         setSearchAuthor(author)
      }
   }, [searchQueries])

   return (
      <React.Fragment>
         <div className="flex flex-col gap-6">
            <Title.Root className="mt-8 mb-0 lg:mt-14 md:mb-0">
               <Title.Title className="text-3xl mb-0">Search</Title.Title>
            </Title.Root>
            <div className="flex flex-col md:flex-row w-full gap-6">
               <div className="w-full flex-grow">
                  <Input.Input
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
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
                     value={searchAuthor}
                     onChange={(e) => setSearchAuthor(e.target.value)}
                     className="rounded-full py-3 px-4 border-neutral-stroke_light bg-transparent shadow-none border focus:outline-none focus:border-neutral-stroke_light text-sm bg-white w-full flex-grow"
                     placeholder="Search for an author"
                     icon={
                        <React.Fragment>
                           <Person className="w-5 h-5 ml-1 text-neutral-light_gray" />
                        </React.Fragment>
                     }
                  />
               </div>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-2">
               <Dropdown no_selected items={filter_order_by} label="Year of publication" onSelect={(value) => console.log(value)} />
               <Dropdown no_selected label="Field" className="min-w-fit px-8" items={filter_status} onSelect={(value) => console.log(value)} />
               <Dropdown no_selected label="Document type" className="min-w-fit px-8" items={filter_status} onSelect={(value) => console.log(value)} />
               <Dropdown no_selected label="Access" className="min-w-fit px-8" items={filter_status} onSelect={(value) => console.log(value)} />
            </div>
            <div className="flex flex-col gap-6 mt-6">
               <div className="grid md:grid-cols-2 gap-6 md:gap-4">
                  {results?.slice((page - 1) * per_page, page * per_page).map((article) => (
                     <React.Fragment key={article.id}>
                        <ArticleItem
                           title={article.title}
                           access_type={article.accessType!}
                           authors={article.authors}
                           id={article.id}
                           image={article.image}
                           likes={article.likes || 0}
                           published_date={article.publishedAt!.toLocaleDateString('pt-BR')}
                           tags={article.tags || []}
                           views={article.views || 0}
                        />
                     </React.Fragment>
                  ))}
               </div>
               <div className="flex justify-center">
                  <PaginationComponent
                     key={totalPages}
                     current={page}
                     perPage={per_page}
                     total={results?.length || 1}
                     handleFirstPage={() => setPage(1)}
                     handleNextPage={() => setPage(page + 1)}
                     handlePreviousPage={() => setPage(page - 1)}
                     handleLastPage={() => setPage(totalPages)}
                  />
               </div>
            </div>
            <div className="mt-24 mb-32">
               <BannerStartPublishing />
            </div>
         </div>
      </React.Fragment>
   )
}
