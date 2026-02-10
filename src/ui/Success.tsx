import { Check } from "lucide-react";
type SuccessProps = {
  children: React.ReactNode;
};

const Success = ({ children }: SuccessProps) => {
  return (
    <div className="rounded-md bg-green-50 p-4 md:col-span-2 mb-4">
      <div className="flex">
        <div className="shrink-0">
          <Check size={16} className="text-green-400" />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-green-800">{children}</p>
        </div>
      </div>
    </div>
  );
};

export default Success;
