import { Link } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupSchema } from "../schemas/signup.schema";
import { useAuthStore } from "../state/authStore";
import LoadingSpinner from "../ui/LoadingSpinner";
import Error from "../ui/Error";
import { useUploadPhotos } from "../hooks/useUploadPhotos";

const Signup = () => {
  const { signup, isAuthLoading, successRegister, errorStatus, errorMessage } =
    useAuthStore();

  const {
    profilePhoto,
    previewUrl,
    photoError,
    handlePhotoChange,
    handleRemovePhoto,
    fileInputRef,
  } = useUploadPhotos();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
  });

  const handleSignUp: SubmitHandler<SignupSchema> = (data) => {
    signup(data, profilePhoto!);
  };

  if (successRegister) {
    return (
      <div className="min-h-screen flex justify-center items-center p-4 bg-tropical-rain-forest-25">
        <div className="w-full max-w-lg bg-white rounded-lg shadow-xl px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
              <svg
                className="h-10 w-10 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-2">
              ¡Cuenta creada exitosamente!
            </h2>
            <p className="text-sm text-gray-600 mb-8">
              Tu registro se ha completado correctamente. Ya puedes acceder a la
              plataforma.
            </p>

            <Link
              to="/login"
              className="w-full block rounded-md bg-tropical-rain-forest-800 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-tropical-rain-forest-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tropical-rain-forest-600 transition duration-200"
            >
              Iniciar sesión
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center p-4 bg-tropical-rain-forest-25">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-8">
          <img src="/huella.svg" className="mx-auto h-10 w-auto" alt="Logo" />
          <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
            Registro
          </h2>
        </div>

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleSubmit(handleSignUp)}
        >
          {/* Nombre */}
          <div>
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-gray-900"
            >
              Nombre completo
            </label>
            <div className="mt-2">
              <input
                disabled={isAuthLoading}
                id="nombre"
                type="text"
                {...register("name")}
                placeholder="Tu nombre completo"
                className={`block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-tropical-rain-forest-600 focus:border-transparent ${isAuthLoading && "pointer-events-none opacity-50"}`}
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
              {errorStatus === 409 && errorMessage === "DUPLICATED_NAME" && (
                <p className="mt-2 text-sm text-red-600">
                  El nombre ya está en uso
                </p>
              )}
            </div>
          </div>

          {/* Correo */}
          <div>
            <label
              htmlFor="correo"
              className="block text-sm font-medium text-gray-900"
            >
              Correo electrónico
            </label>
            <div className="mt-2">
              <input
                disabled={isAuthLoading}
                id="correo"
                {...register("email")}
                placeholder="tu@correo.com"
                className={`block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-tropical-rain-forest-600 focus:border-transparent ${isAuthLoading && "pointer-events-none opacity-50"}`}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
              {errorStatus === 409 &&
                errorMessage === "USER_ALREADY_EXISTS" && (
                  <p className="mt-2 text-sm text-red-600">
                    Este correo ya está registrado.
                  </p>
                )}
            </div>
          </div>

          {/* Contraseña */}
          <div>
            <label
              htmlFor="contraseña"
              className="block text-sm font-medium text-gray-900"
            >
              Contraseña
            </label>
            <div className="mt-2">
              <input
                disabled={isAuthLoading}
                id="contraseña"
                {...register("password")}
                type="password"
                placeholder="Tu contraseña"
                className={`block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-tropical-rain-forest-600 focus:border-transparent ${isAuthLoading && "pointer-events-none opacity-50"}`}
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* Confirmar Contraseña */}
          <div>
            <label
              htmlFor="confirmarContraseña"
              className="block text-sm font-medium text-gray-900"
            >
              Confirmar contraseña
            </label>
            <div className="mt-2">
              <input
                disabled={isAuthLoading}
                id="confirmarContraseña"
                type="password"
                {...register("confirmPassword")}
                placeholder="Repite tu contraseña"
                className={`block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-tropical-rain-forest-600 focus:border-transparent ${isAuthLoading && "pointer-events-none opacity-50"}`}
              />
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          {/* Fecha de Nacimiento */}
          <div>
            <label
              htmlFor="fechaNacimiento"
              className="block text-sm font-medium text-gray-900"
            >
              Fecha de nacimiento
            </label>
            <div className="mt-2">
              <input
                disabled={isAuthLoading}
                id="fechaNacimiento"
                type="date"
                {...register("birth_date")}
                className={`block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-tropical-rain-forest-600 focus:border-transparent ${isAuthLoading && "pointer-events-none opacity-50"}`}
              />
              {errors.birth_date && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.birth_date.message}
                </p>
              )}
            </div>
          </div>

          {/* Foto de Perfil - Ocupa toda la fila */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-900">
              Foto de perfil (opcional)
            </label>
            <div className="mt-2">
              {previewUrl ? (
                <div className="flex flex-col items-center gap-4 p-4 border-2 border-dashed border-gray-300 rounded-lg">
                  <div className="relative">
                    <img
                      src={previewUrl}
                      alt="Vista previa"
                      className="h-32 w-32 rounded-full object-cover shadow-lg border-2 border-tropical-rain-forest-100"
                    />
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      className={`cursor-pointer absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 shadow-md hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${isAuthLoading && "pointer-events-none opacity-50"}`}
                      aria-label="Eliminar foto"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ) : (
                <input
                  disabled={isAuthLoading}
                  ref={fileInputRef}
                  id="fotoPerfil"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-tropical-rain-forest-50 file:text-tropical-rain-forest-800
                    hover:file:bg-tropical-rain-forest-100
                    cursor-pointer"
                />
              )}
              {photoError && (
                <p className="mt-2 text-sm text-red-600">{photoError}</p>
              )}
            </div>
          </div>

          {/* Errores*/}
          {errorStatus === 400 && (
            <Error>Ha ocurrido un error. Por favor intentalo de nuevo.</Error>
          )}
          {errorStatus === 500 && (
            <Error>Ha ocurrido un error. Por favor intentalo de nuevo.</Error>
          )}

          {/* Botón Submit - Ocupa toda la fila */}
          <div className="md:col-span-2">
            <button
              disabled={isAuthLoading}
              type="submit"
              className={`transition w-full rounded-md bg-tropical-rain-forest-800 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-tropical-rain-forest-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tropical-rain-forest-600 cursor-pointer ${isAuthLoading && "pointer-events-none opacity-50"}`}
            >
              Registrarse
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          ¿Ya tienes una cuenta?{" "}
          <Link
            to="/login"
            className={`font-semibold text-tropical-rain-forest-800 hover:text-tropical-rain-forest-700 ${isAuthLoading && "pointer-events-none opacity-50"}`}
          >
            Inicia sesión
          </Link>
        </p>
        {isAuthLoading && <LoadingSpinner />}
      </div>
    </div>
  );
};

export default Signup;
