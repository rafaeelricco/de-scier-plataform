'use client'

import { SessionProvider } from 'next-auth/react'

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
   return (
      <main>
         <SessionProvider>{children}</SessionProvider>
      </main>
   )
}

export { AuthProvider }
