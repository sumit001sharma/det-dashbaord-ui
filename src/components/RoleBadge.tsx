import { Shield, Crown, Briefcase, User } from 'lucide-react';
import { UserRole } from '../types/roles';

interface RoleBadgeProps {
  role: UserRole;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export default function RoleBadge({ role, size = 'md', showIcon = true }: RoleBadgeProps) {
  const roleConfig = {
    [UserRole.SUPER_ADMIN]: {
      label: 'Super Admin',
      icon: Crown,
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-800',
      borderColor: 'border-purple-300',
      iconColor: 'text-purple-600'
    },
    [UserRole.ADMIN]: {
      label: 'Admin',
      icon: Shield,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-800',
      borderColor: 'border-blue-300',
      iconColor: 'text-blue-600'
    },
    [UserRole.CLIENT]: {
      label: 'Client',
      icon: Briefcase,
      bgColor: 'bg-green-100',
      textColor: 'text-green-800',
      borderColor: 'border-green-300',
      iconColor: 'text-green-600'
    },
    [UserRole.USER]: {
      label: 'User',
      icon: User,
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-800',
      borderColor: 'border-gray-300',
      iconColor: 'text-gray-600'
    }
  };

  const config = roleConfig[role];
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16
  };

  return (
    <div
      className={`
        inline-flex items-center gap-1.5 rounded-full border
        ${config.bgColor} ${config.textColor} ${config.borderColor}
        ${sizeClasses[size]} font-medium
      `}
    >
      {showIcon && <Icon size={iconSizes[size]} className={config.iconColor} />}
      <span>{config.label}</span>
    </div>
  );
}
