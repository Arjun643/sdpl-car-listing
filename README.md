# Car Listings Platform

A modern, responsive web application for browsing and filtering car listings, built with Next.js 13, TypeScript, and Tailwind CSS.

![Car Listings Platform Screenshot](screenshot.png)

## 🚀 Features

- **Advanced Search & Filtering**
  - Search by make, model, and year
  - Filter by price range
  - Sort by price and year
  - Real-time filtering without page reload

- **Smart Pagination**
  - Server-side pagination using react-js-pagination
  - Customizable items per page
  - Dynamic page numbers
  - First/Last page navigation
  - Responsive pagination controls

- **Responsive Design**
  - Mobile-first approach
  - Smooth transitions and animations
  - Clean and modern UI
  - Optimized for all screen sizes

- **Performance Optimized**
  - Server-side rendering with Next.js
  - Image optimization
  - Lazy loading components
  - Efficient state management

- **User Experience**
  - Intuitive interface
  - Loading states with skeletons
  - Error handling with user feedback
  - Smooth animations and transitions

## 🛠️ Technical Stack

- **Frontend Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Pagination**: react-js-pagination
- **State Management**: React Hooks
- **API Integration**: REST API
- **Testing**: Jest & React Testing Library
- **Deployment**: Vercel

## 📖 Pagination Implementation

The application uses `react-js-pagination` for efficient data pagination:

```typescript
import Pagination from 'react-js-pagination';

// Pagination configuration
const ITEMS_PER_PAGE = 12;
const [page, setPage] = useState(1);
const [total, setTotal] = useState(0);

// Pagination component
<Pagination
  activePage={page}
  itemsCountPerPage={ITEMS_PER_PAGE}
  totalItemsCount={total}
  pageRangeDisplayed={5}
  onChange={handlePageChange}
  itemClass="px-3 py-1 mx-1 border rounded hover:bg-gray-100"
  activeClass="bg-blue-500 text-white hover:bg-blue-600"
  disabledClass="opacity-50 cursor-not-allowed"
  linkClass="cursor-pointer"
/>
```

### Pagination Features:
- Dynamic page calculation based on total items
- Customizable styling with Tailwind CSS
- Responsive design for all screen sizes
- Keyboard navigation support
- Loading states during page transitions
- SEO-friendly URL parameters

## 🏗️ Architecture

The application follows a clean and modular architecture:

```
src/
├── app/                 # Next.js 15 app router pages
│   ├── page.tsx        # Home page with pagination
│   └── car/[id]/       # Individual car details
├── components/         
│   ├── CarCard.tsx     # Car listing card
│   ├── Filters.tsx     # Search and filter controls
│   └── LoadingSkeleton.tsx  # Loading states
├── services/           
│   └── api.ts          # API integration
└── types/              # TypeScript definitions
```

## 🚀 Getting Started

1. **Install dependencies**
```bash
npm install
npm install react-js-pagination
```

2. **Run development server**
```bash
npm run dev
```

3. **Build for production**
```bash
npm run build
npm start
```

## 🔍 Search & Filter Implementation

- **Real-time Search**: Updates results as user types
- **Price Range Filter**: Min and max price selection
- **Year Filter**: Filter cars by manufacturing year
- **Make/Model Filter**: Filter by car make and model
- **Sort Options**: 
  - Price (Low to High)
  - Price (High to Low)
  - Year (Newest First)
  - Year (Oldest First)

## 🚀 Deployment

### Vercel Deployment Guide

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/car-listings.git
git push -u origin main
```

2. **Deploy on Vercel**
- Sign up/Login at [Vercel](https://vercel.com)
- Click "New Project"
- Import your GitHub repository
- Configure project settings:
  - Framework Preset: Next.js
  - Root Directory: ./
  - Build Command: `npm run build`
  - Output Directory: .next

3. **Environment Variables** (if needed)
- Go to Project Settings > Environment Variables
- Add the following variables:
```
NEXT_PUBLIC_API_URL=your_api_url
```

4. **Automatic Deployments**
  - Vercel automatically deploys when you push to main
  - Preview deployments for pull requests
  - Easy rollbacks if needed

### Deployment Features

- **Automatic HTTPS**: Vercel provides automatic SSL certificates
- **Global CDN**: Your app is served from edge locations worldwide
- **Analytics**: Built-in analytics and performance monitoring
- **Domain Setup**: 
  - Go to Project Settings > Domains
  - Add your custom domain
  - Follow DNS configuration instructions

### Deployment Commands

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Preview deployment
vercel
```

### Monitoring & Logs

- Visit Vercel Dashboard > Your Project
- Check Deployments tab for deployment history
- View Runtime Logs for debugging
- Monitor Performance metrics

### Troubleshooting

If deployment fails:
1. Check build logs in Vercel dashboard
2. Verify environment variables
3. Ensure all dependencies are listed in package.json
4. Test build locally with `npm run build`

## 🎯 Future Enhancements

- Advanced pagination options
- Infinite scroll alternative
- Save pagination preferences
- Custom items per page
- Jump to page functionality

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Mobile devices (320px and up)
- Tablets (768px and up)
- Desktops (1024px and up)
- Large screens (1280px and up)

## 🧪 Testing

```bash
npm test
```

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ by [Arjun Maurya]
