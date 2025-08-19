"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Gamepad2, LogIn, Loader2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { loginSchema, type LoginFormData } from "@/lib/validations/auth"
import { loginUser } from "@/lib/api/auth"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await loginUser(data)
      
      // Armazenar token no localStorage (em produção, considere usar httpOnly cookies)
      localStorage.setItem('access_token', response.access_token)
      
      // Redirecionar ou atualizar estado da aplicação
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
            <Gamepad2 className="w-8 h-8 text-white" />
          </div>
          
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Game Store Login
            </CardTitle>
            <CardDescription className="text-gray-400">
              Entre na sua conta e explore o universo dos games
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <Label 
                htmlFor="email" 
                className="text-sm font-medium text-gray-200"
              >
                Email
              </Label>
              <Input
                {...register("email")}
                id="email"
                type="email"
                placeholder="seu@email.com"
                className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500/20"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-sm text-red-400">{errors.email.message}</p>
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
                <Input
                  {...register("password")}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500/20 pr-10"
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
                  Entrando...
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 mr-2" />
                  Entrar
                </>
              )}
            </Button>
          </form>

          {/* Footer Links */}
          <div className="space-y-4 text-center">
            <Link 
              href="/forgot-password" 
              className="block text-sm text-purple-400 hover:text-purple-300 transition-colors"
            >
              Esqueceu sua senha?
            </Link>
            
            <div className="text-sm text-gray-400">
              Não tem uma conta?{" "}
              <Link 
                href="/register" 
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
              >
                Cadastre-se
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