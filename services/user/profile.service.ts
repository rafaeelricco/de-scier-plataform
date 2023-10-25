import { getSession } from 'next-auth/react'

export const getProfileService = async () => {
   const data = await getSession()

   const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/profile`, {
      method: 'GET',
      headers: {
         authorization: `Bearer ${data?.user?.token}`
      }
   })
}
