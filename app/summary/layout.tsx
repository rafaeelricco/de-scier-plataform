import Footer from '@/components/common/Footer/Footer'
import Profile from '@/components/common/Profile/Profile'
import Sidebar from '@/components/common/Sidebar/Sidebar'
import '@styles/layout.css'
import React from 'react'

export default function SummaryLayout({ children }: { children: React.ReactNode }) {
   return (
      <React.Fragment>
         <section className="home">
            <Sidebar />
            <div className="col-2 row-1 my-16 mx-6">{children}</div>
            <Profile />
         </section>
         <Footer />
      </React.Fragment>
   )
}
