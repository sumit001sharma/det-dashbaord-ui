import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff, AlertCircle, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types/roles';

export default function Login() {
  const [email, setEmail] = useState('admin@dubaidet.gov.ae');
  const [password, setPassword] = useState('DET@2025');
  const [role, setRole] = useState<UserRole>(UserRole.ADMIN);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Demo credentials - replace with actual authentication
    if (email.endsWith('@dubaidet.gov.ae') && password === 'DET@2025') {
      const user = {
        id: '1',
        name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()),
        email: email,
        role: role
      };
      login(user);
      navigate('/');
    } else {
      setError('Invalid email or password. Please try again.');
      setIsLoading(false);
    }
  };

  const handleUAEPassLogin = () => {
    setError('');
    setIsLoading(true);
    
    // Demo UAE PASS authentication - replace with actual UAE PASS integration
    // In production, this would redirect to UAE PASS OAuth flow
    setTimeout(() => {
      const user = {
        id: 'uaepass-' + Date.now(),
        name: 'UAE PASS User',
        email: 'user@uaepass.ae',
        role: UserRole.USER
      };
      login(user);
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-det-light flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header with DET Branding */}
          <div className="bg-gradient-to-r from-det-primary to-primary-800 p-8 text-white">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="flex justify-center mb-4">
                <img 
                  src="/det-logo.png" 
                  alt="Government of Dubai" 
                  className="h-16 w-auto"
                />
              </div>
              <h1 className="text-2xl font-bold mb-2">Dubai Economy & Tourism</h1>
              <p className="text-white/80 text-sm">External Stakeholder BI Dashboard</p>
            </motion.div>
          </div>

          {/* Login Form */}
          <div className="p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-det-primary mb-2">Welcome Back</h2>
              <p className="text-gray-600 mb-6">Please sign in to access the dashboard</p>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700"
                >
                  <AlertCircle size={20} />
                  <span className="text-sm">{error}</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-det-primary focus:border-det-primary transition-colors"
                      placeholder="your.email@dubaidet.gov.ae"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-det-primary focus:border-det-primary transition-colors"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                    User Role
                  </label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <select
                      id="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value as UserRole)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-det-primary focus:border-det-primary transition-colors appearance-none bg-white"
                      required
                    >
                      <option value={UserRole.USER}>User</option>
                      <option value={UserRole.CLIENT}>Client</option>
                      <option value={UserRole.ADMIN}>Admin</option>
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    Demo: Select your role to test different permission levels
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-det-primary border-gray-300 rounded focus:ring-det-primary"
                    />
                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-det-primary hover:text-primary-800 font-medium">
                    Forgot password?
                  </a>
                </div>

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-det-primary to-primary-800 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Signing in...
                    </span>
                  ) : (
                    'Sign In'
                  )}
                </motion.button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              {/* UAE PASS Button */}
              <motion.button
                type="button"
                onClick={handleUAEPassLogin}
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-white border-2 border-[#0066CC] text-[#0066CC] py-3 rounded-lg font-semibold hover:bg-[#0066CC] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" rx="4" fill="currentColor" className="group-hover:fill-white fill-[#0066CC]"/>
                  <path d="M12 6L8 10H11V14H13V10H16L12 6Z" fill="white" className="group-hover:fill-[#0066CC]"/>
                  <path d="M7 16H17V18H7V16Z" fill="white" className="group-hover:fill-[#0066CC]"/>
                </svg>
                <span>Sign in with UAE PASS</span>
              </motion.button>

              {/* Important Note */}
              <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="text-sm font-semibold text-blue-900 mb-1">Note: Admin Login Currently Active</p>
                    <p className="text-xs text-blue-800">
                      Only admin credentials are functional at this time. Use the demo credentials below to access the dashboard.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600 text-center mb-2">Demo Credentials:</p>
                <p className="text-xs text-gray-700 text-center font-mono">
                  Email: admin@dubaidet.gov.ae<br />
                  Password: DET@2025
                </p>
              </div>
            </motion.div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              © 2025 Dubai Department of Economy and Tourism. All rights reserved.
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <p className="text-sm text-gray-600">
            Need help? Contact{' '}
            <a href="mailto:support@dubaidet.gov.ae" className="text-det-primary hover:text-primary-800 font-medium">
              support@dubaidet.gov.ae
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
