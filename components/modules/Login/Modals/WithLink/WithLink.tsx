import * as Button from '@components/common/Button/Button'
import * as Input from '@components/common/Input/Input'
import React from 'react'

const WithLink: React.FC<WithLinkProps> = ({ article_name, invited_by, onDecline, onWantToReview }: WithLinkProps) => {
   return (
      <React.Fragment>
         <div className="grid gap-6">
            <div className="grid gap-2">
               <h3 className="text-xl font-semibold">You were invited to be a reviewer/editor for a document</h3>
               <p className="text-sm">
                  {invited_by} invited you to be a reviewer/editor for {article_name}, are you interested?
               </p>
            </div>
            <div>
               <Input.Root>
                  <Input.Label>Your title</Input.Label>
                  <Input.Input placeholder="Ex: Biologist" />
               </Input.Root>
               <Input.Root>
                  <Input.Label>Role</Input.Label>
                  <Input.Select options={roles} placeholder="Select reviewing role" />
               </Input.Root>
            </div>
            <div className="grid gap-4">
               <Button.Button className="py-3 px-8" onClick={onWantToReview}>
                  I want to review/edit!
               </Button.Button>
               <Button.Button variant="outline" className="py-3 px-8" onClick={onDecline}>
                  No, thanks
               </Button.Button>
            </div>
         </div>
      </React.Fragment>
   )
}

interface WithLinkProps {
   invited_by: string
   article_name: string
   onWantToReview: () => void
   onDecline: () => void
}

const roles = [
   {
      id: 1,
      value: 'reviewer',
      label: 'Reviewer'
   },
   {
      id: 2,
      value: 'editor',
      label: 'Editor'
   }
]

export default WithLink
