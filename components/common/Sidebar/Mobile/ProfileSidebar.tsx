import React from 'react'
import Profile from '../../Profile/Profile'
import { SidesProps } from '../Typing'

/**
 * @title Mobile Profile Component
 * @notice This component renders the mobile view of a user profile
 * @dev This React functional component uses the SidesProps for props input and handles the rendering of the Profile component in a mobile-responsive manner
 */
export const MobileProfileComponent: React.FC<SidesProps> = ({ onClose }: SidesProps) => {
   return (
      <React.Fragment>
         <div className="relative">
            <Profile className="block w-auto" onClose={() => onClose()} />
         </div>
      </React.Fragment>
   )
}
