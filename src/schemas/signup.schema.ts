import z from "zod";

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(3, "El nombre debe contener al menos 3 caracteres")
      .max(25, "El nombre es muy largo"),
    email: z.email("El correo no es válido").min(1, "El correo es requerido"),
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .max(32, "La contraseña es muy larga"),
    confirmPassword: z
      .string()
      .min(1, "La confirmación de la contraseña es requerida"),
    birth_date: z
      .string()
      .min(1, "La fecha de nacimiento es requerida")
      .refine(
        (date) => {
          const birthDate = new Date(date);
          const today = new Date();

          // Validar que la fecha no sea en el futuro
          return birthDate <= today;
        },
        {
          message: "Fecha inválida",
        },
      )
      .refine(
        (date) => {
          const birthDate = new Date(date);
          const today = new Date();
          const age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();
          const dayDiff = today.getDate() - birthDate.getDate();

          // Ajustar la edad si aún no ha cumplido años este año
          const actualAge =
            monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;
          return actualAge >= 18;
        },
        {
          message: "Debes tener al menos 18 años para registrarte",
        },
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type SignupSchema = z.infer<typeof signupSchema>;
