import { z } from "zod";

export const SignupSchema = z.object({
  name: z.string().min(3),
  imageUrl: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(3),
});

export type SignupType = z.infer<typeof SignupSchema>;
