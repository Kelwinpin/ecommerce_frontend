import Link from "next/link"
import { Gamepad2, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
      
      <div className="relative flex flex-col items-center justify-center min-h-screen p-8 text-center">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-3xl flex items-center justify-center mb-4 mx-auto">
            <Gamepad2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            Retro Game Store
          </h1>
          <p className="text-xl text-gray-300">
            Reviva os clássicos que marcaram época
          </p>
        </div>

        {/* Hero Content */}
        <div className="max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Tesouros nostálgicos do passado
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Encontre cartuchos, CDs e colecionáveis originais dos clássicos que definiram gerações. 
            Do Atari ao PlayStation 2, preservamos a magia dos videogames em suas versões físicas autênticas.
          </p>
          
          <div className="flex gap-4 justify-center">
            <Link href="/login">
              <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-medium px-8 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-purple-500/25">
                <LogIn className="w-5 h-5 mr-2" />
                Fazer Login
              </Button>
            </Link>
            
            <Button variant="outline" className="border-purple-500/50 text-purple-600 hover:shadow-2xl px-8 py-3 rounded-lg">
              Ver Coleção Retro
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20">
            <h3 className="text-xl font-semibold text-white mb-2">📼 Originais Autênticos</h3>
            <p className="text-gray-300">Cartuchos, CDs e mídias físicas genuínas e preservadas</p>
          </div>
          
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20">
            <h3 className="text-xl font-semibold text-white mb-2">🕹️ Consoles Clássicos</h3>
            <p className="text-gray-300">Do Atari 2600 ao Dreamcast, todas as gerações retro</p>
          </div>
          
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20">
            <h3 className="text-xl font-semibold text-white mb-2">📦 Entrega Segura</h3>
            <p className="text-gray-300">Embalagem cuidadosa para preservar seus colecionáveis</p>
          </div>
        </div>

        {/* Gaming Elements */}
        <div className="flex justify-center space-x-4 pt-12">
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
          <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse delay-100" />
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse delay-200" />
        </div>
      </div>
    </div>
  )
}
