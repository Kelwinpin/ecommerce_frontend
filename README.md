# 🎮 E-commerce Gaming Frontend

Um frontend moderno e responsivo para e-commerce especializado em videogames, construído com Next.js 15, TypeScript e Tailwind CSS.

## 🚀 Tecnologias

- **Framework:** Next.js 15 com App Router
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS 4
- **Componentes:** Shadcn/ui
- **Ícones:** Lucide React
- **Fontes:** Geist (Sans & Mono)

## 📁 Arquitetura do Projeto

```
src/
├── app/                          # App Router (Next.js 15)
│   ├── (auth)/                   # Route groups - Autenticação
│   │   ├── login/
│   │   └── register/
│   ├── (shop)/                   # Route groups - Loja
│   │   ├── games/
│   │   │   ├── [slug]/           # Página individual do jogo
│   │   │   └── category/[category]/
│   │   ├── cart/                 # Carrinho de compras
│   │   ├── checkout/             # Finalização de compra
│   │   └── profile/              # Perfil do usuário
│   ├── admin/                    # Dashboard administrativo
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/                       # Componentes Shadcn/ui
│   ├── forms/                    # Formulários reutilizáveis
│   ├── layout/                   # Header, Footer, Sidebar
│   ├── game/                     # Componentes específicos de games
│   ├── cart/                     # Componentes do carrinho
│   └── common/                   # Componentes genéricos
├── lib/
│   ├── api/                      # Cliente API e endpoints
│   ├── auth/                     # Sistema de autenticação
│   ├── validations/              # Schemas de validação (Zod)
│   ├── constants/                # Constantes da aplicação
│   ├── hooks/                    # Custom React hooks
│   ├── stores/                   # Estado global (Zustand)
│   ├── types/                    # Definições TypeScript
│   └── utils.ts                  # Utilitários
├── public/
│   ├── images/
│   │   ├── games/                # Imagens dos jogos
│   │   ├── platforms/            # Logos das plataformas
│   │   └── banners/              # Banners promocionais
│   └── icons/
└── styles/
    └── components/               # Estilos específicos de componentes
```

## 🎯 Funcionalidades Planejadas

### 🛒 E-commerce Core
- [ ] Catálogo de jogos com filtros avançados
- [ ] Carrinho de compras persistente
- [ ] Sistema de checkout com múltiplas formas de pagamento
- [ ] Gerenciamento de pedidos
- [ ] Sistema de avaliações e reviews

### 🎮 Gaming Features
- [ ] Filtros por plataforma (PC, PlayStation, Xbox, Nintendo)
- [ ] Categorização por gênero
- [ ] Sistema de wishlist
- [ ] Recomendações personalizadas
- [ ] Preços dinâmicos e promoções

### 👤 User Experience
- [ ] Autenticação e autorização
- [ ] Perfil de usuário personalizado
- [ ] Histórico de compras
- [ ] Sistema de pontos/recompensas
- [ ] Notificações de ofertas

### 🎨 Interface
- [ ] Design responsivo e mobile-first
- [ ] Tema escuro/claro
- [ ] Animações fluidas
- [ ] Loading states otimizados
- [ ] SEO otimizado

## 🛠 Stack Técnica Recomendada

### Estado e Dados
- **Estado Global:** Zustand
- **Validação:** Zod + React Hook Form
- **API Client:** TanStack Query (React Query)
- **Cache:** Next.js built-in caching

### Autenticação e Pagamentos
- **Auth:** NextAuth.js v5
- **Pagamentos:** Stripe
- **Sessões:** JWT + HTTP-only cookies

### Performance e SEO
- **Imagens:** next/image com otimização automática
- **SEO:** next-seo + metadata API
- **Analytics:** Vercel Analytics
- **Monitoring:** Vercel Speed Insights

### Testes e Qualidade
- **Testes:** Vitest + Testing Library
- **E2E:** Playwright
- **Linting:** ESLint + Prettier
- **Type checking:** TypeScript strict mode

## 📦 Instalação e Desenvolvimento

### Pré-requisitos
- Node.js 18+ 
- npm/yarn/pnpm

### Instalação
```bash
# Clone o repositório
git clone <repository-url>
cd ecommerce_frontend

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local

# Execute o servidor de desenvolvimento
npm run dev
```

### Scripts Disponíveis
```bash
npm run dev        # Servidor de desenvolvimento com Turbopack
npm run build      # Build de produção
npm run start      # Servidor de produção
npm run lint       # Verificação de linting
npm run type-check # Verificação de tipos TypeScript
```

## 🌐 Estrutura de Dados

### Game Entity
```typescript
interface Game {
  id: string
  title: string
  slug: string
  description: string
  price: number
  discountPrice?: number
  platform: Platform[]
  genre: Genre[]
  developer: string
  publisher: string
  releaseDate: Date
  rating: GameRating
  images: GameImage[]
  videos?: GameVideo[]
  systemRequirements: SystemRequirements
  stock: number
  featured: boolean
  tags: string[]
}
```

### User Entity
```typescript
interface User {
  id: string
  email: string
  name: string
  avatar?: string
  preferences: UserPreferences
  wishlist: Game[]
  orders: Order[]
  addresses: Address[]
  createdAt: Date
}
```

## 🚀 Deploy

### Vercel (Recomendado)
```bash
# Deploy automático via Git
vercel --prod
```

### Outras Plataformas
- **Netlify:** Build command: `npm run build`
- **Railway:** Configuração automática
- **Docker:** Dockerfile incluído

## 📱 Responsividade

- **Mobile First:** Design otimizado para dispositivos móveis
- **Breakpoints:** sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch Friendly:** Interfaces otimizadas para touch

## 🔒 Segurança

- **HTTPS:** Obrigatório em produção
- **CSP:** Content Security Policy configurado
- **CORS:** Configuração restritiva
- **Sanitização:** Inputs sanitizados
- **Rate Limiting:** Proteção contra spam

## 📈 Performance

- **Server Components:** Renderização no servidor por padrão
- **Image Optimization:** Compressão automática
- **Code Splitting:** Carregamento sob demanda
- **Edge Runtime:** Funções edge para baixa latência
- **Static Generation:** Páginas estáticas quando possível

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Contato

**Desenvolvedor:** Kelwin  
**Projeto:** Gaming E-commerce Frontend  
**Tecnologia:** Next.js + TypeScript + Tailwind CSS

---

*Construído com ❤️ para gamers por gamers*