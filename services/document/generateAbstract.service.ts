import { getSession } from 'next-auth/react'

export const generateAbstractService = async () => {
   const session = await getSession()
}
