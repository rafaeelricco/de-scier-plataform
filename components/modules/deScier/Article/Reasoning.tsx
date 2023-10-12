import * as Button from '@components/common/Button/Button'
import * as Input from '@components/common/Input/Input'
import React from 'react'
import { X } from 'react-bootstrap-icons'

const Reasoning: React.FC<ArticleUnderReviewProps> = ({ onClose, onConfirm, reason }: ArticleUnderReviewProps) => {
   return (
      <React.Fragment>
         <X
            className="w-8 h-8 absolute top-4 right-4 cursor-pointer hover:text-status-error transition-all duration-500 ease-out hover:scale-110 hover:rotate-180 transform"
            onClick={onClose}
         />
         <div className="grid gap-6">
            <div className="grid gap-2">
               <h3 className="text-xl font-semibold">Reasoning</h3>
               <p className="text-sm">Explain a bit of the reasoning for the reject, to justify your version.</p>
            </div>
            <Input.Root>
               <Input.Label>Reasoning</Input.Label>
               <Input.TextArea defaultValue={reason} placeholder="Explain your reasoning" />
            </Input.Root>
            <div className="grid gap-4">
               <Button.Button className="py-3 px-8" onClick={onConfirm}>
                  Confirm rejection
               </Button.Button>
               <Button.Button variant="outline" className="py-3 px-8" onClick={onClose}>
                  Cancel
               </Button.Button>
            </div>
         </div>
      </React.Fragment>
   )
}

interface ArticleUnderReviewProps {
   reason: string
   onConfirm: () => void
   onClose: () => void
}

export default Reasoning
