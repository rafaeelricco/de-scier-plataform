import { home_routes } from '@/routes/home'
import { uniqueId } from 'lodash'

export const links = [
   {
      id: uniqueId(),
      label: 'Home',
      link: home_routes.home.index
   },
   {
      id: uniqueId(),
      label: 'Search',
      link: home_routes.home.search
   },
   {
      id: uniqueId(),
      label: 'About us',
      link: 'https://descier.science/'
   },
   {
      id: uniqueId(),
      label: 'Dashboard',
      link: home_routes.summary
   },
   {
      id: uniqueId(),
      label: 'My IP',
      link: '/my-ip'
   }
]
