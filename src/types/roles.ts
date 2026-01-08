export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  CLIENT = 'client',
  USER = 'user'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface RolePermissions {
  canView: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canManageUsers: boolean;
  canExportData: boolean;
  canAccessAllDashboards: boolean;
}

export const rolePermissions: Record<UserRole, RolePermissions> = {
  [UserRole.SUPER_ADMIN]: {
    canView: true,
    canEdit: true,
    canDelete: true,
    canManageUsers: true,
    canExportData: true,
    canAccessAllDashboards: true
  },
  [UserRole.ADMIN]: {
    canView: true,
    canEdit: true,
    canDelete: true,
    canManageUsers: true,
    canExportData: true,
    canAccessAllDashboards: true
  },
  [UserRole.CLIENT]: {
    canView: true,
    canEdit: false,
    canDelete: false,
    canManageUsers: false,
    canExportData: true,
    canAccessAllDashboards: true
  },
  [UserRole.USER]: {
    canView: true,
    canEdit: false,
    canDelete: false,
    canManageUsers: false,
    canExportData: false,
    canAccessAllDashboards: false
  }
};

export const getRolePermissions = (role: UserRole): RolePermissions => {
  return rolePermissions[role];
};

export const hasPermission = (role: UserRole, permission: keyof RolePermissions): boolean => {
  return rolePermissions[role][permission];
};
