import { Dog, Pencil, Cat, Trash } from "lucide-react";
import StatusPetCircle from "../ui/StatusPetCircle";
import { useState } from "react";
import EditPetForm from "./EditPetForm";
import DeletePetDialog from "./DeletePetDialog";

export type PetInfoCardProps = {
  id: string;
  name: string;
  image_url: string;
  location: string;
  type: "dog" | "cat";
  createdAt: string;
  status: "lost" | "found";
  lat: string;
  lng: string;
};

const PetInfoCard = ({
  id,
  name,
  image_url,
  location,
  type,
  createdAt,
  status,
  lat,
  lng,
}: PetInfoCardProps) => {
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const formattedDate = new Date(createdAt).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative w-full p-6 rounded-3xl border border-gray-300 bg-[#FAFAFA]">
        <span className="absolute bottom-2 right-4 min-[481px]:top-6 min-[481px]:right-6 text-xs text-gray-400 font-medium">
          {formattedDate}
        </span>
        <div className="flex flex-col min-[481px]:flex-row md:gap-4">
          <img
            className="object-cover min-[481px]:size-33 sm:h-40 sm:w-55 md:h-50 md:w-70 rounded-lg mb-4 min-[481px]:mb-0 min-[481px]:mr-4"
            src={image_url}
          />
          <div className="flex flex-col h-full justify-between gap-2 text-black md:mt-3">
            <div className="header flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <strong>{name}</strong>
                {type === "dog" ? <Dog /> : <Cat />}
              </div>
              <StatusPetCircle status={status} />
            </div>
            <div className="footer flex flex-col items-start gap-4">
              <p className="opacity-80 text-base">{location}</p>
              <div className="flex gap-4">
                <button
                  onClick={() => setEditModal(true)}
                  className="bg-transparent border-none text-base py-1 px-0 font-bold text-black cursor-pointer md:mt-11"
                >
                  <span className="underline underline-offset-4 hover:text-gray-600 transition-colors duration-300 flex items-center gap-2">
                    <Pencil size={16} />
                    Editar
                  </span>
                </button>
                <button
                  onClick={() => setDeleteModal(true)}
                  className="bg-transparent border-none text-base py-1 px-0 font-bold text-black cursor-pointer md:mt-11"
                >
                  <span className="text-red-500 underline underline-offset-4 hover:text-red-700 transition-colors duration-300 flex items-center gap-2">
                    <Trash size={16} />
                    Eliminar
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        {editModal && (
          <EditPetForm
            handleFormClose={() => setEditModal(false)}
            petData={{
              id,
              name,
              image_url,
              location,
              type,
              createdAt,
              status,
              lat,
              lng,
            }}
          />
        )}
        {deleteModal && (
          <DeletePetDialog
            onClose={() => setDeleteModal(false)}
            handleCancel={() => setDeleteModal(false)}
            petId={id}
          />
        )}
      </div>
    </div>
  );
};

export default PetInfoCard;
