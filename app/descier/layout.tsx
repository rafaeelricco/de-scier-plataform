import Footer from '@/components/common/Footer/Footer'
import Profile from '@/components/common/Profile/Profile'
import SidebarDeScier from '@/components/common/Sidebar/deScier/SidebarDeScier'
import '@styles/layout.css'
import React from 'react'

export default function DeScierLayout({ children }: { children: React.ReactNode }) {
   return (
      <React.Fragment>
         <section className="home scrollbar-hidden">
            <SidebarDeScier />
            <div className="col-2 row-1 lg:my-10 lg:mx-2  2xl:my-16 2xl:mx-6">{children}</div>
            <Profile />
         </section>
         <Footer />
      </React.Fragment>
   )
}