import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Overview from './pages/Overview';
import DETEntities from './pages/DETEntities';
import Notifications from './pages/Notifications';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import TourismDashboard from './pages/TourismDashboard';
import FDIDashboard from './pages/FDIDashboard';
import HotelPerformance from './pages/HotelPerformance';
import AdminDashboard from './pages/AdminDashboard';
import Settings from './pages/Settings';

export interface FilterState {
  dateRange: string;
  region: string;
  category: string;
}

function AppContent() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const showSidebar = isAuthenticated && location.pathname !== '/login';

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-det-light">
      <Header />
      
      <div className="flex">
        {showSidebar && <Sidebar />}
        
        <div className="flex-1 overflow-x-hidden">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <motion.main 
                    className="container mx-auto px-4 py-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <DETEntities />
                  </motion.main>
                </ProtectedRoute>
              }
            />
            <Route
              path="/overview"
              element={
                <ProtectedRoute>
                  <motion.main 
                    className="container mx-auto px-4 py-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Overview />
                  </motion.main>
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <motion.main 
                    className="container mx-auto px-4 py-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Notifications />
                  </motion.main>
                </ProtectedRoute>
              }
            />
            <Route
              path="/tourism"
              element={
                <ProtectedRoute>
                  <motion.main 
                    className="container mx-auto px-4 py-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <TourismDashboard />
                  </motion.main>
                </ProtectedRoute>
              }
            />
            <Route
              path="/fdi"
              element={
                <ProtectedRoute>
                  <motion.main 
                    className="container mx-auto px-4 py-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <FDIDashboard />
                  </motion.main>
                </ProtectedRoute>
              }
            />
            <Route
              path="/analytics"
              element={
                <ProtectedRoute>
                  <motion.main 
                    className="container mx-auto px-4 py-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <AnalyticsDashboard />
                  </motion.main>
                </ProtectedRoute>
              }
            />
            <Route
              path="/hotel-performance"
              element={
                <ProtectedRoute>
                  <motion.main 
                    className="container mx-auto px-4 py-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <HotelPerformance />
                  </motion.main>
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <motion.main 
                    className="container mx-auto px-4 py-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Settings />
                  </motion.main>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <motion.main 
                    className="container mx-auto px-4 py-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <AdminDashboard />
                  </motion.main>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
