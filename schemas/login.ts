import * as zod from 'zod'
/**
 * @title Login Zod Schema
 * @dev This schema is used to validate the login form and infer the type of the form data.
 */
export const LoginSchema = zod.object({
   email: zod.string().email('Email inválido.'),
   password: zod.string().min(8, 'Senha deve ter no mínimo 8 caracteres.')
})

/**
 * @title Login Props
 * @dev This type is used to infer the type of the form data.
 */
export type LoginProps = zod.infer<typeof LoginSchema>
