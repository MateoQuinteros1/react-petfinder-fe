import z from "zod";

export const reportPetSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(20, "El nombre es muy largo"),
  type: z.enum(["dog", "cat"], {
    message: "Selecciona un tipo de mascota",
  }),
});

export type ReportPetFormValues = z.infer<typeof reportPetSchema>;
