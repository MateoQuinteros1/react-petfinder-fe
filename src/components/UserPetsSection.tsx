import { type Pet } from "../state/userStore";
import { Heart, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PetInfoCard from "./PetInfoCard";

type UserPetsSectionProps = {
  activeTab: "public" | "security";
  pets: Pet[];
};

export const UserPetsSection = ({ activeTab, pets }: UserPetsSectionProps) => {
  const navigate = useNavigate();
  return (
    <section id="mis-mascotas">
      {activeTab === "public" && (
        <div className="mt-12 space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-2">
            <div className="space-y-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-tropical-rain-forest-100 p-2.5 rounded-2xl text-tropical-rain-forest-600 shadow-sm">
                  <Heart size={24} fill="currentColor" className="opacity-80" />
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                  Mis Mascotas
                </h2>
              </div>
              <p className="text-gray-500 font-medium md:pl-1">
                {pets.length === 0
                  ? "Aún no has reportado ninguna mascota."
                  : `Has reportado ${pets.length} ${
                      pets.length === 1 ? "mascota" : "mascotas"
                    } hasta el momento.`}
              </p>
            </div>

            <button
              onClick={() => {
                navigate("/reportpet");
              }}
              className="flex items-center justify-center gap-2 bg-tropical-rain-forest-600 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-xl active:scale-95 text-sm md:text-base group cursor-pointer hover:brightness-95"
            >
              <Plus
                size={20}
                className="group-hover:rotate-90 transition-transform duration-300"
              />
              Reportar Nueva
            </button>
          </div>

          {/* Seccion de mascotas perdidas del usuario */}
          {pets.length === 0 && (
            <div className="bg-white/50 backdrop-blur-sm border-2 border-dashed border-gray-200 rounded-[2.5rem] p-12 flex flex-col items-center justify-center text-center opacity-60">
              <p className="text-gray-500 font-medium">
                Tus mascotas reportadas aparecerán aquí.
              </p>
            </div>
          )}

          {pets.length > 0 && (
            <div className="grid grid-cols-1">
              {[...pets]
                .sort((a, b) => {
                  // Las que sean found van al final, y las que sean lost van al principio
                  if (a.status === "found" && b.status !== "found") return 1;
                  if (a.status !== "found" && b.status === "found") return -1;
                  // Se ordenan por fecha más reciente primero
                  return (
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                  );
                })
                .map((pet) => (
                  <PetInfoCard
                    name={pet.name}
                    type={pet.type}
                    id={pet.id}
                    image_url={pet.image_url}
                    location={pet.location}
                    createdAt={pet.createdAt}
                    status={pet.status}
                    lat={pet.lat}
                    lng={pet.lng}
                    key={pet.id}
                  />
                ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
};
