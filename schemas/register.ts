import * as zod from 'zod'
/**
 * @title Register Zod Schema
 * @dev This schema is used to validate the Register form and infer the type of the form data.
 */
export const RegisterSchema = zod.object({
   name: zod.string(),
   email: zod.string().email('Email inválido.'),
   password: zod.string().min(8, 'Senha deve ter no mínimo 8 caracteres.'),
   confirmPassword: zod.string()
})

/**
 * @title Register Props
 * @dev This type is used to infer the type of the form data.
 */
export type RegisterProps = zod.infer<typeof RegisterSchema>
