export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  username: string
  cpf: string
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ResetPasswordRequest {
  token: string
  password: string
}

export interface LoginResponse {
  access_token: string
}

export interface RegisterResponse {
  access_token: string
}

export interface ForgotPasswordResponse {
  message: string
}

export interface ResetPasswordResponse {
  message: string
}

export interface User {
  id: string
  email: string
  username: string
  phone?: string
  cpf: string
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
}

export interface AuthError {
  message: string
  statusCode: number
}