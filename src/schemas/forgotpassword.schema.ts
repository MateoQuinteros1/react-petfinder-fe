import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.email("Ingresa un correo electrónico válido"),
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
