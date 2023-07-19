import { z } from "zod";

export const SigninSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});

export type SigninType = z.infer<typeof SigninSchema>;
