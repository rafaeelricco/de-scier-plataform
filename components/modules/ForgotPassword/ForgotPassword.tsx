import * as Button from '@components/common/Button/Button'
import * as Input from '@components/common/Input/Input'
import '@styles/login.css'
import React from 'react'
import { ArrowLeft, X } from 'react-bootstrap-icons'
import GenericSuccess from '../Profile/Modals/Success'

type ForgotPasswordModalProps = { onClose: () => void; onBack: () => void }

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ onBack, onClose }: ForgotPasswordModalProps) => {
   const [component, setComponent] = React.useState({
      insert_email: true,
      insert_code: false,
      insert_new_password: false,
      success: false
   })

   const handleInsertEmailContinue = () => {
      setComponent({
         insert_email: false,
         insert_code: true,
         insert_new_password: false,
         success: false
      })
   }

   const handleInsertCodeContinue = () => {
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

   const handleInsertNewPasswordContinue = () => {
      setComponent({
         insert_email: false,
         insert_code: false,
         insert_new_password: false,
         success: true
      })
   }

   return (
      <form>
         {component.insert_email && <InserEmail onClose={onClose} onContinue={handleInsertEmailContinue} onBack={onBack} />}
         {component.insert_code && <InsertCode onClose={onClose} onContinue={handleInsertCodeContinue} onBack={handleInsertCodeBack} />}
         {component.insert_new_password && (
            <InsertNewPassword onClose={onClose} onContinue={handleInsertNewPasswordContinue} onBack={handleInsertCodeBack} />
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

type InsertEmailProps = { onClose: () => void; onBack: () => void; onContinue: () => void }

const InserEmail: React.FC<InsertEmailProps> = ({ onBack, onClose, onContinue }: InsertEmailProps) => {
   return (
      <React.Fragment>
         <div className="w-ful grid gap-6 md:p-16 relative p-6 pb-12">
            <Header onBack={onBack} onClose={onClose} />
            <div className="grid gap-6">
               <div className="grid gap-6">
                  <Input.Root>
                     <Input.Label>E-mail</Input.Label>
                     <Input.Input type="email" placeholder="Type your best email" />
                  </Input.Root>
               </div>
               <Button.Button onClick={onContinue}>Continue</Button.Button>
            </div>
         </div>
      </React.Fragment>
   )
}

type InsertCodeProps = { onClose: () => void; onBack: () => void; onContinue: () => void }

const InsertCode: React.FC<InsertCodeProps> = ({ onBack, onClose, onContinue }: InsertCodeProps) => {
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
                     <Input.Input placeholder="Insert the confirmation code" />
                  </Input.Root>
               </div>
               <Button.Button onClick={onContinue}>Continue</Button.Button>
            </div>
         </div>
      </React.Fragment>
   )
}

type InsertNewPasswordProps = { onClose: () => void; onBack: () => void; onContinue: () => void }

const InsertNewPassword: React.FC<InsertNewPasswordProps> = ({ onBack, onClose, onContinue }: InsertNewPasswordProps) => {
   return (
      <React.Fragment>
         <div className="w-ful grid gap-6 md:p-16 relative p-6 pb-12">
            <Header onBack={onBack} onClose={onClose} />
            <div className="grid gap-6">
               <div className="grid gap-6">
                  <Input.Root>
                     <Input.Label>Password</Input.Label>
                     <Input.Password placeholder="Type your password" />
                  </Input.Root>
                  <Input.Root>
                     <Input.Label>Password confirmation</Input.Label>
                     <Input.Password placeholder="Type your password again" />
                  </Input.Root>
               </div>
               <Button.Button onClick={onContinue}>Continue</Button.Button>
            </div>
         </div>
      </React.Fragment>
   )
}

export default ForgotPasswordModal
