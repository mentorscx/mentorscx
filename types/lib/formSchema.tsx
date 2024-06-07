'use client';
import * as z from 'zod';

export const profileFormSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  firstname: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  lastname: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),

  email: z.string().email({
    message: 'Please enter a valid email.',
  }),
  role: z.string().min(2, {
    message: 'Role must be at least 2 characters.',
  }),
  bio: z.string().min(10, {
    message: 'Bio must be at least 10 characters.',
  }),
  timezone: z.object({
    label: z.string(),
    value: z.string(),
  }),
  languages: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  ),
  expertise: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  ),
  toolkit: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  ),
  twitterUrl: z.string().url({
    message: 'Please enter a valid url.',
  }),
  linkedinUrl: z.string().url({
    message: 'Please enter a valid url.',
  }),
});
