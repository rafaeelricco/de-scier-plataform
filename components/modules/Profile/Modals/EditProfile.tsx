import Dropzone from '@/components/common/Dropzone/Dropzone'
import * as Button from '@components/common/Button/Button'
import * as Input from '@components/common/Input/Input'
import Image from 'next/image'
import React from 'react'
import { X } from 'react-bootstrap-icons'
import GenericSuccess from './Success'

const UpdateProfile: React.FC<UpdateProfileProps> = ({
   onClose,
   onConfirm,
   name,
   image,
   title,
   success = false,
   edit_profile = true
}: UpdateProfileProps) => {
   const [loading, setLoading] = React.useState(false)

   return (
      <React.Fragment>
         <X
            className="w-8 h-8 absolute top-4 right-4 cursor-pointer hover:text-status-error transition-all duration-500 ease-out hover:scale-110 hover:rotate-180 transform"
            onClick={onClose}
         />
         {success && <GenericSuccess onClose={onClose} text="Profile updated" message="Your profile is now updated!" button_text="Return" />}
         {edit_profile && (
            <div className="grid gap-6">
               <div className="grid gap-2">
                  <h3 className="text-xl font-semibold">Edit profile</h3>
               </div>
               <div className="flex flex-col md:flex-row items-center gap-6">
                  {image ? (
                     <Image
                        quality={50}
                        width={160}
                        height={160}
                        alt="profile-image"
                        src={image ?? ''}
                        className="w-40 h-40 bg-status-pending rounded-full mx-auto my-0 lg:w-28 lg:h-28 2xl:w-36 2xl:h-36"
                     />
                  ) : (
                     <div className="flex justify-center items-center w-40 h-40 bg-status-pending rounded-full mx-auto my-0 lg:w-28 lg:h-28 2xl:w-48 2xl:h-36">
                        <p className="text-5xl w-full px-6 text-center">{name.charAt(0).toUpperCase()}</p>
                     </div>
                  )}

                  <div className="w-full">
                     <Dropzone placeholder="Upload profile picture" setSelectedFile={(file) => console.log(file)} />
                  </div>
               </div>
               <div className="flex flex-col md:flex-row items-center gap-4">
                  <Input.Root>
                     <Input.Label>Name</Input.Label>
                     <Input.Input defaultValue={name} placeholder="Your name" />
                  </Input.Root>
                  <Input.Root>
                     <Input.Label optional>Title</Input.Label>
                     <Input.Input defaultValue={title} placeholder="Ex: Biologist, Chemist" />
                  </Input.Root>
               </div>
               <div className="grid gap-4">
                  <Button.Button className="py-3 px-8" onClick={onConfirm} loading={loading}>
                     Save updates
                  </Button.Button>
               </div>
            </div>
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
