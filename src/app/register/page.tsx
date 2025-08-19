import { RegisterForm } from "@/components/forms/register-form"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cadastro | Retro Game Store",
  description: "Crie sua conta na Retro Game Store e explore nossa coleção de clássicos autênticos",
}

export default function RegisterPage() {
  return <RegisterForm />
}