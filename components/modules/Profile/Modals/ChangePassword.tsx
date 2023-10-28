import { UpdateUserProps } from '@/schemas/update_user'
import { checkPasswordService } from '@/services/user/checkPassword.service'
import { updateUserService } from '@/services/user/update.service'
import * as Button from '@components/common/Button/Button'
import * as Input from '@components/common/Input/Input'
import React from 'react'
import { X } from 'react-bootstrap-icons'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import GenericSuccess from './Success'

const UpdatePassword: React.FC<UpdatePasswordProps> = ({
   onClose,
   onSetNewPassword,
   onSetPassword,
   onForgotPassword,
   new_password = false,
   insert_current_password = true,
   success = false
}: UpdatePasswordProps) => {
   const { register, handleSubmit } = useForm<UpdateUserProps>({})

   const [loading, setLoading] = React.useState(false)
   const [confirmPassword, setConfirmPassword] = React.useState('')

   const handleCheckPassword: SubmitHandler<UpdateUserProps> = async (data) => {
      setLoading(true)
      const response = await checkPasswordService({
         password: data.currentPassword!
      })

      if (!response.success) {
         setLoading(false)
         toast.error(response.message)
         return
      }

      setLoading(false)

      onSetPassword()
   }

   const handleUpdatePassword: SubmitHandler<UpdateUserProps> = async (data) => {
      setLoading(true)
      if (data.newPassword !== confirmPassword) {
         setLoading(false)
         toast.error("Passwords don't match")
         return
      }
      const response = await updateUserService(data)

      if (!response.success) {
         setLoading(false)
         toast.error(response.message)
         return
      }

      setLoading(false)

      onSetNewPassword()
   }
   return (
      <React.Fragment>
         <X
            className="w-8 h-8 absolute top-4 right-4 cursor-pointer hover:text-status-error transition-all duration-500 ease-out hover:scale-110 hover:rotate-180 transform"
            onClick={onClose}
         />
         {success && <GenericSuccess onClose={onClose} text="Password updated" message="Your password was updated." button_text="Return" />}
         {new_password && (
            <form className="grid gap-6" onSubmit={handleSubmit(handleUpdatePassword)}>
               <div className="grid gap-2">
                  <h3 className="text-xl font-semibold">New password</h3>
               </div>
               <div className="grid gap-6">
                  <Input.Root>
                     <Input.Label>Password</Input.Label>
                     <Input.Password placeholder="Type your password" {...register('newPassword')} />
                  </Input.Root>
                  <Input.Root>
                     <Input.Label>Password confirmation</Input.Label>
                     <Input.Password
                        placeholder="Type your password again"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                     />
                  </Input.Root>
               </div>
               <Button.Button className="py-3 px-4" type="submit" loading={loading}>
                  Continue
               </Button.Button>
            </form>
         )}
         {insert_current_password && (
            <form className="grid gap-6" onSubmit={handleSubmit(handleCheckPassword)}>
               <div className="grid gap-2">
                  <h3 className="text-xl font-semibold">Change password</h3>
               </div>
               <Input.Root>
                  <Input.Label>Current Password</Input.Label>
                  <Input.Password placeholder="Type your current password" {...register('currentPassword')} />
               </Input.Root>
               <div className="grid gap-6">
                  <Button.Button className="py-3 px-8" type="submit" loading={loading}>
                     Continue
                  </Button.Button>
                  <p
                     className="text-sm underline cursor-pointer text-center hover:text-primary-hover transition-all duration-200"
                     onClick={onForgotPassword}
                  >
                     Forgot your password? Click here.
                  </p>
               </div>
            </form>
         )}
      </React.Fragment>
   )
}

interface UpdatePasswordProps {
   new_password?: boolean
   insert_current_password?: boolean
   success?: boolean
   onSetPassword: () => void
   onSetNewPassword: () => void
   onClose: () => void
   onForgotPassword?: () => void
}

export default UpdatePassword
