import { useState } from 'react'

type LoadingKey = 'loading'
type LoadingState = { [key in LoadingKey]: boolean }

export function useLoading() {
   const [loading, setLoading] = useState<LoadingState>({
      loading: false
   })

   const start = (key: LoadingKey) => {
      setLoading((prevState) => ({ ...prevState, [key]: true }))
   }

   const stop = (key: LoadingKey) => {
      setLoading((prevState) => ({ ...prevState, [key]: false }))
   }

   return {
      loading,
      start,
      stop
   }
}
