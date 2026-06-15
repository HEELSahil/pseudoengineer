import { z } from 'zod';

/**
 * Canonical email normalization. Apply at EVERY trust boundary that reads or
 * writes a user email (registration, sign-in lookup, OAuth verify, API routes)
 * so the same address always maps to the same row regardless of how the user
 * typed it (casing / surrounding whitespace).
 */
export const normalizeEmail = (email: string) => email.trim().toLowerCase();

/**
 * Zod field that normalizes before validating, so client-submitted email
 * matches what the server stores/looks up.
 */
export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .email('Please enter a valid email address');

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(
    /[^A-Za-z0-9]/,
    'Password must contain at least one special character',
  );
