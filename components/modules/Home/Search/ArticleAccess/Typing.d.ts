interface ArticleAcessProps {
   access_type: 'open' | 'paid' | 'purchased' | 'author'
   date: string
   value: number
   className?: string
   onViewDocument?: () => void
   onBuyDocument?: () => void
}

export { ArticleAcessProps }
