import React from 'react'
import Profile from '../../Profile/Profile'
import { SidesProps } from '../Typing'

export const MobileProfileComponent: React.FC<SidesProps> = ({ onClose }: SidesProps) => {
   return (
      <React.Fragment>
         <div className="relative">
            <Profile className="block w-auto" onClose={() => onClose()} />
         </div>
      </React.Fragment>
   )
}
