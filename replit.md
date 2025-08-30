# GameXchange

## Overview

GameXchange is a modern gaming marketplace application built for trading in-game items, skins, and collectibles. The platform provides a comprehensive marketplace experience with real-time statistics, player profiles, and a gaming-focused UI design. Built as a full-stack TypeScript application, it combines a React frontend with an Express.js backend and PostgreSQL database using Drizzle ORM.

## Recent Updates (2025)

### Complete Architecture Reorganization
- **Modular Component System**: Separated concerns into layout, feature, and utility components
- **Consistent Design System**: Implemented centralized theme configuration eliminating color inconsistencies
- **Clean Visual Design**: Removed all unnecessary borders and visual clutter
- **Development-Ready Structure**: Organized for easy feature additions and maintainability

## User Preferences

Preferred communication style: Simple, everyday language.

## Project Structure

```
client/src/
├── components/
│   ├── layout/          # Core layout components
│   │   ├── MainLayout.tsx
│   │   ├── AppHeader.tsx
│   │   ├── AppSidebar.tsx
│   │   └── ChatPanel.tsx
│   ├── dashboard/       # Dashboard specific components
│   │   └── DashboardView.tsx
│   └── ui/             # Reusable UI components (shadcn)
├── config/
│   └── theme.ts        # Centralized theme configuration
├── hooks/              # Custom React hooks
│   ├── useAuth.ts
│   ├── useWebSocket.ts
│   └── use-toast.ts
├── services/
│   └── api.ts          # API service layer
├── types/
│   └── index.ts        # TypeScript type definitions
├── utils/
│   └── helpers.ts      # Utility functions
└── pages/              # Route pages
```

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Framework**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom theme configuration
- **State Management**: TanStack React Query for server state management
- **Routing**: Wouter for client-side navigation
- **Design System**: Centralized theme configuration with consistent color palette

### Theme System
```typescript
// Consistent color system without conflicting styles
colors: {
  primary: { /* Cyan shades */ },
  secondary: { /* Purple shades */ },
  accent: { /* Various accent colors */ },
  background: { /* Dark backgrounds */ },
  text: { /* Text hierarchy */ },
  border: { /* Minimal subtle borders */ }
}
```

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Development**: tsx for TypeScript execution in development
- **Production Build**: esbuild for fast bundling
- **API Design**: RESTful endpoints with typed service layer

### Database Architecture
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Schema Management**: Centralized schema definitions in `/shared/schema.ts` with Zod validation
- **Migrations**: Drizzle Kit handles schema migrations

### Key Features
- **Modular Component Architecture**: Easy to extend and maintain
- **Consistent Visual Design**: No color inconsistencies or unwanted borders
- **Type Safety**: Full TypeScript coverage across frontend and backend
- **WebSocket Support**: Real-time chat and notifications
- **API Service Layer**: Centralized API communication
- **Theme Configuration**: Single source of truth for all styling

## Development Workflow

### Setup
```bash
npm install          # Install dependencies
npm run dev         # Start development server
```

### Adding New Features
1. Create component in appropriate directory (layout/feature/ui)
2. Use theme configuration for consistent styling
3. Add types to `types/index.ts`
4. Create API endpoints in service layer
5. Use custom hooks for data fetching

### Styling Guidelines
- Use theme colors from `config/theme.ts`
- Avoid inline styles except for dynamic values
- No hardcoded colors or borders
- Use utility classes from Tailwind CSS
- Apply transitions for smooth interactions

### Component Guidelines
- Keep components focused and single-purpose
- Use TypeScript interfaces for props
- Implement proper error handling
- Follow React best practices
- Maintain consistent naming conventions

## External Dependencies

### Core Framework Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **drizzle-orm** & **drizzle-kit**: Modern TypeScript ORM
- **express**: Web application framework
- **react** & **react-dom**: Frontend UI library
- **vite**: Fast build tool and development server
- **wouter**: Lightweight routing library

### UI & Component Libraries
- **@radix-ui/***: Headless UI primitives
- **@tanstack/react-query**: Data synchronization
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library

### Development & Build Tools
- **typescript**: Static type checking
- **tsx**: TypeScript execution for Node.js
- **esbuild**: Fast JavaScript bundler

## Best Practices
1. Always use the theme configuration for colors
2. Keep components modular and reusable
3. Use TypeScript for type safety
4. Follow the established directory structure
5. Test features in development before deployment
6. Use the API service layer for all backend calls
7. Maintain consistent code formatting