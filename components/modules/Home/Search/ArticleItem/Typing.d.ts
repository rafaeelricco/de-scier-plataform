interface ArticleItemProps {
   id: string
   published_date: string
   access_type: 'open' | 'paid' | null
   likes: number | null
   views: number | null
   image: string
   title: string
   tags: { id: number; name: string }[]
   authors: { id: number; name: string }[]
}

export { ArticleItemProps }
