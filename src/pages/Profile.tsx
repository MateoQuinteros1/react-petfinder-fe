import { useEffect, useState } from "react";
import { useUserStore } from "../state/userStore";
import { Calendar, Pencil, Check, X, Camera, Loader2 } from "lucide-react";
import AccountInfo from "../components/AccountInfo";
import LoadingSpinner from "../ui/LoadingSpinner";
import { useUploadPhotos } from "../hooks/useUploadPhotos";
import type { Updates } from "../state/userStore";
import Error from "../ui/Error";
import { UserPetsSection } from "../components/UserPetsSection";
import { useLocation } from "react-router-dom";

const Profile = () => {
  const location = useLocation();
  const {
    userData,
    isLoadingData,
    email,
    getUserEmail,
    updateUserData,
    isUpdatingUserData,
    errorStatus,
  } = useUserStore();
  const [activeTab, setActiveTab] = useState<"public" | "security">("public");
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(userData?.name || "");
  const {
    profilePhoto,
    previewUrl,
    photoError,
    handlePhotoChange,
    handleRemovePhoto,
    fileInputRef,
  } = useUploadPhotos();

  useEffect(() => {
    if (userData) {
      setEditedName(userData.name);
    }
  }, [userData]);

  useEffect(() => {
    if (activeTab === "security" && !email) {
      getUserEmail();
    }
  }, [activeTab, email, getUserEmail]);

  useEffect(() => {
    if (!location.hash) return;

    const element = document.querySelector(location.hash);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [location.hash]);

  const handleSaveProfile = async () => {
    if (editedName === userData?.name && !profilePhoto) {
      return;
    }

    let updates: Updates = {};

    if (editedName !== userData?.name) {
      updates.name = editedName;
    }

    if (profilePhoto) {
      updates.image_file = profilePhoto;
    }

    await updateUserData(updates);
    if (!useUserStore.getState().errorStatus) {
      setIsEditing(false);
    }
  };

  if (isLoadingData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner />
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
        <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100 mb-6 max-w-sm shadow-sm">
          <p className="font-semibold text-lg mb-2">
            ¡Ups! No pudimos cargar tu perfil
          </p>
          <p className="text-red-500/80 text-sm">
            Parece que hubo un problema al recuperar tus datos. Por favor,
            intenta iniciar sesión de nuevo.
          </p>
        </div>
      </div>
    );
  }

  const getFormattedDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const adjustedDate = new Date(
        date.getTime() + date.getTimezoneOffset() * 60000,
      );

      return adjustedDate.toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    } catch {
      return "No especificada";
    }
  };

  const formattedDate = userData.birth_date
    ? getFormattedDate(userData.birth_date)
    : "No especificada";

  return (
    <div className="flex-1 bg-gray-50/50 p-4 md:p-8 animate-in fade-in duration-700">
      <div className="max-w-3xl mx-auto">
        {/* Banner */}
        <div className="h-40 md:h-56 rounded-lg relative">
          <div className="absolute inset-0 rounded-t-[2.5rem] overflow-hidden pointer-events-none">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gray-100/50 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gray-200/30 rounded-full blur-3xl"></div>
          </div>

          {/* Foto de perfil */}
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 md:left-12 md:translate-x-0">
            <div className="relative group/avatar">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoChange}
                accept="image/*"
                className="hidden"
              />
              <div
                onClick={() => isEditing && fileInputRef.current?.click()}
                className={`w-32 h-32 md:w-44 md:h-44 rounded-full border-[6px] border-white overflow-hidden bg-white shadow-2xl relative transition-all duration-300 ${
                  isEditing
                    ? "cursor-pointer hover:border-tropical-rain-forest-100"
                    : ""
                }`}
              >
                <img
                  src={previewUrl || userData.image_url}
                  alt={userData.name}
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    isEditing ? "brightness-40 scale-105" : "hover:scale-105"
                  }`}
                />

                {/* Overlay de cámara */}
                {isEditing && (
                  <div className=" hover:bg-black/30 absolute inset-0 flex items-center justify-center animate-in zoom-in-75 duration-300">
                    <div className="p-4 rounded-full text-white shadow-xl">
                      <Camera size={32} />
                    </div>
                  </div>
                )}
              </div>
            </div>
            {isEditing && photoError && (
              <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[10px] md:text-xs px-3 py-1 rounded-full whitespace-nowrap shadow-lg animate-in fade-in zoom-in duration-300">
                {photoError}
              </p>
            )}
          </div>

          {/* Botones de acción */}
          {activeTab === "public" && (
            <div className="absolute top-6 right-8 flex items-center gap-3">
              {isEditing ? (
                <>
                  <button
                    disabled={isUpdatingUserData}
                    onClick={() => {
                      setIsEditing(false);
                      handleRemovePhoto();
                      setEditedName(userData.name);
                    }}
                    className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2.5 rounded-2xl font-bold hover:bg-red-100 hover:text-red-600 transition-all border border-gray-200 shadow-lg active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <X size={18} />
                    <span className="hidden sm:inline">Cancelar</span>
                  </button>
                  <button
                    disabled={isUpdatingUserData}
                    onClick={() => {
                      handleSaveProfile();
                    }}
                    className="flex items-center gap-2 bg-tropical-rain-forest-600 text-white px-6 py-2.5 rounded-2xl font-bold hover:bg-tropical-rain-forest-700 transition-all shadow-xl active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUpdatingUserData ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        <span>Guardando...</span>
                      </>
                    ) : (
                      <>
                        <Check size={18} />
                        <span>Guardar</span>
                      </>
                    )}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex text-gray-700 items-center gap-2 px-5 py-2.5 border-2 border-gray-300 rounded-2xl font-bold cursor-pointer hover:border-tropical-rain-forest-800 hover:text-tropical-rain-forest-800 transition-all"
                >
                  <Pencil size={18} />
                  Editar Perfil
                </button>
              )}
            </div>
          )}
        </div>

        {/*  Pestañas y contenedor de tarjetas */}
        <div className="bg-white rounded-lg shadow-xl border-x border-b border-gray-100 overflow-hidden">
          <div className="flex  justify-center md:justify-start md:pl-64 pt-20 md:pt-0 bg-white/50">
            <button
              onClick={() => setActiveTab("public")}
              className={`px-6 md:px-8 py-4 text-xs md:text-sm font-bold uppercase tracking-wider transition-all relative cursor-pointer ${
                activeTab === "public"
                  ? "text-tropical-rain-forest-600"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Perfil
              {activeTab === "public" && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-tropical-rain-forest-500 rounded-t-full"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`px-6 md:px-8 py-4 text-xs md:text-sm font-bold uppercase tracking-wider transition-all relative cursor-pointer ${
                activeTab === "security"
                  ? "text-tropical-rain-forest-600"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Cuenta
              {activeTab === "security" && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-tropical-rain-forest-500 rounded-t-full"></div>
              )}
            </button>
          </div>

          <div className="p-8 md:p-12">
            {activeTab === "public" ? (
              <div className="animate-in slide-in-from-left duration-300">
                {/* Nombre */}
                <div className="space-y-1 text-center md:text-left md:pl-52">
                  {isEditing ? (
                    <div className="relative">
                      <input
                        type="text"
                        className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight bg-gray-50 border-b-2 border-tropical-rain-forest-500 py-1 focus:outline-none w-full max-w-md animate-in fade-in duration-300"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        autoFocus
                      />
                      {errorStatus === 409 && (
                        <p className="text-red-500 text-sm mt-1">
                          Ese nombre ya está en uso
                        </p>
                      )}
                    </div>
                  ) : (
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                      {userData.name}
                    </h1>
                  )}
                </div>
                {errorStatus && errorStatus !== 409 && errorStatus !== 401 && (
                  <div className="mt-2 align-center w-full">
                    <Error>
                      Ha ocurrido un error. Por favor, intente nuevamente.
                    </Error>
                  </div>
                )}

                <div className="mt-10">
                  <div className="group flex items-center gap-5 p-6 rounded-3xl bg-gray-50 border border-gray-100 transition-all w-full">
                    <div className="bg-tropical-rain-forest-100 p-3.5 rounded-2xl text-tropical-rain-forest-600 transition-colors">
                      <Calendar size={24} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-0.5">
                        Fecha de Nacimiento
                      </p>
                      <p className="text-gray-900 font-bold text-lg">
                        {formattedDate}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <AccountInfo email={email} />
            )}
          </div>
        </div>

        {/* Mascotas */}
        <UserPetsSection activeTab={activeTab} pets={userData.pets} />
      </div>
    </div>
  );
};

export default Profile;
