import * as Button from '@components/common/Button/Button'
import * as Input from '@components/common/Input/Input'
import React from 'react'

const LoginModal: React.FC = () => {
   return (
      <React.Fragment>
         <div className="grid grid-cols-2">
            <div className=" w-full bg-gradients-blue"></div>
            <div className="w-ful grid gap-4">
               <Input.Root>
                  <Input.Label>Name</Input.Label>
                  <Input.Input placeholder="Type your full name" />
               </Input.Root>
               <Input.Root>
                  <Input.Label>Textarea</Input.Label>
                  <Input.TextArea placeholder="Type your full name" />
               </Input.Root>
               <Input.Root>
                  <Input.Label>Password</Input.Label>
                  <Input.Password placeholder="Type your full name" />
               </Input.Root>
               <Button.Button variant="primary">Primary</Button.Button>
               <Button.Button variant="outline">Primary</Button.Button>
               <Button.Button variant="disabled">Primary</Button.Button>
            </div>
         </div>
      </React.Fragment>
   )
}

export default LoginModal
