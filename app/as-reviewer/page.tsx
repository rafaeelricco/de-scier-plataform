'use client'

import PaginationComponent from '@/components/common/Pagination/Pagination'
import ReviewerItem from '@/components/modules/AsReviewer/ReviewerItem'
import { ReviewerItemProps } from '@/components/modules/AsReviewer/Typing'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import useDebounce from '@/hooks/useDebounce'
import * as Input from '@components/common/Input/Input'
import * as Title from '@components/common/Title/Page'
import React from 'react'
import { CaretDown } from 'react-bootstrap-icons'

export default function AsReviewerPage() {
   const per_page = 6
   const [page, setPage] = React.useState(1)
   const [results, setResults] = React.useState(articles_under_review)
   const [totalPages, setTotalPages] = React.useState(Math.ceil(results.length / per_page))
   const [searchTerm, setSearchTerm] = React.useState('')
   const debouncedSearchTerm = useDebounce(searchTerm, 500)

   return (
      <React.Fragment>
         <Title.Root className="m-0 mb-4">
            <Title.Title>As Reviewer/Editor</Title.Title>
         </Title.Root>
         <Tabs defaultValue="account">
            <div className="grid gap-6">
               <div className="grid gap-6">
                  <TabsList className="bg-transparent grid h-fit justify-start">
                     <div className="grid grid-flow-col gap-6">
                        <TabsTrigger
                           className="bg-primary-main text-neutral-white py-2 px-8 text-lg font-semibold rounded-md data-[state=inactive]:bg-transparent data-[state=inactive]:text-neutral-gray data-[state=inactive]:font-regular data-[state=active]:bg-primary-main data-[state=active]:text-white"
                           value="account"
                        >
                           Ongoing reviews
                        </TabsTrigger>
                        <TabsTrigger
                           className="bg-primary-main text-neutral-white py-2 px-8 text-lg font-semibold rounded-md data-[state=inactive]:bg-transparent data-[state=inactive]:text-neutral-gray data-[state=inactive]:font-regular data-[state=active]:bg-primary-main data-[state=active]:text-white"
                           value="password"
                        >
                           Completed reviews
                        </TabsTrigger>
                     </div>
                  </TabsList>
                  <div className="flex items-center gap-2">
                     <Input.Search
                        placeholder="Find articles with this terms"
                        onChange={(e) => setSearchTerm(e.target.value)}
                     />
                     {/* <Button.Button className="px-4 py-3 h-fit text-sm">
                        Search
                        <Search />
                     </Button.Button> */}
                  </div>
                  <div className="flex items-center gap-2">
                     <button className="flex items-center py-2 px-4 text-sm rounded-full w-fit border-[1px] border-primary-main text-primary-main hover:scale-105 transition-all duration-200">
                        <span className="text-sm font-semibold text-primary-main">
                           Order by: Newest
                        </span>
                        <CaretDown className="ml-2" />
                     </button>
                     <button className="flex items-center py-2 px-4 text-sm rounded-full w-fit border-[1px] border-primary-main text-primary-main hover:scale-105 transition-all duration-200">
                        <span className="text-sm font-semibold text-primary-main">Status</span>
                        <CaretDown className="ml-2" />
                     </button>
                  </div>
               </div>
               <div className="grid gap-8">
                  <TabsContent value="account">
                     <div className="grid grid-cols-2 gap-4">
                        {results
                           .filter((article) =>
                              article.title
                                 .toLowerCase()
                                 .includes(debouncedSearchTerm.toLowerCase())
                           )
                           .filter((article) => article.access_type === null)
                           .slice((page - 1) * per_page, page * per_page)
                           .map((article) => (
                              <React.Fragment key={article.id}>
                                 <ReviewerItem {...article} />
                              </React.Fragment>
                           ))}
                     </div>
                  </TabsContent>
                  <TabsContent value="password">
                     <div className="grid grid-cols-2 gap-4">
                        {results
                           .filter((article) =>
                              article.title
                                 .toLowerCase()
                                 .includes(debouncedSearchTerm.toLowerCase())
                           )
                           .filter((article) => article.access_type !== null)
                           .slice((page - 1) * per_page, page * per_page)
                           .map((article) => (
                              <React.Fragment key={article.id}>
                                 <ReviewerItem {...article} />
                              </React.Fragment>
                           ))}
                     </div>
                  </TabsContent>
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

const articles_under_review: ReviewerItemProps[] = [
   {
      id: '1',
      status: 'approved',
      added_as: 'editor',
      published: false,
      published_date: null,
      access_type: 'paid',
      likes: 132,
      views: null,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-01-01',
      title: 'Blockchain Topic 1',
      link: 'https://example.com/blockchain-topic-1'
   },
   {
      id: '2',
      status: 'published',
      added_as: 'editor',
      published: true,
      published_date: '2023-02-10',
      access_type: 'open',
      likes: null,
      views: null,
      image: 'https://random.imagecdn.app/120/120',
      since: '2023-02-01',
      title: 'Blockchain Topic 2',
      link: 'https://example.com/blockchain-topic-2'
   },
   {
      id: '3',
      status: 'pending',
      added_as: 'editor',
      published: false,
      published_date: '2023-03-10',
      access_type: null,
      likes: 421,
      views: 3835,
      image: 'https://random.imagecdn.app/130/130',
      since: '2023-03-01',
      title: 'Blockchain Topic 3',
      link: 'https://example.com/blockchain-topic-3'
   },
   {
      id: '4',
      status: 'pending',
      added_as: 'editor',
      published: false,
      published_date: null,
      access_type: 'paid',
      likes: null,
      views: null,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-04-01',
      title: 'Blockchain Topic 4',
      link: 'https://example.com/blockchain-topic-4'
   },
   {
      id: '5',
      status: 'final_approved',
      added_as: 'reviewer',
      published: true,
      published_date: '2023-05-10',
      access_type: null,
      likes: null,
      views: 3229,
      image: 'https://random.imagecdn.app/120/120',
      since: '2023-05-01',
      title: 'Blockchain Topic 5',
      link: 'https://example.com/blockchain-topic-5'
   },
   {
      id: '6',
      status: 'approved',
      added_as: 'editor',
      published: false,
      published_date: null,
      access_type: null,
      likes: null,
      views: 282,
      image: 'https://random.imagecdn.app/130/130',
      since: '2023-06-01',
      title: 'Blockchain Topic 6',
      link: 'https://example.com/blockchain-topic-6'
   },
   {
      id: '7',
      status: 'pending',
      added_as: 'editor',
      published: false,
      published_date: null,
      access_type: null,
      likes: 907,
      views: null,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-07-01',
      title: 'Blockchain Topic 7',
      link: 'https://example.com/blockchain-topic-7'
   },
   {
      id: '8',
      status: 'final_approved',
      added_as: 'reviewer',
      published: false,
      published_date: '2023-08-10',
      access_type: 'paid',
      likes: null,
      views: 4518,
      image: 'https://random.imagecdn.app/120/120',
      since: '2023-08-01',
      title: 'Blockchain Topic 8',
      link: 'https://example.com/blockchain-topic-8'
   },
   {
      id: '9',
      status: 'rejected',
      added_as: 'editor',
      published: false,
      published_date: '2023-09-10',
      access_type: null,
      likes: 227,
      views: null,
      image: 'https://random.imagecdn.app/130/130',
      since: '2023-09-01',
      title: 'Blockchain Topic 9',
      link: 'https://example.com/blockchain-topic-9'
   },
   {
      id: '10',
      status: 'pending',
      added_as: 'editor',
      published: false,
      published_date: '2023-10-10',
      access_type: 'paid',
      likes: null,
      views: null,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-10-01',
      title: 'Blockchain Topic 10',
      link: 'https://example.com/blockchain-topic-10'
   },
   {
      id: '11',
      status: 'published',
      added_as: 'editor',
      published: false,
      published_date: null,
      access_type: 'open',
      likes: 104,
      views: null,
      image: 'https://random.imagecdn.app/120/120',
      since: '2023-11-01',
      title: 'Blockchain Topic 11',
      link: 'https://example.com/blockchain-topic-11'
   },
   {
      id: '12',
      status: 'published',
      added_as: 'editor',
      published: true,
      published_date: '2023-12-10',
      access_type: 'open',
      likes: null,
      views: null,
      image: 'https://random.imagecdn.app/130/130',
      since: '2023-12-01',
      title: 'Blockchain Topic 12',
      link: 'https://example.com/blockchain-topic-12'
   },
   {
      id: '13',
      status: 'rejected',
      added_as: 'reviewer',
      published: false,
      published_date: null,
      access_type: null,
      likes: 773,
      views: 1426,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-01-01',
      title: 'Blockchain Topic 13',
      link: 'https://example.com/blockchain-topic-13'
   },
   {
      id: '14',
      status: 'pending',
      added_as: 'reviewer',
      published: false,
      published_date: null,
      access_type: null,
      likes: 766,
      views: 1229,
      image: 'https://random.imagecdn.app/120/120',
      since: '2023-02-01',
      title: 'Blockchain Topic 14',
      link: 'https://example.com/blockchain-topic-14'
   },
   {
      id: '15',
      status: 'rejected',
      added_as: 'editor',
      published: false,
      published_date: '2023-03-10',
      access_type: null,
      likes: 339,
      views: null,
      image: 'https://random.imagecdn.app/130/130',
      since: '2023-03-01',
      title: 'Blockchain Topic 15',
      link: 'https://example.com/blockchain-topic-15'
   },
   {
      id: '16',
      status: 'published',
      added_as: 'editor',
      published: false,
      published_date: null,
      access_type: 'open',
      likes: null,
      views: null,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-04-01',
      title: 'Blockchain Topic 16',
      link: 'https://example.com/blockchain-topic-16'
   },
   {
      id: '17',
      status: 'final_approved',
      added_as: 'reviewer',
      published: false,
      published_date: '2023-05-10',
      access_type: null,
      likes: 485,
      views: 2557,
      image: 'https://random.imagecdn.app/120/120',
      since: '2023-05-01',
      title: 'Blockchain Topic 17',
      link: 'https://example.com/blockchain-topic-17'
   },
   {
      id: '18',
      status: 'rejected',
      added_as: 'reviewer',
      published: false,
      published_date: '2023-06-10',
      access_type: 'paid',
      likes: 210,
      views: 706,
      image: 'https://random.imagecdn.app/130/130',
      since: '2023-06-01',
      title: 'Blockchain Topic 18',
      link: 'https://example.com/blockchain-topic-18'
   },
   {
      id: '19',
      status: 'rejected',
      added_as: 'reviewer',
      published: false,
      published_date: null,
      access_type: null,
      likes: 528,
      views: 3182,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-07-01',
      title: 'Blockchain Topic 19',
      link: 'https://example.com/blockchain-topic-19'
   },
   {
      id: '20',
      status: 'rejected',
      added_as: 'reviewer',
      published: false,
      published_date: '2023-08-10',
      access_type: null,
      likes: null,
      views: null,
      image: 'https://random.imagecdn.app/120/120',
      since: '2023-08-01',
      title: 'Blockchain Topic 20',
      link: 'https://example.com/blockchain-topic-20'
   },
   {
      id: '21',
      status: 'published',
      added_as: 'reviewer',
      published: false,
      published_date: '2023-09-10',
      access_type: 'open',
      likes: null,
      views: 4298,
      image: 'https://random.imagecdn.app/130/130',
      since: '2023-09-01',
      title: 'Blockchain Topic 21',
      link: 'https://example.com/blockchain-topic-21'
   },
   {
      id: '22',
      status: 'rejected',
      added_as: 'editor',
      published: true,
      published_date: null,
      access_type: null,
      likes: 518,
      views: 536,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-10-01',
      title: 'Blockchain Topic 22',
      link: 'https://example.com/blockchain-topic-22'
   },
   {
      id: '23',
      status: 'rejected',
      added_as: 'reviewer',
      published: true,
      published_date: null,
      access_type: 'paid',
      likes: 590,
      views: 1301,
      image: 'https://random.imagecdn.app/120/120',
      since: '2023-11-01',
      title: 'Blockchain Topic 23',
      link: 'https://example.com/blockchain-topic-23'
   },
   {
      id: '24',
      status: null,
      added_as: 'reviewer',
      published: false,
      published_date: '2023-12-10',
      access_type: 'open',
      likes: null,
      views: null,
      image: 'https://random.imagecdn.app/130/130',
      since: '2023-12-01',
      title: 'Blockchain Topic 24',
      link: 'https://example.com/blockchain-topic-24'
   },
   {
      id: '25',
      status: null,
      added_as: 'reviewer',
      published: false,
      published_date: '2023-01-10',
      access_type: 'open',
      likes: null,
      views: null,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-01-01',
      title: 'Blockchain Topic 25',
      link: 'https://example.com/blockchain-topic-25'
   },
   {
      id: '26',
      status: null,
      added_as: 'reviewer',
      published: true,
      published_date: '2023-02-10',
      access_type: 'open',
      likes: 390,
      views: 3585,
      image: 'https://random.imagecdn.app/120/120',
      since: '2023-02-01',
      title: 'Blockchain Topic 26',
      link: 'https://example.com/blockchain-topic-26'
   },
   {
      id: '27',
      status: null,
      added_as: 'editor',
      published: false,
      published_date: '2023-03-10',
      access_type: 'open',
      likes: 546,
      views: 4883,
      image: 'https://random.imagecdn.app/130/130',
      since: '2023-03-01',
      title: 'Blockchain Topic 27',
      link: 'https://example.com/blockchain-topic-27'
   },
   {
      id: '28',
      status: 'published',
      added_as: 'reviewer',
      published: true,
      published_date: null,
      access_type: 'open',
      likes: null,
      views: null,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-04-01',
      title: 'Blockchain Topic 28',
      link: 'https://example.com/blockchain-topic-28'
   },
   {
      id: '29',
      status: null,
      added_as: 'reviewer',
      published: false,
      published_date: null,
      access_type: 'open',
      likes: 812,
      views: 3814,
      image: 'https://random.imagecdn.app/120/120',
      since: '2023-05-01',
      title: 'Blockchain Topic 29',
      link: 'https://example.com/blockchain-topic-29'
   },
   {
      id: '30',
      status: 'pending',
      added_as: 'editor',
      published: false,
      published_date: null,
      access_type: null,
      likes: null,
      views: 1481,
      image: 'https://random.imagecdn.app/130/130',
      since: '2023-06-01',
      title: 'Blockchain Topic 30',
      link: 'https://example.com/blockchain-topic-30'
   },
   {
      id: '31',
      status: 'rejected',
      added_as: 'reviewer',
      published: true,
      published_date: null,
      access_type: null,
      likes: 389,
      views: null,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-07-01',
      title: 'Blockchain Topic 31',
      link: 'https://example.com/blockchain-topic-31'
   },
   {
      id: '32',
      status: null,
      added_as: 'editor',
      published: true,
      published_date: '2023-08-10',
      access_type: 'open',
      likes: null,
      views: 3543,
      image: 'https://random.imagecdn.app/120/120',
      since: '2023-08-01',
      title: 'Blockchain Topic 32',
      link: 'https://example.com/blockchain-topic-32'
   },
   {
      id: '33',
      status: 'published',
      added_as: 'reviewer',
      published: true,
      published_date: '2023-09-10',
      access_type: 'open',
      likes: null,
      views: 784,
      image: 'https://random.imagecdn.app/130/130',
      since: '2023-09-01',
      title: 'Blockchain Topic 33',
      link: 'https://example.com/blockchain-topic-33'
   },
   {
      id: '34',
      status: 'approved',
      added_as: 'reviewer',
      published: true,
      published_date: null,
      access_type: 'paid',
      likes: 218,
      views: null,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-10-01',
      title: 'Blockchain Topic 34',
      link: 'https://example.com/blockchain-topic-34'
   },
   {
      id: '35',
      status: 'published',
      added_as: 'editor',
      published: true,
      published_date: '2023-11-10',
      access_type: 'open',
      likes: null,
      views: null,
      image: 'https://random.imagecdn.app/120/120',
      since: '2023-11-01',
      title: 'Blockchain Topic 35',
      link: 'https://example.com/blockchain-topic-35'
   },
   {
      id: '36',
      status: 'approved',
      added_as: 'reviewer',
      published: false,
      published_date: null,
      access_type: null,
      likes: null,
      views: null,
      image: 'https://random.imagecdn.app/130/130',
      since: '2023-12-01',
      title: 'Blockchain Topic 36',
      link: 'https://example.com/blockchain-topic-36'
   },
   {
      id: '37',
      status: 'pending',
      added_as: 'editor',
      published: true,
      published_date: '2023-01-10',
      access_type: 'paid',
      likes: 135,
      views: 4513,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-01-01',
      title: 'Blockchain Topic 37',
      link: 'https://example.com/blockchain-topic-37'
   },
   {
      id: '38',
      status: 'approved',
      added_as: 'reviewer',
      published: false,
      published_date: null,
      access_type: 'paid',
      likes: null,
      views: null,
      image: 'https://random.imagecdn.app/120/120',
      since: '2023-02-01',
      title: 'Blockchain Topic 38',
      link: 'https://example.com/blockchain-topic-38'
   },
   {
      id: '39',
      status: 'final_approved',
      added_as: 'editor',
      published: false,
      published_date: null,
      access_type: null,
      likes: 160,
      views: 3610,
      image: 'https://random.imagecdn.app/130/130',
      since: '2023-03-01',
      title: 'Blockchain Topic 39',
      link: 'https://example.com/blockchain-topic-39'
   },
   {
      id: '40',
      status: 'approved',
      added_as: 'reviewer',
      published: true,
      published_date: '2023-04-10',
      access_type: null,
      likes: null,
      views: 1369,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-04-01',
      title: 'Blockchain Topic 40',
      link: 'https://example.com/blockchain-topic-40'
   },
   {
      id: '41',
      status: 'published',
      added_as: 'editor',
      published: false,
      published_date: null,
      access_type: 'open',
      likes: null,
      views: null,
      image: 'https://random.imagecdn.app/120/120',
      since: '2023-05-01',
      title: 'Blockchain Topic 41',
      link: 'https://example.com/blockchain-topic-41'
   },
   {
      id: '42',
      status: 'rejected',
      added_as: 'reviewer',
      published: true,
      published_date: '2023-06-10',
      access_type: null,
      likes: 797,
      views: 294,
      image: 'https://random.imagecdn.app/130/130',
      since: '2023-06-01',
      title: 'Blockchain Topic 42',
      link: 'https://example.com/blockchain-topic-42'
   },
   {
      id: '43',
      status: 'published',
      added_as: 'editor',
      published: false,
      published_date: '2023-07-10',
      access_type: 'open',
      likes: 95,
      views: 3942,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-07-01',
      title: 'Blockchain Topic 43',
      link: 'https://example.com/blockchain-topic-43'
   },
   {
      id: '44',
      status: 'final_approved',
      added_as: 'editor',
      published: true,
      published_date: null,
      access_type: null,
      likes: 399,
      views: 3587,
      image: 'https://random.imagecdn.app/120/120',
      since: '2023-08-01',
      title: 'Blockchain Topic 44',
      link: 'https://example.com/blockchain-topic-44'
   },
   {
      id: '45',
      status: null,
      added_as: 'editor',
      published: false,
      published_date: null,
      access_type: 'open',
      likes: 269,
      views: null,
      image: 'https://random.imagecdn.app/130/130',
      since: '2023-09-01',
      title: 'Blockchain Topic 45',
      link: 'https://example.com/blockchain-topic-45'
   },
   {
      id: '46',
      status: null,
      added_as: 'editor',
      published: true,
      published_date: '2023-10-10',
      access_type: 'open',
      likes: null,
      views: null,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-10-01',
      title: 'Blockchain Topic 46',
      link: 'https://example.com/blockchain-topic-46'
   },
   {
      id: '47',
      status: null,
      added_as: 'editor',
      published: true,
      published_date: null,
      access_type: 'open',
      likes: null,
      views: 1437,
      image: 'https://random.imagecdn.app/120/120',
      since: '2023-11-01',
      title: 'Blockchain Topic 47',
      link: 'https://example.com/blockchain-topic-47'
   },
   {
      id: '48',
      status: null,
      added_as: 'editor',
      published: true,
      published_date: '2023-12-10',
      access_type: 'open',
      likes: null,
      views: 4348,
      image: 'https://random.imagecdn.app/130/130',
      since: '2023-12-01',
      title: 'Blockchain Topic 48',
      link: 'https://example.com/blockchain-topic-48'
   },
   {
      id: '49',
      status: null,
      added_as: 'editor',
      published: true,
      published_date: null,
      access_type: 'open',
      likes: 419,
      views: null,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-01-01',
      title: 'Blockchain Topic 49',
      link: 'https://example.com/blockchain-topic-49'
   },
   {
      id: '50',
      status: 'pending',
      added_as: 'editor',
      published: false,
      published_date: null,
      access_type: null,
      likes: null,
      views: null,
      image: 'https://random.imagecdn.app/120/120',
      since: '2023-02-01',
      title: 'Blockchain Topic 50',
      link: 'https://example.com/blockchain-topic-50'
   },
   {
      id: '51',
      status: null,
      added_as: 'reviewer',
      published: true,
      published_date: '2023-03-10',
      access_type: 'open',
      likes: 843,
      views: 1735,
      image: 'https://random.imagecdn.app/130/130',
      since: '2023-03-01',
      title: 'Blockchain Topic 51',
      link: 'https://example.com/blockchain-topic-51'
   },
   {
      id: '52',
      status: 'pending',
      added_as: 'editor',
      published: false,
      published_date: '2023-04-10',
      access_type: 'paid',
      likes: 148,
      views: null,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-04-01',
      title: 'Blockchain Topic 52',
      link: 'https://example.com/blockchain-topic-52'
   },
   {
      id: '53',
      status: 'published',
      added_as: 'reviewer',
      published: true,
      published_date: null,
      access_type: 'open',
      likes: null,
      views: 1016,
      image: 'https://random.imagecdn.app/120/120',
      since: '2023-05-01',
      title: 'Blockchain Topic 53',
      link: 'https://example.com/blockchain-topic-53'
   },
   {
      id: '54',
      status: null,
      added_as: 'editor',
      published: false,
      published_date: '2023-06-10',
      access_type: 'open',
      likes: 906,
      views: null,
      image: 'https://random.imagecdn.app/130/130',
      since: '2023-06-01',
      title: 'Blockchain Topic 54',
      link: 'https://example.com/blockchain-topic-54'
   },
   {
      id: '55',
      status: 'rejected',
      added_as: 'editor',
      published: false,
      published_date: '2023-07-10',
      access_type: null,
      likes: null,
      views: null,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-07-01',
      title: 'Blockchain Topic 55',
      link: 'https://example.com/blockchain-topic-55'
   },
   {
      id: '56',
      status: 'rejected',
      added_as: 'editor',
      published: false,
      published_date: null,
      access_type: 'paid',
      likes: 539,
      views: null,
      image: 'https://random.imagecdn.app/120/120',
      since: '2023-08-01',
      title: 'Blockchain Topic 56',
      link: 'https://example.com/blockchain-topic-56'
   },
   {
      id: '57',
      status: 'published',
      added_as: 'reviewer',
      published: true,
      published_date: '2023-09-10',
      access_type: 'open',
      likes: null,
      views: null,
      image: 'https://random.imagecdn.app/130/130',
      since: '2023-09-01',
      title: 'Blockchain Topic 57',
      link: 'https://example.com/blockchain-topic-57'
   },
   {
      id: '58',
      status: 'approved',
      added_as: 'reviewer',
      published: true,
      published_date: '2023-10-10',
      access_type: null,
      likes: null,
      views: null,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-10-01',
      title: 'Blockchain Topic 58',
      link: 'https://example.com/blockchain-topic-58'
   },
   {
      id: '59',
      status: null,
      added_as: 'reviewer',
      published: false,
      published_date: '2023-11-10',
      access_type: 'open',
      likes: 535,
      views: 4430,
      image: 'https://random.imagecdn.app/120/120',
      since: '2023-11-01',
      title: 'Blockchain Topic 59',
      link: 'https://example.com/blockchain-topic-59'
   },
   {
      id: '60',
      status: 'published',
      added_as: 'editor',
      published: true,
      published_date: '2023-12-10',
      access_type: 'open',
      likes: null,
      views: 1564,
      image: 'https://random.imagecdn.app/130/130',
      since: '2023-12-01',
      title: 'Blockchain Topic 60',
      link: 'https://example.com/blockchain-topic-60'
   },
   {
      id: '61',
      status: 'pending',
      added_as: 'editor',
      published: false,
      published_date: '2023-01-10',
      access_type: 'paid',
      likes: 664,
      views: null,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-01-01',
      title: 'Blockchain Topic 61',
      link: 'https://example.com/blockchain-topic-61'
   },
   {
      id: '62',
      status: 'rejected',
      added_as: 'editor',
      published: true,
      published_date: null,
      access_type: 'paid',
      likes: null,
      views: null,
      image: 'https://random.imagecdn.app/120/120',
      since: '2023-02-01',
      title: 'Blockchain Topic 62',
      link: 'https://example.com/blockchain-topic-62'
   },
   {
      id: '63',
      status: 'rejected',
      added_as: 'reviewer',
      published: true,
      published_date: null,
      access_type: 'paid',
      likes: 317,
      views: null,
      image: 'https://random.imagecdn.app/130/130',
      since: '2023-03-01',
      title: 'Blockchain Topic 63',
      link: 'https://example.com/blockchain-topic-63'
   },
   {
      id: '64',
      status: 'published',
      added_as: 'editor',
      published: true,
      published_date: null,
      access_type: 'open',
      likes: 524,
      views: null,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-04-01',
      title: 'Blockchain Topic 64',
      link: 'https://example.com/blockchain-topic-64'
   },
   {
      id: '65',
      status: 'rejected',
      added_as: 'editor',
      published: false,
      published_date: '2023-05-10',
      access_type: null,
      likes: null,
      views: null,
      image: 'https://random.imagecdn.app/120/120',
      since: '2023-05-01',
      title: 'Blockchain Topic 65',
      link: 'https://example.com/blockchain-topic-65'
   },
   {
      id: '66',
      status: null,
      added_as: 'reviewer',
      published: false,
      published_date: null,
      access_type: 'open',
      likes: 772,
      views: null,
      image: 'https://random.imagecdn.app/130/130',
      since: '2023-06-01',
      title: 'Blockchain Topic 66',
      link: 'https://example.com/blockchain-topic-66'
   },
   {
      id: '67',
      status: 'pending',
      added_as: 'reviewer',
      published: false,
      published_date: null,
      access_type: null,
      likes: null,
      views: 419,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-07-01',
      title: 'Blockchain Topic 67',
      link: 'https://example.com/blockchain-topic-67'
   },
   {
      id: '68',
      status: null,
      added_as: 'reviewer',
      published: false,
      published_date: null,
      access_type: 'open',
      likes: null,
      views: 1217,
      image: 'https://random.imagecdn.app/120/120',
      since: '2023-08-01',
      title: 'Blockchain Topic 68',
      link: 'https://example.com/blockchain-topic-68'
   },
   {
      id: '69',
      status: null,
      added_as: 'editor',
      published: false,
      published_date: '2023-09-10',
      access_type: 'open',
      likes: null,
      views: 4247,
      image: 'https://random.imagecdn.app/130/130',
      since: '2023-09-01',
      title: 'Blockchain Topic 69',
      link: 'https://example.com/blockchain-topic-69'
   },
   {
      id: '70',
      status: 'published',
      added_as: 'reviewer',
      published: true,
      published_date: '2023-10-10',
      access_type: 'open',
      likes: 640,
      views: 1067,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-10-01',
      title: 'Blockchain Topic 70',
      link: 'https://example.com/blockchain-topic-70'
   },
   {
      id: '71',
      status: null,
      added_as: 'editor',
      published: false,
      published_date: null,
      access_type: 'open',
      likes: 198,
      views: 2804,
      image: 'https://random.imagecdn.app/120/120',
      since: '2023-11-01',
      title: 'Blockchain Topic 71',
      link: 'https://example.com/blockchain-topic-71'
   },
   {
      id: '72',
      status: null,
      added_as: 'editor',
      published: false,
      published_date: '2023-12-10',
      access_type: 'open',
      likes: 616,
      views: 1287,
      image: 'https://random.imagecdn.app/130/130',
      since: '2023-12-01',
      title: 'Blockchain Topic 72',
      link: 'https://example.com/blockchain-topic-72'
   },
   {
      id: '73',
      status: 'rejected',
      added_as: 'editor',
      published: false,
      published_date: null,
      access_type: null,
      likes: 844,
      views: null,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-01-01',
      title: 'Blockchain Topic 73',
      link: 'https://example.com/blockchain-topic-73'
   },
   {
      id: '74',
      status: null,
      added_as: 'reviewer',
      published: false,
      published_date: null,
      access_type: 'open',
      likes: null,
      views: 432,
      image: 'https://random.imagecdn.app/120/120',
      since: '2023-02-01',
      title: 'Blockchain Topic 74',
      link: 'https://example.com/blockchain-topic-74'
   },
   {
      id: '75',
      status: 'published',
      added_as: 'reviewer',
      published: false,
      published_date: '2023-03-10',
      access_type: 'open',
      likes: null,
      views: null,
      image: 'https://random.imagecdn.app/130/130',
      since: '2023-03-01',
      title: 'Blockchain Topic 75',
      link: 'https://example.com/blockchain-topic-75'
   },
   {
      id: '76',
      status: 'published',
      added_as: 'editor',
      published: false,
      published_date: '2023-04-10',
      access_type: 'open',
      likes: null,
      views: null,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-04-01',
      title: 'Blockchain Topic 76',
      link: 'https://example.com/blockchain-topic-76'
   },
   {
      id: '77',
      status: 'pending',
      added_as: 'reviewer',
      published: true,
      published_date: null,
      access_type: null,
      likes: null,
      views: 2697,
      image: 'https://random.imagecdn.app/120/120',
      since: '2023-05-01',
      title: 'Blockchain Topic 77',
      link: 'https://example.com/blockchain-topic-77'
   },
   {
      id: '78',
      status: 'rejected',
      added_as: 'reviewer',
      published: true,
      published_date: null,
      access_type: null,
      likes: null,
      views: 174,
      image: 'https://random.imagecdn.app/130/130',
      since: '2023-06-01',
      title: 'Blockchain Topic 78',
      link: 'https://example.com/blockchain-topic-78'
   },
   {
      id: '79',
      status: 'published',
      added_as: 'reviewer',
      published: true,
      published_date: '2023-07-10',
      access_type: 'open',
      likes: null,
      views: 909,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-07-01',
      title: 'Blockchain Topic 79',
      link: 'https://example.com/blockchain-topic-79'
   },
   {
      id: '80',
      status: 'final_approved',
      added_as: 'editor',
      published: true,
      published_date: '2023-08-10',
      access_type: 'paid',
      likes: null,
      views: 60,
      image: 'https://random.imagecdn.app/120/120',
      since: '2023-08-01',
      title: 'Blockchain Topic 80',
      link: 'https://example.com/blockchain-topic-80'
   }
]
