import Header from '@/components/common/Header/Header'
import '@styles/layout.css'
import React from 'react'

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
   return (
      <React.Fragment>
         <section className="relative px-52 bg-aquarela z-0 h-[200vh]">
            <div className="pt-14 z-10">
               <Header />
            </div>
            <div className="pt-24 z-10">{children}</div>
         </section>
      </React.Fragment>
   )
}
