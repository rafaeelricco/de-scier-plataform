import Sidebar from '@/components/common/Sidebar/deScier/SidebarDeScier'
import '@styles/layout.css'
import React from 'react'

export default function AboutLayout({ children }: { children: React.ReactNode }) {
   return (
      <React.Fragment>
         <section className="home">
            <Sidebar />
            <div className="col-2 row-1 m-16 pb-16">{children}</div>
         </section>
      </React.Fragment>
   )
}
