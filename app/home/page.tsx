'use client'

import useWindowDimension from '@/hooks/useWindowDimension'
import * as Button from '@components/common/Button/Button'
import * as Input from '@components/common/Input/Input'
import '@styles/home.css'
import Image from 'next/image'
import IllustrationBannerFooter from 'public/svgs/modules/home/banner-footer/illustrations-banner.svg'
import IllustrationHero from 'public/svgs/modules/home/illustration-home.svg'
import CirclesHero from 'public/svgs/modules/home/shapes/circles.svg'
import ShapeHero from 'public/svgs/modules/home/shapes/shape1.svg'
import ShapeSecondary from 'public/svgs/modules/home/shapes/shape2.svg'
import ShapeTertiary from 'public/svgs/modules/home/shapes/shape3.svg'
import React from 'react'
import { CaretRightFill, Eye, HandThumbsUpFill, Person, Search } from 'react-bootstrap-icons'

export default function HomePage() {
   const { sm, md, lg, xl, xxl } = useWindowDimension()
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
                           {articles.slice(0, sm ? 4 : md ? 6 : lg ? 8 : xl ? 10 : xxl ? 12 : 4).map((article) => (
                              <div className="grid grid-flow-col gap-6" key={article.id}>
                                 <ArticleCard {...article} />
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
                     <div className="bg-secundary_blue-main py-6 px-12 rounded-md">
                        <div className="flex items-center gap-20">
                           <IllustrationBannerFooter className="w-64 shrink-0" />
                           <div className="flex flex-col gap-4">
                              <div className="grid gap-2">
                                 <p className="text-lg font-semibold text-white">Want to publish a scientific paper?</p>
                                 <p className="text-base font-regular text-white">
                                    Publishing in DeScier is fast and easy, with peer selected review, and 100% author owned copyright. Join the movement
                                    now!
                                 </p>
                              </div>
                              <div className="flex justify-end">
                                 <Button.Button className="py-3 px-10 w-fit ">Start publishing now!</Button.Button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="articles-background" />
            </div>
         </div>
      </React.Fragment>
   )
}

const ArticleCard: React.FC<ArticleCardProps> = ({ authors, id, likes, tags, title, views, image }: ArticleCardProps) => {
   return (
      <React.Fragment>
         <div className="max-w-[240px] grid gap-4">
            <div className="w-60 h-52 overflow-hidden rounded-md relative">
               <Image priority quality={100} width={240} height={240} src={image} alt="placeholder" className="w-60 h-60 object-cover absolute inset-0" />
            </div>
            <div className="grid gap-2">
               {authors.map((author) => (
                  <React.Fragment key={author.id}>
                     <p className="text-sm text-[#5E6992]">{author.name}</p>
                  </React.Fragment>
               ))}
               <p className="text-base text-secundary_blue-main font-semibold">{title}</p>
               <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                     <HandThumbsUpFill className="text-terciary-main w-5 h-5" />
                     <p className="text-sm text-neutral-gray">{likes}</p>
                  </div>
                  <div className="flex items-center gap-1">
                     <Eye className="text-terciary-main w-5 h-5" />
                     <p className="text-sm text-neutral-gray">{views}</p>
                  </div>
               </div>
               <div className="flex gap-2 flex-wrap">
                  {tags.map((tag) => (
                     <React.Fragment key={tag.id}>
                        <span className="text-xs text-primary-main bg-white px-2 py-1 rounded-[4px]">{tag.name}</span>
                     </React.Fragment>
                  ))}
               </div>
            </div>
         </div>
      </React.Fragment>
   )
}

interface ArticleCardProps {
   id: number
   title: string
   authors: { id: number; name: string }[]
   image: string
   likes: number
   views: number
   tags: { id: number; name: string }[]
}

const articles: ArticleCardProps[] = [
   {
      id: 1,
      title: 'Understanding Blockchain Technology',
      authors: [{ id: 1, name: 'Alice Thompson' }],
      image: 'https://source.unsplash.com/random/900×700/?technology',
      likes: 120,
      views: 345,
      tags: [
         { id: 1, name: 'Blockchain' },
         { id: 2, name: 'Technology' }
      ]
   },
   {
      id: 2,
      title: 'Basics of Quantum Physics',
      authors: [{ id: 2, name: 'Bob Richards' }],
      image: 'https://source.unsplash.com/random/900×700/?physics',
      likes: 240,
      views: 567,
      tags: [
         { id: 3, name: 'Quantum' },
         { id: 4, name: 'Physics' }
      ]
   },
   {
      id: 3,
      title: 'The World of Computer Algorithms',
      authors: [{ id: 3, name: 'Carol White' }],
      image: 'https://source.unsplash.com/random/900×700/?computer',
      likes: 320,
      views: 789,
      tags: [
         { id: 5, name: 'Algorithms' },
         { id: 6, name: 'Computer Science' }
      ]
   },
   {
      id: 4,
      title: 'Machine Learning for Beginners',
      authors: [{ id: 4, name: 'David Smith' }],
      image: 'https://source.unsplash.com/random/900×700/?machine',
      likes: 200,
      views: 650,
      tags: [
         { id: 7, name: 'Machine Learning' },
         { id: 8, name: 'AI' }
      ]
   },
   {
      id: 5,
      title: 'Evolution of Modern Databases',
      authors: [{ id: 5, name: 'Eva Green' }],
      image: 'https://source.unsplash.com/random/900×700/?database',
      likes: 450,
      views: 870,
      tags: [
         { id: 9, name: 'Databases' },
         { id: 10, name: 'Tech Evolution' }
      ]
   },
   {
      id: 6,
      title: 'Introduction to Virtual Reality',
      authors: [{ id: 6, name: 'Frank Johnson' }],
      image: 'https://source.unsplash.com/random/900×700/?virtual',
      likes: 380,
      views: 920,
      tags: [
         { id: 11, name: 'Virtual Reality' },
         { id: 12, name: 'Innovation' }
      ]
   },
   {
      id: 7,
      title: 'Modern Web Development Trends',
      authors: [{ id: 7, name: 'Grace Lee' }],
      image: 'https://source.unsplash.com/random/900×700/?web',
      likes: 500,
      views: 1000,
      tags: [
         { id: 13, name: 'Web Development' },
         { id: 14, name: 'Trends' }
      ]
   },
   {
      id: 8,
      title: 'IoT and its Applications',
      authors: [{ id: 8, name: 'Henry Wilson' }],
      image: 'https://source.unsplash.com/random/900×700/?iot',
      likes: 650,
      views: 1150,
      tags: [
         { id: 15, name: 'IoT' },
         { id: 16, name: 'Applications' }
      ]
   },
   {
      id: 9,
      title: 'Understanding Cryptocurrencies',
      authors: [{ id: 9, name: 'Irene Davis' }],
      image: 'https://source.unsplash.com/random/900×700/?cryptocurrency',
      likes: 780,
      views: 1300,
      tags: [
         { id: 17, name: 'Cryptocurrency' },
         { id: 18, name: 'Finance' }
      ]
   },
   {
      id: 10,
      title: 'The World of Augmented Reality',
      authors: [{ id: 10, name: 'Jack Thomas' }],
      image: 'https://source.unsplash.com/random/900×700/?augmented',
      likes: 290,
      views: 480,
      tags: [
         { id: 19, name: 'Augmented Reality' },
         { id: 20, name: 'Tech' }
      ]
   },
   {
      id: 11,
      title: 'Data Science in Modern Business',
      authors: [{ id: 11, name: 'Katie Wilson' }],
      image: 'https://source.unsplash.com/random/900×700/?data',
      likes: 310,
      views: 590,
      tags: [
         { id: 21, name: 'Data Science' },
         { id: 22, name: 'Business' }
      ]
   },
   {
      id: 12,
      title: 'Digital Marketing in 2023',
      authors: [{ id: 12, name: 'Larry Fisher' }],
      image: 'https://source.unsplash.com/random/900×700/?marketing',
      likes: 580,
      views: 970,
      tags: [
         { id: 23, name: 'Digital Marketing' },
         { id: 24, name: '2023' }
      ]
   },
   {
      id: 13,
      title: 'Mobile App Development Trends',
      authors: [{ id: 13, name: 'Mia Collins' }],
      image: 'https://source.unsplash.com/random/900×700/?mobile',
      likes: 490,
      views: 870,
      tags: [
         { id: 25, name: 'Mobile App' },
         { id: 26, name: 'Development' }
      ]
   },
   {
      id: 14,
      title: 'The Role of AI in Healthcare',
      authors: [{ id: 14, name: 'Nick Johnson' }],
      image: 'https://source.unsplash.com/random/900×700/?healthcare',
      likes: 360,
      views: 760,
      tags: [
         { id: 27, name: 'AI' },
         { id: 28, name: 'Healthcare' }
      ]
   },
   {
      id: 15,
      title: 'Gaming Technologies in 2023',
      authors: [{ id: 15, name: 'Olivia Lee' }],
      image: 'https://source.unsplash.com/random/900×700/?gaming',
      likes: 850,
      views: 1230,
      tags: [
         { id: 29, name: 'Gaming' },
         { id: 30, name: '2023' }
      ]
   },
   {
      id: 16,
      title: 'Modern Cloud Technologies',
      authors: [{ id: 16, name: 'Paul Smith' }],
      image: 'https://source.unsplash.com/random/900×700/?cloud',
      likes: 640,
      views: 1090,
      tags: [
         { id: 31, name: 'Cloud' },
         { id: 32, name: 'Technology' }
      ]
   },
   {
      id: 17,
      title: 'Wearable Tech in Modern Age',
      authors: [{ id: 17, name: 'Quinn Williams' }],
      image: 'https://source.unsplash.com/random/900×700/?wearable',
      likes: 740,
      views: 1210,
      tags: [
         { id: 33, name: 'Wearable Tech' },
         { id: 34, name: 'Modern Age' }
      ]
   },
   {
      id: 18,
      title: 'Rise of Robotics in Industry',
      authors: [{ id: 18, name: 'Rachel Johnson' }],
      image: 'https://source.unsplash.com/random/900×700/?robotics',
      likes: 790,
      views: 1280,
      tags: [
         { id: 35, name: 'Robotics' },
         { id: 36, name: 'Industry' }
      ]
   },
   {
      id: 19,
      title: '5G and its Impact',
      authors: [{ id: 19, name: 'Steve Miller' }],
      image: 'https://source.unsplash.com/random/900×700/?5g',
      likes: 910,
      views: 1370,
      tags: [
         { id: 37, name: '5G' },
         { id: 38, name: 'Impact' }
      ]
   },
   {
      id: 20,
      title: 'The Future of AI and Machine Learning',
      authors: [{ id: 20, name: 'Tina Brown' }],
      image: 'https://source.unsplash.com/random/900×700/?ai',
      likes: 1000,
      views: 1500,
      tags: [
         { id: 39, name: 'AI' },
         { id: 40, name: 'Machine Learning' }
      ]
   }
]
