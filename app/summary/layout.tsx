import Sidebar from '@/components/common/Sidebar/Sidebar'
import '@styles/layout.css'
import React from 'react'

export default function SummaryLayout({ children }: { children: React.ReactNode }) {
   return (
      <React.Fragment>
         <section className="home">
            <Sidebar />
            <div className="col-2 row-1 m-16 mb-8">{children}</div>
         </section>
      </React.Fragment>
   )
}
