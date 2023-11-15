import React from 'react'
import { CardText, Person } from 'react-bootstrap-icons'

export const YouAreAuthor: React.FC = () => {
   return (
      <React.Fragment>
         <div className="flex items-center gap-2 border border-neutral-stroke_light w-fit py-1 px-3 rounded-md">
            <Person className="text-primary-light" />
            <p className="text-xs md:text-sm text-primary-light font-semibold select-none">You are the Author of this article</p>
         </div>
      </React.Fragment>
   )
}

interface YouAreProps {
   role: 'editor' | 'reviewer'
}

export const YouAre: React.FC<YouAreProps> = ({ role }: YouAreProps) => {
   return (
      <React.Fragment>
         <div className="flex items-center gap-2 border border-neutral-stroke_light w-fit py-1 px-3 rounded-md">
            <CardText className="text-[#B48E2B]" />
            <p className="text-xs md:text-sm text-[#B48E2B] font-semibold select-none">You are added as a {role} for this article</p>
         </div>
      </React.Fragment>
   )
}
