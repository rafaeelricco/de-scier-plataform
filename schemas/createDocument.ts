import * as zod from 'zod'

const AuthorSchema = zod.object({
   name: zod.string({ required_error: 'Name is required' }),
   email: zod.string({ required_error: 'Email is required' }).email(),
   title: zod.string({ required_error: 'Title is required' }),
   revenuePercent: zod.number().min(0).max(1).optional(),
   wallet_address: zod.number().optional()
})

export const CreateDocumentSchema = zod.object({
   title: zod.string({ required_error: 'Title is required' }),
   abstract: zod.string({ required_error: 'Abstract is required' }),
   abstractChart: zod.string().optional(),
   field: zod.string({ required_error: 'Field is required' }),
   documentType: zod.string({ required_error: 'Document type is required' }),
   accessType: zod.enum(['FREE', 'PAID'], {
      required_error: 'Access type is required'
   }),
   price: zod.number({ required_error: 'Price is required' })
})

/**
 * @title Create Document Props
 * @dev This type is used to infer the type of the form data.
 */
export type CreateDocumentProps = zod.infer<typeof CreateDocumentSchema>

export type AuthorProps = zod.infer<typeof AuthorSchema>
