import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

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
    <div className="min-h-screen bg-background">
      <div className="pl-64">
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
