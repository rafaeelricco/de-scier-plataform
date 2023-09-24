'use client'

import LoginModal from '@/components/modules/Login/Login'
import * as Dialog from '@components/common/Dialog/Digalog'

export default function Home() {
   return (
      <main className="container">
         <Dialog.Root open={true}>
            <Dialog.Overlay />
            <Dialog.Content className="max-w-[1000px]">
               <LoginModal />
            </Dialog.Content>
         </Dialog.Root>
      </main>
   )
}
