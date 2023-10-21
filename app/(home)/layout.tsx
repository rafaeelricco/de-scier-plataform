import Footer from '@/components/common/Footer/Footer'
import Header from '@/components/common/Header/Header'
import { HeaderHome } from '@/components/common/Header/HeaderHome'
import '@styles/layout.css'
import React from 'react'

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
   return (
      <React.Fragment>
         <section className="relative lg:px-52 bg-aquarela z-0 lg:min-h-[100vh]">
            <div className="block lg:hidden">
               <HeaderHome />
            </div>
            <div className="hidden lg:flex lg:pt-14 z-10 justify-center">
               <Header />
            </div>
            <div className="z-10 px-6 lg:px-0">{children}</div>
         </section>
         <footer className="relative z-20">
            <Footer />
         </footer>
      </React.Fragment>
   )
}
