import { apiClient } from "./client"
import { PaginationParams, PaginatedResponse } from "@/lib/types/api"

export abstract class BaseService<T, CreateDTO = Partial<T>, UpdateDTO = Partial<T>> {
  protected abstract endpoint: string

  async getAll(params?: PaginationParams): Promise<PaginatedResponse<T>> {
    return apiClient.get<PaginatedResponse<T>>(this.endpoint, params)
  }

  async getById(id: string | number): Promise<T> {
    return apiClient.get<T>(`${this.endpoint}/${id}`)
  }

  async create(data: CreateDTO): Promise<T> {
    return apiClient.post<T, CreateDTO>(this.endpoint, data)
  }

  async update(id: string | number, data: UpdateDTO): Promise<T> {
    return apiClient.put<T, UpdateDTO>(`${this.endpoint}/${id}`, data)
  }

  async partialUpdate(id: string | number, data: Partial<UpdateDTO>): Promise<T> {
    return apiClient.patch<T, Partial<UpdateDTO>>(`${this.endpoint}/${id}`, data)
  }

  async delete(id: string | number): Promise<void> {
    return apiClient.delete<void>(`${this.endpoint}/${id}`)
  }

  async search(query: string, params?: PaginationParams): Promise<PaginatedResponse<T>> {
    const searchParams = { ...params, search: query }
    return apiClient.get<PaginatedResponse<T>>(`${this.endpoint}/search`, searchParams)
  }
}