import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole, getRolePermissions, RolePermissions } from '../types/roles';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  permissions: RolePermissions | null;
  login: (user: User) => void;
  logout: () => void;
  hasPermission: (permission: keyof RolePermissions) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('detAuthToken') === 'authenticated';
  });

  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('detUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [permissions, setPermissions] = useState<RolePermissions | null>(() => {
    const storedUser = localStorage.getItem('detUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      return getRolePermissions(parsedUser.role);
    }
    return null;
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem('detAuthToken', 'authenticated');
      localStorage.setItem('detUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('detAuthToken');
      localStorage.removeItem('detUser');
    }
  }, [isAuthenticated, user]);

  const login = (userData: User) => {
    setIsAuthenticated(true);
    setUser(userData);
    setPermissions(getRolePermissions(userData.role));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setPermissions(null);
  };

  const hasPermission = (permission: keyof RolePermissions): boolean => {
    return permissions ? permissions[permission] : false;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, permissions, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
