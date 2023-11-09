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

const submited_item_mock = [
   {
      id: 1,
      title: 'LCDs - How the technology was concieved ....',
      date: 'Aug 21, 2021',
      status: 'published'
   },
   {
      id: 2,
      title: 'Blockchain and financial technology - How can we integrate with the te...',
      date: 'Aug 21, 2021',
      status: 'in_review'
   },
   {
      id: 3,
      title: 'Biology and isolated islands - How are the spieces influenciated by scarrce',
      date: 'Aug 21, 2021',
      status: 'published'
   },
   {
      id: 4,
      title: 'Solar energy - Harnessing the power of the sun for a sustainable future...',
      date: 'Aug 22, 2021',
      status: 'published'
   },
   {
      id: 5,
      title: 'Artificial Intelligence - The rise and implications of machine learning...',
      date: 'Aug 22, 2021',
      status: 'in_review'
   },
   {
      id: 6,
      title: 'Space exploration - The journey to Mars and beyond...',
      date: 'Aug 23, 2021',
      status: 'published'
   },
   {
      id: 7,
      title: 'Quantum computing - The next frontier in computational power...',
      date: 'Aug 23, 2021',
      status: 'in_review'
   },
   {
      id: 8,
      title: 'Augmented Reality - Blending the digital and physical worlds...',
      date: 'Aug 24, 2021',
      status: 'published'
   }
]
