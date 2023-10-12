import * as Button from '@components/common/Button/Button'
import Success from 'public/svgs/common/profile/update-email.svg'
import React from 'react'

const GenericSuccess: React.FC<SuccessProps> = ({ text, message, button_text, onClose }: SuccessProps) => {
   return (
      <React.Fragment>
         <div className="grid gap-6">
            <div className="grid gap-2">
               <h3 className="text-xl font-semibold">{text}</h3>
            </div>
            <Success className="w-36 flex mx-auto my-0" />
            <p className="text-sm font-regular text-center">{message}</p>
            <Button.Button className="py-3 px-4" onClick={onClose}>
               {button_text}
            </Button.Button>
         </div>
      </React.Fragment>
   )
}

interface SuccessProps {
   text: string
   message: string
   button_text: string
   onClose: () => void
}

export default GenericSuccess
