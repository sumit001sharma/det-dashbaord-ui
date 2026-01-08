import { Bell, Settings, User, LogOut, Menu } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RoleBadge from './RoleBadge';
import { useState } from 'react';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setShowMobileMenu(false);
  };

  const handleNotifications = () => {
    navigate('/notifications');
    setShowMobileMenu(false);
  };

  const handleSettings = () => {
    navigate('/settings');
    setShowMobileMenu(false);
  };

  if (!isAuthenticated || location.pathname === '/login') {
    return null;
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
      <div className="container mx-auto px-4 py-3">
        {/* Desktop Header */}
        <div className="hidden lg:flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/')}>
            <div className="flex items-center">
              <img 
                src="/det-logo.png" 
                alt="Government of Dubai" 
                className="h-14 w-auto"
              />
            </div>
            <div className="border-l border-gray-300 pl-4 ml-2">
              <h1 className="text-xl font-bold text-det-primary">Dubai Economy & Tourism</h1>
              <p className="text-sm text-gray-600">External Stakeholder BI Dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={handleNotifications}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
              title="Notifications"
            >
              <Bell className="text-gray-600" size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-det-primary rounded-full"></span>
            </button>
            <button 
              onClick={handleSettings}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Settings"
            >
              <Settings className="text-gray-600" size={20} />
            </button>
            <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
              <User size={18} className="text-det-primary" />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-det-dark">{user?.name || 'User'}</span>
                {user?.role && <RoleBadge role={user.role} size="sm" showIcon={false} />}
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-det-primary hover:bg-primary-800 text-white rounded-lg transition-colors"
            >
              <LogOut size={18} />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="lg:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
              <img 
                src="/det-logo.png" 
                alt="Government of Dubai" 
                className="h-10 w-auto"
              />
              <div>
                <h1 className="text-base font-bold text-det-primary">DET Dashboard</h1>
                {user?.role && <RoleBadge role={user.role} size="sm" />}
              </div>
            </div>
            
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="text-gray-600" size={24} />
            </button>
          </div>

          {/* Mobile Dropdown Menu */}
          {showMobileMenu && (
            <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
              <div className="container mx-auto px-4 py-4 space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <User size={20} className="text-det-primary" />
                  <div>
                    <p className="text-sm font-medium text-det-dark">{user?.name || 'User'}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                </div>
                
                <button 
                  onClick={handleNotifications}
                  className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Bell className="text-gray-600" size={20} />
                  <span className="text-sm font-medium">Notifications</span>
                  <span className="ml-auto w-2 h-2 bg-det-primary rounded-full"></span>
                </button>
                
                <button 
                  onClick={handleSettings}
                  className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Settings className="text-gray-600" size={20} />
                  <span className="text-sm font-medium">Settings</span>
                </button>
                
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-3 bg-det-primary hover:bg-primary-800 text-white rounded-lg transition-colors"
                >
                  <LogOut size={20} />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
