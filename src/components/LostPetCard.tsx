import { type AlgoliaPet } from "../state/lostPetsStore";
import { Cat, Dog, Dot, MapPin, Timer, MessageCircle } from "lucide-react";
import { getTimeAgo } from "../utils/timeAgo";
import { useState } from "react";
import ContactForm from "./ContactForm";

type LostPetCardProps = {
  pet: AlgoliaPet;
};

const LostPetCard = ({ pet }: LostPetCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const distanceToKm =
    pet._rankingInfo?.geoDistance! >= 1000
      ? (pet._rankingInfo?.geoDistance! / 1000).toFixed(1)
      : pet._rankingInfo?.geoDistance;
  const unit = pet._rankingInfo?.geoDistance! >= 1000 ? "km" : "m";
  const timeAgo = getTimeAgo(pet.createdAt);

  return (
    <div className="rounded-3xl w-full max-w-140 relative hover:scale-101 transition-transform duration-200">
      <img
        src={pet.image_url}
        alt={pet.name}
        className="w-full h-70 object-cover rounded-t-3xl"
      />
      <div className="absolute top-4 left-4 bg-white/85 p-2 rounded-full group/type cursor-default">
        {pet.type === "dog" ? (
          <Dog className="size-6 text-tropical-rain-forest-950" />
        ) : (
          <Cat className="size-6 text-tropical-rain-forest-950" />
        )}

        {/* Tooltip que se despliega al hacer hover sobre el tipo de mascota */}
        <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-tropical-rain-forest-950 text-white text-xs rounded-lg opacity-0 invisible group-hover/type:opacity-100 group-hover/type:visible transition-all duration-200 whitespace-nowrap shadow-lg z-10">
          <p className="font-semibold">
            {pet.type === "dog" ? "Perro" : "Gato"}
          </p>
          <div className="absolute top-full left-4 border-4 border-transparent border-t-tropical-rain-forest-950" />
        </div>
      </div>
      <div className="p-4 shadow-md rounded-b-3xl flex flex-col gap-3">
        <h2 className="text-lg font-semibold">{pet.name}</h2>
        <div className="flex items-center">
          <MapPin className="size-5 text-tropical-rain-forest-700 mr-2" />
          <p className="text-gray-600 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
            {pet.location}
          </p>
          <Dot className="size-4" />
          <p className="text-gray-600 text-sm">
            {distanceToKm} {unit}
          </p>
        </div>
        <div className="flex items-center relative group/time cursor-default">
          <Timer className="size-5 text-tropical-rain-forest-700 mr-2" />
          <p className="text-gray-600 text-sm">Hace {timeAgo}</p>

          {/* Tooltip que se despliega al hacer hover sobre el tiempo */}
          <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-tropical-rain-forest-950 text-white text-xs rounded-lg opacity-0 invisible group-hover/time:opacity-100 group-hover/time:visible transition-all duration-200 whitespace-nowrap shadow-lg z-10">
            <p className="font-semibold mb-1">Horario</p>
            <p>
              {new Date(pet.createdAt).toLocaleString("es-AR", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>
            <div className="absolute top-full left-4 border-4 border-transparent border-t-slate-800" />
          </div>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-tropical-rain-forest-950 text-white py-2 rounded-3xl hover:bg-tropical-rain-forest-900 transition-colors duration-200 cursor-pointer flex items-center justify-center"
        >
          <MessageCircle className="size-5 mr-2" />
          Contactar al dueño
        </button>
        {isModalOpen && (
          <div>
            <ContactForm
              onClose={() => setIsModalOpen(false)}
              petId={pet.objectID}
              petName={pet.name}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LostPetCard;
