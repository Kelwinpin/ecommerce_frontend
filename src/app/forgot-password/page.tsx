import { ForgotPasswordForm } from "@/components/forms/forgot-password-form"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Esqueci minha senha | Retro Game Store",
  description: "Recupere o acesso à sua conta na Retro Game Store",
}

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />
}