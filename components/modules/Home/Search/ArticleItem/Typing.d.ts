interface ArticleItemProps {
   id: string
   published_date: string
   access_type: 'open' | 'paid' | null
   likes: number | null
   views: number | null
   image: string
   title: string
   tags: { id: string; name: string }[]
   authors: { id: string; name: string }[]
}

export { ArticleItemProps }
