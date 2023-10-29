import { ArticleUnderReviewProps } from '@/components/common/Publication/Item/ArticlesUnderReview'
import { format } from 'date-fns'
import { getSession, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { DocumentPaginationProps } from './getArticles'

export const useArticles = () => {
   const { data } = useSession()

   const [articles, setArticles] = useState<ArticleUnderReviewProps[] | null>(null)
   const [loading, setLoading] = useState<boolean>(true)

   useEffect(() => {
      const fetchArticles = async () => {
         if (data?.user?.token) {
            const session = await getSession()

            if (session?.user?.token) {
               const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/documents`, {
                  method: 'GET',
                  headers: {
                     'Content-Type': 'application/json',
                     authorization: `Bearer ${session.user.token}`
                  }
               })

               const response: DocumentPaginationProps = await request.json()

               const formatted_response: ArticleUnderReviewProps[] = response?.documents.data?.map((article) => {
                  return {
                     id: article.id,
                     status_editor: article.editorsApprovals === 0 ? 'pending' : ('approved' as ArticleUnderReviewProps['status_editor']),
                     status_reviewer: article.reviewerApprovals === 0 ? 'pending' : ('approved' as ArticleUnderReviewProps['status_reviewer']),
                     image: article.cover || '',
                     since: format(new Date(article.createdAt), 'dd/MM/yyyy'),
                     title: article.title,
                     link: `/articles/${article.id}`
                  }
               })

               setArticles(formatted_response)
               setLoading(false)
            }
         }
      }

      fetchArticles()
   }, [data?.user?.token])

   return { articles, loading }
}
