import Footer from '@/components/common/Footer/Footer'
import Header from '@/components/common/Header/Header'
import '@styles/layout.css'
import React from 'react'

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
   return (
      <React.Fragment>
         <section className="relative px-52 lg:px-44 bg-aquarela z-0 min-h-[100vh]">
            <div className="pt-14 z-10 flex justify-center">
               <Header />
            </div>
            <div className="z-10">{children}</div>
         </section>
         <footer className="relative z-20">
            <Footer />
         </footer>
      </React.Fragment>
   )
}
