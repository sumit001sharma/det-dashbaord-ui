import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Plane, 
  TrendingUp, 
  Hotel,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Settings,
  BarChart3,
  Building2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  adminOnly?: boolean;
}

interface NavCategory {
  title: string;
  items: NavItem[];
}

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const { hasPermission } = useAuth();

  const navCategories: NavCategory[] = [
    {
      title: 'Organization',
      items: [
        {
          name: 'DET Entities',
          path: '/',
          icon: <Building2 size={20} />
        },
        {
          name: 'Overview',
          path: '/overview',
          icon: <LayoutDashboard size={20} />
        }
      ]
    },
    {
      title: 'Dashboards',
      items: [
        {
          name: 'Analytics Dashboard',
          path: '/analytics',
          icon: <BarChart3 size={20} />
        },
        {
          name: 'Tourism Dashboard',
          path: '/tourism',
          icon: <Plane size={20} />
        },
        {
          name: 'FDI Dashboard',
          path: '/fdi',
          icon: <TrendingUp size={20} />
        },
        {
          name: 'Hotel Performance',
          path: '/hotel-performance',
          icon: <Hotel size={20} />
        }
      ]
    },
    {
      title: 'System',
      items: [
        {
          name: 'Settings',
          path: '/settings',
          icon: <Settings size={20} />
        },
        {
          name: 'Admin Dashboard',
          path: '/admin',
          icon: <Settings size={20} />,
          adminOnly: true
        }
      ]
    }
  ];

  const filteredCategories = navCategories.map(category => ({
    ...category,
    items: category.items.filter(item => !item.adminOnly || hasPermission('canManageUsers'))
  })).filter(category => category.items.length > 0);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-20 left-4 z-50 p-2 bg-det-primary text-white rounded-lg shadow-lg"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: isCollapsed ? '80px' : '280px'
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`
          hidden lg:block sticky top-0 left-0 h-screen bg-white border-r border-gray-200 shadow-lg z-40
        `}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            {!isCollapsed && (
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-lg font-bold text-det-primary"
              >
                Navigation
              </motion.h2>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="flex p-2 hover:bg-gray-100 rounded-lg transition-colors ml-auto"
            >
              {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
            {filteredCategories.map((category, categoryIndex) => (
              <div key={category.title}>
                {!isCollapsed && (
                  <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-4"
                  >
                    {category.title}
                  </motion.h3>
                )}
                {isCollapsed && categoryIndex > 0 && (
                  <div className="border-t border-gray-200 mb-2" />
                )}
                <div className="space-y-1">
                  {category.items.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                        ${isActive(item.path)
                          ? 'bg-det-primary text-white shadow-md'
                          : 'text-gray-700 hover:bg-gray-100'
                        }
                        ${isCollapsed ? 'justify-center' : ''}
                      `}
                    >
                      {item.icon}
                      {!isCollapsed && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="font-medium"
                        >
                          {item.name}
                        </motion.span>
                      )}
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden fixed top-0 left-0 w-280 h-screen bg-white border-r border-gray-200 shadow-lg z-40"
          >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            {!isCollapsed && (
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-lg font-bold text-det-primary"
              >
                Navigation
              </motion.h2>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex p-2 hover:bg-gray-100 rounded-lg transition-colors ml-auto"
            >
              {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
            {filteredCategories.map((category) => (
              <div key={category.title}>
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-4"
                >
                  {category.title}
                </motion.h3>
                <div className="space-y-1">
                  {category.items.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileOpen(false)}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                        ${isActive(item.path)
                          ? 'bg-det-primary text-white shadow-md'
                          : 'text-gray-700 hover:bg-gray-100'
                        }
                      `}
                    >
                      <span className={isActive(item.path) ? 'text-white' : 'text-det-primary'}>
                        {item.icon}
                      </span>
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="font-medium"
                      >
                        {item.name}
                      </motion.span>
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-200">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xs text-gray-500 text-center"
            >
              <p className="font-medium">DET BI Dashboard</p>
              <p>Version 1.0.0</p>
            </motion.div>
          </div>
        </div>
      </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
