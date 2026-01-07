# DET BI Dashboard - Tourism & Economic Insights

A modern, interactive React dashboard for Dubai Economy & Tourism (DET) featuring 3D visualizations, real-time data insights, and advanced filtering capabilities.

## 🚀 Features

- **Interactive 3D Charts**: Beautiful, responsive charts with drill-down capabilities
- **Real-time Data Visualization**: Tourism trends, hotel performance, visitor origins, and economic indicators
- **Advanced Filtering**: Filter by date range, region, and category
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Interactive Charts**: Hover tooltips, click interactions, and animated transitions
- **Professional Layout**: Clean, government-appropriate design

### **Real Data Integration**
- **Tourism Performance**: 2018-2025 actual visitor data (18.72M in 2024)
- **FDI Statistics**: 1,826 projects, AED 52.3B capital (2024)
- **Hotel Metrics**: 825 establishments, 153K rooms, 80.4% occupancy
- **Regional Distribution**: 9 regions with YoY comparison
- **Monthly Reports**: October & November 2025 detailed breakdowns

## 🛠️ Tech Stack

- **React 18** + **TypeScript** - Type-safe modern UI
- **React Router 6** - Multi-page navigation
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - DET-branded utility styling
- **Recharts** - Interactive data visualization
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Professional iconography

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
# Navigate to the Dashboard folder
cd "c:\Projects\DET External Stakeholders BI Dashboards\Dashboard"

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

The application will open at `http://localhost:5173`

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
Dashboard/
├── src/
│   ├── pages/
│   │   ├── Overview.tsx              # Main overview page
│   │   ├── TourismDashboard.tsx      # Tourism analytics
│   │   ├── FDIDashboard.tsx          # FDI analytics
│   │   └── HotelPerformance.tsx      # Hotel metrics
│   ├── components/
│   │   ├── charts/                   # Chart components
│   │   ├── Dashboard.tsx             # Legacy dashboard
│   │   ├── FilterPanel.tsx           # Filter controls
│   │   └── Header.tsx                # Navigation header
│   ├── data/
│   │   └── mockData.ts               # Real DET data (100% actual)
│   ├── App.tsx                       # Router configuration
│   └── main.tsx                      # Entry point
├── package.json
├── tailwind.config.js                # DET theme colors
└── README.md
```

## 🎨 DET Brand Theme

### Official Colors
- **Primary Burgundy**: `#8B1538` - Main brand color
- **Secondary Gold**: `#C5A572` - Accent color
- **Accent Gold**: `#D4AF37` - Highlights
- **Light Background**: `#F5F5F5` - Subtle backgrounds
- **Dark Text**: `#2D1B2E` - Primary text
- **Cards**: `#1e293b` (Slate 800)

### Typography
- **Font Family**: Inter, system-ui
- **Headings**: Bold, White
- **Body**: Regular, Slate 400

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Environment Setup

The dashboard uses mock data for demonstration purposes. To connect to real APIs:

1. Update `src/data/mockData.ts` with API endpoints
2. Implement data fetching logic in chart components
3. Add error handling and loading states

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The build output will be in the `dist/` directory, ready to deploy to any static hosting service.

### Recommended Hosting Platforms

- **Azure Static Web Apps**
- **Vercel**
- **Netlify**
- **AWS S3 + CloudFront**

## 📈 Performance Optimization

- Code splitting with React.lazy()
- Image optimization
- Lazy loading for charts
- CDN delivery for static assets
- Gzip compression

## 🔐 Security

- No sensitive data in client-side code
- API calls should be authenticated
- HTTPS only in production
- Content Security Policy headers

## 🤝 Contributing

This is a demonstration project for DET BI Dashboard. For production use:

1. Replace mock data with real API endpoints
2. Implement authentication and authorization
3. Add comprehensive error handling
4. Implement data caching strategies
5. Add unit and integration tests

## 📄 License

This project is created for Dubai Economy & Tourism (DET) demonstration purposes.

## 👥 Support

For questions or support, please contact the development team.

---

**Built with ❤️ for Dubai Economy & Tourism**
"# det-dashbaord-ui" 
