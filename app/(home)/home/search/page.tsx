'use client'
import { Dropdown } from '@/components/common/Dropdown/Dropdown'
import PaginationComponent from '@/components/common/Pagination/Pagination'
import ArticleItem from '@/components/modules/Home/Search/ArticleItem/ArticleItem'
import useDebounce from '@/hooks/useDebounce'
import { articles } from '@/mock/articles_published'
import { filter_order_by, filter_status } from '@/mock/dropdow_filter_options'
import * as Button from '@components/common/Button/Button'
import * as Input from '@components/common/Input/Input'
import * as Title from '@components/common/Title/Page'
import '@styles/home.css'
import IllustrationBannerFooter from 'public/svgs/modules/home/banner-footer/illustrations-banner.svg'
import React from 'react'
import { Person, Search } from 'react-bootstrap-icons'

export default function SearchArticlesPage() {
   const per_page = 6
   const [page, setPage] = React.useState(1)
   const [results, setResults] = React.useState(articles)
   const [totalPages, setTotalPages] = React.useState(Math.ceil(results.length / per_page))
   const [searchTerm, setSearchTerm] = React.useState('')
   const debouncedSearchTerm = useDebounce(searchTerm, 500)

   return (
      <React.Fragment>
         <div className="flex flex-col gap-6">
            <Title.Root className="pt-12 pb-0 mb-0">
               <Title.Title className="2xl:text-3xl lg:text-2xl">Search</Title.Title>
            </Title.Root>
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
               <Button.Button variant="primary" className="rounded-full py-3 px-6 text-sm w-fit">
                  Search
                  <Search className="w-5 h-5" />
               </Button.Button>
            </div>
            <div className="flex items-center gap-2">
               <Dropdown no_selected items={filter_order_by} label="Year of publication" onSelect={(value) => console.log(value)} />
               <Dropdown no_selected label="Field" className="min-w-fit px-8" items={filter_status} onSelect={(value) => console.log(value)} />
               <Dropdown no_selected label="Language" className="min-w-fit px-8" items={filter_status} onSelect={(value) => console.log(value)} />
               <Dropdown no_selected label="Access" className="min-w-fit px-8" items={filter_status} onSelect={(value) => console.log(value)} />
            </div>
            <div className="flex flex-col gap-6">
               <div className="grid grid-cols-2 gap-4">
                  {results
                     .filter((article) => article.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
                     .slice((page - 1) * per_page, page * per_page)
                     .map((article) => (
                        <React.Fragment key={article.id}>
                           <ArticleItem {...article} />
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
            <div className="bg-secundary_blue-main py-6 px-12 rounded-md mt-16 mb-52">
               <div className="flex items-center gap-20">
                  <IllustrationBannerFooter className="w-64 shrink-0" />
                  <div className="flex flex-col gap-4">
                     <div className="grid gap-2">
                        <p className="text-lg font-semibold text-white">Want to publish a scientific paper?</p>
                        <p className="text-base font-regular text-white">
                           Publishing in DeScier is fast and easy, with peer selected review, and 100% author owned copyright. Join the movement now!
                        </p>
                     </div>
                     <div className="flex justify-end">
                        <Button.Button className="py-3 px-10 w-fit ">Start publishing now!</Button.Button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </React.Fragment>
   )
}
