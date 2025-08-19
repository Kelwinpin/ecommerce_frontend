"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, Mail, Loader2, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { forgotPasswordSchema, type ForgotPasswordFormData } from "@/lib/validations/auth"
import { forgotPassword } from "@/lib/api/auth"

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true)
    setError(null)

    try {
      await forgotPassword(data)
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro interno do servidor')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendEmail = async () => {
    const email = getValues('email')
    if (!email) return

    setIsLoading(true)
    setError(null)

    try {
      await forgotPassword({ email })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao reenviar email')
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
            <Mail className="w-8 h-8 text-white" />
          </div>
          
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              {success ? 'Email Enviado!' : 'Esqueceu sua senha?'}
            </CardTitle>
            <CardDescription className="text-gray-400">
              {success 
                ? 'Verifique sua caixa de entrada e siga as instruções para redefinir sua senha'
                : 'Digite seu email para receber um link de recuperação'
              }
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {success ? (
            <div className="space-y-6">
              {/* Success State */}
              <div className="text-center space-y-4">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto" />
                <div className="space-y-2">
                  <p className="text-green-400 font-medium">
                    Link de recuperação enviado!
                  </p>
                  <p className="text-sm text-gray-400">
                    Se você não receber o email em alguns minutos, verifique sua pasta de spam.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Button
                  onClick={handleResendEmail}
                  disabled={isLoading}
                  variant="outline"
                  className="w-full border-purple-500/50 text-purple-500 hover:bg-purple-500/10"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Reenviando...
                    </>
                  ) : (
                    'Reenviar email'
                  )}
                </Button>

                <Link href="/login">
                  <Button 
                    variant="outline" 
                    className="w-full border-gray-600 text-gray-600 hover:bg-gray-800/50"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar ao login
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
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
                    Enviando...
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    Enviar link de recuperação
                  </>
                )}
              </Button>

              {/* Back to Login */}
              <Link href="/login">
                <Button 
                  variant="outline" 
                  className="w-full border-gray-800 hover:bg-gray-800/50"
                  disabled={isLoading}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar ao login
                </Button>
              </Link>
            </form>
          )}

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