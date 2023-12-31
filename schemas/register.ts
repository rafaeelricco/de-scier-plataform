import * as zod from 'zod'
/**
 * @title Register Zod Schema
 * @dev This schema is used to validate the Register form and infer the type of the form data.
 */
export const RegisterSchema = zod
   .object({
      name: zod.string().min(3, 'Name must be at least 3 characters long.'),
      email: zod.string().email('Invalid email.').min(5, 'Email must be at least 5 characters long.'),
      password: zod.string().min(8, 'Password must be at least 8 characters long.'),
      confirmPassword: zod.string().min(8, 'Password must be at least 8 characters long.')
   })
   .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match.",
      path: ['confirmPassword']
   })

/**
 * @title Register Props
 * @dev This type is used to infer the type of the form data.
 */
export type RegisterProps = zod.infer<typeof RegisterSchema>
