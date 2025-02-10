# SDPL Car Listing Application

A modern car listing application built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- 🔍 Advanced search with filters
- 📱 Responsive design for all devices
- 🖼️ Image carousel for car details
- ⚡ Server-side rendering
- 🧪 Comprehensive test coverage
- 🐳 Docker support

## 🛠️ Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- Jest & React Testing Library
- Docker

## 🏃‍♂️ Getting Started

### Local Development

1. Clone the repository:
```bash
git clone <your-repo-url>
cd sdpl-car-listing
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```

### 🐳 Docker Setup

```bash
# Build and run with Docker
docker-compose up --build

# Stop containers
docker-compose down
```

### 🧪 Testing

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage
```

## 🌐 Deployment

This application is deployed on Vercel. The live version can be accessed at:
[Live Demo](your-vercel-url)

### Automatic Deployments
- Connected to GitHub repository
- Automatic deployments on main branch updates
- Preview deployments for pull requests

## 🎯 Design Choices

1. **Architecture**
   - Next.js App Router for modern routing
   - TypeScript for type safety
   - Tailwind for utility-first styling

2. **State Management**
   - React hooks for local state
   - URL parameters for shareable filters

3. **Performance**
   - Server-side rendering with Next.js
   - Image optimization using next/image
   - Pagination for large datasets

## 🚧 Project Structure

```
src/
├── app/                # Next.js pages
├── components/         # Reusable components
├── services/          # API services
├── utils/             # Utility functions
└── __tests__/         # Test files
```

## 🔄 Development Workflow

1. Create feature branch
2. Make changes
3. Run tests
4. Create pull request
5. Automatic preview deployment
6. Review & merge
7. Automatic production deployment

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 Environment Variables

```env
# Not required for local development
NEXT_PUBLIC_API_URL=your-api-url
```

## 📚 Scripts

```bash
npm run dev          # Start development server
npm run build       # Build for production
npm run start       # Start production server
npm test           # Run tests
npm run docker:up  # Start Docker containers
```

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px

## 🏆 Features Implemented

- [x] Car listings with search
- [x] Advanced filtering system
- [x] Image carousel
- [x] Responsive design
- [x] Unit tests
- [x] Docker support
- [x] Vercel deployment
