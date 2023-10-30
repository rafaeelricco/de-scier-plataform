export type User = {
   id: string
   name: string
   email: string
   title?: string
   lattes: string | null
   avatar: string | null
   walletAddress: string | null
   aiUsageLimit: number
}

export type UserSession = {
   name?: string
   email: string
   token: string
   userInfo: User
   redirectToRegister?: boolean
   googleId?: string
}

// format useSession interface to include user info
declare module 'next-auth' {
   interface Session {
      user?: UserSession
   }
}
