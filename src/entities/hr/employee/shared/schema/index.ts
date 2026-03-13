import { z } from 'zod';

export const employeeProfileResponseSchema = z.object({
  employeeId: z.string(),
  employeeCode: z.string(),
  employeeRole: z.string(),
  employeeName: z.string(),
  positionCode: z.string(),
  positionName: z.string(),
  departmentCode: z.string(),
  departmentName: z.string(),
  teamCode: z.string(),
  teamName: z.string(),
  phoneNumber: z.string(),
  email: z.string(),
  createdBy: z.string().nullable(),
  createdEmployeeName: z.string().nullable(),
  updatedBy: z.string().nullable(),
  updatedEmployeeName: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  leftAt: z.date().nullable(),
});

export type EmployeeProfileResponseDto = z.infer<
  typeof employeeProfileResponseSchema
>;
