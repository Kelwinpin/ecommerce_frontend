"use client"

import { ReactNode } from "react"
import { Sidebar } from "@/components/navigation/sidebar"
import { Header } from "@/components/navigation/header"

interface DashboardLayoutProps {
  children: ReactNode
  className?: string
}

export function DashboardLayout({ children, className }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen">
          {/* Header */}
          <Header />
          
          {/* Page Content */}
          <main className={`p-6 ${className}`}>
            {children}
          </main>
    </div>
  )
}