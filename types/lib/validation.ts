import { z } from "zod";

const requiredString = z.string().min(1, "Required");
const numericRequiredString = requiredString.regex(/^\d+$/, "Must be a number");

export const Onboarding06Schema = z.object({
  duration: z.enum(["15", "30", "60"], {
    required_error: "You need to select a notification type.",
  }),
  price: numericRequiredString.max(9, "Number can't be longer than 9 digits"),
});
