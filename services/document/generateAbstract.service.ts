import { getSession } from 'next-auth/react'
import { localUrlToFile } from '../file/file.service'

const API_URL = process.env.NEXT_PUBLIC_API_URL

type GenerateAbstractProps = {
   fileLocalUrl: string
   filename: string
}

export const generateAbstractService = async (body: GenerateAbstractProps) => {
   const session = await getSession()

   const file = await localUrlToFile(body.fileLocalUrl, body.filename)
   const formData = new FormData()
   formData.append('file', file)

   const request = await fetch(`${API_URL}/documents/generate-abstract`, {
      method: 'POST',
      body: formData,
      headers: {
         Authorization: `Bearer ${session?.user?.token}`,
         'Access-Control-Allow-Origin': '*'
      }
   })

   const responseStatus = request.status === 200

   const responseData = await request.json()

   if (!responseStatus) {
      return {
         success: false,
         message: responseData.message ?? 'Error in generate abstract, try again.'
      }
   }

   return {
      success: true,
      message: 'Abstract generated successfully.',
      abstract: responseData.abstract
   }
}
