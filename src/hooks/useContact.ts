import { useState } from "react";
import { type ContactSchema } from "../schemas/contact.schema";

export function useContact() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleContact = async (data: ContactSchema, petId: string) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/reports`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            reporter_phone_number: data.phone_number,
            description: data.message,
            pet_id: petId,
          }),
        },
      );
      if (!response.ok) {
        setError("Ha ocurrido un error. Por favor, intente nuevamente");
        return;
      }
      setSuccess(true);
    } catch (error) {
      setError("Ha ocurrido un error. Por favor, intente nuevamente");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleContact,
    error,
    success,
  };
}
