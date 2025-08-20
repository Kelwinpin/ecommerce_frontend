import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { User } from "./types/auth"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDecodedToken() {
  const token = localStorage.getItem('access_token')
  if (!token) return null

  try {
    const decoded = atob(token.split('.')[1])
    return decoded ? JSON.parse(decoded) : null
  } catch (err) {
    return null
  }
}