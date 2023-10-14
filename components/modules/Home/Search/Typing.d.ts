interface ArticleItemProps {
   id?: string
   status: 'pending' | 'approved' | 'final_approved' | 'rejected' | 'published' | null
   published?: boolean
   published_date?: string | null
   access_type?: 'open' | 'paid' | null
   likes?: number | null
   views?: number | null
   image: string
   since: string
   title: string
   link: string
}

export { ArticleItemProps }
