import { BaseService } from "../base.service"
import { apiClient } from "../client"
import { PaginationParams, PaginatedResponse } from "@/lib/types/api"

export interface Product {
  id: string
  name: string
  description: string
  price: number
  discountPrice?: number
  platform: string[]
  genre: string[]
  developer: string
  publisher: string
  releaseYear: number
  condition: 'mint' | 'excellent' | 'good' | 'fair'
  images: string[]
  stock: number
  featured: boolean
  tags: string[]
  console: string
  region: string
  isOriginal: boolean
  createdAt: Date
  updatedAt: Date
}

export interface CreateProductDTO {
  name: string
  description: string
  price: number
  discountPrice?: number
  platform: string[]
  genre: string[]
  developer: string
  publisher: string
  releaseYear: number
  condition: 'mint' | 'excellent' | 'good' | 'fair'
  stock: number
  console: string
  region: string
  isOriginal: boolean
  tags?: string[]
}

export interface UpdateProductDTO extends Partial<CreateProductDTO> {}

export interface ProductFilters extends PaginationParams {
  platform?: string
  genre?: string
  console?: string
  condition?: string
  priceMin?: number
  priceMax?: number
  releaseYearMin?: number
  releaseYearMax?: number
  region?: string
  isOriginal?: boolean
  featured?: boolean
}

class ProductService extends BaseService<Product, CreateProductDTO, UpdateProductDTO> {
  protected endpoint = '/product'

  async getByFilters(filters: ProductFilters): Promise<PaginatedResponse<Product>> {
    return apiClient.get<PaginatedResponse<Product>>('/product/filter', filters)
  }

  async getFeatured(limit: number = 10): Promise<Product[]> {
    return apiClient.get<Product[]>('/product/featured', { limit })
  }

  async getByPlatform(platform: string, params?: PaginationParams): Promise<PaginatedResponse<Product>> {
    return apiClient.get<PaginatedResponse<Product>>(`/product/platform/${platform}`, params)
  }

  async getByConsole(console: string, params?: PaginationParams): Promise<PaginatedResponse<Product>> {
    return apiClient.get<PaginatedResponse<Product>>(`/product/console/${console}`, params)
  }

  async getByGenre(genre: string, params?: PaginationParams): Promise<PaginatedResponse<Product>> {
    return apiClient.get<PaginatedResponse<Product>>(`/product/genre/${genre}`, params)
  }

  async getRelated(productId: string, limit: number = 6): Promise<Product[]> {
    return apiClient.get<Product[]>(`/product/${productId}/related`, { limit })
  }

  async uploadImages(productId: string, files: File[]): Promise<{ imageUrls: string[] }> {
    const formData = new FormData()
    files.forEach((file, index) => {
      formData.append(`images`, file)
    })

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${productId}/images`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Erro ao fazer upload das imagens')
    }

    return response.json()
  }
}

export const productService = new ProductService()