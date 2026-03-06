import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

import { Sidebar } from '@/widgets/Sidebar';
import { Header } from '@/widgets/Header';
import { AuthInitializer } from '@/features/auth/refresh/ui';

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;
  if (!refreshToken) {
    redirect('/sign-in');
  }

  return (
    <>
      <AuthInitializer />
      <div className="min-h-screen bg-background">
        <Sidebar />
        <div className="pl-64">
          <Header />
          <section className="p-6">{children}</section>
        </div>
      </div>
    </>
  );
}
