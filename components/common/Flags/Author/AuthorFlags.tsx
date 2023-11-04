import React from 'react'
import { CardText, Person } from 'react-bootstrap-icons'

export const YouAreAuthor = () => {
   return (
      <React.Fragment>
         <div className="flex items-center gap-2 border border-neutral-stroke_light w-fit py-1 px-3 rounded-md">
            <Person className="text-primary-light" />
            <p className="text-xs md:text-sm text-primary-light font-semibold select-none">You are the Author of the document</p>
         </div>
      </React.Fragment>
   )
}

export const YouAreReviwer = () => {
   return (
      <React.Fragment>
         <div className="flex items-center gap-2 border border-neutral-stroke_light w-fit py-1 px-3 rounded-md">
            <CardText className="text-[#B48E2B]" />
            <p className="text-xs md:text-sm text-[#B48E2B] font-semibold select-none">You are added as a Reviewer for this article</p>
         </div>
      </React.Fragment>
   )
}
