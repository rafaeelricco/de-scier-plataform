'use client'

import { Dropdown } from '@/components/common/Dropdown/Dropdown'
import PaginationComponent from '@/components/common/Pagination/Pagination'
import ReviewerItem from '@/components/modules/AsReviewer/ReviewerItem/ReviewerItem'
import { ReviewerItemProps } from '@/components/modules/AsReviewer/ReviewerItem/Typing'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import useDebounce from '@/hooks/useDebounce'
import { filter_order_by, filter_status } from '@/mock/dropdow_filter_options'
import * as Input from '@components/common/Input/Input'
import * as Title from '@components/common/Title/Page'
import React from 'react'

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
                  <TabsContent value="account">
                     <div className="grid md:grid-cols-2 gap-4">
                        {results
                           .filter((article) => article.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
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
                           .filter((article) => article.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
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
      status: 'final_approved',
      added_as: 'reviewer',
      published: true,
      published_date: '2023-01-10',
      access_type: 'paid',
      likes: 40,
      views: 2011,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-01-01',
      title: 'Blockchain Topic 1',
      link: 'https://example.com/blockchain-topic-1'
   },
   {
      id: '2',
      status: 'rejected',
      added_as: 'editor',
      published: false,
      published_date: '2023-02-10',
      access_type: null,
      likes: null,
      views: null,
      image: 'https://random.imagecdn.app/120/120',
      since: '2023-02-01',
      title: 'Blockchain Topic 2',
      link: 'https://example.com/blockchain-topic-2'
   },
   {
      id: '3',
      status: 'rejected',
      added_as: 'reviewer',
      published: false,
      published_date: '2023-03-10',
      access_type: 'paid',
      likes: 722,
      views: 513,
      image: 'https://random.imagecdn.app/130/130',
      since: '2023-03-01',
      title: 'Blockchain Topic 3',
      link: 'https://example.com/blockchain-topic-3'
   },
   {
      id: '4',
      status: 'approved',
      added_as: 'editor',
      published: false,
      published_date: '2023-04-10',
      access_type: 'paid',
      likes: 619,
      views: 4862,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-04-01',
      title: 'Blockchain Topic 4',
      link: 'https://example.com/blockchain-topic-4'
   },
   {
      id: '5',
      status: 'approved',
      added_as: 'editor',
      published: false,
      published_date: '2023-05-10',
      access_type: null,
      likes: 892,
      views: 1273,
      image: 'https://random.imagecdn.app/120/120',
      since: '2023-05-01',
      title: 'Blockchain Topic 5',
      link: 'https://example.com/blockchain-topic-5'
   },
   {
      id: '6',
      status: 'rejected',
      added_as: 'reviewer',
      published: false,
      published_date: '2023-06-10',
      access_type: 'paid',
      likes: 781,
      views: 4207,
      image: 'https://random.imagecdn.app/130/130',
      since: '2023-06-01',
      title: 'Blockchain Topic 6',
      link: 'https://example.com/blockchain-topic-6'
   },
   {
      id: '7',
      status: 'final_approved',
      added_as: 'reviewer',
      published: true,
      published_date: '2023-07-10',
      access_type: 'paid',
      likes: 538,
      views: 3796,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-07-01',
      title: 'Blockchain Topic 7',
      link: 'https://example.com/blockchain-topic-7'
   },
   {
      id: '8',
      status: null,
      added_as: 'editor',
      published: true,
      published_date: '2023-08-10',
      access_type: 'open',
      likes: 307,
      views: 3584,
      image: 'https://random.imagecdn.app/120/120',
      since: '2023-08-01',
      title: 'Blockchain Topic 8',
      link: 'https://example.com/blockchain-topic-8'
   },
   {
      id: '9',
      status: 'final_approved',
      added_as: 'reviewer',
      published: true,
      published_date: '2023-09-10',
      access_type: 'paid',
      likes: 251,
      views: 2655,
      image: 'https://random.imagecdn.app/130/130',
      since: '2023-09-01',
      title: 'Blockchain Topic 9',
      link: 'https://example.com/blockchain-topic-9'
   },
   {
      id: '10',
      status: null,
      added_as: 'editor',
      published: true,
      published_date: '2023-10-10',
      access_type: 'open',
      likes: 495,
      views: 4712,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-10-01',
      title: 'Blockchain Topic 10',
      link: 'https://example.com/blockchain-topic-10'
   },
   {
      id: '11',
      status: 'final_approved',
      added_as: 'editor',
      published: false,
      published_date: null,
      access_type: null,
      likes: 941,
      views: 1392,
      image: 'https://random.imagecdn.app/120/120',
      since: '2023-11-01',
      title: 'Blockchain Topic 11',
      link: 'https://example.com/blockchain-topic-11'
   },
   {
      id: '12',
      status: null,
      added_as: 'editor',
      published: true,
      published_date: '2023-12-10',
      access_type: 'open',
      likes: 355,
      views: 1882,
      image: 'https://random.imagecdn.app/130/130',
      since: '2023-12-01',
      title: 'Blockchain Topic 12',
      link: 'https://example.com/blockchain-topic-12'
   },
   {
      id: '13',
      status: 'pending',
      added_as: 'editor',
      published: true,
      published_date: null,
      access_type: null,
      likes: 192,
      views: null,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-01-01',
      title: 'Blockchain Topic 13',
      link: 'https://example.com/blockchain-topic-13'
   },
   {
      id: '14',
      status: 'final_approved',
      added_as: 'editor',
      published: true,
      published_date: '2023-02-10',
      access_type: null,
      likes: 157,
      views: 3919,
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
      access_type: 'paid',
      likes: 849,
      views: 3148,
      image: 'https://random.imagecdn.app/130/130',
      since: '2023-03-01',
      title: 'Blockchain Topic 15',
      link: 'https://example.com/blockchain-topic-15'
   },
   {
      id: '16',
      status: 'published',
      added_as: 'reviewer',
      published: false,
      published_date: '2023-04-10',
      access_type: 'open',
      likes: 373,
      views: 785,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-04-01',
      title: 'Blockchain Topic 16',
      link: 'https://example.com/blockchain-topic-16'
   },
   {
      id: '17',
      status: null,
      added_as: 'reviewer',
      published: false,
      published_date: '2023-05-10',
      access_type: 'open',
      likes: 920,
      views: 3474,
      image: 'https://random.imagecdn.app/120/120',
      since: '2023-05-01',
      title: 'Blockchain Topic 17',
      link: 'https://example.com/blockchain-topic-17'
   },
   {
      id: '18',
      status: 'published',
      added_as: 'editor',
      published: true,
      published_date: '2023-06-10',
      access_type: 'open',
      likes: 894,
      views: 2585,
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
      published_date: '2023-07-10',
      access_type: 'paid',
      likes: 730,
      views: 1720,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-07-01',
      title: 'Blockchain Topic 19',
      link: 'https://example.com/blockchain-topic-19'
   },
   {
      id: '20',
      status: 'final_approved',
      added_as: 'reviewer',
      published: false,
      published_date: '2023-08-10',
      access_type: 'paid',
      likes: 668,
      views: 442,
      image: 'https://random.imagecdn.app/120/120',
      since: '2023-08-01',
      title: 'Blockchain Topic 20',
      link: 'https://example.com/blockchain-topic-20'
   },
   {
      id: '21',
      status: 'final_approved',
      added_as: 'editor',
      published: false,
      published_date: '2023-09-10',
      access_type: null,
      likes: 88,
      views: null,
      image: 'https://random.imagecdn.app/130/130',
      since: '2023-09-01',
      title: 'Blockchain Topic 21',
      link: 'https://example.com/blockchain-topic-21'
   },
   {
      id: '22',
      status: 'rejected',
      added_as: 'reviewer',
      published: false,
      published_date: '2023-10-10',
      access_type: 'paid',
      likes: 701,
      views: 36,
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
      published_date: '2023-11-10',
      access_type: 'paid',
      likes: 30,
      views: 344,
      image: 'https://random.imagecdn.app/120/120',
      since: '2023-11-01',
      title: 'Blockchain Topic 23',
      link: 'https://example.com/blockchain-topic-23'
   },
   {
      id: '24',
      status: 'published',
      added_as: 'reviewer',
      published: false,
      published_date: '2023-12-10',
      access_type: 'open',
      likes: 540,
      views: 1058,
      image: 'https://random.imagecdn.app/130/130',
      since: '2023-12-01',
      title: 'Blockchain Topic 24',
      link: 'https://example.com/blockchain-topic-24'
   },
   {
      id: '25',
      status: 'approved',
      added_as: 'editor',
      published: false,
      published_date: '2023-01-10',
      access_type: null,
      likes: null,
      views: null,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-01-01',
      title: 'Blockchain Topic 25',
      link: 'https://example.com/blockchain-topic-25'
   },
   {
      id: '26',
      status: 'rejected',
      added_as: 'editor',
      published: true,
      published_date: '2023-02-10',
      access_type: 'paid',
      likes: 324,
      views: 2575,
      image: 'https://random.imagecdn.app/120/120',
      since: '2023-02-01',
      title: 'Blockchain Topic 26',
      link: 'https://example.com/blockchain-topic-26'
   },
   {
      id: '27',
      status: 'final_approved',
      added_as: 'editor',
      published: true,
      published_date: null,
      access_type: null,
      likes: 82,
      views: 901,
      image: 'https://random.imagecdn.app/130/130',
      since: '2023-03-01',
      title: 'Blockchain Topic 27',
      link: 'https://example.com/blockchain-topic-27'
   },
   {
      id: '28',
      status: 'pending',
      added_as: 'reviewer',
      published: false,
      published_date: null,
      access_type: null,
      likes: null,
      views: 358,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-04-01',
      title: 'Blockchain Topic 28',
      link: 'https://example.com/blockchain-topic-28'
   },
   {
      id: '29',
      status: 'final_approved',
      added_as: 'reviewer',
      published: true,
      published_date: null,
      access_type: null,
      likes: 44,
      views: null,
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
      likes: 835,
      views: 1827,
      image: 'https://random.imagecdn.app/130/130',
      since: '2023-06-01',
      title: 'Blockchain Topic 30',
      link: 'https://example.com/blockchain-topic-30'
   },
   {
      id: '31',
      status: 'published',
      added_as: 'reviewer',
      published: true,
      published_date: '2023-07-10',
      access_type: 'open',
      likes: 692,
      views: 774,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-07-01',
      title: 'Blockchain Topic 31',
      link: 'https://example.com/blockchain-topic-31'
   },
   {
      id: '32',
      status: 'published',
      added_as: 'reviewer',
      published: false,
      published_date: '2023-08-10',
      access_type: 'open',
      likes: 782,
      views: 2156,
      image: 'https://random.imagecdn.app/120/120',
      since: '2023-08-01',
      title: 'Blockchain Topic 32',
      link: 'https://example.com/blockchain-topic-32'
   },
   {
      id: '33',
      status: 'rejected',
      added_as: 'editor',
      published: false,
      published_date: '2023-09-10',
      access_type: 'paid',
      likes: 652,
      views: 2650,
      image: 'https://random.imagecdn.app/130/130',
      since: '2023-09-01',
      title: 'Blockchain Topic 33',
      link: 'https://example.com/blockchain-topic-33'
   },
   {
      id: '34',
      status: 'approved',
      added_as: 'editor',
      published: false,
      published_date: '2023-10-10',
      access_type: null,
      likes: 77,
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
      likes: 729,
      views: 1841,
      image: 'https://random.imagecdn.app/120/120',
      since: '2023-11-01',
      title: 'Blockchain Topic 35',
      link: 'https://example.com/blockchain-topic-35'
   },
   {
      id: '36',
      status: 'approved',
      added_as: 'editor',
      published: true,
      published_date: '2023-12-10',
      access_type: 'paid',
      likes: 208,
      views: 3636,
      image: 'https://random.imagecdn.app/130/130',
      since: '2023-12-01',
      title: 'Blockchain Topic 36',
      link: 'https://example.com/blockchain-topic-36'
   },
   {
      id: '37',
      status: 'rejected',
      added_as: 'editor',
      published: true,
      published_date: null,
      access_type: null,
      likes: 1000,
      views: null,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-01-01',
      title: 'Blockchain Topic 37',
      link: 'https://example.com/blockchain-topic-37'
   },
   {
      id: '38',
      status: 'final_approved',
      added_as: 'editor',
      published: true,
      published_date: null,
      access_type: null,
      likes: 881,
      views: 1779,
      image: 'https://random.imagecdn.app/120/120',
      since: '2023-02-01',
      title: 'Blockchain Topic 38',
      link: 'https://example.com/blockchain-topic-38'
   },
   {
      id: '39',
      status: 'approved',
      added_as: 'editor',
      published: false,
      published_date: '2023-03-10',
      access_type: 'paid',
      likes: 193,
      views: 1167,
      image: 'https://random.imagecdn.app/130/130',
      since: '2023-03-01',
      title: 'Blockchain Topic 39',
      link: 'https://example.com/blockchain-topic-39'
   },
   {
      id: '40',
      status: null,
      added_as: 'editor',
      published: true,
      published_date: '2023-04-10',
      access_type: 'open',
      likes: 869,
      views: 1610,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-04-01',
      title: 'Blockchain Topic 40',
      link: 'https://example.com/blockchain-topic-40'
   },
   {
      id: '41',
      status: null,
      added_as: 'reviewer',
      published: true,
      published_date: '2023-05-10',
      access_type: 'open',
      likes: 195,
      views: 2647,
      image: 'https://random.imagecdn.app/120/120',
      since: '2023-05-01',
      title: 'Blockchain Topic 41',
      link: 'https://example.com/blockchain-topic-41'
   },
   {
      id: '42',
      status: 'pending',
      added_as: 'editor',
      published: true,
      published_date: '2023-06-10',
      access_type: 'paid',
      likes: 569,
      views: 2187,
      image: 'https://random.imagecdn.app/130/130',
      since: '2023-06-01',
      title: 'Blockchain Topic 42',
      link: 'https://example.com/blockchain-topic-42'
   },
   {
      id: '43',
      status: 'published',
      added_as: 'reviewer',
      published: true,
      published_date: '2023-07-10',
      access_type: 'open',
      likes: 356,
      views: 2441,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-07-01',
      title: 'Blockchain Topic 43',
      link: 'https://example.com/blockchain-topic-43'
   },
   {
      id: '44',
      status: 'rejected',
      added_as: 'reviewer',
      published: true,
      published_date: null,
      access_type: null,
      likes: null,
      views: 3763,
      image: 'https://random.imagecdn.app/120/120',
      since: '2023-08-01',
      title: 'Blockchain Topic 44',
      link: 'https://example.com/blockchain-topic-44'
   },
   {
      id: '45',
      status: 'published',
      added_as: 'editor',
      published: true,
      published_date: '2023-09-10',
      access_type: 'open',
      likes: 881,
      views: 4292,
      image: 'https://random.imagecdn.app/130/130',
      since: '2023-09-01',
      title: 'Blockchain Topic 45',
      link: 'https://example.com/blockchain-topic-45'
   },
   {
      id: '46',
      status: 'final_approved',
      added_as: 'reviewer',
      published: false,
      published_date: '2023-10-10',
      access_type: 'paid',
      likes: 283,
      views: 3241,
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
      published_date: '2023-11-10',
      access_type: 'open',
      likes: 948,
      views: 285,
      image: 'https://random.imagecdn.app/120/120',
      since: '2023-11-01',
      title: 'Blockchain Topic 47',
      link: 'https://example.com/blockchain-topic-47'
   },
   {
      id: '48',
      status: 'rejected',
      added_as: 'editor',
      published: false,
      published_date: '2023-12-10',
      access_type: null,
      likes: null,
      views: 3014,
      image: 'https://random.imagecdn.app/130/130',
      since: '2023-12-01',
      title: 'Blockchain Topic 48',
      link: 'https://example.com/blockchain-topic-48'
   },
   {
      id: '49',
      status: 'approved',
      added_as: 'reviewer',
      published: true,
      published_date: '2023-01-10',
      access_type: null,
      likes: 779,
      views: 656,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-01-01',
      title: 'Blockchain Topic 49',
      link: 'https://example.com/blockchain-topic-49'
   },
   {
      id: '50',
      status: 'published',
      added_as: 'editor',
      published: true,
      published_date: '2023-02-10',
      access_type: 'open',
      likes: 203,
      views: 3162,
      image: 'https://random.imagecdn.app/120/120',
      since: '2023-02-01',
      title: 'Blockchain Topic 50',
      link: 'https://example.com/blockchain-topic-50'
   },
   {
      id: '51',
      status: 'approved',
      added_as: 'editor',
      published: false,
      published_date: null,
      access_type: null,
      likes: null,
      views: 806,
      image: 'https://random.imagecdn.app/130/130',
      since: '2023-03-01',
      title: 'Blockchain Topic 51',
      link: 'https://example.com/blockchain-topic-51'
   },
   {
      id: '52',
      status: 'published',
      added_as: 'reviewer',
      published: true,
      published_date: '2023-04-10',
      access_type: 'open',
      likes: 773,
      views: 4502,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-04-01',
      title: 'Blockchain Topic 52',
      link: 'https://example.com/blockchain-topic-52'
   },
   {
      id: '53',
      status: 'pending',
      added_as: 'reviewer',
      published: false,
      published_date: '2023-05-10',
      access_type: 'paid',
      likes: 627,
      views: 2027,
      image: 'https://random.imagecdn.app/120/120',
      since: '2023-05-01',
      title: 'Blockchain Topic 53',
      link: 'https://example.com/blockchain-topic-53'
   },
   {
      id: '54',
      status: 'pending',
      added_as: 'editor',
      published: false,
      published_date: '2023-06-10',
      access_type: 'paid',
      likes: 750,
      views: 1419,
      image: 'https://random.imagecdn.app/130/130',
      since: '2023-06-01',
      title: 'Blockchain Topic 54',
      link: 'https://example.com/blockchain-topic-54'
   },
   {
      id: '55',
      status: 'final_approved',
      added_as: 'editor',
      published: false,
      published_date: '2023-07-10',
      access_type: 'paid',
      likes: 728,
      views: 742,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-07-01',
      title: 'Blockchain Topic 55',
      link: 'https://example.com/blockchain-topic-55'
   },
   {
      id: '56',
      status: 'final_approved',
      added_as: 'editor',
      published: true,
      published_date: '2023-08-10',
      access_type: null,
      likes: 812,
      views: 4379,
      image: 'https://random.imagecdn.app/120/120',
      since: '2023-08-01',
      title: 'Blockchain Topic 56',
      link: 'https://example.com/blockchain-topic-56'
   },
   {
      id: '57',
      status: null,
      added_as: 'reviewer',
      published: false,
      published_date: '2023-09-10',
      access_type: 'open',
      likes: 618,
      views: 3609,
      image: 'https://random.imagecdn.app/130/130',
      since: '2023-09-01',
      title: 'Blockchain Topic 57',
      link: 'https://example.com/blockchain-topic-57'
   },
   {
      id: '58',
      status: null,
      added_as: 'reviewer',
      published: true,
      published_date: '2023-10-10',
      access_type: 'open',
      likes: 817,
      views: 2723,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-10-01',
      title: 'Blockchain Topic 58',
      link: 'https://example.com/blockchain-topic-58'
   },
   {
      id: '59',
      status: 'published',
      added_as: 'editor',
      published: false,
      published_date: '2023-11-10',
      access_type: 'open',
      likes: 935,
      views: 1285,
      image: 'https://random.imagecdn.app/120/120',
      since: '2023-11-01',
      title: 'Blockchain Topic 59',
      link: 'https://example.com/blockchain-topic-59'
   },
   {
      id: '60',
      status: 'pending',
      added_as: 'reviewer',
      published: false,
      published_date: null,
      access_type: null,
      likes: null,
      views: null,
      image: 'https://random.imagecdn.app/130/130',
      since: '2023-12-01',
      title: 'Blockchain Topic 60',
      link: 'https://example.com/blockchain-topic-60'
   },
   {
      id: '61',
      status: 'approved',
      added_as: 'reviewer',
      published: false,
      published_date: '2023-01-10',
      access_type: null,
      likes: 697,
      views: 1233,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-01-01',
      title: 'Blockchain Topic 61',
      link: 'https://example.com/blockchain-topic-61'
   },
   {
      id: '62',
      status: 'pending',
      added_as: 'editor',
      published: false,
      published_date: null,
      access_type: null,
      likes: null,
      views: null,
      image: 'https://random.imagecdn.app/120/120',
      since: '2023-02-01',
      title: 'Blockchain Topic 62',
      link: 'https://example.com/blockchain-topic-62'
   },
   {
      id: '63',
      status: 'approved',
      added_as: 'reviewer',
      published: true,
      published_date: '2023-03-10',
      access_type: 'paid',
      likes: 297,
      views: 3130,
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
      published_date: '2023-04-10',
      access_type: 'open',
      likes: 6,
      views: 4372,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-04-01',
      title: 'Blockchain Topic 64',
      link: 'https://example.com/blockchain-topic-64'
   },
   {
      id: '65',
      status: 'pending',
      added_as: 'editor',
      published: false,
      published_date: '2023-05-10',
      access_type: 'paid',
      likes: 822,
      views: 1725,
      image: 'https://random.imagecdn.app/120/120',
      since: '2023-05-01',
      title: 'Blockchain Topic 65',
      link: 'https://example.com/blockchain-topic-65'
   },
   {
      id: '66',
      status: null,
      added_as: 'reviewer',
      published: true,
      published_date: '2023-06-10',
      access_type: 'open',
      likes: 477,
      views: 4239,
      image: 'https://random.imagecdn.app/130/130',
      since: '2023-06-01',
      title: 'Blockchain Topic 66',
      link: 'https://example.com/blockchain-topic-66'
   },
   {
      id: '67',
      status: 'published',
      added_as: 'reviewer',
      published: false,
      published_date: '2023-07-10',
      access_type: 'open',
      likes: 659,
      views: 167,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-07-01',
      title: 'Blockchain Topic 67',
      link: 'https://example.com/blockchain-topic-67'
   },
   {
      id: '68',
      status: 'published',
      added_as: 'reviewer',
      published: false,
      published_date: '2023-08-10',
      access_type: 'open',
      likes: 34,
      views: 4805,
      image: 'https://random.imagecdn.app/120/120',
      since: '2023-08-01',
      title: 'Blockchain Topic 68',
      link: 'https://example.com/blockchain-topic-68'
   },
   {
      id: '69',
      status: 'approved',
      added_as: 'reviewer',
      published: true,
      published_date: '2023-09-10',
      access_type: 'paid',
      likes: 557,
      views: 122,
      image: 'https://random.imagecdn.app/130/130',
      since: '2023-09-01',
      title: 'Blockchain Topic 69',
      link: 'https://example.com/blockchain-topic-69'
   },
   {
      id: '70',
      status: 'pending',
      added_as: 'editor',
      published: false,
      published_date: null,
      access_type: null,
      likes: 193,
      views: null,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-10-01',
      title: 'Blockchain Topic 70',
      link: 'https://example.com/blockchain-topic-70'
   },
   {
      id: '71',
      status: 'pending',
      added_as: 'editor',
      published: true,
      published_date: '2023-11-10',
      access_type: 'paid',
      likes: 603,
      views: 478,
      image: 'https://random.imagecdn.app/120/120',
      since: '2023-11-01',
      title: 'Blockchain Topic 71',
      link: 'https://example.com/blockchain-topic-71'
   },
   {
      id: '72',
      status: 'published',
      added_as: 'reviewer',
      published: true,
      published_date: '2023-12-10',
      access_type: 'open',
      likes: 134,
      views: 4255,
      image: 'https://random.imagecdn.app/130/130',
      since: '2023-12-01',
      title: 'Blockchain Topic 72',
      link: 'https://example.com/blockchain-topic-72'
   },
   {
      id: '73',
      status: 'approved',
      added_as: 'editor',
      published: false,
      published_date: '2023-01-10',
      access_type: 'paid',
      likes: 451,
      views: 426,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-01-01',
      title: 'Blockchain Topic 73',
      link: 'https://example.com/blockchain-topic-73'
   },
   {
      id: '74',
      status: null,
      added_as: 'editor',
      published: false,
      published_date: '2023-02-10',
      access_type: 'open',
      likes: 703,
      views: 4401,
      image: 'https://random.imagecdn.app/120/120',
      since: '2023-02-01',
      title: 'Blockchain Topic 74',
      link: 'https://example.com/blockchain-topic-74'
   },
   {
      id: '75',
      status: 'final_approved',
      added_as: 'reviewer',
      published: true,
      published_date: null,
      access_type: null,
      likes: null,
      views: 541,
      image: 'https://random.imagecdn.app/130/130',
      since: '2023-03-01',
      title: 'Blockchain Topic 75',
      link: 'https://example.com/blockchain-topic-75'
   },
   {
      id: '76',
      status: 'published',
      added_as: 'editor',
      published: true,
      published_date: '2023-04-10',
      access_type: 'open',
      likes: 756,
      views: 1742,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-04-01',
      title: 'Blockchain Topic 76',
      link: 'https://example.com/blockchain-topic-76'
   },
   {
      id: '77',
      status: null,
      added_as: 'reviewer',
      published: true,
      published_date: '2023-05-10',
      access_type: 'open',
      likes: 255,
      views: 4701,
      image: 'https://random.imagecdn.app/120/120',
      since: '2023-05-01',
      title: 'Blockchain Topic 77',
      link: 'https://example.com/blockchain-topic-77'
   },
   {
      id: '78',
      status: 'final_approved',
      added_as: 'reviewer',
      published: true,
      published_date: '2023-06-10',
      access_type: 'paid',
      likes: 929,
      views: 4433,
      image: 'https://random.imagecdn.app/130/130',
      since: '2023-06-01',
      title: 'Blockchain Topic 78',
      link: 'https://example.com/blockchain-topic-78'
   },
   {
      id: '79',
      status: 'pending',
      added_as: 'reviewer',
      published: false,
      published_date: '2023-07-10',
      access_type: 'paid',
      likes: 904,
      views: 3755,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-07-01',
      title: 'Blockchain Topic 79',
      link: 'https://example.com/blockchain-topic-79'
   },
   {
      id: '80',
      status: 'published',
      added_as: 'editor',
      published: true,
      published_date: '2023-08-10',
      access_type: 'open',
      likes: 877,
      views: 1809,
      image: 'https://random.imagecdn.app/120/120',
      since: '2023-08-01',
      title: 'Blockchain Topic 80',
      link: 'https://example.com/blockchain-topic-80'
   }
]
