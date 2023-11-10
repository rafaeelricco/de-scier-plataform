import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { DocumentGetProps } from '@/services/document/getArticles'
import * as Button from '@components/common/Button/Button'
import React from 'react'

export const InviteLink: React.FC<InviteLinkProps> = ({ article, onClick, open_status }: InviteLinkProps) => {
   return (
      <React.Fragment>
         <div className="grid gap-2">
            <div className="grid gap-0">
               <p className="text-sm font-semibold">Invite Link</p>
               <div className="flex flex-col md:flex-row md:items-center gap-4 flex-1 min-w-0">
                  <div className="text-sm font-semibold text-blue-500 underline max-w-full truncate" id="link-to-copy">
                     {article?.document.reviewerInviteLink}
                  </div>
               </div>
            </div>
            <div className="relative w-fit">
               <HoverCard open={open_status}>
                  <HoverCardTrigger>
                     <Button.Button
                        variant="outline"
                        className="px-4 py-1 text-sm w-fit"
                        onClick={() => {
                           const textToCopy = document.getElementById('link-to-copy')!.innerText

                           navigator.clipboard
                              .writeText(textToCopy)
                              .then(() => onClick())
                              .catch((err) => {
                                 console.error('Erro ao copiar texto: ', err)
                              })
                        }}
                     >
                        Copy Link
                     </Button.Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="px-4 py-2" side="bottom">
                     <h4 className="text-xs font-semibold text-status-green">O link foi copiado para a área de transferência!</h4>
                  </HoverCardContent>
               </HoverCard>
            </div>
         </div>
      </React.Fragment>
   )
}

interface InviteLinkProps {
   article: DocumentGetProps | null
   open_status: boolean
   onClick: () => void
}
