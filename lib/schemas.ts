import { Role } from '@prisma/client';
import * as z from 'zod';

export const formUserSchema = z.object({
  email: z.string().email(),
  role: z.enum([Role.MENTEE, Role.MENTOR, Role.BOTH]),
});
