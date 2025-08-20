"use client"

import { useState, useEffect } from "react"
import { Search, ShoppingCart, Bell, User, ChevronDown, LogOut, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { getDecodedToken } from "@/lib/utils"
import { AccessToken, User as UserType } from "@/lib/types/auth"

interface HeaderProps {
  className?: string
}



export function Header({ className }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [cartCount, setCartCount] = useState(0)
  const [notificationCount, setNotificationCount] = useState(3)
  const [user, setUser] = useState<AccessToken>()

  useEffect(() => {
    const token = getDecodedToken()
    if (!token) return
    setUser(token)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Redirecionar para página de busca
      window.location.href = `/dashboard/catalog?search=${encodeURIComponent(searchQuery)}`
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    window.location.href = '/login'
  }

  return (
    <header className={`bg-black/80 backdrop-blur-xl border-b border-purple-500/20 ${className}`}>
      <div className="flex items-center justify-between px-6 py-4 w-full">
        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500/20"
            />
          </form>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4 ml-6">
          {/* Cart */}
          <Link href="/dashboard/cart">
            <Button variant="ghost" size="icon" className="relative text-gray-300 hover:text-white hover:bg-gray-800/50">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Button>
          </Link>

          {/* Notifications */}
          <Link href="/dashboard/notifications" className="hidden sm:block">
            <Button variant="ghost" size="icon" className="relative text-gray-300">
              <Bell className="w-5 h-5" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-cyan-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notificationCount > 9 ? '9+' : notificationCount}
                </span>
              )}
            </Button>
          </Link>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-800/50">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-sm">
                    {user?.username.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium">{user?.username}</p>
                  <p className="text-xs text-gray-400">{user?.email}</p>
                </div>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-56 bg-gray-900/95 backdrop-blur-xl border-purple-500/20"
            >
              <DropdownMenuLabel className="text-gray-200">
                Minha Conta
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-purple-500/20" />
              
              <DropdownMenuItem asChild>
                <Link 
                  href="/dashboard/profile" 
                  className="flex items-center text-gray-300 cursor-pointer"
                >
                  <User className="w-4 h-4 mr-2" />
                  Perfil
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuItem asChild>
                <Link 
                  href="/dashboard/settings" 
                  className="flex items-center text-gray-300 cursor-pointer"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Configurações
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator className="bg-purple-500/20" />
              
              <DropdownMenuItem 
                onClick={handleLogout}
                className="flex items-center text-red-400 hover:text-red-300 focus:text-red-300 cursor-pointer"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}