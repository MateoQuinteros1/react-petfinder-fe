import { X, MapPin, Timer, Dog, Cat, MessageCircle } from "lucide-react";
import type { AlgoliaPet } from "../state/lostPetsStore";
import { getTimeAgo } from "../utils/timeAgo";
import ContactForm from "./ContactForm";
import { useState } from "react";

type PetInfoProps = {
  pet: AlgoliaPet;
  onClose: () => void;
};

const PetInfo = ({ pet, onClose }: PetInfoProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const distanceToKm =
    pet._rankingInfo?.geoDistance! >= 1000
      ? (pet._rankingInfo?.geoDistance! / 1000).toFixed(1)
      : pet._rankingInfo?.geoDistance;
  const unit = pet._rankingInfo?.geoDistance! >= 1000 ? "km" : "m";
  const timeAgo = getTimeAgo(pet.createdAt);

  return (
    <div className="w-56 overflow-hidden font-[Geist] box-border">
      <div className="relative h-28">
        <img
          src={pet.image_url}
          alt={pet.name}
          className="w-full h-full object-cover"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm p-1 rounded-full text-tropical-rain-forest-950 hover:bg-white transition-colors cursor-pointer shadow-sm"
        >
          <X size={14} />
        </button>
      </div>

      <div className="py-3 flex flex-col gap-2">
        <div className="flex gap-1">
          {pet.type === "dog" ? (
            <Dog className="size-5 text-tropical-rain-forest-900" />
          ) : (
            <Cat className="size-5 text-tropical-rain-forest-900" />
          )}
          <h2 className="font-bold text-base">{pet.name}</h2>
        </div>
        <div className="flex items-start gap-1 text-gray-600 text-sm">
          <MapPin className="size-5 shrink-0 text-tropical-rain-forest-700 mt-0.5" />

          <p className="leading-snug">
            {pet.location}
            <span className="mx-1">·</span>
            {distanceToKm} {unit}
          </p>
        </div>
        <div className="flex items-center">
          <Timer className="size-5 text-tropical-rain-forest-700 mr-1" />
          <p className="text-gray-600 text-sm">Hace {timeAgo}</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-tropical-rain-forest-950 text-white py-2 hover:bg-tropical-rain-forest-900 transition-colors duration-200 cursor-pointer flex items-center justify-center"
        >
          <MessageCircle className="size-5 mr-2" />
          Contactar al dueño
        </button>
        {isModalOpen && (
          <ContactForm
            onClose={() => setIsModalOpen(false)}
            petId={pet.objectID}
            petName={pet.name}
          />
        )}
      </div>
    </div>
  );
};

export default PetInfo;
