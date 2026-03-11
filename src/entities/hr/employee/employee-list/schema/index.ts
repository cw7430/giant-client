import { z } from 'zod';

import { pageRequestSchema, pageResponseSchema } from '@/shared/apis/schema';
import { employeeProfileResponseSchema } from '@/entities/hr/employee/shared/schema';

export const employeeProfilesRequestSchema = pageRequestSchema([
  'employee',
  'position',
  'department',
] as const);

export const employeeProfilesResponseSchema = pageResponseSchema(
  employeeProfileResponseSchema,
);

export type EmployeeProfilesRequestDto = z.infer<
  typeof employeeProfilesRequestSchema
>;

export type EmployeeProfilesResponseDto = z.infer<
  typeof employeeProfilesResponseSchema
>;
