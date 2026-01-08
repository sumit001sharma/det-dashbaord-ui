import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings as SettingsIcon, 
  Sun, 
  Moon, 
  Monitor, 
  Type, 
  Users, 
  Shield,
  Bell,
  Globe,
  Save,
  UserPlus,
  Edit,
  Trash2,
  Search
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types/roles';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'inactive';
  lastLogin: string;
}

export default function Settings() {
  const { theme, fontSize, setTheme, setFontSize } = useTheme();
  const { user, hasPermission } = useAuth();
  const [activeTab, setActiveTab] = useState<'appearance' | 'users' | 'notifications'>('appearance');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddUser, setShowAddUser] = useState(false);
  
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'John Doe', email: 'john.doe@dubaidet.gov.ae', role: UserRole.SUPER_ADMIN, status: 'active', lastLogin: '2025-01-07' },
    { id: '2', name: 'Jane Smith', email: 'jane.smith@dubaidet.gov.ae', role: UserRole.ADMIN, status: 'active', lastLogin: '2025-01-06' },
    { id: '3', name: 'Ahmed Hassan', email: 'ahmed.hassan@dubaidet.gov.ae', role: UserRole.CLIENT, status: 'active', lastLogin: '2025-01-05' },
    { id: '4', name: 'Sarah Johnson', email: 'sarah.johnson@dubaidet.gov.ae', role: UserRole.USER, status: 'inactive', lastLogin: '2024-12-20' }
  ]);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: UserRole.USER
  });

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      const user: User = {
        id: Date.now().toString(),
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        status: 'active',
        lastLogin: 'Never'
      };
      setUsers([...users, user]);
      setNewUser({ name: '', email: '', role: UserRole.USER });
      setShowAddUser(false);
    }
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== userId));
    }
  };

  const handleToggleStatus = (userId: string) => {
    setUsers(users.map(u => 
      u.id === userId 
        ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } 
        : u
    ));
  };

  const tabs = [
    { id: 'appearance', label: 'Appearance', icon: Sun },
    ...(hasPermission('canManageUsers') ? [{ id: 'users', label: 'User Management', icon: Users }] : []),
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <SettingsIcon size={32} className="text-det-primary" />
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-det-primary">Settings</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Customize your dashboard experience and manage system preferences
          </p>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-det-primary border-b-2 border-det-primary bg-det-primary/5'
                  : 'text-gray-600 hover:text-det-primary hover:bg-gray-50'
              }`}
            >
              <tab.icon size={20} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Appearance Tab */}
          {activeTab === 'appearance' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Theme Selection */}
              <div>
                <h3 className="text-lg font-bold text-det-primary mb-4 flex items-center gap-2">
                  <Sun size={20} />
                  Theme Mode
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { value: 'light', label: 'Light', icon: Sun, desc: 'Bright and clear' },
                    { value: 'dark', label: 'Dark', icon: Moon, desc: 'Easy on the eyes' },
                    { value: 'auto', label: 'Auto', icon: Monitor, desc: 'Follow system' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setTheme(option.value as any)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        theme === option.value
                          ? 'border-det-primary bg-det-primary/5 shadow-md'
                          : 'border-gray-200 hover:border-det-primary/50'
                      }`}
                    >
                      <option.icon size={24} className={theme === option.value ? 'text-det-primary' : 'text-gray-400'} />
                      <p className="font-semibold text-gray-800 mt-2">{option.label}</p>
                      <p className="text-xs text-gray-500 mt-1">{option.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Size Selection */}
              <div>
                <h3 className="text-lg font-bold text-det-primary mb-4 flex items-center gap-2">
                  <Type size={20} />
                  Font Size
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { value: 'small', label: 'Small', size: 'text-sm', desc: 'Compact view' },
                    { value: 'medium', label: 'Medium', size: 'text-base', desc: 'Default size' },
                    { value: 'large', label: 'Large', size: 'text-lg', desc: 'Better readability' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setFontSize(option.value as any)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        fontSize === option.value
                          ? 'border-det-primary bg-det-primary/5 shadow-md'
                          : 'border-gray-200 hover:border-det-primary/50'
                      }`}
                    >
                      <Type size={24} className={fontSize === option.value ? 'text-det-primary' : 'text-gray-400'} />
                      <p className={`font-semibold text-gray-800 mt-2 ${option.size}`}>{option.label}</p>
                      <p className="text-xs text-gray-500 mt-1">{option.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Language Selection */}
              <div>
                <h3 className="text-lg font-bold text-det-primary mb-4 flex items-center gap-2">
                  <Globe size={20} />
                  Language
                </h3>
                <select className="w-full sm:w-64 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-det-primary">
                  <option value="en">English</option>
                  <option value="ar">العربية (Arabic)</option>
                </select>
              </div>

              <button className="flex items-center gap-2 px-6 py-3 bg-det-primary text-white rounded-lg hover:bg-primary-800 transition-colors font-medium">
                <Save size={20} />
                Save Preferences
              </button>
            </motion.div>
          )}

          {/* User Management Tab */}
          {activeTab === 'users' && hasPermission('canManageUsers') && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h3 className="text-lg font-bold text-det-primary flex items-center gap-2">
                  <Users size={20} />
                  User Management
                </h3>
                <button
                  onClick={() => setShowAddUser(!showAddUser)}
                  className="flex items-center gap-2 px-4 py-2 bg-det-primary text-white rounded-lg hover:bg-primary-800 transition-colors text-sm font-medium"
                >
                  <UserPlus size={18} />
                  Add New User
                </button>
              </div>

              {/* Add User Form */}
              {showAddUser && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-gray-50 rounded-lg p-4 space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-det-primary"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-det-primary"
                    />
                  </div>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value as UserRole })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-det-primary"
                  >
                    <option value={UserRole.USER}>User</option>
                    <option value={UserRole.CLIENT}>Client</option>
                    <option value={UserRole.ADMIN}>Admin</option>
                  </select>
                  <div className="flex gap-2">
                    <button
                      onClick={handleAddUser}
                      className="px-4 py-2 bg-det-primary text-white rounded-lg hover:bg-primary-800 transition-colors text-sm font-medium"
                    >
                      Add User
                    </button>
                    <button
                      onClick={() => setShowAddUser(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-det-primary"
                />
              </div>

              {/* Users Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">User</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Role</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Last Login</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <div>
                            <p className="font-medium text-gray-800">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            (user.role === UserRole.SUPER_ADMIN || user.role === UserRole.ADMIN) ? 'bg-blue-100 text-blue-800' :
                            user.role === UserRole.CLIENT ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {(user.role === UserRole.SUPER_ADMIN || user.role === UserRole.ADMIN) ? 'Admin' : user.role}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <button
                            onClick={() => handleToggleStatus(user.id)}
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              user.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {user.status}
                          </button>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-600">{user.lastLogin}</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-bold text-det-primary flex items-center gap-2">
                <Bell size={20} />
                Notification Preferences
              </h3>
              
              <div className="space-y-4">
                {[
                  { id: 'email', label: 'Email Notifications', desc: 'Receive updates via email' },
                  { id: 'reports', label: 'Weekly Reports', desc: 'Get weekly performance summaries' },
                  { id: 'alerts', label: 'System Alerts', desc: 'Important system notifications' },
                  { id: 'updates', label: 'Feature Updates', desc: 'New features and improvements' }
                ].map((option) => (
                  <div key={option.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">{option.label}</p>
                      <p className="text-sm text-gray-500">{option.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-det-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-det-primary"></div>
                    </label>
                  </div>
                ))}
              </div>

              <button className="flex items-center gap-2 px-6 py-3 bg-det-primary text-white rounded-lg hover:bg-primary-800 transition-colors font-medium">
                <Save size={20} />
                Save Notification Settings
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
