'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ChevronDown,
  LayoutDashboard,
  Package,
  TrendingUp,
  Users,
} from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/shared/ui/collapsible';

interface NavItem {
  title: string;
  href?: string;
  icon: React.ReactNode;
  children?: { title: string; href: string }[];
  category?: 'hr' | 'inventory' | 'sales';
}

const navItems: NavItem[] = [
  {
    title: '대시보드',
    href: '/',
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: '인사 관리',
    icon: <Users className="h-5 w-5" />,
    category: 'hr',
    children: [
      { title: '직원 관리', href: '/hr/employees' },
      { title: '근태 관리', href: '/hr/attendance' },
      { title: '급여 관리', href: '/hr/payroll' },
    ],
  },
  {
    title: '재고 관리',
    icon: <Package className="h-5 w-5" />,
    category: 'inventory',
    children: [
      { title: '제품', href: '/inventory/products' },
      { title: '재고', href: '/inventory/stock' },
      { title: '입출고', href: '/inventory/movements' },
    ],
  },
  {
    title: '매출 관리',
    icon: <TrendingUp className="h-5 w-5" />,
    category: 'sales',
    children: [
      { title: '매출 기록', href: '/sales/records' },
      { title: '결제 내역', href: '/sales/payments' },
    ],
  },
];

export default function SidebarNavigation() {
  const [openMenus, setOpenMenus] = useState<string[]>([
    '인사 관리',
    '재고 관리',
    '매출 관리',
  ]);

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title],
    );
  };

  const getCategoryColor = (category?: 'hr' | 'inventory' | 'sales') => {
    switch (category) {
      case 'hr':
        return 'bg-success/20 text-success';
      case 'inventory':
        return 'bg-info/20 text-info';
      case 'sales':
        return 'bg-warning/20 text-warning';
      default:
        return '';
    }
  };

  return (
    <nav className="flex-1 overflow-y-auto px-3 py-4">
      <ul className="space-y-1">
        {navItems.map((item) => (
          <li key={item.title}>
            {item.children ? (
              <Collapsible
                open={openMenus.includes(item.title)}
                onOpenChange={() => toggleMenu(item.title)}
              >
                <CollapsibleTrigger asChild>
                  <button
                    className={cn(
                      'erp-nav-item w-full justify-between',
                      item.category && getCategoryColor(item.category),
                    )}
                  >
                    <span className="flex items-center gap-3">
                      {item.icon}
                      {item.title}
                    </span>
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 transition-transform',
                        openMenus.includes(item.title) && 'rotate-180',
                      )}
                    />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-1 ml-4 space-y-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={cn(
                        'erp-nav-item pl-6',
                        location.pathname === child.href &&
                          'erp-nav-item-active',
                      )}
                    >
                      {child.title}
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <Link
                href={item.href!}
                className={cn(
                  'erp-nav-item',
                  location.pathname === item.href && 'erp-nav-item-active',
                )}
              >
                {item.icon}
                {item.title}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
