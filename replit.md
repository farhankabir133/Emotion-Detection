# EmoSense - Emotion Detection Web Application

## Overview

EmoSense is a modern web application that detects emotions from English text using AI technology. The application provides real-time emotion analysis with beautiful visualizations, user authentication, and personal analysis history tracking.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **Animations**: Framer Motion for smooth UI transitions
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Replit Auth with OpenID Connect
- **Session Management**: Express sessions with PostgreSQL storage

### Database Design
- **ORM**: Drizzle ORM with type-safe queries
- **Migrations**: Located in `/migrations` directory
- **Schema**: Shared schema in `/shared/schema.ts`

## Key Components

### Database Schema
- `users`: User profiles and authentication data
- `emotionAnalyses`: Emotion detection results with confidence scores
- `appStats`: Application usage statistics
- `sessions`: Session storage for authentication

### Authentication System
- Replit Auth integration with OpenID Connect
- Session-based authentication with PostgreSQL storage
- Automatic user profile creation and updates
- Protected routes for authenticated users

### Emotion Detection Service
- Mock emotion detection service using keyword-based analysis
- Supports 6 emotion categories: happy, sad, angry, fear, surprise, neutral
- Returns confidence scores and emotion breakdowns
- Designed to be replaced with actual AI model integration

### User Interface Components
- **Navigation**: Responsive navigation with authentication state
- **Landing Page**: Hero section with demo functionality
- **Dashboard**: Main interface for authenticated users
- **Analysis Form**: Text input and emotion analysis interface
- **History Panel**: Previous analysis results with timestamps
- **Statistics**: Personal analytics and usage metrics

## Data Flow

1. **User Authentication**: Users authenticate via Replit Auth
2. **Text Analysis**: User submits text for emotion detection
3. **Processing**: Backend processes text and returns emotion results
4. **Storage**: Results are stored in PostgreSQL database
5. **Visualization**: Frontend displays results with charts and animations
6. **History**: Users can view their analysis history and statistics

## External Dependencies

### Frontend Dependencies
- React ecosystem (React Query, React Hook Form, React Router)
- UI libraries (Radix UI, Tailwind CSS, Framer Motion)
- Chart visualization libraries
- Date manipulation (date-fns)

### Backend Dependencies
- Express.js web framework
- Drizzle ORM for database operations
- Neon serverless PostgreSQL driver
- OpenID Connect for authentication
- Session management libraries

### Development Tools
- Vite for build tooling
- TypeScript for type safety
- ESLint and Prettier for code quality
- PostCSS for CSS processing

## Deployment Strategy

### Build Process
- Frontend: Vite builds React app to `/dist/public`
- Backend: ESBuild bundles Node.js server to `/dist/index.js`
- Shared code: TypeScript compiles shared schemas and utilities

### Environment Configuration
- `DATABASE_URL`: PostgreSQL connection string
- `SESSION_SECRET`: Session encryption key
- `REPLIT_DOMAINS`: Allowed domains for OIDC
- `ISSUER_URL`: OpenID Connect issuer URL

### Database Setup
- Drizzle migrations handle schema creation
- Connection pooling with Neon serverless
- Session table for authentication state

### Production Considerations
- The mock emotion detection service should be replaced with actual AI model
- Environment variables must be configured for production
- Database migrations need to be run before deployment
- Static assets served from `/dist/public`

### Development Workflow
- `npm run dev`: Starts development server with hot reload
- `npm run build`: Builds application for production
- `npm run db:push`: Pushes schema changes to database
- `npm run check`: Type checking with TypeScript

The application is designed to be deployed on Replit with integrated authentication and database provisioning, but can be adapted for other platforms with proper environment configuration.