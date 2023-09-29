import PublicationItem from '@/components/common/Publication/Item/Published'
import React from 'react'
import { published_mock } from '../Publications/Publications'

const TopPapers: React.FC = () => {
   return (
      <React.Fragment>
         <div className="grid gap-4">
            <h3 className="text-xl font-[500]">My top Papers</h3>
            <div className="grid grid-min-max gap-x-8 gap-y-4 max-h-[13rem] overflow-y-scroll">
               {published_mock.map((item) => (
                  <PublicationItem
                     key={item.id}
                     date={item.date}
                     likes={item.likes}
                     link={item.link}
                     title={item.title}
                     views={item.views}
                     image={item.image}
                  />
               ))}
            </div>
         </div>
      </React.Fragment>
   )
}

export default TopPapers
