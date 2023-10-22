'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

interface Props {
   children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
   return (
      <div>
         <SessionProvider>{children}</SessionProvider>
      </div>
   )
}

export { AuthProvider }
