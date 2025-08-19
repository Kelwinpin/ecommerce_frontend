"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, UserPlus, Loader2, User, Mail, Lock, CreditCard } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { registerSchema, type RegisterFormData } from "@/lib/validations/auth"
import { registerUser } from "@/lib/api/auth"

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const formatCPF = (value: string) => {
    // Remove tudo que não é dígito
    const cleanValue = value.replace(/\D/g, '')
    
    // Aplica a máscara do CPF
    if (cleanValue.length <= 11) {
      const formatted = cleanValue
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      return formatted
    }
    
    return value
  }

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value)
    setValue('cpf', formatted)
  }

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)
    setError(null)

    try {
      // Remove formatação do CPF antes de enviar
      const cleanData = {
        ...data,
        cpf: data.cpf.replace(/\D/g, '')
      }
      
      const response = await registerUser(cleanData)
      
      // Armazenar token no localStorage
      localStorage.setItem('access_token', response.access_token)
      
      // Redirecionar para dashboard
      window.location.href = '/dashboard'
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro interno do servidor')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
      
      <Card className="w-full max-w-md bg-black/40 backdrop-blur-xl border-purple-500/20 shadow-2xl">
        <CardHeader className="space-y-6 text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Criar Conta
            </CardTitle>
            <CardDescription className="text-gray-400">
              Junte-se à nossa comunidade retro gamer
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Username Field */}
            <div className="space-y-2">
              <Label 
                htmlFor="username" 
                className="text-sm font-medium text-gray-200"
              >
                Nome de usuário
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  {...register("username")}
                  id="username"
                  type="text"
                  placeholder="seu_username"
                  className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500/20 pl-10"
                  disabled={isLoading}
                />
              </div>
              {errors.username && (
                <p className="text-sm text-red-400">{errors.username.message}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label 
                htmlFor="email" 
                className="text-sm font-medium text-gray-200"
              >
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500/20 pl-10"
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>

            {/* CPF Field */}
            <div className="space-y-2">
              <Label 
                htmlFor="cpf" 
                className="text-sm font-medium text-gray-200"
              >
                CPF
              </Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  {...register("cpf")}
                  id="cpf"
                  type="text"
                  placeholder="000.000.000-00"
                  value={watch('cpf') || ''}
                  onChange={handleCPFChange}
                  maxLength={14}
                  className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500/20 pl-10"
                  disabled={isLoading}
                />
              </div>
              {errors.cpf && (
                <p className="text-sm text-red-400">{errors.cpf.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label 
                htmlFor="password" 
                className="text-sm font-medium text-gray-200"
              >
                Senha
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  {...register("password")}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500/20 pl-10 pr-10"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-400">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <Label 
                htmlFor="confirmPassword" 
                className="text-sm font-medium text-gray-200"
              >
                Confirmar senha
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  {...register("confirmPassword")}
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500/20 pl-10 pr-10"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                  disabled={isLoading}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-400">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-sm text-red-400 text-center">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-medium py-2.5 rounded-lg transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Criando conta...
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Criar conta
                </>
              )}
            </Button>
          </form>

          {/* Footer Links */}
          <div className="text-center">
            <div className="text-sm text-gray-400">
              Já tem uma conta?{" "}
              <Link 
                href="/login" 
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
              >
                Fazer login
              </Link>
            </div>
          </div>

          {/* Gaming Elements */}
          <div className="flex justify-center space-x-4 pt-4">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse delay-100" />
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-200" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}