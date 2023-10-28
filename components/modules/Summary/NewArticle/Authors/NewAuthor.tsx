import React from 'react'

import { AuthorProps, AuthorSchema } from '@/schemas/create_document'
import * as Button from '@components/common/Button/Button'
import * as Dialog from '@components/common/Dialog/Digalog'
import * as Input from '@components/common/Input/Input'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

interface NewAuthorProps {
   onClose: () => void
   onAddAuthor: (author: AuthorProps) => void
}

export const NewAuthor: React.FC<NewAuthorProps> = ({ onAddAuthor, onClose }: NewAuthorProps) => {
   const {
      register,
      handleSubmit,
      watch,
      formState: { errors, isValid },
      setValue,
      trigger,
      getValues,
      control,
      clearErrors,
      setError
   } = useForm<AuthorProps>({
      resolver: zodResolver(AuthorSchema),
      defaultValues: {
         email: '',
         name: '',
         revenuePercent: '',
         title: '',
         walletAddress: null
      }
   })

   const onSubmit: SubmitHandler<AuthorProps> = async (data) => {
      onAddAuthor(data)
      onClose()
   }
   return (
      <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
         <Dialog.Title title="New author" onClose={onClose} />
         <div className="grid gap-6">
            <div className="flex items-center gap-6">
               <Input.Root>
                  <Input.Label>Name</Input.Label>
                  <Input.Input {...register('name')} placeholder="Full name of the author" />
                  <Input.Error>{errors.name?.message}</Input.Error>
               </Input.Root>
               <Input.Root>
                  <Input.Label>Title</Input.Label>
                  <Input.Input placeholder="Ex: Biologist" {...register('title')} />
                  <Input.Error>{errors.title?.message}</Input.Error>
               </Input.Root>
            </div>
            <div className="grid grid-cols-2 items-center gap-6">
               <Input.Root>
                  <Input.Label>E-mail</Input.Label>
                  <Input.Input {...register('email')} placeholder="Ex: email@example.com" />
                  <Input.Error>{errors.email?.message}</Input.Error>
               </Input.Root>
            </div>
            <Button.Button type="submit" variant="primary">
               Add Author
            </Button.Button>
         </div>
      </form>
   )
}
