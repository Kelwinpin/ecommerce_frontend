export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  access_token: string
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