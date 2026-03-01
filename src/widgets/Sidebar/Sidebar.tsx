import { Building2 } from 'lucide-react';

import SidebarNavigation from './SidebarNavigation';

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary">
            <Building2 className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-sidebar-foreground">Giant</h1>
            <p className="text-xs text-sidebar-foreground/60">
              사내관리 시스템
            </p>
          </div>
        </div>

        <SidebarNavigation />
      </div>
    </aside>
  );
}
