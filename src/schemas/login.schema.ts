import z from "zod";

export const loginSchema = z.object({
  email: z.email("El correo no es válido").min(1, "El correo es requerido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
