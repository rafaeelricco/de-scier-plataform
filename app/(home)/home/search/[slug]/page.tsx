'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { ArrowLeft } from 'react-bootstrap-icons'

export default function Page({ params }: { params: { slug: string } }) {
   const router = useRouter()
   return (
      <React.Fragment>
         <div className="grid gap-8">
            <div className="flex items-center gap-4 pt-12">
               <ArrowLeft size={32} className="hover:scale-110 transition-all cursor-pointer" onClick={() => router.back()} />
               <h1 className="text-1xl font-semibold">Return</h1>
            </div>
            <div className="bg-white rounded-xl h-[629px]"></div>
            <div className="flex items-center gap-8">
               <div className="bg-white rounded-xl h-[629px] w-full flex-grow"></div>
               <div className="bg-white rounded-xl h-[629px] w-[389px]"></div>
            </div>
         </div>
      </React.Fragment>
   )
}
