import { Mail } from "lucide-react";
import ChangePasswordForm from "./ChangePasswordForm";
import LoadingSpinner from "../ui/LoadingSpinner";
interface AccountInfoProps {
  email: string | null;
}
const AccountInfo = ({ email }: AccountInfoProps) => {
  if (!email) {
    return <LoadingSpinner />;
  }

  return (
    <div className="animate-in slide-in-from-right duration-300 space-y-8">
      <div>
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 ml-1">
          Información de la Cuenta
        </h3>
        <div className="group flex items-center gap-3 md:gap-5 p-3.5 md:p-6 rounded-3xl bg-gray-50 border border-gray-100 transition-all w-full">
          <div className="bg-tropical-rain-forest-100 p-2.5 md:p-3.5 rounded-2xl text-tropical-rain-forest-600 shrink-0">
            <Mail className="size-4 md:size-6" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-0.5">
              Correo Electrónico
            </p>
            <p className="text-gray-900 font-bold text-xs [@media(min-width:440px)]:text-base [@media(min-width:768px)]:text-lg truncate whitespace-nowrap">
              {email}
            </p>
          </div>
        </div>
      </div>
      <ChangePasswordForm />
    </div>
  );
};

export default AccountInfo;
