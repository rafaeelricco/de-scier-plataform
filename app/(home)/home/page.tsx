'use client'

import { ArticleCard } from '@/components/modules/Home/Index/ArticleCard/ArticleCard'
import { BannerStartPublishing } from '@/components/modules/Home/Index/BannerStartPublishing/BannerStartPublishing'
import useWindowDimension from '@/hooks/useWindowDimension'
import { articles } from '@/mock/articles_published'
import * as Button from '@components/common/Button/Button'
import * as Input from '@components/common/Input/Input'
import '@styles/home.css'
import Image from 'next/image'
import IllustrationHero from 'public/svgs/modules/home/illustration-home.svg'
import ShapeMobile from 'public/svgs/modules/home/shape-mobile.svg'
import CirclesHero from 'public/svgs/modules/home/shapes/circles.svg'
import ShapeHero from 'public/svgs/modules/home/shapes/shape1.svg'
import ShapeSecondary from 'public/svgs/modules/home/shapes/shape2.svg'
import ShapeTertiary from 'public/svgs/modules/home/shapes/shape3.svg'
import React from 'react'
import { CaretRightFill, Eye, HandThumbsUpFill, Person, Search } from 'react-bootstrap-icons'

export default function HomePage() {
   const { sm, md, lg, xl, xxl } = useWindowDimension()
   console.log(sm, md, lg, xl, xxl)

   return (
      <React.Fragment>
         {/* quando entrar em resolução mobile, desaparece estas duas */}
         <IllustrationHero className="hidden lg:block lg:w-[45%] xl:w-1/2 absolute right-0 md:top-48 lg:top-50 xl:top-60 h-full lg:max-w-[600px] xl:max-w-[708px] max-h-[554px]" />
         <ShapeHero className="hidden lg:block lg:w-3/4 xl:w-full absolute right-0 top-0 z-[-1] md:max-w-[600px] md:max-h-[700px] lg:max-w-[700px] lg:max-h-[800px] xl:max-w-[742px] xl:max-h-[872px]" />

         <div className="h-auto lg:pt-24 lg:h-[calc(100vh-14rem)]">
            <div className="grid gap-6 content-start">
               <div className="grid gap-2 mt-8 lg:mt-28">
                  <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold lg:max-w-[20ch] bg-purple bg-clip-text text-transparent">
                     A new future for scientific publications
                  </h1>
                  <p className="text-sm md:text-base lg:text-lg max-w-[50ch]">
                     In deScier, scientific papers are published in a community created by scientists, for scientists.
                  </p>
               </div>
               <div className="py-3 px-4 max-w-full lg:max-w-[50vw]  xl:max-w-[600px] 2xl:max-w-full bg-white grid sm:grid-flow-col sm:items-center gap-3 lg:gap-4 rounded-xl lg:rounded-full shadow-search lg:w-fit h-fit ">
                  <Input.Input
                     className="rounded-full py-2 md:py-3 px-3 md:px-4 border-neutral-stroke_light bg-transparent shadow-none border focus:outline-none focus:border-neutral-stroke_light text-xs md:text-sm w-full"
                     placeholder="Find articles with terms"
                     icon={
                        <React.Fragment>
                           <Search className="w-4 md:w-5 h-4 md:h-5 ml-1 text-neutral-light_gray" />
                        </React.Fragment>
                     }
                  />
                  <Input.Input
                     className="rounded-full py-2 md:py-3 px-3 md:px-4 border-neutral-stroke_light bg-transparent shadow-none border focus:outline-none focus:border-neutral-stroke_light text-xs md:text-sm w-full"
                     placeholder="Search for an author"
                     icon={
                        <React.Fragment>
                           <Person className="w-4 md:w-5 h-4 md:h-5 ml-1 text-neutral-light_gray" />
                        </React.Fragment>
                     }
                  />
                  <Button.Button variant="outline" className="rounded-full py-2 md:py-3 px-5 md:px-6 text-xs md:text-sm w-full">
                     Search
                     <Search className="w-4 md:w-5 h-4 md:h-5 ml-1" />
                  </Button.Button>
               </div>
            </div>
         </div>
         <div className="grid gap-52">
            <div className="relative w-full flex items-center justify-center lg:hidden">
               <IllustrationHero className="w-[90%] sm:w-3/4 h-auto mt-8 sm:mt-12 max-w-[372px] md:max-w-[454px] lg:hidden" />
               <ShapeMobile className="absolute z-[-1] w-[250vw] sm:w-[200vw] md:w-[164vw] lg:hidden" />
            </div>
            <div className="relative flex lg:justify-center md:mt-8 lg:mt-0">
               <CirclesHero className="absolute left-[-14rem] bottom-0 min-w-[200px] max-w-[200px]" />
               <h2 className="text-lg lg:text-1xl lg:max-w-[50ch] text-center w-full lg:my-auto lg:mx-0 lg:z-10 lg:mt-[-2.5rem]">
                  Our enviroment is powered by <span className="font-bold bg-purple bg-clip-text text-transparent">blockchain technology</span>, where we
                  build a Worldwide community, with{' '}
                  <span className="font-bold bg-purple bg-clip-text text-transparent">
                     authors having 100% of the ownership and copyright of their creations.
                  </span>
               </h2>
               <ShapeSecondary className="absolute max-w-[372px] z-0 left-[-13rem] top-72 lg:top-[4rem] lg:max-w-[472px] lg:max-h-[680px]" />
            </div>
            <div className="relative h-fit">
               <div className="border-neutral-stroke_light rounded-3xl shadow-search backdrop-blur-md bg-white-home px-8 py-6 grid gap-4 relative z-10">
                  <h3 className="text-1xl lg:text-3xl font-semibold bg-purple bg-clip-text text-transparent">Top papers of the week</h3>
                  <div className="w-full min-h-[600px] grid md:grid-cols-2 md:grid-rows-2 gap-6 z-0">
                     <CardBig />
                     <CardSmall />
                     <CardSmall />
                  </div>
               </div>
               <ShapeTertiary className="absolute right-[-13rem] z-0 bottom-[-18rem] max-w-[400px] max-h-[700px]" />
            </div>
            <div className="relative pt-8 sm:pt-12 md:pt-16 lg:pl-0 lg:pr-0 lg:-ml-52 lg:-mr-52">
               <div className="relative z-20">
                  <div className="px-1 lg:px-72 grid gap-4 sm:gap-6 lg:gap-8">
                     <div className="grid gap-4 sm:gap-6 lg:gap-10">
                        <div className="grid gap-3 sm:gap-4 md:gap-6 lg:gap-x-6 gap-y-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                           <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold col-span-full">Latest articles</h3>
                           {articles.slice(0, lg ? 8 : 3).map((article, index) => (
                              <React.Fragment key={article.id}>
                                 <div className="grid gap-4 sm:gap-6 lg:grid-flow-col">
                                    <ArticleCard
                                       id={article.id}
                                       authors={article.authors}
                                       image={article.image}
                                       likes={article.likes}
                                       tags={article.tags}
                                       title={article.title}
                                       views={article.views}
                                    />
                                    {lg && index !== 3 && index !== 7 && <hr className="divider-article-v" />}
                                 </div>
                                 {lg && index === 3 && <hr className="divider-article-h" />}
                              </React.Fragment>
                           ))}
                           <div className="flex items-end justify-start lg:justify-end gap-3 sm:gap-4 lg:gap-4 col-span-full">
                              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-primary-main select-none cursor-pointer">
                                 View all articles
                              </h3>
                              <CaretRightFill className="w-4 sm:w-5 h-4 sm:h-5 text-primary-main" />
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="mt-12 sm:mt-16 lg:mt-24 px-2 sm:px-12 md:px-24 lg:px-56 mb-12 sm:mb-16 lg:mb-24">
                     <BannerStartPublishing />
                  </div>
               </div>
               <div className="articles-background" />
            </div>
         </div>
      </React.Fragment>
   )
}

const CardBig: React.FC = () => {
   return (
      <div className="p-4 sm:p-6 rounded-md min-h-[300px] h-full row-span-2 relative">
         <div className="relative flex justify-between z-10">
            <div className="bg-white px-3 py-1 text-primary-main rounded-md w-fit h-fit text-sm font-semibold">24/06/2023</div>
            <div className="bg-white px-3 py-1 text-primary-main rounded-md w-fit h-fit text-sm font-semibold flex gap-4 items-center">
               <div className="flex items-center gap-1">
                  <HandThumbsUpFill className="text-terciary-main w-4 h-4" />
                  <p className="text-neutral-gray font-regular">10k</p>
               </div>
               <div className="flex items-center gap-1">
                  <Eye className="text-terciary-main w-4 h-4" />
                  <p className="text-neutral-gray font-regular">10k</p>
               </div>
            </div>
         </div>
         <Image
            fill
            className="absolute inset-0 object-cover w-full rounded-md"
            src="/images/placeholders/neom-OCKa0AkSyRc-unsplash.png"
            alt="placeholder"
         />
         <div className="absolute flex flex-col z-10 bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 gap-2 sm:gap-4">
            <div>
               <div className="bg-white px-2 sm:px-3 py-1 text-secundary_blue-main rounded-t-md w-fit text-xs sm:text-sm font-semibold">• Paperdiv</div>
               <div className="bg-white px-2 sm:px-3 py-1 text-secundary_blue-main rounded-b-md rounded-tr-md font-semibold max-w-[24ch] text-lg sm:text-3xl">
                  Hardware security and blockchain systems on the new digital era
               </div>
            </div>
            <div className="bg-white w-fit px-2 sm:px-3 py-1 rounded-sm text-secundary_blue-main text-xs sm:text-base font-semibold">
               by Silva, Carlos. Sampaio, Luana. and 5 more authors
            </div>
         </div>
      </div>
   )
}

const CardSmall: React.FC = () => {
   return (
      <div className="p-4 sm:p-6 rounded-md min-h-[300px] h-full relative">
         <div className="relative flex justify-between z-10">
            <div className="bg-white px-3 py-1 text-primary-main rounded-md w-fit h-fit text-sm font-semibold">24/06/2023</div>
            <div className="bg-white px-3 py-1 text-primary-main rounded-md w-fit h-fit text-sm font-semibold flex gap-4 items-center">
               <div className="flex items-center gap-1">
                  <HandThumbsUpFill className="text-terciary-main w-4 h-4" />
                  <p className="text-neutral-gray font-regular">10k</p>
               </div>
               <div className="flex items-center gap-1">
                  <Eye className="text-terciary-main w-4 h-4" />
                  <p className="text-neutral-gray font-regular">10k</p>
               </div>
            </div>
         </div>
         <Image
            fill
            className="absolute inset-0 object-cover w-full rounded-md"
            src="/images/placeholders/neom-OCKa0AkSyRc-unsplash.png"
            alt="placeholder"
         />
         <div className="absolute flex flex-col z-10 bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 gap-2 sm:gap-4">
            <div>
               <div className="bg-white px-2 sm:px-3 py-1 text-secundary_blue-main rounded-t-md w-fit text-sm font-semibold">• Paperdiv</div>
               <div className="bg-white px-2 sm:px-3 py-1 text-secundary_blue-main rounded-b-md rounded-tr-md font-semibold max-w-[24ch] text-base sm:text-lg">
                  Hardware security and blockchain systems on the new digital era
               </div>
            </div>
            <div className="bg-white w-fit px-2 sm:px-3 py-1 rounded-sm text-secundary_blue-main text-xs sm:text-base font-semibold">
               by Silva, Carlos. Sampaio, Luana. and 5 more authors
            </div>
         </div>
      </div>
   )
}
