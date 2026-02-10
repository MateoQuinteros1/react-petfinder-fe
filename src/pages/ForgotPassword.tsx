import { Link } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResetPasswordStore } from "../state/forgotPassword";
import LoadingSpinner from "../ui/LoadingSpinner";
import { forgotPasswordSchema } from "../schemas/forgotpassword.schema";
import { type ForgotPasswordSchema } from "../schemas/forgotpassword.schema";

const ForgotPassword = () => {
  const { sendResetPasswordEmail, isLoading, success, error } =
    useResetPasswordStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit: SubmitHandler<ForgotPasswordSchema> = (data) => {
    sendResetPasswordEmail(data.email);
  };

  return (
    <div className="w-full grow flex justify-center items-center p-4 bg-tropical-rain-forest-25">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-xl px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-tropical-rain-forest-100 mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 text-tropical-rain-forest-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
              />
            </svg>
          </div>

          <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 mb-2">
            ¿Olvidaste tu contraseña?
          </h2>
          <p className="text-center text-sm text-gray-600 mb-8">
            Ingresa tu correo electrónico y te enviaremos un enlace para
            restablecerla.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900"
              >
                Correo electrónico
              </label>
              <div className="mt-2">
                <input
                  disabled={isLoading}
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="tu@correo.com"
                  className={
                    "block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-tropical-rain-forest-600 focus:border-transparent" +
                    (isLoading && "opacity-50 cursor-not-allowed")
                  }
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {success && (
              <div className="rounded-md bg-green-50 p-4">
                <div className="flex">
                  <div className="shrink-0">
                    <svg
                      className="h-5 w-5 text-green-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-green-800">
                      Si existe una cuenta asociada a este correo, te enviamos
                      un email con el enlace para restablecer tu contraseña.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="shrink-0">
                    <svg
                      className="h-5 w-5 text-red-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-red-800">
                      Ha ocurrido un error. Por favor intenta de nuevo.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              className={`w-full flex justify-center rounded-md bg-tropical-rain-forest-800 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-tropical-rain-forest-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tropical-rain-forest-600 transition-colors cursor-pointer ${isLoading && "opacity-50 pointer-events-none"}`}
            >
              Enviar enlace
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            <Link
              to="/login"
              className={`font-semibold text-tropical-rain-forest-800 hover:text-tropical-rain-forest-700 ${isLoading && "opacity-50 pointer-events-none"}`}
            >
              <span className="mr-2" aria-hidden="true">
                &larr;
              </span>
              Volver al inicio de sesión
            </Link>
          </p>
          {isLoading && <LoadingSpinner />}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
