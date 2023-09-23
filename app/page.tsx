'use client'

import * as Button from '@components/common/Button/Button'
import * as Dialog from '@components/common/Dialog/Digalog'

export default function Home() {
   return (
      <main className="container">
         <Dialog.Root>
            <Dialog.Overlay />
            <Dialog.Content>ksksk</Dialog.Content>
         </Dialog.Root>
         <Button.Button>Tests</Button.Button>
      </main>
   )
}
