'use client'

import PaginationComponent from '@/components/common/Pagination/Pagination'
import ReviewerItem, { ReviewerItemProps } from '@/components/modules/AsReviewer/ReviewerItem'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import * as Button from '@components/common/Button/Button'
import * as Input from '@components/common/Input/Input'
import * as Title from '@components/common/Title/Page'
import React from 'react'
import { CaretDown, Search } from 'react-bootstrap-icons'

export default function AsReviewerPage() {
   const per_page = 6
   const [page, setPage] = React.useState(1)
   const [results, setResults] = React.useState(articles_under_review)
   const [totalPages, setTotalPages] = React.useState(Math.ceil(results.length / per_page))

   return (
      <React.Fragment>
         <Title.Root>
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
                     <Input.Search placeholder="Find articles with this terms" />
                     <Button.Button className="px-4 py-3 h-fit text-sm">
                        Search
                        <Search />
                     </Button.Button>
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
                        {results.slice((page - 1) * per_page, page * per_page).map((article) => (
                           <React.Fragment key={article.id}>
                              <ReviewerItem
                                 title={article.title}
                                 since={article.since}
                                 image={article.image}
                                 link={article.link}
                                 added_as={article.added_as}
                                 status={article.status}
                              />
                           </React.Fragment>
                        ))}
                     </div>
                  </TabsContent>
                  <TabsContent value="password">
                     <div className="grid grid-cols-2 gap-4">
                        {results.slice((page - 1) * per_page, page * per_page).map((article) => (
                           <React.Fragment key={article.id}>
                              <ReviewerItem
                                 title={article.title}
                                 since={article.since}
                                 image={article.image}
                                 link={article.link}
                                 added_as={article.added_as}
                                 status={article.status}
                              />
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
      added_as: 'reviewer',
      published: true,
      published_date: null,
      access_type: 'open',
      likes: 786,
      views: 4691,
      image: 'https://random.imagecdn.app/150/150',
      since: '2023-01-01',
      title: 'Blockchain Topic 1',
      link: 'https://example.com/blockchain-topic-1'
   },
   {
      id: '2',
      status: 'approved',
      added_as: 'editor',
      published: false,
      published_date: null,
      access_type: null,
      likes: 527,
      views: 4947,
      image: 'https://random.imagecdn.app/250/250',
      since: '2023-02-01',
      title: 'Blockchain Topic 2',
      link: 'https://example.com/blockchain-topic-2'
   },
   {
      id: '3',
      status: 'approved',
      added_as: 'reviewer',
      published: true,
      published_date: '2023-03-10',
      access_type: 'paid',
      likes: null,
      views: null,
      image: 'https://random.imagecdn.app/100/100',
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
      image: 'https://random.imagecdn.app/150/150',
      since: '2023-04-01',
      title: 'Blockchain Topic 4',
      link: 'https://example.com/blockchain-topic-4'
   },
   {
      id: '5',
      status: 'pending',
      added_as: 'editor',
      published: true,
      published_date: null,
      access_type: 'paid',
      likes: null,
      views: null,
      image: 'https://random.imagecdn.app/250/250',
      since: '2023-05-01',
      title: 'Blockchain Topic 5',
      link: 'https://example.com/blockchain-topic-5'
   },
   {
      id: '6',
      status: 'approved',
      added_as: 'reviewer',
      published: false,
      published_date: '2023-06-10',
      access_type: null,
      likes: 748,
      views: null,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-06-01',
      title: 'Blockchain Topic 6',
      link: 'https://example.com/blockchain-topic-6'
   },
   {
      id: '7',
      status: 'pending',
      added_as: 'reviewer',
      published: true,
      published_date: '2023-07-10',
      access_type: 'paid',
      likes: null,
      views: 201,
      image: 'https://random.imagecdn.app/150/150',
      since: '2023-07-01',
      title: 'Blockchain Topic 7',
      link: 'https://example.com/blockchain-topic-7'
   },
   {
      id: '8',
      status: 'approved',
      added_as: 'editor',
      published: true,
      published_date: null,
      access_type: 'open',
      likes: 607,
      views: null,
      image: 'https://random.imagecdn.app/250/250',
      since: '2023-08-01',
      title: 'Blockchain Topic 8',
      link: 'https://example.com/blockchain-topic-8'
   },
   {
      id: '9',
      status: 'pending',
      added_as: 'editor',
      published: true,
      published_date: '2023-09-10',
      access_type: 'open',
      likes: 135,
      views: null,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-09-01',
      title: 'Blockchain Topic 9',
      link: 'https://example.com/blockchain-topic-9'
   },
   {
      id: '10',
      status: 'approved',
      added_as: 'editor',
      published: true,
      published_date: null,
      access_type: 'paid',
      likes: 617,
      views: null,
      image: 'https://random.imagecdn.app/150/150',
      since: '2023-10-01',
      title: 'Blockchain Topic 10',
      link: 'https://example.com/blockchain-topic-10'
   },
   {
      id: '11',
      status: 'approved',
      added_as: 'reviewer',
      published: false,
      published_date: null,
      access_type: null,
      likes: 171,
      views: 1293,
      image: 'https://random.imagecdn.app/250/250',
      since: '2023-11-01',
      title: 'Blockchain Topic 11',
      link: 'https://example.com/blockchain-topic-11'
   },
   {
      id: '12',
      status: 'approved',
      added_as: 'editor',
      published: true,
      published_date: null,
      access_type: 'open',
      likes: null,
      views: 679,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-12-01',
      title: 'Blockchain Topic 12',
      link: 'https://example.com/blockchain-topic-12'
   },
   {
      id: '13',
      status: 'pending',
      added_as: 'reviewer',
      published: true,
      published_date: '2023-01-10',
      access_type: 'paid',
      likes: 265,
      views: null,
      image: 'https://random.imagecdn.app/150/150',
      since: '2023-01-01',
      title: 'Blockchain Topic 13',
      link: 'https://example.com/blockchain-topic-13'
   },
   {
      id: '14',
      status: 'approved',
      added_as: 'editor',
      published: false,
      published_date: null,
      access_type: 'open',
      likes: null,
      views: null,
      image: 'https://random.imagecdn.app/250/250',
      since: '2023-02-01',
      title: 'Blockchain Topic 14',
      link: 'https://example.com/blockchain-topic-14'
   },
   {
      id: '15',
      status: 'approved',
      added_as: 'reviewer',
      published: true,
      published_date: null,
      access_type: 'paid',
      likes: 745,
      views: null,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-03-01',
      title: 'Blockchain Topic 15',
      link: 'https://example.com/blockchain-topic-15'
   },
   {
      id: '16',
      status: 'approved',
      added_as: 'editor',
      published: true,
      published_date: null,
      access_type: null,
      likes: null,
      views: 3949,
      image: 'https://random.imagecdn.app/150/150',
      since: '2023-04-01',
      title: 'Blockchain Topic 16',
      link: 'https://example.com/blockchain-topic-16'
   },
   {
      id: '17',
      status: 'approved',
      added_as: 'editor',
      published: false,
      published_date: '2023-05-10',
      access_type: null,
      likes: null,
      views: 3821,
      image: 'https://random.imagecdn.app/250/250',
      since: '2023-05-01',
      title: 'Blockchain Topic 17',
      link: 'https://example.com/blockchain-topic-17'
   },
   {
      id: '18',
      status: 'approved',
      added_as: 'editor',
      published: true,
      published_date: '2023-06-10',
      access_type: 'paid',
      likes: null,
      views: 2614,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-06-01',
      title: 'Blockchain Topic 18',
      link: 'https://example.com/blockchain-topic-18'
   },
   {
      id: '19',
      status: 'pending',
      added_as: 'editor',
      published: true,
      published_date: '2023-07-10',
      access_type: 'open',
      likes: 367,
      views: null,
      image: 'https://random.imagecdn.app/150/150',
      since: '2023-07-01',
      title: 'Blockchain Topic 19',
      link: 'https://example.com/blockchain-topic-19'
   },
   {
      id: '20',
      status: 'approved',
      added_as: 'reviewer',
      published: true,
      published_date: '2023-08-10',
      access_type: 'paid',
      likes: null,
      views: 4854,
      image: 'https://random.imagecdn.app/250/250',
      since: '2023-08-01',
      title: 'Blockchain Topic 20',
      link: 'https://example.com/blockchain-topic-20'
   },
   {
      id: '21',
      status: 'approved',
      added_as: 'editor',
      published: true,
      published_date: null,
      access_type: null,
      likes: 513,
      views: null,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-09-01',
      title: 'Blockchain Topic 21',
      link: 'https://example.com/blockchain-topic-21'
   },
   {
      id: '22',
      status: 'pending',
      added_as: 'editor',
      published: true,
      published_date: null,
      access_type: 'open',
      likes: 518,
      views: null,
      image: 'https://random.imagecdn.app/150/150',
      since: '2023-10-01',
      title: 'Blockchain Topic 22',
      link: 'https://example.com/blockchain-topic-22'
   },
   {
      id: '23',
      status: 'approved',
      added_as: 'reviewer',
      published: true,
      published_date: null,
      access_type: null,
      likes: null,
      views: 208,
      image: 'https://random.imagecdn.app/250/250',
      since: '2023-11-01',
      title: 'Blockchain Topic 23',
      link: 'https://example.com/blockchain-topic-23'
   },
   {
      id: '24',
      status: 'pending',
      added_as: 'editor',
      published: true,
      published_date: null,
      access_type: null,
      likes: 737,
      views: 1814,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-12-01',
      title: 'Blockchain Topic 24',
      link: 'https://example.com/blockchain-topic-24'
   },
   {
      id: '25',
      status: 'pending',
      added_as: 'editor',
      published: false,
      published_date: '2023-01-10',
      access_type: 'open',
      likes: null,
      views: 3709,
      image: 'https://random.imagecdn.app/150/150',
      since: '2023-01-01',
      title: 'Blockchain Topic 25',
      link: 'https://example.com/blockchain-topic-25'
   },
   {
      id: '26',
      status: 'pending',
      added_as: 'reviewer',
      published: true,
      published_date: '2023-02-10',
      access_type: 'open',
      likes: 611,
      views: 727,
      image: 'https://random.imagecdn.app/250/250',
      since: '2023-02-01',
      title: 'Blockchain Topic 26',
      link: 'https://example.com/blockchain-topic-26'
   },
   {
      id: '27',
      status: 'approved',
      added_as: 'reviewer',
      published: false,
      published_date: '2023-03-10',
      access_type: 'open',
      likes: null,
      views: null,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-03-01',
      title: 'Blockchain Topic 27',
      link: 'https://example.com/blockchain-topic-27'
   },
   {
      id: '28',
      status: 'approved',
      added_as: 'reviewer',
      published: false,
      published_date: '2023-04-10',
      access_type: null,
      likes: 93,
      views: null,
      image: 'https://random.imagecdn.app/150/150',
      since: '2023-04-01',
      title: 'Blockchain Topic 28',
      link: 'https://example.com/blockchain-topic-28'
   },
   {
      id: '29',
      status: 'approved',
      added_as: 'editor',
      published: true,
      published_date: '2023-05-10',
      access_type: 'paid',
      likes: 814,
      views: null,
      image: 'https://random.imagecdn.app/250/250',
      since: '2023-05-01',
      title: 'Blockchain Topic 29',
      link: 'https://example.com/blockchain-topic-29'
   },
   {
      id: '30',
      status: 'approved',
      added_as: 'reviewer',
      published: false,
      published_date: '2023-06-10',
      access_type: 'open',
      likes: 575,
      views: 2266,
      image: 'https://random.imagecdn.app/100/100',
      since: '2023-06-01',
      title: 'Blockchain Topic 30',
      link: 'https://example.com/blockchain-topic-30'
   },
   {
      id: '31',
      status: 'approved',
      added_as: 'reviewer',
      published: false,
      published_date: '2023-07-10',
      access_type: 'paid',
      likes: 88,
      views: 2675,
      image: 'https://random.imagecdn.app/150/150',
      since: '2023-07-01',
      title: 'Blockchain Topic 31',
      link: 'https://example.com/blockchain-topic-31'
   },
   {
      id: '32',
      status: 'pending',
      added_as: 'editor',
      published: false,
      published_date: '2023-08-10',
      access_type: null,
      likes: 564,
      views: null,
      image: 'https://random.imagecdn.app/250/250',
      since: '2023-08-01',
      title: 'Blockchain Topic 32',
      link: 'https://example.com/blockchain-topic-32'
   }
]
