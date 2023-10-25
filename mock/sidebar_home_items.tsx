import { home_routes } from '@/routes/home'
import sha256 from 'sha256'

export const links = [
   {
      id: sha256('1'),
      label: 'Home',
      link: home_routes.home.index
   },
   {
      id: sha256('2'),
      label: 'Search',
      link: home_routes.home.search
   },
   {
      id: sha256('3'),
      label: 'About us',
      link: 'https://descier.science/'
   },
   {
      id: sha256('4'),
      label: 'Dashboard',
      link: home_routes.summary
   },
   {
      id: sha256('5'),
      label: 'My IP',
      link: '/my-ip'
   }
]
