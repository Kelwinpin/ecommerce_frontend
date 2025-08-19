import { 
  LoginRequest, 
  LoginResponse, 
  RegisterRequest, 
  RegisterResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse
} from "@/lib/types/auth"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export async function loginUser(data: LoginRequest): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Erro ao fazer login')
  }

  return response.json()
}

export async function registerUser(data: RegisterRequest): Promise<RegisterResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Erro ao criar conta')
  }

  return response.json()
}

export async function forgotPassword(data: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Erro ao enviar email de recuperação')
  }

  return response.json()
}

export async function resetPassword(data: ResetPasswordRequest): Promise<ResetPasswordResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Erro ao redefinir senha')
  }

  return response.json()
}