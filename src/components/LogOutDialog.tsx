import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

interface CustomDialogProps {
  isOpen: boolean;
  handleCancel: () => void;
  handleAccept: () => void;
  handleClose: () => void;
}

function LogOutDialog({
  isOpen,
  handleCancel,
  handleAccept,
  handleClose,
}: CustomDialogProps) {
  return (
    <>
      <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/30" />

        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 bg-white p-8">
            <DialogTitle className="font-bold">Cerrar sesión</DialogTitle>
            <p>¿Estás seguro que deseas cerrar sesión?</p>
            <div className="flex gap-4">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-200 rounded cursor-pointer hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={handleAccept}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
              >
                Aceptar
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

export default LogOutDialog;
