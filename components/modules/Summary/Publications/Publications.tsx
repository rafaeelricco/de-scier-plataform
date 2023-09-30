import PaginationComponent from '@/components/common/Pagination/Pagination'
import InReviewItem, { InReviewItemProps } from '@/components/common/Publication/Item/InReview'
import PublicationItem, {
   PublicationItemProps
} from '@/components/common/Publication/Item/Published'
import React from 'react'

const Publications: React.FC = () => {
   const [underReview, setUnderReview] = React.useState(false)
   const [publications, setPublications] = React.useState(true)

   const per_page = 3

   const [page, setPage] = React.useState(1)
   const [pageReview, setPageReview] = React.useState(1)

   const [results, setResults] = React.useState(published_mock)
   const [resultsReview, setResultsReview] = React.useState(under_review)

   const [totalPages, setTotalPages] = React.useState(Math.ceil(results.length / per_page))
   const [totalPagesReview, setTotalPagesReview] = React.useState(
      Math.ceil(resultsReview.length / per_page)
   )

   return (
      <React.Fragment>
         <div className="divider-v" />
         <div className="flex flex-col gap-4 h-full">
            <div className="grid grid-cols-2 items-start w-full h-fit">
               <button
                  data-active={publications}
                  className="py-2 px-4 font-semibold text-base text-[#009EAB] rounded-[32px] w-full data-[active='true']:bg-[#F1FFFF] transition-all duration-200 data-[active='false']:text-neutral-light_gray data-[active='false']:font-regular lg:text-sm 2xl:text-base"
                  onClick={() => {
                     setPublications(true)
                     setUnderReview(false)
                     setPage(1)
                     setResults(published_mock)
                     setTotalPages(Math.ceil(published_mock.length / per_page))
                  }}
               >
                  Published articles
               </button>
               <button
                  data-active={underReview}
                  className="py-2 px-4 font-semibold text-base text-[#FA9963] rounded-[32px] w-full data-[active='true']:bg-[#FFF4DE] transition-all duration-200 data-[active='false']:text-neutral-light_gray data-[active='false']:font-regular lg:text-sm 2xl:text-base"
                  onClick={() => {
                     setPublications(false)
                     setUnderReview(true)
                     setPageReview(1)
                     setResultsReview(under_review)
                     setTotalPagesReview(Math.ceil(under_review.length / per_page))
                  }}
               >
                  Under review
               </button>
            </div>
            {publications && (
               <div className="bg-[#F1FFFF] h-full rounded-md transition-all duration-200 p-4">
                  <div className="grid gap-3 h-full">
                     {results.slice((page - 1) * per_page, page * per_page).map((item) => (
                        <React.Fragment key={item.id}>
                           <PublicationItem
                              key={item.id}
                              date={item.date}
                              likes={item.likes}
                              link={item.link}
                              title={item.title}
                              views={item.views}
                              image={item.image}
                           />
                           <div className="divider-h" />
                        </React.Fragment>
                     ))}
                     <div className="mx-auto my-0">
                        <PaginationComponent
                           key={totalPages}
                           current={page}
                           total={results.length}
                           perPage={per_page}
                           handleNextPage={() => setPage(page + 1)}
                           handlePreviousPage={() => setPage(page - 1)}
                           handleFirstPage={() => setPage(1)}
                           handleLastPage={() => setPage(totalPages)}
                        />
                     </div>
                  </div>
               </div>
            )}
            {underReview && (
               <div className="bg-[#FFF4DE] h-full rounded-md transition-all duration-200 p-4">
                  <div className="grid gap-4 h-full">
                     {resultsReview
                        .slice((pageReview - 1) * per_page, pageReview * per_page)
                        .map((item) => (
                           <InReviewItem key={item.id} {...item} />
                        ))}
                     <div className="mx-auto my-0">
                        <PaginationComponent
                           key={totalPagesReview}
                           current={pageReview}
                           total={resultsReview.length}
                           perPage={per_page}
                           handleNextPage={() => setPageReview(pageReview + 1)}
                           handlePreviousPage={() => setPageReview(pageReview - 1)}
                           handleFirstPage={() => setPageReview(1)}
                           handleLastPage={() => {
                              setPageReview(totalPagesReview)
                           }}
                        />
                     </div>
                  </div>
               </div>
            )}
         </div>
      </React.Fragment>
   )
}

export const under_review: InReviewItemProps[] = [
   {
      date: '25/04/2023',
      link: 'https://www.google.com',
      title: 'Computação e blockchain na nova era digital',
      id: '1',
      ready_to_publish: false,
      status_editor: 'approved',
      status_reviewer: 'pending',
      image: 'https://random.imagecdn.app/150/150'
   },
   {
      date: '01/05/2023',
      link: 'https://www.example1.com',
      title: 'A ascensão da inteligência artificial',
      id: '2',
      ready_to_publish: true,
      status_editor: 'approved',
      status_reviewer: 'approved',
      image: 'https://random.imagecdn.app/150/150'
   },
   {
      date: '10/05/2023',
      link: 'https://www.example2.com',
      title: 'Tecnologia e sociedade no século XXI',
      id: '3',
      ready_to_publish: false,
      status_editor: 'pending',
      status_reviewer: 'approved',
      image: 'https://random.imagecdn.app/150/150'
   },
   {
      date: '15/05/2023',
      link: 'https://www.example3.com',
      title: 'O futuro da realidade virtual',
      id: '4',
      ready_to_publish: true,
      status_editor: 'approved',
      status_reviewer: 'pending',
      image: 'https://random.imagecdn.app/150/150'
   },
   {
      date: '20/05/2023',
      link: 'https://www.example4.com',
      title: 'Desenvolvimento sustentável com tecnologia',
      id: '5',
      ready_to_publish: false,
      status_editor: 'pending',
      status_reviewer: 'pending',
      image: 'https://random.imagecdn.app/150/150'
   },
   {
      date: '25/05/2023',
      link: 'https://www.example5.com',
      title: 'Inovações em software de código aberto',
      id: '6',
      ready_to_publish: true,
      status_editor: 'approved',
      status_reviewer: 'approved',
      image: 'https://random.imagecdn.app/150/150'
   },
   {
      date: '30/05/2023',
      link: 'https://www.example6.com',
      title: 'A revolução das fintechs no mercado',
      id: '7',
      ready_to_publish: true,
      status_editor: 'pending',
      status_reviewer: 'approved',
      image: 'https://random.imagecdn.app/150/150'
   },
   {
      date: '05/06/2023',
      link: 'https://www.example7.com',
      title: 'Segurança cibernética e privacidade',
      id: '8',
      ready_to_publish: false,
      status_editor: 'approved',
      status_reviewer: 'pending',
      image: 'https://random.imagecdn.app/150/150'
   },
   {
      date: '10/06/2023',
      link: 'https://www.example8.com',
      title: 'IoT: O mundo interconectado',
      id: '9',
      ready_to_publish: true,
      status_editor: 'approved',
      status_reviewer: 'approved',
      image: 'https://random.imagecdn.app/150/150'
   },
   {
      date: '15/06/2023',
      link: 'https://www.example9.com',
      title: 'A importância do Big Data',
      id: '10',
      ready_to_publish: false,
      status_editor: 'pending',
      status_reviewer: 'approved',
      image: 'https://random.imagecdn.app/150/150'
   },
   {
      date: '20/06/2023',
      link: 'https://www.example10.com',
      title: 'A evolução da computação quântica',
      id: '11',
      ready_to_publish: true,
      status_editor: 'approved',
      status_reviewer: 'pending',
      image: 'https://random.imagecdn.app/150/150'
   },
   {
      date: '25/06/2023',
      link: 'https://www.example11.com',
      title: 'O impacto da tecnologia na medicina',
      id: '12',
      ready_to_publish: false,
      status_editor: 'approved',
      status_reviewer: 'pending',
      image: 'https://random.imagecdn.app/150/150'
   }
]

export const published_mock: PublicationItemProps[] = [
   {
      id: '1',
      date: '25/04/2023',
      likes: '10',
      link: 'https://www.google.com',
      title: 'Computação e blockchain na nova era digital',
      views: '100',
      image: 'https://random.imagecdn.app/150/150'
   },
   {
      id: '2',
      date: '28/04/2023',
      likes: '50',
      link: 'https://www.example1.com',
      title: 'A ascensão da inteligência artificial',
      views: '230',
      image: 'https://random.imagecdn.app/150/150'
   },
   {
      id: '3',
      date: '01/05/2023',
      likes: '23',
      link: 'https://www.example2.com',
      title: 'Tecnologia e sociedade no século XXI',
      views: '500',
      image: 'https://random.imagecdn.app/150/150'
   },
   {
      id: '4',
      date: '05/05/2023',
      likes: '120',
      link: 'https://www.example3.com',
      title: 'O futuro da realidade virtual',
      views: '450',
      image: 'https://random.imagecdn.app/150/150'
   },
   {
      id: '5',
      date: '08/05/2023',
      likes: '65',
      link: 'https://www.example4.com',
      title: 'Desenvolvimento sustentável com tecnologia',
      views: '760',
      image: 'https://random.imagecdn.app/150/150'
   },
   {
      id: '6',
      date: '12/05/2023',
      likes: '78',
      link: 'https://www.example5.com',
      title: 'Inovações em software de código aberto',
      views: '320',
      image: 'https://random.imagecdn.app/150/150'
   },
   {
      id: '7',
      date: '15/05/2023',
      likes: '31',
      link: 'https://www.example6.com',
      title: 'A revolução das fintechs no mercado',
      views: '125',
      image: 'https://random.imagecdn.app/150/150'
   },
   {
      id: '8',
      date: '18/05/2023',
      likes: '92',
      link: 'https://www.example7.com',
      title: 'Segurança cibernética e privacidade',
      views: '890',
      image: 'https://random.imagecdn.app/150/150'
   },
   {
      id: '9',
      date: '21/05/2023',
      likes: '104',
      link: 'https://www.example8.com',
      title: 'IoT: O mundo interconectado',
      views: '670',
      image: 'https://random.imagecdn.app/150/150'
   },
   {
      id: '10',
      date: '25/05/2023',
      likes: '42',
      link: 'https://www.example9.com',
      title: 'A importância do Big Data',
      views: '540',
      image: 'https://random.imagecdn.app/150/150'
   },
   {
      id: '11',
      date: '25/05/2023',
      likes: '42',
      link: 'https://www.example9.com',
      title: 'A importância da computação quântica',
      views: '540',
      image: 'https://random.imagecdn.app/150/150'
   },
   {
      id: '12',
      date: '25/05/2023',
      likes: '42',
      link: 'https://www.example9.com',
      title: 'Como a tecnologia impacta a medicina',
      views: '540',
      image: 'https://random.imagecdn.app/150/150'
   }
]

export default Publications
