import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const zNumberToString = z
  .number()
  .transform((val: number) => val.toString());

export const zStringToNumber = z
  .string()
  .transform((val: string) => Number(val));

export const zBigIntToString = z
  .bigint()
  .transform((val: bigint) => val.toString());

export const zStringToBigInt = z
  .string()
  .transform((val: string) => BigInt(val));
