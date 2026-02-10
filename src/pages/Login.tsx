import { Link } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type LoginSchema, loginSchema } from "../schemas/login.schema";
import { useAuthStore } from "../state/authStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUserStore } from "../state/userStore";
import LoadingSpinner from "../ui/LoadingSpinner";

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthLoading, errorStatus, isAuthenticated, token } =
    useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
      useUserStore.getState().fetchUserData(token!);
    }
  }, [isAuthenticated, navigate]);

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    await login(data);
  };

  return (
    <div className="min-h-screen flex justify-center p-4 bg-tropical-rain-forest-25">
      <div className="flex flex-col mt-20 h-160 justify-center px-6 py-12 lg:px-8 border-0.5  shadow-xl w-full max-w-md bg-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img src="/huella.svg" className="mx-auto h-10 w-auto" alt="Logo" />
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
            Iniciar sesión
          </h2>
          {errorStatus === 401 && (
            <div className="mt-4 text-center text-red-500 text-sm bg-red-100 p-2 rounded">
              Correo o contraseña incorrectos. Verifique los datos e intente
              nuevamente.
            </div>
          )}
          {errorStatus && errorStatus !== 401 && (
            <div className="mt-4 text-center text-red-500 text-sm bg-red-100 p-2 rounded">
              Ocurrió un error inesperado. Por favor, intente nuevamente mas
              tarde.
            </div>
          )}
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
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
                  disabled={isAuthLoading}
                  id="email"
                  placeholder="Correo electrónico"
                  {...register("email")}
                  className={`block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-tropical-rain-forest-600 focus:border-transparent sm:text-sm ${
                    isAuthLoading && "opacity-50 pointer-events-none"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 ml-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-900"
                >
                  Contraseña
                </label>

                <Link
                  className={`${isAuthLoading && "pointer-events-none opacity-50"}`}
                  to="/forgotpassword"
                >
                  <p className="text-right text-sm font-semibold text-tropical-rain-forest-800 hover:text-tropical-rain-forest-700">
                    ¿Olvidaste tu contraseña?
                  </p>
                </Link>
              </div>

              <div className="mt-2">
                <input
                  disabled={isAuthLoading}
                  id="password"
                  type="password"
                  placeholder="Tu contraseña"
                  {...register("password")}
                  className={`block w-full rounded-md bg-white px-3 py-1.5 text-sm text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-tropical-rain-forest-600 focus:border-transparent sm:text-sm ${
                    isAuthLoading && "opacity-50 pointer-events-none"
                  }`}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1 ml-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                disabled={isAuthLoading}
                type="submit"
                className={`flex w-full justify-center rounded-md bg-tropical-rain-forest-800 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-tropical-rain-forest-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tropical-rain-forest-600 cursor-pointer ${
                  isAuthLoading && "opacity-50 pointer-events-none"
                }`}
              >
                Iniciar sesión
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            ¿No tienes una cuenta?{" "}
            <Link
              to="/signup"
              className={`font-semibold text-tropical-rain-forest-800 hover:text-tropical-rain-forest-700 ${isAuthLoading && "pointer-events-none opacity-50"}`}
            >
              Regístrate
            </Link>
          </p>
        </div>
        {isAuthLoading && <LoadingSpinner />}
      </div>
    </div>
  );
};

export default Login;
