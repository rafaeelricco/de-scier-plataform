import { getSession } from 'next-auth/react'

export const downloadDocumentVersionService = async (data: DownloadProps) => {
   const session = await getSession()
   const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/documents/download-version`, {
      method: 'POST',
      headers: {
         'content-type': 'application/json',
         authorization: `Bearer ${session?.user?.token}`
      },
      body: JSON.stringify(data)
   })

   if (response.status === 200) {
      const responseBlob = await response.blob()
      console.log(responseBlob)
      return {
         success: true,
         message: 'Download successfully',
         file: responseBlob!
      }
   }

   const responseData = await response.json()

   const message = responseData.message ?? 'Error in download document.'

   return {
      success: false,
      message: message
   }
}

type DownloadProps = {
   documentId: string
   fileId: string
   userId: string
}
