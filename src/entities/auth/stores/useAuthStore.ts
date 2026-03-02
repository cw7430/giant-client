import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { AuthStateData, AuthState } from '@/entities/auth/schema';

const initialState = {
  accessTokenExpiresAtMs: null,
  employeeCode: null,
  employeeName: null,
  accountRole: null,
  employeeRole: null,
  department: null,
  team: null,
  position: null,
};

const validateAuthIntegrity = (state: AuthStateData): boolean => {
  const {
    accessTokenExpiresAtMs,
    employeeCode,
    employeeName,
    accountRole,
    employeeRole,
    department,
    team,
    position,
  } = state;

  return !!(
    employeeCode &&
    employeeName &&
    accountRole &&
    employeeRole &&
    department &&
    team &&
    position &&
    accessTokenExpiresAtMs &&
    Date.now() + 30 * 1000 < accessTokenExpiresAtMs
  );
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      ...initialState,

      hasHydrated: false,

      setHasHydrated: (v: boolean) => set({ hasHydrated: v }),

      signIn: (
        accessTokenExpiresAtMs: number,
        employeeCode: string,
        employeeName: string,
        accountRole: string,
        employeeRole: string,
        department: string,
        team: string,
        position: string,
      ) =>
        set({
          accessTokenExpiresAtMs,
          employeeCode,
          employeeName,
          accountRole,
          employeeRole,
          department,
          team,
          position,
        }),

      checkAuth: () => validateAuthIntegrity(get()),

      signOut: () => set(initialState),
    }),
    {
      name: 'auth-storage',

      partialize: (state) => ({
        accessTokenExpiresAtMs: state.accessTokenExpiresAtMs,
        employeeCode: state.employeeCode,
        employeeName: state.employeeName,
        accountRole: state.accountRole,
        employeeRole: state.employeeRole,
        department: state.department,
        team: state.team,
        position: state.position,
      }),

      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
