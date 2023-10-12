import * as Button from '@components/common/Button/Button'
import * as Input from '@components/common/Input/Input'
import React from 'react'
import { X } from 'react-bootstrap-icons'
import GenericSuccess from './Success'

const UpdateEmail: React.FC<UpdateEmailProps> = ({
   onClose,
   onSetNewEmail,
   onSetPassword,
   onForgotPassword,
   new_email = false,
   insert_password = true,
   success = false
}: UpdateEmailProps) => {
   return (
      <React.Fragment>
         <X
            className="w-8 h-8 absolute top-4 right-4 cursor-pointer hover:text-status-error transition-all duration-500 ease-out hover:scale-110 hover:rotate-180 transform"
            onClick={onClose}
         />
         {success && <GenericSuccess onClose={onClose} text="E-mail updated" message="Your e-mail was updated." button_text="Return" />}
         {new_email && (
            <div className="grid gap-6">
               <div className="grid gap-2">
                  <h3 className="text-xl font-semibold">Change e-mail</h3>
               </div>
               <Input.Root>
                  <Input.Label>New e-mail</Input.Label>
                  <Input.Password placeholder="Type your password" />
               </Input.Root>
               <Button.Button className="py-3 px-4" onClick={onSetNewEmail}>
                  Continue
               </Button.Button>
            </div>
         )}
         {insert_password && (
            <div className="grid gap-6">
               <div className="grid gap-2">
                  <h3 className="text-xl font-semibold">Change e-mail</h3>
               </div>
               <Input.Root>
                  <Input.Label>Password</Input.Label>
                  <Input.Password placeholder="Type your password" />
               </Input.Root>
               <div className="grid gap-6">
                  <Button.Button className="py-3 px-8" onClick={onSetPassword}>
                     Continue
                  </Button.Button>
                  <p
                     className="text-sm underline cursor-pointer text-center hover:text-primary-hover transition-all duration-200"
                     onClick={onForgotPassword}
                  >
                     Forgot your password? Click here.
                  </p>
               </div>
            </div>
         )}
      </React.Fragment>
   )
}

interface UpdateEmailProps {
   new_email?: boolean
   insert_password?: boolean
   success?: boolean
   onSetPassword: () => void
   onSetNewEmail: () => void
   onClose: () => void
   onForgotPassword?: () => void
}

export default UpdateEmail
