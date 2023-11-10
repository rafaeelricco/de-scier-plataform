import { home_routes } from '@/routes/home'
import RedirectIcon from 'public/svgs/common/redirect.svg'
import AboutUsIcon from 'public/svgs/common/sidebar/Icons/about-us.svg'
import AdminIcon from 'public/svgs/common/sidebar/Icons/admin.svg'
import ArticlesIcon from 'public/svgs/common/sidebar/Icons/articles.svg'
import AsReviewerIcon from 'public/svgs/common/sidebar/Icons/as-reviewer.svg'
import HomeIcon from 'public/svgs/common/sidebar/Icons/home.svg'
import MyIPIcon from 'public/svgs/common/sidebar/Icons/my-ip.svg'
import ProfileIcon from 'public/svgs/common/sidebar/Icons/profile.svg'
import SummaryIcon from 'public/svgs/common/sidebar/Icons/summary.svg'

export const items = [
   {
      id: 1,
      text: 'Summary',
      icon: <SummaryIcon className="w-6 fill-neutral-light_gray md:w-5 lg:w-6" />,
      path: home_routes.summary,
      icon_end: null
   },
   {
      id: 2,
      text: 'Articles under Review',
      icon: <ArticlesIcon className="w-6 fill-neutral-light_gray md:w-5 lg:w-6" />,
      path: home_routes.articles_under_review,
      icon_end: null
   },
   {
      id: 8,
      text: 'As Reviewer/Editor',
      icon: <AsReviewerIcon className="w-6 fill-neutral-light_gray md:w-5 lg:w-6" />,
      path: home_routes.as_reviewer,
      icon_end: null
   },
   {
      id: 3,
      text: 'Profile',
      icon: <ProfileIcon className="w-6 fill-neutral-light_gray md:w-5 lg:w-6" />,
      path: home_routes.profile,
      icon_end: null
   },
   {
      id: 4,
      text: 'Home',
      icon: <HomeIcon className="w-6 fill-neutral-light_gray md:w-5 lg:w-6" />,
      path: home_routes.home.index,
      icon_end: null
   },
   {
      id: 5,
      text: 'About us',
      icon: <AboutUsIcon className="w-6 fill-neutral-light_gray md:w-5 lg:w-6" />,
      path: home_routes.about_us,
      icon_end: <RedirectIcon className="w-4 h-4 fill-neutral-light_gray transition-all duration-200" />
   },
   {
      id: 6,
      text: 'My IP',
      icon: <MyIPIcon className="w-6 fill-neutral-light_gray md:w-5 lg:w-6" />,
      path: home_routes.my_ip,
      icon_end: <RedirectIcon className="w-4 h-4 fill-neutral-light_gray transition-all duration-200" />
   },
   {
      id: 7,
      text: 'Admin',
      icon: <AdminIcon className="w-6 fill-neutral-light_gray md:w-5 lg:w-6" />,
      path: home_routes.descier.index,
      icon_end: null
   }
]
