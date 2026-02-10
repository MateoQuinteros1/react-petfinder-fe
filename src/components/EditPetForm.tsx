import type { PetInfoCardProps } from "./PetInfoCard";
import { useState } from "react";
import { Dog, Cat, Camera, Loader2, Search, CheckCircle } from "lucide-react";
import {
  reportPetSchema,
  type ReportPetFormValues,
} from "../schemas/pets.schema";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomMap from "../ui/Map";
import { useUploadPhotos } from "../hooks/useUploadPhotos";
import { useUserStore } from "../state/userStore";
import Error from "../ui/Error";
import { Modal } from "./Modal";

type EditPetFormProps = {
  handleFormClose?: () => void;
  petData: PetInfoCardProps;
};

const EditPetForm = ({
  handleFormClose = () => {},
  petData,
}: EditPetFormProps) => {
  const {
    updatePet,
    petsState: { isLoading, errorStatus },
  } = useUserStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ReportPetFormValues>({
    resolver: zodResolver(reportPetSchema),
    defaultValues: {
      name: petData.name,
      type: petData.type,
    },
  });

  const {
    profilePhoto,
    previewUrl,
    photoError,
    handlePhotoChange,
    fileInputRef,
  } = useUploadPhotos();

  const [newName, setNewName] = useState(petData.name);
  const [petStatus, setPetStatus] = useState<"lost" | "found">(petData.status);
  const petType = watch("type");

  const [coords, setCoords] = useState<{
    lat: number | null;
    lng: number | null;
  }>({
    lat: Number(petData.lat),
    lng: Number(petData.lng),
  });

  const onSubmit: SubmitHandler<ReportPetFormValues> = (data) => {
    const finalName = newName === petData.name ? undefined : newName;
    const finalType = data.type === petData.type ? undefined : data.type;
    const finalImage = profilePhoto ? profilePhoto : undefined;
    const finalLat =
      coords.lat === Number(petData.lat) ? undefined : String(coords.lat);
    const finalLng =
      coords.lng === Number(petData.lng) ? undefined : String(coords.lng);
    const finalStatus = petStatus === petData.status ? undefined : petStatus;

    updatePet(
      {
        name: finalName,
        type: finalType,
        lat: finalLat,
        lng: finalLng,
        image_file: finalImage,
        status: finalStatus,
      },
      petData.id,
      () => {
        handleFormClose();
      },
    );
  };

  return (
    <Modal onClose={handleFormClose}>
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Editar Mascota
        </h2>

        {/* Form content */}
        <form className="flex flex-col gap-5">
          <div className="flex flex-col w-full">
            <label className="text-gray-600">Nombre</label>
            <input
              className="border border-gray-300 rounded-lg pl-2 h-10 text-black focus:ring-2 focus:ring-tropical-rain-forest-500 focus:outline-none transition-all"
              type="text"
              defaultValue={newName}
              {...register("name")}
              onChange={(e) => setNewName(e.target.value)}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="text-gray-600">Tipo de mascota</label>
            <div className="w-full flex justify-center gap-3 mt-2">
              <label className="cursor-pointer flex-1">
                <input
                  type="radio"
                  value="dog"
                  className="hidden peer"
                  {...register("type")}
                />
                <div className="p-2 border-2 rounded-xl border-gray-200 text-gray-500 peer-checked:border-tropical-rain-forest-600 flex flex-col items-center peer-checked:text-tropical-rain-forest-600 peer-checked:bg-tropical-rain-forest-50">
                  <Dog />
                  <span className="font-medium">Perro</span>
                </div>
              </label>
              <label className="cursor-pointer flex-1">
                <input
                  type="radio"
                  value="cat"
                  className="hidden peer"
                  {...register("type")}
                />
                <div className="p-2 border-2 rounded-xl border-gray-200 text-gray-500 peer-checked:border-tropical-rain-forest-600 flex flex-col items-center peer-checked:text-tropical-rain-forest-600 peer-checked:bg-tropical-rain-forest-50">
                  <Cat />
                  <span className="font-medium">Gato</span>
                </div>
              </label>
            </div>
            {errors.type && (
              <p className="text-red-500 text-sm mt-1 text-center">
                Debes seleccionar un tipo de mascota
              </p>
            )}
          </div>

          {/* Estado de la mascota */}
          <div>
            <label className="text-gray-600">Estado de la mascota</label>
            <div className="w-full flex justify-center gap-3 mt-2">
              <button
                type="button"
                onClick={() => setPetStatus("lost")}
                className={`cursor-pointer flex-1 p-2 border-2 rounded-xl flex flex-col items-center transition-all ${
                  petStatus === "lost"
                    ? "border-red-500 text-red-500 bg-red-50"
                    : "border-gray-200 text-gray-500 hover:border-gray-300"
                }`}
              >
                <Search size={24} />
                <span className="font-medium">Perdido</span>
              </button>
              <button
                type="button"
                onClick={() => setPetStatus("found")}
                className={`cursor-pointer flex-1 p-2 border-2 rounded-xl flex flex-col items-center transition-all ${
                  petStatus === "found"
                    ? "border-green-500 text-green-500 bg-green-50"
                    : "border-gray-200 text-gray-500 hover:border-gray-300"
                }`}
              >
                <CheckCircle size={24} />
                <span className="font-medium">Encontrado</span>
              </button>
            </div>
          </div>

          <div>
            <label className="text-gray-600 block">
              Ultima ubicación donde fue vista
            </label>
            <div className="overflow-hidden">
              <CustomMap
                coords={coords}
                setCoords={setCoords}
                petType={petType}
                initialViewCoords={{
                  lng: Number(petData.lng),
                  lat: Number(petData.lat),
                }}
              />
              <p className="text-center text-gray-500 text-sm mt-2">
                Marcá el punto mas cercano posible en el mapa
              </p>
            </div>
          </div>
          <div>
            <label className="text-gray-600">Foto</label>
            <div className="flex justify-center mt-4">
              <div
                className="relative group size-40 cursor-pointer rounded-full border-2 border-gray-700 overflow-hidden"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  ref={fileInputRef}
                  className="hidden"
                />
                <img
                  className="object-cover w-full h-full group-hover:brightness-65 transition-all duration-300"
                  src={previewUrl ? previewUrl : petData.image_url}
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Camera className="text-white w-10 h-10" />
                </div>
              </div>
            </div>
            {photoError && (
              <p className="text-red-500 text-sm mt-1 text-center">
                {photoError}
              </p>
            )}
          </div>
        </form>
        {errorStatus && (
          <Error>Ha ocurrido un error. Por favor, intente nuevamente</Error>
        )}
        <div className="flex gap-3 mt-2">
          <button
            onClick={handleFormClose}
            className="flex-1 py-3 px-6 rounded-xl bg-gray-100 font-semibold text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            disabled={isLoading}
            onClick={handleSubmit(onSubmit)}
            className={`flex-1 py-3 px-6 rounded-xl bg-tropical-rain-forest-600 text-white font-semibold hover:bg-tropical-rain-forest-800 transition-colors ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin" />
                <span>Guardando...</span>
              </div>
            ) : (
              "Guardar"
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditPetForm;
