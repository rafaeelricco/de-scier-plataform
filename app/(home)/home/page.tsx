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
import CirclesHero from 'public/svgs/modules/home/shapes/circles.svg'
import ShapeHero from 'public/svgs/modules/home/shapes/shape1.svg'
import ShapeSecondary from 'public/svgs/modules/home/shapes/shape2.svg'
import ShapeTertiary from 'public/svgs/modules/home/shapes/shape3.svg'
import React from 'react'
import { CaretRightFill, Eye, HandThumbsUpFill, Person, Search } from 'react-bootstrap-icons'

export default function HomePage() {
   const { md, lg } = useWindowDimension()
   console.log('md:', md)
   console.log('lg:', lg)

   return (
      <React.Fragment>
         <IllustrationHero className="absolute right-0 w-full h-full max-w-[708px] max-h-[554px]" />
         <ShapeHero className="absolute right-0 top-0 z-[-1] w-full h-full max-w-[742px] max-h-[872px]" />
         <div className="hero pt-24">
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
         <div className="grid gap-64">
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
            <div className="relative h-fit">
               <div className="border-neutral-stroke_light rounded-3xl shadow-search backdrop-blur-md bg-white-home px-8 py-6 grid gap-4 relative z-10">
                  <h3 className="text-1xl font-semibold text-secundary_blue-main">Top papers of the week</h3>
                  <div className="w-full min-h-[600px] grid grid-cols-2 grid-rows-2 gap-6 z-0">
                     <div className="p-8 rounded-md h-full row-span-2 relative">
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
                        <div className="absolute flex flex-col z-10 bottom-8 left-8 right-8 gap-4">
                           <div>
                              <div className="bg-white px-3 py-1 text-secundary_blue-main rounded-t-md w-fit text-sm font-semibold">• Paperdiv</div>
                              <div className="bg-white px-3 py-1 text-secundary_blue-main rounded-b-md rounded-tr-md font-semibold max-w-[24ch] text-1xl">
                                 Hardware security and blockchain systems on the new digital era
                              </div>
                           </div>
                           <div className="bg-white w-fit px-3 py-1 rounded-sm text-secundary_blue-main text-base font-semibold">
                              by Silva, Carlos. Sampaio, Luana. and 5 more authors
                           </div>
                        </div>
                     </div>
                     <div className="p-8 rounded-md h-full relative">
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
                        <div className="absolute flex flex-col z-10 bottom-8 left-8 right-8 gap-4">
                           <div>
                              <div className="bg-white px-3 py-1 text-secundary_blue-main rounded-t-md w-fit text-sm font-semibold">• Paperdiv</div>
                              <div className="bg-white px-3 py-1 text-secundary_blue-main rounded-b-md rounded-tr-md font-semibold max-w-[24ch] text-base">
                                 Hardware security and blockchain systems on the new digital era
                              </div>
                           </div>
                           <div className="bg-white w-fit px-3 py-1 rounded-sm text-secundary_blue-main text-xs font-semibold">
                              by Silva, Carlos. Sampaio, Luana. and 5 more authors
                           </div>
                        </div>
                     </div>
                     <div className="p-8 rounded-md h-full relative">
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
                        <div className="absolute flex flex-col z-10 bottom-8 left-8 right-8 gap-4">
                           <div>
                              <div className="bg-white px-3 py-1 text-secundary_blue-main rounded-t-md w-fit text-sm font-semibold">• Paperdiv</div>
                              <div className="bg-white px-3 py-1 text-secundary_blue-main rounded-b-md rounded-tr-md font-semibold max-w-[24ch] text-base">
                                 Hardware security and blockchain systems on the new digital era
                              </div>
                           </div>
                           <div className="bg-white w-fit px-3 py-1 rounded-sm text-secundary_blue-main text-xs font-semibold">
                              by Silva, Carlos. Sampaio, Luana. and 5 more authors
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <ShapeTertiary className="absolute right-[-13rem] z-0 bottom-[-18rem] max-w-[400px] max-h-[700px]" />
            </div>
            <div className="relative pt-16 remove-paddings">
               <div className="relative z-20">
                  <div className="px-56 grid gap-8">
                     <h3 className="text-1xl font-semibold">Lastest articles</h3>
                     <div className="grid gap-8">
                        <div className="flex flex-wrap justify-between gap-x-6 gap-y-8">
                           {articles.slice(0, md ? 5 : 10).map((article) => (
                              <div className="grid grid-flow-col gap-6" key={article.id}>
                                 <ArticleCard
                                    id={article.id}
                                    authors={article.authors}
                                    image={article.image}
                                    likes={article.likes}
                                    tags={article.tags}
                                    title={article.title}
                                    views={article.views}
                                 />
                              </div>
                           ))}
                        </div>
                        <div className="flex items-center justify-end gap-4">
                           <h3 className="text-lg font-semibold text-primary-main select-none cursor-pointer">View all articles</h3>
                           <CaretRightFill className="w-5 h-5 text-primary-main" />
                        </div>
                     </div>
                  </div>
                  <div className="mt-36 px-56 mb-24">
                     <BannerStartPublishing />
                  </div>
               </div>
               <div className="articles-background" />
            </div>
         </div>
      </React.Fragment>
   )
}
