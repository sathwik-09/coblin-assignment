import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    email: z.string().email({ message: "Invalid email format" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/, {
        message:
          "Password must include uppercase, lowercase, number, and special character",
      }),
    name: z.string().min(2, { message: "Name must be at least 3 characters" }),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
});
