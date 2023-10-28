import { uniqueId } from 'lodash'

export type Author = {
   id: string
   name: string
   title: string
   email: string
   share?: string | null
   wallet?: string | null
   role?: string
   status?: string
}

export type Authorship = {
   name: string
   share: string
   wallet: string
   email: string
}

export const authors_mock: Author[] = [
   {
      id: uniqueId(),
      name: 'Caroline Nunes',
      title: 'Neurologist',
      email: 'caroline@gmail.com',
      share: null,
      wallet: null,
      role: 'reviewer',
      status: 'pending'
   }
   //    {
   //       id: 2,
   //       name: 'Roberto Silva',
   //       title: 'Cardiologist',
   //       email: 'roberto@gmail.com',
   //       share: null,
   //       wallet: null,
   //       role: 'reviewer',
   //       status: 'pending'
   //    },
   //    {
   //       id: 3,
   //       name: 'Luciana Menezes',
   //       title: 'Dermatologist',
   //       email: 'luciana@gmail.com',
   //       share: null,
   //       wallet: null,
   //       role: 'reviewer',
   //       status: 'approved'
   //    },
   //    {
   //       id: 4,
   //       name: 'Paulo Fernandes',
   //       title: 'Orthopedist',
   //       email: 'paulo@gmail.com',
   //       share: null,
   //       wallet: null,
   //       role: 'editor',
   //       status: 'approved'
   //    },
   //    {
   //       id: 5,
   //       name: 'Juliana Ramos',
   //       title: 'Endocrinologist',
   //       email: 'juliana@gmail.com',
   //       share: null,
   //       wallet: null,
   //       role: 'editor',
   //       status: 'pending'
   //    }
]

export const authors_headers = [
   {
      id: 1,
      label: 'Name'
   },
   {
      id: 1,
      label: 'Title'
   },
   {
      id: 1,
      label: 'E-mail'
   }
]

export const authorship_headers = [
   {
      id: 1,
      label: 'Name'
   },
   {
      id: 1,
      label: 'Authorship Share'
   },
   {
      id: 1,
      label: 'Wallet'
   }
]
