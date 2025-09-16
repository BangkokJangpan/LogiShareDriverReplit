# LogiShare Driver Mobile App

## Overview

This is a React-based mobile web application for delivery drivers in the LogiShare platform. The app provides a comprehensive dashboard for drivers to manage their delivery operations, track earnings, and manage their profile information. The application features a modern UI built with shadcn/ui components and supports real-time order management with status tracking throughout the delivery lifecycle.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for fast development and building
- **UI Library**: shadcn/ui components built on Radix UI primitives for accessible, customizable components
- **Styling**: Tailwind CSS with custom design system including Korean font support (Roboto, Noto Sans KR)
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation schemas

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon serverless PostgreSQL
- **File Uploads**: Multer middleware for handling image uploads (profile photos, delivery confirmations)
- **Session Management**: Connect-pg-simple for PostgreSQL-backed sessions
- **API Design**: RESTful endpoints with proper error handling and logging

### Data Layer
- **Schema Design**: Comprehensive driver management system with tables for:
  - Drivers (profiles, ratings, completion rates)
  - Vehicles (registration, insurance, capacity)
  - Licenses (driver credentials and renewals)
  - Orders (delivery requests with full lifecycle tracking)
  - Earnings (payment tracking and analytics)
- **Type Safety**: Shared TypeScript types between frontend and backend
- **Validation**: Zod schemas for runtime validation and type inference

### Mobile-First Design
- **Responsive Layout**: Mobile-optimized interface with touch-friendly interactions
- **Navigation**: Tab-based navigation with dashboard, orders, earnings, and profile sections
- **Real-time Updates**: Live order status tracking and earnings calculations
- **Offline Considerations**: Query caching for improved performance on mobile networks

### Development Workflow
- **Hot Module Replacement**: Vite development server with fast refresh
- **Build Process**: Optimized production builds with code splitting
- **Error Handling**: Runtime error overlays and comprehensive error boundaries
- **Development Tools**: Replit-specific plugins for enhanced development experience

## External Dependencies

### Core Technologies
- **Database**: Neon PostgreSQL serverless database
- **ORM**: Drizzle with PostgreSQL dialect
- **UI Components**: Radix UI primitives for accessible components
- **Icons**: Lucide React for consistent iconography
- **Validation**: Zod for schema validation
- **Date Handling**: date-fns for date manipulations

### Development & Build Tools
- **Build Tool**: Vite with React plugin
- **TypeScript**: Full type safety across the stack
- **PostCSS**: CSS processing with Tailwind CSS
- **ESBuild**: Fast bundling for production builds

### Third-Party Integrations
- **Payment Processing**: Stripe integration for handling driver earnings and payments
- **File Storage**: Local file system storage for uploaded images (scalable to cloud storage)
- **Session Storage**: PostgreSQL-backed session management for driver authentication

### Mobile & Performance
- **Query Optimization**: TanStack Query for intelligent caching and background updates
- **Image Optimization**: Multer with file size limits and type validation
- **Network Resilience**: Offline-first query strategies with stale-while-revalidate patterns