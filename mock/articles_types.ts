import { Option } from '@/components/common/Input/Typing'
import { random } from 'lodash'

export const articles_types: Option[] = [
   {
      id: random(1, 1000 * 9999),
      label: 'Research article',
      value: 'research-article'
   },
   {
      id: random(1, 1000 * 9999),
      label: 'Review article',
      value: 'review-article'
   },
   {
      id: random(1, 1000 * 9999),
      label: 'Capstone work (TCC)',
      value: 'capstone-work'
   },
   {
      id: random(1, 1000 * 9999),
      label: 'Short communication',
      value: 'short-communication'
   },
   {
      id: random(1, 1000 * 9999),
      label: 'Case report',
      value: 'case-report'
   },
   {
      id: random(1, 1000 * 9999),
      label: 'Case series',
      value: 'case-series'
   },
   {
      id: random(1, 1000 * 9999),
      label: 'Technical note',
      value: 'technical-note'
   },
   {
      id: random(1, 1000 * 9999),
      label: 'Technical report',
      value: 'technical-report'
   },
   {
      id: random(1, 1000 * 9999),
      label: 'Systematic review',
      value: 'systematic-review'
   },
   {
      id: random(1, 1000 * 9999),
      label: 'Pictorial essay',
      value: 'pictorial-essay'
   },
   {
      id: random(1, 1000 * 9999),
      label: 'Letter to the Editor',
      value: 'letter-to-the-editor'
   },
   {
      id: random(1, 1000 * 9999),
      label: 'Correspondence',
      value: 'correspondence'
   },
   {
      id: random(1, 1000 * 9999),
      label: 'Commentary',
      value: 'commentary'
   },
   {
      id: random(1, 1000 * 9999),
      label: 'Conference Abstract',
      value: 'conference-abstract'
   },
   {
      id: random(1, 1000 * 9999),
      label: 'Editorial',
      value: 'editorial'
   },
   {
      id: random(1, 1000 * 9999),
      label: 'Other',
      value: 'other'
   }
]
