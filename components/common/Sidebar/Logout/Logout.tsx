import { home_routes } from '@/routes/home'
import { formatName } from '@/utils/format_texts'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import LogoutIcon from 'public/svgs/common/sidebar/Icons/logout.svg'
import React from 'react'

const Logout: React.FC<{ onLogout: () => void }> = ({ onLogout }: { onLogout: () => void }) => {
   const router = useRouter()
   const { data } = useSession()

   const handleLogout = async () => {
      await signOut()
      router.push(home_routes.home.index)
   }
   return (
      <React.Fragment>
         <div className="grid grid-flow-col items-center justify-start gap-4">
            <div className="relative w-12 h-12 overflow-hidden rounded-full">
               <Image
                  width={200}
                  height={200}
                  alt="avatar"
                  priority={true}
                  src={data?.user?.userInfo.avatar || '/images/profile_dk08wk.png'}
                  style={{
                     objectFit: 'cover',
                     width: '100%',
                     height: '100%'
                  }}
                  className="hover:scale-110 transition-all duration-300"
               />
            </div>
            <div className="grid grid-flow-col items-center gap-4">
               <p className="font-semibold text-base text-primary-main select-none">{formatName(data?.user?.name || '')}</p>
               <LogoutIcon
                  width={18}
                  className="fill-neutral-light_gray cursor-pointer hover:fill-primary-main transition-all duration-300 hover:scale-110 mt-[2px]"
                  onClick={handleLogout}
               />
            </div>
         </div>
      </React.Fragment>
   )
}

export default Logout
