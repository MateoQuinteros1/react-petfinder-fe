import z from "zod";

export const contactSchema = z.object({
  name: z.string().min(3, "El nombre debe contener al menos 3 caracteres"),
  phone_number: z
    .string()
    .min(8, "Ingresá un número de teléfono válido")
    .max(20, "El número es demasiado largo")
    .regex(
      /^[0-9+\-\s()]+$/,
      "El teléfono solo puede contener números y caracteres válidos",
    ),
  message: z
    .string()
    .min(1, "El mensaje es obligatorio")
    .max(500, "El mensaje es muy largo"),
});

export type ContactSchema = z.infer<typeof contactSchema>;
