import { z } from 'zod';

import { signInAndRefreshResponseSchemaForClient, type SignInAndRefreshResponseDtoForClient } from '@/features/auth/shared/schema';

export const authStateDataSchema = signInAndRefreshResponseSchemaForClient
  .partial()
  .extend({
    accessTokenExpiresAtMs: z.number().nullable(),
    employeeCode: z.string().nullable(),
    employeeName: z.string().nullable(),
    accountRole: z.string().nullable(),
    employeeRole: z.string().nullable(),
    department: z.string().nullable(),
    team: z.string().nullable(),
    position: z.string().nullable(),
  });

export type AuthStateData = z.infer<typeof authStateDataSchema>;

export type AuthState = AuthStateData & {
  hasHydrated: boolean;

  setHasHydrated: (v: boolean) => void;

  signIn: (
   data: SignInAndRefreshResponseDtoForClient
  ) => void;

  checkAuth: () => boolean;

  signOut: () => void;
};
