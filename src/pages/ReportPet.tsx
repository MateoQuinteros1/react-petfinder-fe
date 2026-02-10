import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reportPetSchema } from "../schemas/pets.schema";
import type { ReportPetFormValues } from "../schemas/pets.schema";
import { Dog, Cat, Upload, Loader2 } from "lucide-react";
import CustomMap from "../ui/Map";
import { useUploadPhotos } from "../hooks/useUploadPhotos";
import { useState } from "react";
import { useUserStore } from "../state/userStore";
import Error from "../ui/Error";
import { useNavigate } from "react-router-dom";
import { useLocationStore } from "../state/locationStore";

const ReportPet = () => {
  const navigate = useNavigate();
  const [emptyLocation, setEmptyLocation] = useState<boolean>(false);
  const [emptyPhoto, setEmptyPhoto] = useState<boolean>(false);
  const { coords: userCoords } = useLocationStore();

  const {
    createPet,
    petsState: { isLoading, errorStatus },
  } = useUserStore();

  const {
    profilePhoto,
    previewUrl,
    photoError,
    handlePhotoChange,
    fileInputRef,
  } = useUploadPhotos();

  const [coords, setCoords] = useState<{
    lat: number | null;
    lng: number | null;
  }>({
    lat: null,
    lng: null,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ReportPetFormValues>({
    resolver: zodResolver(reportPetSchema),
  });

  const petType = watch("type");

  const onSubmit = async (data: ReportPetFormValues) => {
    setEmptyLocation(false);
    setEmptyPhoto(false);
    if (!coords.lat || !coords.lng) {
      setEmptyLocation(true);
    }
    if (!profilePhoto) {
      setEmptyPhoto(true);
    }
    if (coords.lat && coords.lng && profilePhoto) {
      await createPet(
        {
          ...data,
          lat: String(coords.lat),
          lng: String(coords.lng),
          image_file: profilePhoto,
        },
        () => {
          navigate("/profile");
        },
      );
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-15 px-5 bg-mint-50">
      <div className="p-5 w-full max-w-lg bg-white/80 backdrop-blur-md rounded-lg shadow-xl">
        <h1 className="font-bold text-3xl text-center text-tropical-rain-forest-800">
          Reportar Mascota
        </h1>
        <h2 className="text-center text-gray-600">
          Completa los siguientes campos
        </h2>
        <form
          className="flex flex-col gap-2 mt-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Nombre</label>
            <input
              id="name"
              type="text"
              {...register("name")}
              placeholder="Nombre"
              className="h-10 rounded-lg border border-gray-300 focus:outline-none focus:border-tropical-rain-forest-600 focus:border-2 pl-2"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <label className="mt-7">Tipo de mascota</label>
          <div className="flex gap-4 justify-center mt-1">
            <label className="cursor-pointer flex-1">
              <input
                type="radio"
                value="dog"
                {...register("type")}
                className="hidden peer"
              />
              <div className="p-2 border-2 rounded-xl border-gray-200 text-gray-600 peer-checked:border-tropical-rain-forest-600 min-w-17 flex flex-col items-center peer-checked:text-tropical-rain-forest-600">
                <Dog />
                <span>Perro</span>
              </div>
            </label>
            <label className="cursor-pointer flex-1">
              <input
                type="radio"
                value="cat"
                {...register("type")}
                className="hidden peer"
              />
              <div className="p-2 border-2 rounded-xl border-gray-200 text-gray-600 peer-checked:border-tropical-rain-forest-600 min-w-17 flex flex-col items-center peer-checked:text-tropical-rain-forest-600">
                <Cat />
                <span>Gato</span>
              </div>
            </label>
          </div>
          {errors.type && (
            <p className="text-red-500 text-center mt-2">
              {errors.type.message}
            </p>
          )}
          <div className="mt-8 mb-8">
            <label>Ultima ubicación donde fue vista</label>
            <CustomMap
              coords={coords}
              setCoords={setCoords}
              petType={petType}
              initialViewCoords={userCoords}
            />
            <p className="text-center text-gray-500 text-sm mt-2">
              Marcá el punto mas cercano posible en el mapa
            </p>
            {emptyLocation && (
              <p className="text-red-500 text-center mt-2 text-sm">
                Debes marcar una ubicación en el mapa
              </p>
            )}
          </div>
          <label>Foto de la mascota (obligatoria)</label>
          <div
            className="w-full min-h-70 bg-gray-200 rounded flex items-center justify-center cursor-pointer"
            onClick={() => {
              fileInputRef.current?.click();
            }}
          >
            {!previewUrl && <Upload className="size-10" />}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handlePhotoChange}
              className="hidden"
              accept="image/*"
            />
            {previewUrl && (
              <img
                src={previewUrl}
                className="size-50 object-cover rounded-lg "
              />
            )}
          </div>
          {emptyPhoto && (
            <p className="text-red-500 text-center text-sm">
              Debes subir una foto de la mascota
            </p>
          )}
          {photoError && (
            <p className="text-red-500 text-center mt-2 text-sm">
              {photoError}
            </p>
          )}

          {errorStatus && (
            <Error>Ha ocurrido un error. Por favor intente nuevamente</Error>
          )}

          <button
            disabled={isLoading}
            className={`bg-tropical-rain-forest-600 text-white font-semibold py-2 rounded-lg mt-8 cursor-pointer hover:bg-tropical-rain-forest-700 transition-colors ${isLoading && "opacity-60 cursor-not-allowed pointer-events-none"}`}
            type="submit"
          >
            {isLoading ? (
              <div className="flex justify-center items-center gap-2">
                <Loader2 className="animate-spin size-5" /> Reportando...
              </div>
            ) : (
              "Reportar"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportPet;
