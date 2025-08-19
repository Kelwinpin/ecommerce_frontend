import { BaseService } from "../base.service"
import { apiClient } from "../client"

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

export interface CreateUserDTO {
  email: string
  username: string
  password: string
  cpf: string
  phone?: string
}

export interface UpdateUserDTO {
  email?: string
  username?: string
  phone?: string
}

export interface UpdatePasswordDTO {
  currentPassword: string
  newPassword: string
}

class UserService extends BaseService<User, CreateUserDTO, UpdateUserDTO> {
  protected endpoint = '/user'

  async getProfile(): Promise<User> {
    return apiClient.get<User>('/user/profile')
  }

  async updatePassword(data: UpdatePasswordDTO): Promise<void> {
    return apiClient.patch<void, UpdatePasswordDTO>('/user/password', data)
  }

  async uploadAvatar(file: File): Promise<{ avatarUrl: string }> {
    const formData = new FormData()
    formData.append('avatar', file)

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/avatar`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Erro ao fazer upload do avatar')
    }

    return response.json()
  }
}

export const userService = new UserService()