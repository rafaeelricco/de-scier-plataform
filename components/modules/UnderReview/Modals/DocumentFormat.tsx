import * as Button from '@components/common/Button/Button'
import DocumentIllustration from 'public/svgs/modules/under-review/under-review-illustration.svg'
import React from 'react'
import { X } from 'react-bootstrap-icons'

export const DocumentFormatModal: React.FC<DocumentFormatProps> = ({ onClose }: DocumentFormatProps) => {
   return (
      <div className="grid gap-6">
         <X
            className="w-8 h-8 absolute top-4 right-4 cursor-pointer hover:text-status-error transition-all duration-500 ease-out hover:scale-110 hover:rotate-180 transform"
            onClick={onClose}
         />
         <div className="relative">
            <h3 className="text-lg font-semibold">Document format</h3>
            <p className="">
               Please update your article file format to .pdf for the final upload. This final file will be displayed for users accessing the platform
               after the final approval!
            </p>
            <DocumentIllustration className="w-full h-32" />
            <Button.Button variant="outline">Return</Button.Button>
         </div>
      </div>
   )
}

interface DocumentFormatProps {
   onClose: () => void
}

/* Usage

 <Dialog.Root open={true}>
    <Dialog.Overlay />
    <Dialog.Content className={twMerge('px-16 py-14 max-w-[600px]')}>
        <DocumentFormatModal onClose={() => {}} />
    </Dialog.Content>
</Dialog.Root>

*/
