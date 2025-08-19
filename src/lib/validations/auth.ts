import { z } from "zod"

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .email("Email inválido"),
  password: z
    .string()
    .min(1, "Senha é obrigatória")
    .min(6, "Senha deve ter pelo menos 6 caracteres"),
})

export const registerSchema = z.object({
  username: z
    .string()
    .min(1, "Nome de usuário é obrigatório")
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(50, "Nome deve ter no máximo 50 caracteres"),
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .email("Email inválido"),
  password: z
    .string()
    .min(1, "Senha é obrigatória")
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .regex(/(?=.*[a-z])/, "Senha deve conter pelo menos uma letra minúscula")
    .regex(/(?=.*[A-Z])/, "Senha deve conter pelo menos uma letra maiúscula")
    .regex(/(?=.*\d)/, "Senha deve conter pelo menos um número"),
  confirmPassword: z
    .string()
    .min(1, "Confirmação de senha é obrigatória"),
  cpf: z
    .string()
    .min(1, "CPF é obrigatório")
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/, "CPF deve estar no formato válido"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas não coincidem",
  path: ["confirmPassword"],
})

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .email("Email inválido"),
})

export const resetPasswordSchema = z.object({
  token: z.string().min(1, "Token é obrigatório"),
  password: z
    .string()
    .min(1, "Senha é obrigatória")
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .regex(/(?=.*[a-z])/, "Senha deve conter pelo menos uma letra minúscula")
    .regex(/(?=.*[A-Z])/, "Senha deve conter pelo menos uma letra maiúscula")
    .regex(/(?=.*\d)/, "Senha deve conter pelo menos um número"),
  confirmPassword: z
    .string()
    .min(1, "Confirmação de senha é obrigatória"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas não coincidem",
  path: ["confirmPassword"],
})

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>