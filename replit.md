# GameXchange

## Overview

GameXchange is a modern gaming marketplace application built for trading in-game items, skins, and collectibles. The platform provides a comprehensive marketplace experience with real-time statistics, player profiles, and a gaming-focused UI design. Built as a full-stack TypeScript application, it combines a React frontend with an Express.js backend and PostgreSQL database using Drizzle ORM.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Framework**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom gaming-themed design system featuring dark colors, neon accents, and gradient effects
- **State Management**: TanStack React Query for server state management
- **Routing**: React Router DOM for client-side navigation
- **Design System**: Custom gaming aesthetic with HSL-based color system, including primary (cyan), secondary (purple), and accent (green) colors

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Development**: tsx for TypeScript execution in development
- **Production Build**: esbuild for fast bundling with external package handling
- **Storage Interface**: Abstracted storage layer with in-memory implementation (MemStorage) that can be swapped for database implementations

### Database Architecture
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Schema Management**: Centralized schema definitions in `/shared/schema.ts` with Zod validation
- **Migrations**: Drizzle Kit handles schema migrations to `/migrations` directory
- **Connection**: Uses DATABASE_URL environment variable for database connectivity

### Authentication & Sessions
- **Session Management**: connect-pg-simple for PostgreSQL-backed sessions
- **User Schema**: Basic user model with username/password fields and unique constraints
- **Validation**: Drizzle-zod integration for runtime type safety

### Development Workflow
- **Monorepo Structure**: Client and server code in separate directories with shared schema
- **Hot Reload**: Vite HMR for frontend development with Express proxy
- **Error Handling**: Runtime error overlay for development debugging
- **Path Aliases**: Configured TypeScript paths for clean imports (`@/`, `@shared/`)
- **Code Quality**: Strict TypeScript configuration with comprehensive type checking

### Static Assets & Build
- **Asset Management**: Vite handles client-side assets with alias support for attached assets
- **Production Build**: Client builds to `/dist/public`, server bundles to `/dist/index.js`
- **Static Serving**: Express serves built client assets in production mode

## External Dependencies

### Core Framework Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL database connection for Neon
- **drizzle-orm** & **drizzle-kit**: Modern TypeScript ORM with migration support
- **express**: Web application framework for Node.js backend
- **react** & **react-dom**: Frontend UI library with TypeScript support
- **vite**: Fast build tool and development server

### UI & Component Libraries
- **@radix-ui/***: Comprehensive set of headless UI primitives (accordion, dialog, dropdown, form controls, etc.)
- **@tanstack/react-query**: Powerful data synchronization for React applications
- **react-router-dom**: Declarative routing for React applications
- **tailwindcss**: Utility-first CSS framework for styling

### Development & Build Tools
- **typescript**: Static type checking and compilation
- **tsx**: TypeScript execution for Node.js development
- **esbuild**: Fast JavaScript bundler for production builds
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay integration
- **@replit/vite-plugin-cartographer**: Development tooling for Replit environment

### Utility Libraries
- **class-variance-authority**: Utility for creating variant-based component APIs
- **clsx**: Conditional className utility
- **date-fns**: Modern JavaScript date utility library
- **zod**: TypeScript-first schema validation library
- **nanoid**: URL-safe unique string ID generator
- **lucide-react**: Beautiful & consistent icon toolkit