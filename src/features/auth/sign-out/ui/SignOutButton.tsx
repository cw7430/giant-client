'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

import { useAuthStore } from '@/entities/auth/stores/useAuthStore';
import { Button } from '@/shared/ui/button';
import { signOutAction } from '@/features/auth/sign-out/actions';

export default function SignOutButton() {
  const router = useRouter();

  const [isLoading, setLoading] = useState<boolean>(false);

  const { signOut } = useAuthStore();

  const onClick = async () => {
    setLoading(true);
    try {
      await signOutAction();
    } finally {
      signOut();
      router.replace('/sign-in');
    }
  };

  return (
    <Button
      variant="ghost"
      className="w-full justify-start text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
      onClick={onClick}
      disabled={isLoading}
    >
      <LogOut className="h-4 w-4 mr-2" />
      로그아웃
    </Button>
  );
}
