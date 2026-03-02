'use client';

import { useAuthStore } from '@/entities/auth/stores/useAuthStore';

export default function SidebarUserProfile() {
  const { employeeRole, employeeName } = useAuthStore.getState();

  const getRoleBadge = () => {
    switch (employeeRole) {
      case 'DEPARTMENT_CHIEF':
        return (
          <span className="erp-badge bg-destructive/20 text-destructive">
            부장
          </span>
        );
      case 'TEAM_CHIEF':
        return (
          <span className="erp-badge bg-primary/20 text-primary">팀장</span>
        );
      default:
        return (
          <span className="erp-badge bg-muted text-muted-foreground">팀원</span>
        );
    }
  };

  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="h-10 w-10 rounded-full bg-sidebar-accent flex items-center justify-center">
        <span className="text-sm font-medium text-sidebar-foreground">
          {employeeName?.charAt(0) || 'U'}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-sidebar-foreground truncate">
          {employeeName ?? '사용자'}
        </p>
        <div className="flex items-center gap-2">{getRoleBadge()}</div>
      </div>
    </div>
  );
}
