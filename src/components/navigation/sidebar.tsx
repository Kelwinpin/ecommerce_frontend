"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Gamepad2, 
  Home, 
  Package, 
  ShoppingCart, 
  User, 
  Heart, 
  Settings, 
  LogOut,
  Menu,
  X,
  Store,
  History,
  Bell
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

interface SidebarProps {
  className?: string
}

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
    category: "main"
  },
  {
    name: "Catálogo",
    href: "/dashboard/catalog",
    icon: Store,
    category: "main"
  },
  {
    name: "Meu Carrinho",
    href: "/dashboard/cart",
    icon: ShoppingCart,
    category: "shopping"
  },
  {
    name: "Wishlist",
    href: "/dashboard/wishlist",
    icon: Heart,
    category: "shopping"
  },
  {
    name: "Meus Pedidos",
    href: "/dashboard/orders",
    icon: Package,
    category: "account"
  },
  {
    name: "Histórico",
    href: "/dashboard/history",
    icon: History,
    category: "account"
  },
  {
    name: "Perfil",
    href: "/dashboard/profile",
    icon: User,
    category: "account"
  },
  {
    name: "Notificações",
    href: "/dashboard/notifications",
    icon: Bell,
    category: "account"
  },
  {
    name: "Configurações",
    href: "/dashboard/settings",
    icon: Settings,
    category: "account"
  }
]

export function Sidebar({ className }: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    window.location.href = '/login'
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden fixed top-4 left-4 z-50 bg-black/40 backdrop-blur-sm border border-purple-500/20"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? (
          <X className="w-5 h-5 text-white" />
        ) : (
          <Menu className="w-5 h-5 text-white" />
        )}
      </Button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 h-full w-64 bg-black/40 backdrop-blur-xl border-r border-purple-500/20 z-40 transform transition-transform duration-200 ease-in-out",
        "md:translate-x-0 md:static md:z-auto",
        isMobileOpen ? "translate-x-0" : "-translate-x-full",
        className
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-purple-500/20">
            <Link 
              href="/dashboard" 
              className="flex items-center space-x-3"
              onClick={() => setIsMobileOpen(false)}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Gamepad2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Retro Store
                </h1>
                <p className="text-xs text-gray-400">Dashboard</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {/* Main Section */}
            <div className="space-y-1">
              {navigation.filter(item => item.category === 'main').map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-r from-purple-600/20 to-cyan-600/20 text-white border border-purple-500/30"
                        : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>

            <Separator className="bg-purple-500/20" />

            {/* Shopping Section */}
            <div className="space-y-1">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide px-3 py-2">
                Compras
              </p>
              {navigation.filter(item => item.category === 'shopping').map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-r from-purple-600/20 to-cyan-600/20 text-white border border-purple-500/30"
                        : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>

            <Separator className="bg-purple-500/20" />

            {/* Account Section */}
            <div className="space-y-1">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide px-3 py-2">
                Conta
              </p>
              {navigation.filter(item => item.category === 'account').map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-r from-purple-600/20 to-cyan-600/20 text-white border border-purple-500/30"
                        : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-purple-500/20">
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:text-white hover:bg-red-500/10 hover:border-red-500/20"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Sair
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}