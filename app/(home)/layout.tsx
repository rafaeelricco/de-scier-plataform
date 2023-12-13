import Footer from '@/components/common/Footer/Footer'
import Header from '@/components/common/Header/Header'
import { HeaderMobile } from '@/components/common/Header/HeaderHome'
import '@styles/layout.css'
import React from 'react'

export default function HomeLayout({ children }: { children: React.ReactNode }) {
   return (
      <main>
         <section className="relative bg-aquarela z-0 2xl:min-h-[100vh] overflow-x-hidden">
            <div className="lg:px-20 2xl:px-52">
               <div className="block ">
                  <HeaderMobile />
               </div>
               <div className="hidden lg:flex lg:pt-14 xl:pt-8 2xl:pt-14 z-10 justify-center">
                  <Header />
               </div>
               <div className="z-10 px-4 sm:px-6 lg:px-0">{children}</div>
            </div>
            <Footer />
         </section>
      </main>
   )
}
