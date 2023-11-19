import { Author } from '@/mock/submit_new_document'
/**
 * @title Calculate Remaining Share Function
 * @author Your Name
 * @notice This function is used to distribute a share value evenly among authors, excluding the current author, and update their shares accordingly.
 * @dev This function takes the ID of the current author, their new share percentage, a list of authors, and a setter function for updating authors. It calculates the new share percentage for other authors and updates the state.
 * @param {string} currentAuthorId - The unique identifier of the current author.
 * @param {string} newAuthorShare - The new share percentage for the current author, in string format with a '%' symbol.
 * @param {Author[]} authors - An array of author objects.
 * @param {(authors: Author[]) => void} setAuthors - A setter function for updating the authors' array.
 */
export const calculateRemainingShare = (currentAuthorId: string, newAuthorShare: string, authors: Author[], setAuthors: (authors: Author[]) => void) => {
   const newShareValue = parseFloat(newAuthorShare.replace('%', ''))

   const updatedAuthors = authors.map((author) => {
      if (author.id === currentAuthorId) {
         return { ...author, share: `${newShareValue}%` }
      }
      return author
   })

   const remainingShare = 100 - newShareValue
   const otherAuthorsCount = authors.length - 1

   if (otherAuthorsCount > 0) {
      const sharePerAuthor = remainingShare / otherAuthorsCount

      updatedAuthors.forEach((author) => {
         if (author.id !== currentAuthorId) {
            author.share = `${sharePerAuthor}%`
         }
      })
   }

   setAuthors(updatedAuthors)
}
