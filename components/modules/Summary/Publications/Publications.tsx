import Item, { PublicationItemProps } from '@/components/common/Publication/Item/Item'
import React from 'react'

const Publications: React.FC = () => {
   const [underReview, setUnderReview] = React.useState(false)
   const [publications, setPublications] = React.useState(true)

   return (
      <React.Fragment>
         <div className="divider-v" />
         <div className="flex flex-col gap-4 h-full">
            <div className="grid grid-cols-2 items-start w-full h-fit">
               <button
                  data-active={publications}
                  className="py-2 px-4 font-semibold text-base text-[#009EAB] rounded-[32px] w-full data-[active='true']:bg-[#F1FFFF] transition-all duration-200 data-[active='false']:text-neutral-light_gray data-[active='false']:font-regular"
                  onClick={() => {
                     setPublications(true)
                     setUnderReview(false)
                  }}
               >
                  Published articles
               </button>
               <button
                  data-active={underReview}
                  className="py-2 px-4 font-semibold text-base text-[#FA9963] rounded-[32px] w-full data-[active='true']:bg-[#FFF4DE] transition-all duration-200 data-[active='false']:text-neutral-light_gray data-[active='false']:font-regular"
                  onClick={() => {
                     setPublications(false)
                     setUnderReview(true)
                  }}
               >
                  Under review
               </button>
            </div>
            {publications && (
               <div className="bg-[#F1FFFF] h-full rounded-md transition-all duration-200 p-4">
                  <div className="grid gap-4">
                     {publications_mock.map((item) => (
                        <Item key={item.id} {...item} />
                     ))}
                  </div>
               </div>
            )}
            {underReview && (
               <div className="bg-[#FFF4DE] h-full rounded-md transition-all duration-200 p-4">
                  Container
               </div>
            )}
         </div>
      </React.Fragment>
   )
}

{
   /* <PaginationComponent
key={totalPages}
current={page}
total={totalPages}
perPage={6}
handleNextPage={() => {
   setPage(page + 1)
}}
handlePreviousPage={() => {
   setPage(page - 1)
}}
/> */
}

const publications_mock: PublicationItemProps[] = [
   {
      date: '25/04/2023',
      link: 'https://www.google.com',
      title: 'Computação e blockchain na nova era digital',
      id: '1',
      ready_to_publish: false,
      status_editor: 'approved',
      status_reviewer: 'pending'
   },
   {
      date: '01/05/2023',
      link: 'https://www.example1.com',
      title: 'A ascensão da inteligência artificial',
      id: '2',
      ready_to_publish: true,
      status_editor: 'approved',
      status_reviewer: 'approved'
   },
   {
      date: '10/05/2023',
      link: 'https://www.example2.com',
      title: 'Tecnologia e sociedade no século XXI',
      id: '3',
      ready_to_publish: false,
      status_editor: 'pending',
      status_reviewer: 'approved'
   }
   //    {
   //       date: '15/05/2023',
   //       link: 'https://www.example3.com',
   //       title: 'O futuro da realidade virtual',
   //       id: '4',
   //       ready_to_publish: true,
   //       status_editor: 'approved',
   //       status_reviewer: 'pending'
   //    },
   //    {
   //       date: '20/05/2023',
   //       link: 'https://www.example4.com',
   //       title: 'Desenvolvimento sustentável com tecnologia',
   //       id: '5',
   //       ready_to_publish: false,
   //       status_editor: 'pending',
   //       status_reviewer: 'pending'
   //    },
   //    {
   //       date: '25/05/2023',
   //       link: 'https://www.example5.com',
   //       title: 'Inovações em software de código aberto',
   //       id: '6',
   //       ready_to_publish: true,
   //       status_editor: 'approved',
   //       status_reviewer: 'approved'
   //    },
   //    {
   //       date: '30/05/2023',
   //       link: 'https://www.example6.com',
   //       title: 'A revolução das fintechs no mercado',
   //       id: '7',
   //       ready_to_publish: true,
   //       status_editor: 'pending',
   //       status_reviewer: 'approved'
   //    },
   //    {
   //       date: '05/06/2023',
   //       link: 'https://www.example7.com',
   //       title: 'Segurança cibernética e privacidade',
   //       id: '8',
   //       ready_to_publish: false,
   //       status_editor: 'approved',
   //       status_reviewer: 'pending'
   //    },
   //    {
   //       date: '10/06/2023',
   //       link: 'https://www.example8.com',
   //       title: 'IoT: O mundo interconectado',
   //       id: '9',
   //       ready_to_publish: true,
   //       status_editor: 'approved',
   //       status_reviewer: 'approved'
   //    },
   //    {
   //       date: '15/06/2023',
   //       link: 'https://www.example9.com',
   //       title: 'A importância do Big Data',
   //       id: '10',
   //       ready_to_publish: false,
   //       status_editor: 'pending',
   //       status_reviewer: 'approved'
   //    },
   //    {
   //       date: '20/06/2023',
   //       link: 'https://www.example10.com',
   //       title: 'A evolução da computação quântica',
   //       id: '11',
   //       ready_to_publish: true,
   //       status_editor: 'approved',
   //       status_reviewer: 'pending'
   //    },
   //    {
   //       date: '25/06/2023',
   //       link: 'https://www.example11.com',
   //       title: 'O impacto da tecnologia na medicina',
   //       id: '12',
   //       ready_to_publish: false,
   //       status_editor: 'approved',
   //       status_reviewer: 'pending'
   //    }
]

export default Publications
