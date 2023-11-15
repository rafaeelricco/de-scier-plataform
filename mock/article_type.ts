import { Option } from '@/components/common/Input/Typing'
import { random } from 'lodash'

export const article_types: Option[] = [
   {
      id: random(1, 1000 * 9999),
      label: 'Research articles',
      value: 'research-articles'
   },
   {
      id: random(1, 1000 * 9999),
      label: 'Cases and notes',
      value: 'cases-and-notes'
   },
   {
      id: random(1, 1000 * 9999),
      label: 'Reviews',
      value: 'reviews'
   },
   {
      id: random(1, 1000 * 9999),
      label: 'Communications',
      value: 'communications'
   },
   {
      id: random(1, 1000 * 9999),
      label: 'Others',
      value: 'others'
   }
]

export const article_types_filter: Option[] = [
   {
      id: random(1, 1000 * 9999),
      label: 'All',
      value: null
   },
   {
      id: random(1, 1000 * 9999),
      label: 'Research articles',
      value: 'research-articles'
   },
   {
      id: random(1, 1000 * 9999),
      label: 'Cases and notes',
      value: 'cases-and-notes'
   },
   {
      id: random(1, 1000 * 9999),
      label: 'Reviews',
      value: 'reviews'
   },
   {
      id: random(1, 1000 * 9999),
      label: 'Communications',
      value: 'communications'
   },
   {
      id: random(1, 1000 * 9999),
      label: 'Others',
      value: 'others'
   }
]
