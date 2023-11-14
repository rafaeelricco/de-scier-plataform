import { article_categories } from '@/mock/article_category'
import { article_types } from '@/mock/article_type'

export function getArticleCategoryLabel(value: string): string {
   let find_label = ''
   article_categories?.forEach((category) => {
      if (category.value === value) {
         find_label = category.label
      }
   })
   return find_label
}

export function getArticleTypeLabel(value: string): string {
   let find_label = ''
   article_types?.forEach((category) => {
      if (category.value === value) {
         find_label = category.label
      }
   })
   return find_label
}
