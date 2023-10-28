import * as zod from 'zod'

export const AuthorSchema = zod.object({
   name: zod.string().min(3, 'Name must be at least 3 characters.'),
   email: zod.string().email('Invalid email address.'),
   title: zod.string().min(3, 'Title must be at least 3 characters.'),
   revenuePercent: zod.string().min(1, 'Revenue percent must be at least 1 character.'),
   walletAddress: zod.string().optional().nullable()
})

const KeyWordSchema = zod.object({
   id: zod.string().min(3, 'Id must be at least 3 characters.'),
   name: zod.string().min(3, 'Name must be at least 3 characters.')
})

export const CreateDocumentSchema = zod.object({
   title: zod.string().min(3, 'Title must be at least 3 characters.'),
   abstract: zod.string().min(3, 'Abstract must be at least 3 characters.'),
   abstractChart: zod.string().optional(),
   field: zod.string().min(3, 'Field must be at least 3 characters.'),
   documentType: zod.string().min(3, 'Document type must be at least 3 characters.'),
   keywords: zod.array(KeyWordSchema).min(1, 'At least one keyword is required.'),
   accessType: zod.enum(['FREE', 'PAID'], { required_error: 'Access type is required.' }),
   price: zod.string()
})

/**
 * @title Create Document Props
 * @dev This type is used to infer the type of the form data.
 */
export type CreateDocumentProps = zod.infer<typeof CreateDocumentSchema>

export type AuthorProps = zod.infer<typeof AuthorSchema>
