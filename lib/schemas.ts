import * as z from "zod";

export const formUserSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["MENTOR", "MENTEE", "BOTH"]),
});
