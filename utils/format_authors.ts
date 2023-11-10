export function formatAuthors(authors: { id: string; name: string }[]): string {
   let totalChars = 0
   let displayedAuthors = []

   for (let author of authors) {
      totalChars += author.name.length

      if (totalChars + displayedAuthors.length * 2 > 16) {
         const remaining = authors.length - displayedAuthors.length
         return `${displayedAuthors.join(', ')} and ${remaining} more authors`
      }

      displayedAuthors.push(author.name)
   }

   return displayedAuthors.join(', ')
}
