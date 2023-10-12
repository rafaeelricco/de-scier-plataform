import Footer from '@/components/common/Footer/Footer'
import Profile from '@/components/common/Profile/Profile'
import Sidebar from '@/components/common/Sidebar/Sidebar'
import '@styles/layout.css'
import React from 'react'

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
   return (
      <React.Fragment>
         <section className="home scrollbar-hidden">
            <Sidebar />
            <div className="col-2 row-1 lg:my-20 lg:mx-24 2xl:my-40 2xl:mx-60">{children}</div>
            <Profile />
         </section>
         <Footer />
      </React.Fragment>
   )
}
