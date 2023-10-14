interface ArticleCardProps {
   id: string
   title: string
   authors: { id: number; name: string }[]
   image: string
   likes: number | null
   views: number | null
   tags: { id: number; name: string }[]
}

export { ArticleCardProps }
