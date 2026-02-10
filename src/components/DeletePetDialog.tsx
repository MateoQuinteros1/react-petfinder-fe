import { Modal } from "./Modal";
import { useUserStore } from "../state/userStore";
import { Loader2 } from "lucide-react";

type DeletePetDialogProps = {
  onClose: () => void;
  handleCancel: () => void;
  petId: string;
};

const DeletePetDialog = ({
  onClose,
  handleCancel,
  petId,
}: DeletePetDialogProps) => {
  const {
    deletePet,
    petsState: { isLoading },
  } = useUserStore();
  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-2xl font-bold">Eliminar mascota</h2>
        <p className="text-gray-600">
          ¿Estás seguro de que quieres eliminar esta mascota?
        </p>
        <div className="flex gap-4">
          <button
            onClick={handleCancel}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              deletePet(petId, () => {
                onClose();
              });
            }}
            className={`bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="animate-spin" />
                Eliminando...
              </div>
            ) : (
              "Eliminar"
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeletePetDialog;
