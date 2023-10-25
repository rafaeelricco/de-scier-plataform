'use client'

import { ArticleAcess } from '@/components/modules/Home/Search/ArticleAccess/ArticleAcess'
import { Checkout } from '@/components/modules/Home/Search/Purchase/Checkout'
import { PurchaseError } from '@/components/modules/Home/Search/Purchase/Error'
import { PurchaseProcessing } from '@/components/modules/Home/Search/Purchase/Processing'
import { PurchasedArticles } from '@/components/modules/Home/Search/Purchase/PurchasedArticles'
import { PurchaseSuccess } from '@/components/modules/Home/Search/Purchase/Success'
import { authors_mock } from '@/mock/submit_new_document'
import * as Dialog from '@components/common/Dialog/Digalog'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import FacebookIcon from 'public/svgs/modules/home/article-details/facebook.svg'
import LinkIcon from 'public/svgs/modules/home/article-details/link.svg'
import TelegramIcon from 'public/svgs/modules/home/article-details/telegram.svg'
import TwitterIcon from 'public/svgs/modules/home/article-details/twitter.svg'
import WhatsAppIcon from 'public/svgs/modules/home/article-details/whatsapp.svg'
import React from 'react'
import { ArrowLeft, Eye, HandThumbsUp, HandThumbsUpFill } from 'react-bootstrap-icons'
import sha256 from 'sha256'
import { twMerge } from 'tailwind-merge'

export default function Page({ params }: { params: { slug: string } }) {
   const router = useRouter()
   const [purchase, setPurchase] = React.useState({ checkout: false, processing: false, success: false, error: false, my_articles: false })

   return (
      <React.Fragment>
         <Dialog.Root open={purchase.checkout || purchase.processing || purchase.success || purchase.error || purchase.my_articles}>
            <Dialog.Overlay />
            <Dialog.Content
               className={twMerge(
                  'max-w-[1024px] w-full h-fit',
                  `${purchase.processing && 'max-w-[600px] px-16 py-14'}`,
                  `${purchase.success && 'max-w-[600px] px-16 py-14'}`,
                  `${purchase.error && 'max-w-[600px] px-16 py-14'}`,
                  `${purchase.my_articles && 'max-w-[80%]'}`
               )}
            >
               {purchase.checkout && (
                  <Checkout
                     article={{
                        image: 'https://source.unsplash.com/random/900×700/?technology',
                        date: '11/11/2000',
                        id: sha256('11/11/2000'),
                        price: 48,
                        title: 'Hardware security and blockchain systems on the new digital era'
                     }}
                     onPurchase={() => {
                        setPurchase({ ...purchase, checkout: false, processing: true }),
                           setTimeout(() => {
                              setPurchase({ ...purchase, processing: false, checkout: false, success: true })
                           }, 4000)
                     }}
                     onClose={() => setPurchase({ ...purchase, checkout: false })}
                     onSetPaymentOption={(value) => {
                        console.log(value)
                     }}
                  />
               )}
               {purchase.success && (
                  <PurchaseSuccess
                     onClose={() => {
                        setPurchase({ ...purchase, success: false })
                     }}
                     onReturn={() => {
                        setPurchase({ ...purchase, success: false, error: true })
                     }}
                  />
               )}
               {purchase.error && (
                  <PurchaseError
                     onClose={() => {
                        setPurchase({ ...purchase, error: false })
                     }}
                  />
               )}
               {purchase.processing && <PurchaseProcessing />}
               {purchase.my_articles && (
                  <PurchasedArticles
                     onClose={() => {
                        setPurchase({ ...purchase, my_articles: false })
                     }}
                  />
               )}
            </Dialog.Content>
         </Dialog.Root>
         <div className="grid gap-8">
            <div className="flex items-center gap-4 pt-12">
               <ArrowLeft size={32} className="hover:scale-110 transition-all cursor-pointer" onClick={() => router.back()} />
               <h1 className="text-1xl font-semibold">Return</h1>
            </div>
            <div className="bg-white rounded-xl h-fit p-6 flex flex-col gap-4">
               <div className="flex flex-col gap-2">
                  <div className="hidden md:flex items-center gap-2">
                     <div className="border border-neutral-stroke_light rounded-md px-2 py-1 w-fit flex items-center flex-shrink gap-2">
                        <div className="w-3 h-3 bg-status-green rounded-full" />
                        <p className="text-sm select-none">Open access</p>
                     </div>
                     <span className="text-black font-semibold">•</span>
                     <p className="text-lg font-semibold">Paper</p>
                     <span className="text-black font-semibold">•</span>
                     <p className="text-lg font-semibold text-primary-main">Computer Science, Software engineering</p>
                  </div>
                  <div className="flex flex-col md:hidden md:items-center gap-2">
                     <div className="border border-neutral-stroke_light rounded-md px-2 py-1 w-full flex items-center justify-center flex-shrink gap-2">
                        <div className="w-3 h-3 bg-status-green rounded-full" />
                        <p className="text-sm select-none">Open access</p>
                     </div>
                     <div className="grid grid-flow-col content-start justify-start gap-2 relative">
                        <p className="text-base text-start font-semibold text-primary-main truncate w-full">
                           <span className="text-black">Paper -</span> Computer Science, Software engineering
                        </p>
                     </div>
                     <hr className="divider-h w-full my-2" />
                  </div>
                  <h3 className="text-2xl md:text-3xl text-black font-bold">Hardware security and blockchain systems on the new digital era</h3>
                  <div className="flex flex-wrap gap-2">
                     {tags.map((tag) => (
                        <div className="border rounded-md border-neutral-stroke_light flex items-center px-2 py-[2px]" key={tag.id}>
                           <span className="text-xs md:text-sm text-primary-main">{tag.name}</span>
                        </div>
                     ))}
                  </div>
               </div>
               <div className="flex items-center gap-1 flex-wrap">
                  {authors.map((author, index) => (
                     <React.Fragment key={author.id}>
                        <p className="text-sm text-[#5E6992]">
                           {author.name}
                           {index < authors.length - 1 && <span className="text-[#5E6992]">,</span>}
                        </p>
                     </React.Fragment>
                  ))}
               </div>
               <div className="relative h-80 md:h-96 rounded-lg overflow-hidden">
                  <Image
                     fill
                     src={'https://source.unsplash.com/random/900×700/?technology'}
                     alt="article-image"
                     style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                     className="object-cover"
                  />
               </div>
            </div>
            <div className="flex items-start flex-col lg:flex-row-reverse gap-8 mb-10">
               <ArticleAcess access_type="paid" date="11/11/2000" value={48} onBuyDocument={() => setPurchase({ ...purchase, checkout: true })} />
               <div className="flex flex-col gap-6 bg-white rounded-xl h-fit w-full flex-grow p-6">
                  <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                     <div className="flex gap-6 items-center">
                        <div className="flex items-center gap-1">
                           <HandThumbsUpFill className="text-terciary-main w-5 h-5" />
                           <p className="text-lg text-neutral-gray">10k likes</p>
                        </div>
                        <div className="flex items-center gap-1">
                           <Eye className="text-terciary-main w-5 h-5" />
                           <p className="text-lg text-neutral-gray">10k views</p>
                        </div>
                     </div>

                     <div className="flex items-center gap-4">
                        <p className="text-lg text-neutral-gray">Share</p>
                        <LinkIcon className="w-6 h-6 flex shrink-0 cursor-pointer transition-all duration-200 hover:scale-110" />
                        <TwitterIcon className="w-6 h-6 flex shrink-0 cursor-pointer transition-all duration-200 hover:scale-110" />
                        <FacebookIcon className="w-6 h-6 flex shrink-0 cursor-pointer transition-all duration-200 hover:scale-110" />
                        <WhatsAppIcon className="w-6 h-6 flex shrink-0 cursor-pointer transition-all duration-200 hover:scale-110" />
                        <TelegramIcon className="w-6 h-6 flex shrink-0 cursor-pointer transition-all duration-200 hover:scale-110" />
                     </div>
                  </div>
                  <hr className="divider-h" />
                  <div>
                     <h6 className="text-base font-semibold">Authors</h6>
                     <div className="flex flex-col bg-[#F6F6FF] rounded-lg px-4">
                        {authors.map((author, index) => (
                           <React.Fragment key={author.id}>
                              <div
                                 className={twMerge(
                                    'flex items-center py-3 gap-4',
                                    `${index != authors.length - 1 && 'border-b border-neutral-stroke_light'}`
                                 )}
                              >
                                 <p className="text-base font-regular text-[#5E6992] w-4">{index + 1}º</p>
                                 <div className="grid grid-cols-2 w-full">
                                    <p className="text-base font-regular text-secundary_blue-main">{author.name}</p>
                                    <p className="text-base font-regular text-secundary_blue-main">Neurologist</p>
                                 </div>
                              </div>
                           </React.Fragment>
                        ))}
                     </div>
                  </div>
                  <div className="flex gap-4 flex-col md:flex-row md:items-center">
                     <div className="flex flex-col flex-grow">
                        <p className="text-base font-semibold">Field</p>
                        <p className="text-base font-regular">Computer Science, Software engineering</p>
                     </div>
                     <div className="flex flex-col flex-grow">
                        <p className="text-base font-semibold">Document type</p>

                        <p className="text-base font-regular">Manuscript</p>
                     </div>
                  </div>
                  <div>
                     <p className="text-base font-semibold">Abstract</p>
                     <p className="text-base font-regular">
                        In the ever-evolving landscape of the digital era, ensuring the security and integrity of hardware systems is paramount,
                        especially in the context of blockchain technology. As blockchain continues to gain traction in various industries, including
                        finance, supply chain, and healthcare, its reliance on secure hardware becomes increasingly evident. This article delves into the
                        intricate relationship between hardware security and blockchain systems, exploring the challenges and opportunities presented by
                        this convergence. The foundation of blockchain technology lies in its decentralized and immutable ledger, offering transparency
                        and trust without intermediaries. However, this trust comes under scrutiny when hardware vulnerabilities are exploited,
                        potentially compromising the integrity of the entire blockchain network. This article highlights the critical role of secure
                        hardware components, such as trusted execution environments (TEEs) and hardware security modules (HSMs), in safeguarding the
                        cryptographic keys and transactions that underpin blockchain systems. Furthermore, we delve into the emerging technologies and
                        cryptographic techniques employed to fortify the hardware layer of blockchain networks. Secure enclaves, multi-party computation,
                        and post-quantum cryptography are discussed as promising advancements in enhancing the resilience of blockchain systems against
                        attacks. We also examine real-world case studies and best practices in implementing hardware security solutions for
                        blockchain-based applications. As the digital era unfolds, the synergy between hardware security and blockchain systems is pivotal
                        in realizing the full potential of decentralized and secure digital transactions. This article aims to provide insights into the
                        evolving landscape of hardware security in the blockchain ecosystem and the collaborative efforts required to propel the new
                        digital era into a realm of trust, transparency, and resilience.
                     </p>
                  </div>
                  <div className="flex flex-col gap-2">
                     <p className="text-base font-semibold">Visual abstract</p>
                     {/* eslint-disable-next-line @next/next/no-img-element */}
                     <img loading="lazy" src={'/images/Frame 987.png'} alt="article-image" className="w-fit lg:h-72 object-contain" />
                  </div>
                  <div>
                     <p className="text-base font-semibold">Editors/reviewers</p>
                     <div>
                        {authors_mock.map((item, index) => (
                           <div key={item.id} className="border-b border-neutral-stroke_light">
                              <div className="grid md:grid-cols-5 gap-4  items-center px-0 py-3 rounded-md">
                                 <div className="border border-neutral-stroke_light rounded px-2 w-full lg:w-28 flex items-center justify-center">
                                    <p
                                       className={twMerge(
                                          'text-base text-secundary_blue-main first-letter:uppercase font-semibold',
                                          `${item.role == 'reviewer' && 'text-[#EFB521]'}`,
                                          `${item.role == 'editor' && 'text-terciary-main'}`
                                       )}
                                    >
                                       {item.role}
                                    </p>
                                 </div>
                                 <div className="flex items-center gap-4">
                                    <div>
                                       <p className="text-base text-secundary_blue-main">{item.name}</p>
                                    </div>
                                 </div>
                                 <div>
                                    <p className="text-base text-secundary_blue-main">{item.title}</p>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
                  <div className="flex items-center gap-2">
                     <HandThumbsUp className="w-6 h-6 cursor-pointer" />
                     <p className="text-lg">Like the article</p>
                  </div>
               </div>
            </div>
         </div>
      </React.Fragment>
   )
}

const tags = [
   { id: 1, name: 'Blockchain' },
   { id: 2, name: 'Technology' }
]

const authors = [
   { id: 1, name: 'Alice Thompson.' },
   { id: 2, name: 'Bob Richards.' }
]

const header_editor_reviewer = [
   {
      id: 1,
      label: 'Name',
      value: 'name'
   },
   {
      id: 2,
      label: 'Title',
      value: 'title'
   },
   {
      id: 3,
      label: 'E-mail',
      value: 'email'
   }
]
