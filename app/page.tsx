'use client'

import * as Dialog from '@components/common/Dialog/Digalog'

export default function Home() {
   return (
      <main className="container">
         <Dialog.Root open={true}>
            <Dialog.Overlay />
            <Dialog.Content>ksksk</Dialog.Content>
         </Dialog.Root>
      </main>
   )
}
