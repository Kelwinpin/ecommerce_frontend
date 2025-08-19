import { BaseService } from "../base.service"
import { apiClient } from "../client"
import { Product } from "./product.service"

export interface CartItem {
  id: string
  productId: string
  product: Product
  quantity: number
  price: number
  createdAt: Date
}

export interface Cart {
  id: string
  userId: string
  items: CartItem[]
  total: number
  itemCount: number
  createdAt: Date
  updatedAt: Date
}

export interface AddToCartDTO {
  productId: string
  quantity: number
}

export interface UpdateCartItemDTO {
  quantity: number
}

class CartService extends BaseService<Cart> {
  protected endpoint = '/cart'

  async getCart(): Promise<Cart> {
    return apiClient.get<Cart>('/cart')
  }

  async addItem(data: AddToCartDTO): Promise<CartItem> {
    return apiClient.post<CartItem, AddToCartDTO>('/cart/items', data)
  }

  async updateItem(itemId: string, data: UpdateCartItemDTO): Promise<CartItem> {
    return apiClient.put<CartItem, UpdateCartItemDTO>(`/cart/items/${itemId}`, data)
  }

  async removeItem(itemId: string): Promise<void> {
    return apiClient.delete<void>(`/cart/items/${itemId}`)
  }

  async clearCart(): Promise<void> {
    return apiClient.delete<void>('/cart/clear')
  }

  async getItemCount(): Promise<{ count: number }> {
    return apiClient.get<{ count: number }>('/cart/count')
  }

  async validateCart(): Promise<{ isValid: boolean; errors?: string[] }> {
    return apiClient.get<{ isValid: boolean; errors?: string[] }>('/cart/validate')
  }
}

export const cartService = new CartService()