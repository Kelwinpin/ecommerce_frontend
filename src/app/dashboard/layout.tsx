import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard | Retro Game Store",
  description: "Painel de controle da sua conta na Retro Game Store",
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  )
}