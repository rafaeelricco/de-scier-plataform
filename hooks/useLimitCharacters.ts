import React from 'react'

interface CharacterLimit {
   e: React.FormEvent<HTMLTextAreaElement>
   onInput: (e: React.FormEvent<HTMLTextAreaElement>) => void
   limit: number
}

export const useLimitCharacters = (limit: number) => {
   const [length, setLength] = React.useState(0)

   const characterLimit = ({ e, onInput }: CharacterLimit) => {
      const value = e.currentTarget.value
      const valueWithoutSpaces = value.replace(/\s/g, '')

      if (valueWithoutSpaces.length < limit) {
         onInput(e)
      } else {
         e.currentTarget.value = valueWithoutSpaces.slice(0, limit - 1)
      }

      setLength(valueWithoutSpaces.length)
   }

   return { length, limit, characterLimit }
}
