import { Modal } from "./Modal";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactSchema } from "../schemas/contact.schema";
import { useUserStore } from "../state/userStore";
import { useContact } from "../hooks/useContact";
import { Loader2, Send, Sparkles, CheckCircle2, HeartIcon } from "lucide-react";
import Error from "../ui/Error";

type ContactFormProps = {
  onClose: () => void;
  petName: string;
  petId: string;
};

const ContactForm = ({ onClose, petName, petId }: ContactFormProps) => {
  const { userData } = useUserStore();
  const { handleContact, isLoading, error, success } = useContact();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: userData?.name,
      phone_number: "",
      message: "",
    },
  });

  const handleContactSubmit: SubmitHandler<ContactSchema> = (data) => {
    handleContact(data, petId);
  };

  if (success) {
    return (
      <Modal onClose={onClose}>
        <div className="flex flex-col items-center gap-5">
          <div className="flex flex-col">
            <Sparkles className="size-5 text-tropical-rain-forest-800 self-end animate-pulse" />
            <CheckCircle2 className="size-20 text-tropical-rain-forest-800" />
            <Sparkles className="size-5 text-tropical-rain-forest-800 animate-pulse" />
          </div>
          <h1 className="text-center text-2xl font-bold">Mensaje enviado</h1>
          <p className="text-center text-base text-gray-600">
            Tu información ha sido enviada al dueño de{" "}
            <span className="font-bold text-tropical-rain-forest-800">
              {petName}.
            </span>{" "}
            Se pondrá en contacto contigo pronto.
          </p>
          <div className="flex flex-col w-full bg-tropical-rain-forest-800/10 border border-tropical-rain-forest-800/20 rounded-xl py-3 px-4">
            <div className="flex items-center justify-center gap-2">
              <HeartIcon className="text-tropical-rain-forest-800 size-7 fill-tropical-rain-forest-800" />
              <p className="font-semibold text-center">Gracias por ayudar</p>
            </div>
            <p className="text-sm text-gray-600 text-center">
              Juntos hacemos posible que más mascotas vuelvan con sus familias.
            </p>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-3xl font-bold text-center text-gray-800">
            Contactar al dueño
          </h1>
          <p className="text-gray-600 text-center text-base">
            Le enviaremos un correo electrónico al dueño con la información
            ingresada.
          </p>
        </div>
        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit(handleContactSubmit)}
        >
          <div className="flex flex-col gap-1">
            <label className="text-gray-600">Nombre</label>
            <input
              className="border border-gray-300 rounded-lg pl-2 h-9 bg-gray-100 opacity-50 cursor-not-allowed"
              type="text"
              {...register("name")}
              disabled={true}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label>Teléfono</label>
            <input
              type="tel"
              inputMode="numeric"
              placeholder="Ej: +54 11 1234-5678"
              className="border border-gray-300 rounded-lg pl-2 h-9"
              {...register("phone_number")}
            />
            {errors.phone_number && (
              <p className="text-red-500 text-sm">
                {errors.phone_number.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label>Mensaje (Información adicional)</label>
            <textarea
              className="border border-gray-300 rounded-lg p-2 h-30"
              placeholder="Ej: La vi hoy cerca de Av. Corrientes y Callao, alrededor de las 18 hs. Llamame y coordinamos."
              {...register("message")}
            />
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message.message}</p>
            )}
          </div>
          {error && <Error>{error}</Error>}
          <button
            disabled={isLoading}
            className={`bg-tropical-rain-forest-900 text-white rounded-lg p-2 h-10 ${isLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-tropical-rain-forest-800 transition-colors"}`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin" /> Enviando...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <Send className="size-5" /> Enviar
              </div>
            )}
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default ContactForm;
