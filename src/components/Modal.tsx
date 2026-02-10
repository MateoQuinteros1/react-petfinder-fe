import { type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

type ModalProps = {
  children: ReactNode;
  onClose?: () => void;
};

export const Modal = ({ children, onClose }: ModalProps) => {
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog content */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl flex flex-col max-h-[90vh] text-left">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-full hover:bg-gray-100 transition-colors z-10 cursor-pointer"
        >
          <X size={24} className="text-gray-500" />
        </button>
        <div className="p-8 overflow-y-auto">{children}</div>
      </div>
    </div>,
    document.body,
  );
};
