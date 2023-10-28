import * as zod from 'zod'

const AuthorSchema = zod.object({
   name: zod.string().min(3, { message: 'Name must be at least 3 characters' }),
   email: zod.string().email({ message: 'Invalid email' }),
   title: zod.string().min(3, { message: 'Title must be at least 3 characters' }),
   revenuePercent: zod.coerce.number().min(0, { message: 'Revenue percent must be at least 0' }),
   walletAddress: zod.coerce.number().optional()
})

export const CreateDocumentSchema = zod.object({
   title: zod.string().min(3, { message: 'Title must be at least 3 characters' }),
   abstract: zod.string().min(3, { message: 'Abstract must be at least 3 characters' }),
   abstractChart: zod.string().optional(),
   field: zod.string({ required_error: 'Field is required' }),
   documentType: zod.string({ required_error: 'Document type is required' }),
   accessType: zod.enum(['FREE', 'PAID'], {
      required_error: 'Access type is required'
   }),
   price: zod.coerce.number({ required_error: 'Price is required' })
})

/**
 * @title Create Document Props
 * @dev This type is used to infer the type of the form data.
 */
export type CreateDocumentProps = zod.infer<typeof CreateDocumentSchema>

export type AuthorProps = zod.infer<typeof AuthorSchema>
