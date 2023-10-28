import { getSession } from 'next-auth/react'

export const submitNewDocumentService = async (data: SubmitDocumentProps) => {
   const session = await getSession()
   const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/documents`, {
      method: 'POST',
      headers: {
         'content-type': 'application/json',
         authorization: `Bearer ${session?.user?.token}`
      },
      body: JSON.stringify(data)
   })

   if (response.status === 201) {
      return {
         success: true,
         message: 'Document submitted successfully'
      }
   }

   const responseData = await response.json()
   const message = responseData.message ?? 'Error in submit document.'

   return {
      success: false,
      message: message
   }
}

type SubmitDocumentProps = {
   title: string
   abstract: string
   abstractChart?: string | null
   keywords: string[]
   field: string
   documentType: string
   accessType: string
   price: number
   authors: Author[]
}

type Author = {
   name: string
   email: string
   title: string
   revenuePercent?: number
   walletAddress?: string
}
