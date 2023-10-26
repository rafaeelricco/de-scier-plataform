import Dropzone from '@/components/common/Dropzone/Dropzone'
import * as Button from '@components/common/Button/Button'
import * as Input from '@components/common/Input/Input'
import Image from 'next/image'
import React, { useState } from 'react'
import { X } from 'react-bootstrap-icons'
import { useForm, SubmitHandler } from 'react-hook-form'
import GenericSuccess from './Success'
import { UpdateUserProps } from '@/schemas/updateUser'
import { updateUserService } from '@/services/user/update.service'
import { toast } from 'react-toastify'
import { useSession } from 'next-auth/react'
import { uploadAvatarService } from '@/services/file/file.service'
import { FileWithPreview, StoredFile } from '@/components/common/Dropzone/Typing'

const UpdateProfile: React.FC<UpdateProfileProps> = ({
   onClose,
   onConfirm,
   name,
   image,
   title,
   success = false,
   edit_profile = true
}: UpdateProfileProps) => {
   const { data: session, update: updateSession } = useSession()

   const { register, handleSubmit } = useForm<UpdateUserProps>({})

   const [loading, setLoading] = React.useState(false)
   const [file, setFile] = React.useState<StoredFile | null>()
   const [avatarPreview, setAvatarPreview] = useState<string | undefined>(image)

   const onSubmit: SubmitHandler<UpdateUserProps> = async (data) => {
      setLoading(true)
      const response = await updateUserService(data)

      if (!response.success) {
         toast.error('Error in edit profile.')
         return
      }
      let fileUrl = ''
      if (file) {
         fileUrl = await uploadAvatarService({
            fileLocalUrl: file.preview!,
            filename: file.name,
            mimetype: file.type
         })

         console.log(fileUrl)
      }

      const udpatedInfo = {
         ...session,
         user: {
            ...session?.user,
            name: data.name ?? session?.user?.userInfo.name,
            userInfo: {
               name: data.name ?? session?.user?.userInfo.name,
               title: data.title ?? session?.user?.userInfo.title,
               avatar: fileUrl || image
            }
         }
      }
      console.log(udpatedInfo)
      await updateSession(udpatedInfo)
      setLoading(false)

      onConfirm()
   }

   return (
      <React.Fragment>
         <X
            className="w-8 h-8 absolute top-4 right-4 cursor-pointer hover:text-status-error transition-all duration-500 ease-out hover:scale-110 hover:rotate-180 transform"
            onClick={onClose}
         />
         {success && <GenericSuccess onClose={onClose} text="Profile updated" message="Your profile is now updated!" button_text="Return" />}
         {edit_profile && (
            <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
               <div className="grid gap-2">
                  <h3 className="text-xl font-semibold">Edit profile</h3>
               </div>
               <div className="flex flex-col md:flex-row items-center gap-6">
                  {avatarPreview ? (
                     <Image
                        quality={50}
                        width={160}
                        height={160}
                        alt="profile-image"
                        src={avatarPreview}
                        className="w-40 h-40 bg-status-pending rounded-full mx-auto my-0 lg:w-28 lg:h-28 2xl:w-36 2xl:h-36"
                     />
                  ) : (
                     <div className="flex justify-center items-center w-40 h-40 bg-status-pending rounded-full mx-auto my-0 lg:w-28 lg:h-28 2xl:w-48 2xl:h-36">
                        <p className="text-5xl w-full px-6 text-center">{name.charAt(0).toUpperCase()}</p>
                     </div>
                  )}

                  <div className="w-full">
                     <Dropzone
                        placeholder="Upload profile picture"
                        setSelectedFile={(file) => {
                           setFile(file)
                           setAvatarPreview(file?.preview ?? image)
                        }}
                     />
                  </div>
               </div>
               <div className="flex flex-col md:flex-row items-center gap-4">
                  <Input.Root>
                     <Input.Label>Name</Input.Label>
                     <Input.Input defaultValue={name} placeholder="Your name" {...register('name')} />
                  </Input.Root>
                  <Input.Root>
                     <Input.Label optional>Title</Input.Label>
                     <Input.Input defaultValue={title} placeholder="Ex: Biologist, Chemist" {...register('title')} />
                  </Input.Root>
               </div>
               <div className="grid gap-4">
                  <Button.Button className="py-3 px-8" type="submit" loading={loading}>
                     Save updates
                  </Button.Button>
               </div>
            </form>
         )}
      </React.Fragment>
   )
}

interface UpdateProfileProps {
   name: string
   title: string
   image?: string
   success?: boolean
   edit_profile?: boolean
   onConfirm: () => void
   onClose: () => void
}

export default UpdateProfile
