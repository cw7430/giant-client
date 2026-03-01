'use client';

import { usePathname } from 'next/navigation';

const pageTitles: Record<string, string> = {
  '/': '대시보드',
  '/hr/employees': '직원 관리',
  '/hr/attendance': '근태 관리',
  '/hr/payroll': '급여 관리',
  '/inventory/products': '제품 관리',
  '/inventory/stock': '재고 현황',
  '/inventory/movements': '입출고 관리',
  '/sales/records': '매출 기록',
  '/sales/payments': '결제 내역',
  '/settings': '설정',
};

export default function HeaderTitle() {
  const pathname = usePathname();

  const pageTitle = pageTitles[pathname] || 'Giant';

  return (
    <div>
      <h1 className="text-xl font-semibold text-foreground">{pageTitle}</h1>
      <p className="text-sm text-muted-foreground">
        {new Date().toLocaleDateString(navigator.language, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          weekday: 'long',
        })}
      </p>
    </div>
  );
}
