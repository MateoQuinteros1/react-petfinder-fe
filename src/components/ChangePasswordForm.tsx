import { Lock, ShieldCheck } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updatePasswordSchema,
  type UpdatePasswordSchema,
} from "../schemas/updatepassword.schema";
import { useAuthStore } from "../state/authStore";
import LoadingSpinner from "../ui/LoadingSpinner";
import Success from "../ui/Success";
import Error from "../ui/Error";
import { Link } from "react-router-dom";

const ChangePasswordForm = () => {
  const {
    updatePassword,
    successUpdatePassword,
    isAuthLoading,
    errorStatus,
    errorMessage,
  } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePasswordSchema>({
    resolver: zodResolver(updatePasswordSchema),
  });

  const onSubmit: SubmitHandler<UpdatePasswordSchema> = (data) => {
    updatePassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
  };
  return (
    <div className="border-t border-gray-100 pt-8">
      {successUpdatePassword && (
        <Success>Contraseña actualizada correctamente</Success>
      )}
      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 ml-1 flex items-center gap-2">
        <ShieldCheck size={16} />
        Cambiar Contraseña
      </h3>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
              Contraseña actual
            </label>
            <div className="relative">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                disabled={isAuthLoading}
                type="password"
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-tropical-rain-forest-500 focus:bg-white transition-all"
                placeholder="********"
                {...register("currentPassword")}
              />
            </div>
            {errors.currentPassword && (
              <p className="text-red-500 text-sm mt-2">
                {errors.currentPassword.message}
              </p>
            )}
            {errorStatus === 401 && errorMessage === "INVALID_CREDENTIALS" && (
              <p className="text-red-500 text-sm mt-2">
                Contraseña actual incorrecta
              </p>
            )}
            <div className="text-right">
              <Link
                to="/forgotpassword"
                className={`text-sm font-semibold text-tropical-rain-forest-600 hover:text-tropical-rain-forest-700 transition-colors ${
                  isAuthLoading && "pointer-events-none opacity-50"
                }`}
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
              Nueva contraseña
            </label>
            <div className="relative">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                disabled={isAuthLoading}
                type="password"
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-tropical-rain-forest-500 focus:bg-white transition-all"
                placeholder="********"
                {...register("newPassword")}
              />
            </div>
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-2">
                {errors.newPassword.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
              Confirmar contraseña
            </label>
            <div className="relative">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                disabled={isAuthLoading}
                type="password"
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-tropical-rain-forest-500 focus:bg-white transition-all"
                placeholder="********"
                {...register("confirmPassword")}
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-2">
                {errors.confirmPassword.message}
              </p>
            )}
            {errorStatus && errorStatus !== 401 && (
              <Error>
                Ha ocurrido un error. Por favor, intentalo de nuevo.
              </Error>
            )}
          </div>
        </div>
        <button
          disabled={isAuthLoading}
          className={`bg-tropical-rain-forest-600 text-white font-bold py-4 px-10 rounded-lg hover:bg-tropical-rain-forest-700 transition-all shadow-lg active:scale-95 cursor-pointer ${isAuthLoading && "opacity-50 pointer-events-none"}`}
        >
          Guardar
        </button>
      </form>
      {isAuthLoading && <LoadingSpinner />}
    </div>
  );
};

export default ChangePasswordForm;
