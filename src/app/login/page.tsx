import { LoginForm } from "@/components/forms/login-form"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login | Game Store",
  description: "Faça login na sua conta da Game Store",
}

export default function LoginPage() {
  return <LoginForm />
}