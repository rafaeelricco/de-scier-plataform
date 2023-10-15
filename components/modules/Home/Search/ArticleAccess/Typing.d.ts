interface ArticleAcessProps {
   access_type: 'open' | 'paid'
   date: string
   value: number
   className?: string
   onViewDocument?: () => void
   onBuyDocument?: () => void
}

export { ArticleAcessProps }
