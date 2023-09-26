import Image from 'next/image'
import LogoutIcon from 'public/svgs/common/sidebar/Icons/logout.svg'
import PlaceholderImage from 'public/svgs/common/sidebar/placeholder-image.jpeg'
import React from 'react'

const Logout: React.FC<{ onLogout: () => void }> = ({ onLogout }: { onLogout: () => void }) => {
   return (
      <React.Fragment>
         <div className="grid grid-flow-col items-center justify-start gap-4">
            <div className="relative w-12 h-12 overflow-hidden rounded-full border border-gray-light">
               <Image
                  width={200}
                  height={200}
                  alt="avatar"
                  priority={true}
                  placeholder="blur"
                  src={PlaceholderImage}
                  style={{
                     objectFit: 'cover',
                     width: '100%',
                     height: '100%'
                  }}
                  className="hover:scale-110 transition-all duration-300"
               />
            </div>
            <div className="grid grid-flow-col items-center gap-4">
               <p className="font-semibold text-base text-primary-main select-none">
                  Caroline Nunes
               </p>
               <LogoutIcon
                  width={18}
                  className="fill-neutral-light_gray cursor-pointer hover:fill-primary-main transition-all duration-300 hover:scale-110 mt-[2px]"
               />
            </div>
         </div>
      </React.Fragment>
   )
}

export default Logout
