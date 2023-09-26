import '@styles/globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
   weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
   subsets: ['latin'],
   display: 'auto',
   preload: true
})

export const metadata: Metadata = {
   title: 'deScier Plataform – Decentralized Science',
   description:
      'A decentralized science-DeSci publishing platform uses blockchain technology and smart contracts to enable the publication and distribution of academic papers.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang="en">
         <body className={poppins.className}>{children}</body>
      </html>
   )
}
