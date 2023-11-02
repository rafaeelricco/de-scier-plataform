import { home_routes } from '@/routes/home'
import { UpdateInviteStatusProps } from '@/schemas/update_invite_status'
import { updateInviteStatusService } from '@/services/reviewer/update_invite.service'
import * as Button from '@components/common/Button/Button'
import * as Input from '@components/common/Input/Input'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { toast } from 'react-toastify'

const WithLink: React.FC<WithLinkProps> = ({ article_name, invited_by, inviteCode, onClose }: WithLinkProps) => {
   const { register, handleSubmit, setValue, trigger } = useForm<UpdateInviteStatusProps>({
      defaultValues: {
         inviteCode: inviteCode,
         inviteStatus: 'ACCEPTED',
         role: 'reviewer',
         title: ''
      }
   })

   const router = useRouter()

   const [loading, setLoading] = React.useState(false)

   const handleSubmitReview: SubmitHandler<UpdateInviteStatusProps> = async (data) => {
      setLoading(true)
      const response = await updateInviteStatusService(data)

      if (response.success) {
         toast.success(`Invite ${data.inviteStatus} successfully.`)
         setLoading(false)
         onClose()
         router.push(home_routes.as_reviewer)
         return
      }

      toast.error(response.message)
   }

   return (
      <React.Fragment>
         <form className="grid gap-6" onSubmit={handleSubmit(handleSubmitReview)}>
            <div className="grid gap-2">
               <h3 className="text-xl font-semibold">You were invited to be a reviewer/editor for a document</h3>
               <p className="text-sm">
                  {invited_by} invited you to be a reviewer/editor for {article_name}, are you interested?
               </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
               <Input.Root>
                  <Input.Label>Your title</Input.Label>
                  <Input.Input placeholder="Ex: Biologist" {...register('title')} />
               </Input.Root>
               <Input.Root>
                  <Input.Label>Role</Input.Label>
                  <Input.Select
                     options={roles}
                     placeholder="Select reviewing role"
                     onValueChange={(value) => {
                        setValue('role', value), trigger('role')
                     }}
                  />
               </Input.Root>
            </div>
            <div className="grid gap-4">
               <Button.Button className="py-3 px-8" type="submit" loading={loading}>
                  I want to review/edit!
               </Button.Button>
               <Button.Button variant="outline" className="py-3 px-8" onClick={onClose}>
                  No, thanks
               </Button.Button>
            </div>
         </form>
      </React.Fragment>
   )
}

interface WithLinkProps {
   invited_by: string
   article_name: string
   inviteCode: string
   onClose: () => void
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
