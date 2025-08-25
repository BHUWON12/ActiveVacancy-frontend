# activevacancy - Job Portal Application

A modern, production-ready job portal built with React, TypeScript, and Tailwind CSS. activevacancy streamlines the job application process with a beautiful UI, admin panel, and Google AdSense integration.

## 🚀 Features

### Public Features
- **Fast Job Applications**: Streamlined application process without user registration
- **Advanced Job Filtering**: Filter by location and search job titles
- **Responsive Design**: Mobile-first design that works on all devices
- **Featured Companies**: Showcase of partner companies
- **Google AdSense Ready**: Pre-configured AdSense placeholders
- **SEO Optimized**: Meta tags and semantic HTML structure

### Admin Features
- **Secure Admin Panel**: Hidden admin dashboard at `/admin/login`
- **Application Management**: View, sort, and manage all job applications
- **Status Tracking**: Update application status (pending, reviewed, shortlisted, rejected)
- **Excel Export**: Download all applications as Excel file
- **CV Management**: View and download applicant CVs

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Routing**: React Router DOM
- **Forms**: React Hook Form
- **Icons**: Lucide React
- **Build Tool**: Vite
- **State Management**: React Context API

## 📋 Prerequisites

- Node.js 16+ 
- npm or yarn package manager

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd activevacancy-job-portal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
# Google AdSense
VITE_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXXX

# Admin Credentials (for demo - use secure authentication in production)
VITE_ADMIN_USERNAME=admin
VITE_ADMIN_PASSWORD=admin123

# API Endpoints (when backend is implemented)
VITE_API_BASE_URL=http://localhost:8000/api
```

### Google AdSense Setup

1. **Update AdSense Client ID**:
   - Replace `ca-pub-XXXXXXXXXXXXXXXXX` in `index.html` with your actual AdSense client ID
   - Update the same in `src/components/AdSense/AdSenseAd.tsx`

2. **Ad Placements**:
   - **Home Page**: Center section ad
   - **Jobs Page**: Between job listings (every 3rd job)
   - **Footer**: Banner ad on all pages

3. **Testing**: 
   - In development, placeholder ads are shown
   - Real ads will appear after AdSense approval and proper configuration

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AdSense/        # Google AdSense components
│   ├── Jobs/           # Job-related components
│   ├── Layout/         # Header, Footer components
│   └── UI/             # Generic UI components
├── context/            # React Context for state management
├── data/               # Mock data and constants
├── hooks/              # Custom React hooks
├── pages/              # Page components
│   ├── admin/          # Admin panel pages
│   └── *.tsx           # Public pages
├── types/              # TypeScript type definitions
└── App.tsx             # Main app component
```

## 🔐 Admin Panel

### Access
- URL: `/admin/login`
- Default credentials: `admin` / `admin123`
- **Note**: Hidden from public navigation

### Features
- **Dashboard**: Overview statistics
- **Applications**: View and manage all applications
- **Status Updates**: Change application status
- **Excel Export**: Download applications data
- **CV Access**: View applicant resumes

## 🎨 Design System

### Colors
- **Primary**: Blue (#3B82F6)
- **Secondary**: Teal (#14B8A6)  
- **Accent**: Orange (#F97316)
- **Gray Scale**: Comprehensive gray palette

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Components
- **Buttons**: Primary, secondary, outline variants
- **Cards**: Consistent shadow and hover effects
- **Forms**: Styled inputs with validation
- **Loading**: Custom spinner component

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔄 API Integration

The application is designed to work with a backend API. Key endpoints expected:

```
GET    /api/jobs              # Get all jobs
GET    /api/jobs?location=X   # Filter jobs by location
POST   /api/applications      # Submit job application
POST   /api/admin/login       # Admin authentication
GET    /api/admin/applications # Get all applications
PUT    /api/admin/applications/:id # Update application status
GET    /api/admin/export      # Export applications Excel
```

## 🚀 Deployment

### Frontend Deployment (Netlify/Vercel)

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Connect your GitHub repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `dist`

3. **Deploy to Vercel**
   ```bash
   npm install -g vercel
   vercel --prod
   ```

### Environment Variables
Set the following in your deployment platform:
- `VITE_ADSENSE_CLIENT_ID`
- `VITE_API_BASE_URL`

## 🔒 Security Considerations

### Production Checklist
- [ ] Replace mock admin authentication with proper JWT/OAuth
- [ ] Implement proper backend API authentication
- [ ] Use HTTPS for all communications
- [ ] Sanitize all user inputs
- [ ] Implement rate limiting
- [ ] Add CSRF protection
- [ ] Secure file upload handling

## 🧪 Testing

```bash
# Run linting
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:
- Email: activevacancy.root@gmail.com
- Documentation: [Link to docs]
- Issues: [GitHub Issues]

---

Built with ❤️ by the activevacancy team