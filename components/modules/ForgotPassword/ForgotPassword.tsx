import * as Button from '@components/common/Button/Button'
import * as Input from '@components/common/Input/Input'
import '@styles/login.css'
import React, { useState } from 'react'
import { ArrowLeft, X } from 'react-bootstrap-icons'
import GenericSuccess from '../Profile/Modals/Success'
import {
   ConfirmRecoveryPasswordProps,
   confirmRecoveryPasswordRequestService,
   recoveryPasswordRequestService,
   validateRecoveryPasswordRequesService
} from '@/services/user/forgotPassword.service'
import { toast } from 'react-toastify'
import { UseFormRegister, useForm } from 'react-hook-form'

type ForgotPasswordModalProps = { onClose: () => void; onBack: () => void }

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ onBack, onClose }: ForgotPasswordModalProps) => {
   const { register, getValues } = useForm<ConfirmRecoveryPasswordProps>({
      defaultValues: {
         confirmationCode: '',
         email: '',
         newPassword: '',
         confirmPassword: ''
      }
   })
   const [component, setComponent] = React.useState({
      insert_email: true,
      insert_code: false,
      insert_new_password: false,
      success: false
   })

   const handleInsertEmailContinue = async () => {
      const toastId = toast.loading('Requesting recovery password code...')
      const response = await recoveryPasswordRequestService(getValues('email'))
      toast.dismiss(toastId)
      if (!response.success) {
         toast.error(response.message)
         return
      }
      setComponent({
         insert_email: false,
         insert_code: true,
         insert_new_password: false,
         success: false
      })
   }

   const handleInsertCodeContinue = async () => {
      const toastId = toast.loading('Validating code...')
      const response = await validateRecoveryPasswordRequesService({
         email: getValues('email'),
         confirmationCode: getValues('confirmationCode')
      })
      toast.dismiss(toastId)
      if (!response.success) {
         toast.error(response.message)
         return
      }
      setComponent({
         insert_email: false,
         insert_code: false,
         insert_new_password: true,
         success: false
      })
   }

   const handleInsertCodeBack = () => {
      setComponent({
         insert_email: true,
         insert_code: false,
         insert_new_password: false,
         success: false
      })
   }

   const handleInsertNewPasswordContinue = async () => {
      const toastId = toast.loading('Resetting password...')
      const response = await confirmRecoveryPasswordRequestService({
         email: getValues('email'),
         confirmationCode: getValues('confirmationCode'),
         newPassword: getValues('newPassword'),
         confirmPassword: getValues('confirmPassword')
      })
      toast.dismiss(toastId)
      if (!response.success) {
         toast.error(response.message)
         return
      }

      setComponent({
         insert_email: false,
         insert_code: false,
         insert_new_password: false,
         success: true
      })
   }

   return (
      <form>
         {component.insert_email && <InserEmail onClose={onClose} onContinue={handleInsertEmailContinue} onBack={onBack} register={register} />}
         {component.insert_code && (
            <InsertCode onClose={onClose} onContinue={handleInsertCodeContinue} onBack={handleInsertCodeBack} register={register} />
         )}
         {component.insert_new_password && (
            <InsertNewPassword onClose={onClose} onContinue={handleInsertNewPasswordContinue} onBack={handleInsertCodeBack} register={register} />
         )}
         {component.success && (
            <div className="w-ful grid gap-6 md:p-16 relative p-6 pb-12">
               <GenericSuccess text="Password updated" message="Your password was updated." button_text="Return" onClose={onClose} />
            </div>
         )}
      </form>
   )
}

type HeaderProps = { onClose: () => void; onBack: () => void }

const Header: React.FC<HeaderProps> = ({ onBack, onClose }: HeaderProps) => {
   return (
      <React.Fragment>
         <X
            className="w-8 h-8 absolute top-4 right-4 cursor-pointer hover:text-status-error transition-all duration-500 ease-out hover:scale-110 hover:rotate-180 transform"
            onClick={onClose}
         />
         <div className="flex items-center gap-4">
            <ArrowLeft size={28} onClick={onBack} className="cursor-pointer hover:scale-110 transition-all duration-200" />
            <h2 className="font-semibold text-1xl">Password recovery</h2>
         </div>
      </React.Fragment>
   )
}

type InsertEmailProps = {
   onClose: () => void
   onBack: () => void
   onContinue: () => void
   register: UseFormRegister<ConfirmRecoveryPasswordProps>
}

const InserEmail: React.FC<InsertEmailProps> = ({ onBack, onClose, onContinue, register }: InsertEmailProps) => {
   return (
      <React.Fragment>
         <div className="w-ful grid gap-6 md:p-16 relative p-6 pb-12">
            <Header onBack={onBack} onClose={onClose} />
            <div className="grid gap-6">
               <div className="grid gap-6">
                  <Input.Root>
                     <Input.Label>E-mail</Input.Label>
                     <Input.Input type="email" placeholder="Type your best email" {...register('email')} />
                  </Input.Root>
               </div>
               <Button.Button onClick={onContinue}>Continue</Button.Button>
            </div>
         </div>
      </React.Fragment>
   )
}

type InsertCodeProps = { onClose: () => void; onBack: () => void; onContinue: () => void; register: UseFormRegister<ConfirmRecoveryPasswordProps> }

const InsertCode: React.FC<InsertCodeProps> = ({ onBack, onClose, onContinue, register }: InsertCodeProps) => {
   return (
      <React.Fragment>
         <div className="w-ful grid gap-6 md:p-16 relative p-6 pb-12">
            <Header onBack={onBack} onClose={onClose} />
            <div className="grid gap-6">
               <p className="text-base">
                  We’ve sent you a confirmation code in your email. Didn’t receive the e-mail?
                  <span className="font-semibold text-terciary-main hover:cursor-pointer">Send code again.</span>
               </p>
               <div className="grid gap-6">
                  <Input.Root>
                     <Input.Label>Code</Input.Label>
                     <Input.Input placeholder="Insert the confirmation code" {...register('confirmationCode')} />
                  </Input.Root>
               </div>
               <Button.Button onClick={onContinue}>Continue</Button.Button>
            </div>
         </div>
      </React.Fragment>
   )
}

type InsertNewPasswordProps = { onClose: () => void; onBack: () => void; onContinue: () => void; register: UseFormRegister<ConfirmRecoveryPasswordProps> }

const InsertNewPassword: React.FC<InsertNewPasswordProps> = ({ onBack, onClose, onContinue, register }: InsertNewPasswordProps) => {
   return (
      <React.Fragment>
         <div className="w-ful grid gap-6 md:p-16 relative p-6 pb-12">
            <Header onBack={onBack} onClose={onClose} />
            <div className="grid gap-6">
               <div className="grid gap-6">
                  <Input.Root>
                     <Input.Label>Password</Input.Label>
                     <Input.Password placeholder="Type your password" {...register('newPassword')} />
                  </Input.Root>
                  <Input.Root>
                     <Input.Label>Password confirmation</Input.Label>
                     <Input.Password placeholder="Type your password again" {...register('confirmPassword')} />
                  </Input.Root>
               </div>
               <Button.Button onClick={onContinue}>Continue</Button.Button>
            </div>
         </div>
      </React.Fragment>
   )
}

export default ForgotPasswordModal
