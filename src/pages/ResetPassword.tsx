import { Link, useSearchParams } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResetPasswordStore } from "../state/resetPassword";
import LoadingSpinner from "../ui/LoadingSpinner";
import {
  resetPasswordSchema,
  type ResetPasswordSchema,
} from "../schemas/resetpassword.schema";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { resetPassword, isLoading, success, errorStatus } =
    useResetPasswordStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit: SubmitHandler<ResetPasswordSchema> = (data) => {
    if (token) {
      resetPassword(token, data.password);
    }
  };

  return (
    <div className="w-full grow flex justify-center items-center p-4 bg-tropical-rain-forest-25">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-xl px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {!success ? (
            <>
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
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
              </div>

              <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 mb-2">
                Restablecer contraseña
              </h2>
              <p className="text-center text-sm text-gray-600 mb-8">
                Ingresa tu nueva contraseña a continuación.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Nueva contraseña
                  </label>
                  <div className="mt-2">
                    <input
                      disabled={isLoading}
                      id="password"
                      type="password"
                      placeholder="********"
                      {...register("password")}
                      className={
                        "block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-tropical-rain-forest-600 focus:border-transparent" +
                        (isLoading ? " opacity-50 cursor-not-allowed" : "")
                      }
                    />
                    {errors.password && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Confirmar contraseña
                  </label>
                  <div className="mt-2">
                    <input
                      disabled={isLoading}
                      id="confirmPassword"
                      type="password"
                      placeholder="********"
                      {...register("confirmPassword")}
                      className={
                        "block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-tropical-rain-forest-600 focus:border-transparent" +
                        (isLoading ? " opacity-50 cursor-not-allowed" : "")
                      }
                    />
                    {errors.confirmPassword && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>

                {errorStatus && (
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
                          {errorStatus === 400
                            ? "El enlace es inválido o ha expirado."
                            : "Ha ocurrido un error. Por favor intenta de nuevo."}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center rounded-md bg-tropical-rain-forest-800 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-tropical-rain-forest-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tropical-rain-forest-600 transition-colors cursor-pointer ${
                    isLoading ? "opacity-50 pointer-events-none" : ""
                  }`}
                >
                  Restablecer contraseña
                </button>
              </form>

              <p className="mt-8 text-center text-sm text-gray-500">
                <Link
                  to="/login"
                  className={`font-semibold text-tropical-rain-forest-800 hover:text-tropical-rain-forest-700 ${
                    isLoading ? "opacity-50 pointer-events-none" : ""
                  }`}
                >
                  <span className="mr-2" aria-hidden="true">
                    &larr;
                  </span>
                  Volver al inicio de sesión
                </Link>
              </p>
            </>
          ) : (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                <svg
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-2">
                ¡Contraseña actualizada!
              </h2>
              <p className="text-sm text-gray-600 mb-8">
                Tu contraseña ha sido restablecida exitosamente. Ahora puedes
                iniciar sesión con tus nuevas credenciales.
              </p>
              <Link
                to="/login"
                className="w-full flex justify-center rounded-md bg-tropical-rain-forest-800 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-tropical-rain-forest-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tropical-rain-forest-600 transition-colors"
              >
                Ir al inicio de sesión
              </Link>
            </div>
          )}
          {isLoading && <LoadingSpinner />}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
