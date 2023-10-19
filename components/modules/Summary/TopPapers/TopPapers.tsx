import PublicationItem from '@/components/common/Publication/Item/Published'
import React from 'react'
import { published_mock } from '../Publications/Publications'

const TopPapers: React.FC = () => {
   return (
      <React.Fragment>
         <div className="grid gap-4">
            <h3 className="text-xl font-[500] lg:text-lg 2xl:text-xl">My top papers</h3>
            <div className="grid md:grid-min-max gap-4 max-h-[13rem] overflow-y-scroll">
               {published_mock.map((item, index) => (
                  <React.Fragment key={item.id}>
                     <div className="grid gap-4">
                        <PublicationItem
                           key={item.id}
                           date={item.date}
                           likes={item.likes}
                           link={item.link}
                           title={item.title}
                           views={item.views}
                           image={item.image}
                        />
                        {index !== published_mock.length - 1 && <hr className="divider-h" />}
                     </div>
                  </React.Fragment>
               ))}
            </div>
         </div>
      </React.Fragment>
   )
}

export default TopPapers
