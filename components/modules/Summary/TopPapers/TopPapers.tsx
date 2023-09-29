import PublicationItem from '@/components/common/Publication/Item/Published'
import React from 'react'
import { published_mock } from '../Publications/Publications'

const TopPapers: React.FC = () => {
   return (
      <React.Fragment>
         <div className="grid gap-4">
            <h3 className="text-xl font-[500]">My top Papers</h3>
            {published_mock.slice(0, 2).map((item) => (
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
      </React.Fragment>
   )
}

export default TopPapers
