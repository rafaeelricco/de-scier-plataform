'use client'

import * as Button from '@components/common/Button/Button'
import * as Input from '@components/common/Input/Input'
import '@styles/home.css'
import IllustrationHero from 'public/svgs/modules/home/illustration-home.svg'
import CirclesHero from 'public/svgs/modules/home/shapes/circles.svg'
import ShapeHero from 'public/svgs/modules/home/shapes/shape1.svg'
import ShapeSecondary from 'public/svgs/modules/home/shapes/shape2.svg'
import React from 'react'
import { Person, Search } from 'react-bootstrap-icons'

export default function HomePage() {
   return (
      <React.Fragment>
         <IllustrationHero className="absolute right-0 w-full h-full max-w-[708px] max-h-[554px]" />
         <ShapeHero className="absolute right-0 top-0 z-[-1] w-full h-full max-w-[742px] max-h-[872px]" />
         <div className="hero">
            <div className="grid gap-6 content-start">
               <div className="grid gap-2">
                  <h1 className="font-bold text-5xl max-w-[20ch] bg-purple bg-clip-text text-transparent">A new future for scientific publications</h1>
                  <p className="text-lg max-w-[50ch]">
                     In deScier, scientific papers are published in a community created by scientists, for scientists.{' '}
                  </p>
               </div>
               <div className="py-3 px-4 bg-white flex items-center gap-4 rounded-full shadow-search w-fit h-fit">
                  <Input.Input
                     className="rounded-full py-3 px-4 border-neutral-stroke_light bg-transparent shadow-none border focus:outline-none focus:border-neutral-stroke_light text-sm"
                     placeholder="Find articles with terms"
                     icon={
                        <React.Fragment>
                           <Search className="w-5 h-5 ml-1 text-neutral-light_gray" />
                        </React.Fragment>
                     }
                  />
                  <Input.Input
                     className="rounded-full py-3 px-4 border-neutral-stroke_light bg-transparent shadow-none border focus:outline-none focus:border-neutral-stroke_light text-sm"
                     placeholder="Search for an author"
                     icon={
                        <React.Fragment>
                           <Person className="w-5 h-5 ml-1 text-neutral-light_gray" />
                        </React.Fragment>
                     }
                  />
                  <Button.Button variant="outline" className="rounded-full py-3 px-6 text-sm">
                     Search
                     <Search className="w-5 h-5" />
                  </Button.Button>
               </div>
            </div>
         </div>

         <div className="relative flex justify-center">
            <CirclesHero className="absolute left-[-14rem] bottom-0 min-w-[200px] max-w-[254px]" />
            <h2 className="text-1xl max-w-[50ch] text-center w-full my-auto mx-0 z-10">
               Our enviroment is powered by <span className="font-bold bg-purple bg-clip-text text-transparent">blockchain technology</span>, where we
               build a Worldwide community, with{' '}
               <span className="font-bold bg-purple bg-clip-text text-transparent">
                  authors having 100% of the ownership and copyright of their creations.
               </span>
            </h2>
            <ShapeSecondary className="absolute z-0 left-[-13rem] top-[8rem] max-w-[472px] max-h-[680px]" />
         </div>

         <div className="border-neutral-stroke_light rounded-3xl shadow-search h-[400px] z-10 bg-white-home backdrop-blur-md px-8 py-6">
            <h3 className="text-1xl font-semibold text-secundary_blue-main">Top papers of the week</h3>
         </div>
      </React.Fragment>
   )
}

const TopPaperOfTheWeek = () => {}
