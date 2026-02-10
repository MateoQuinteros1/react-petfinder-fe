import { Marker, Popup } from "react-map-gl/mapbox";
import { type AlgoliaPet } from "../state/lostPetsStore";
import { MapPin } from "lucide-react";
import PetInfo from "./PetInfo";
import { useState } from "react";

type InfoMarkerProps = {
  pet: AlgoliaPet;
};

const InfoMarker = ({ pet }: InfoMarkerProps) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <>
      <Marker
        onClick={(e) => {
          e.originalEvent.stopPropagation();
          setShowInfo(!showInfo);
        }}
        longitude={Number(pet._geoloc.lng)}
        latitude={Number(pet._geoloc.lat)}
        anchor="bottom"
      >
        <div className="p-2 rounded-full cursor-pointer">
          <div className="relative flex items-center justify-center">
            {/* Cola del pin */}
            <div className="absolute top-2">
              <MapPin className="text-tropical-rain-forest-600 h-10 w-10 fill-tropical-rain-forest-600/20" />
            </div>

            {/* Contenedor de la foto */}
            <div className="bg-white size-10 rounded-full shadow-lg border-2 border-tropical-rain-forest-600 z-10 transition-transform duration-300 hover:scale-110 overflow-hidden">
              <img
                src={pet.image_url}
                className="size-full object-cover"
                alt={pet.name}
              />
            </div>
          </div>
        </div>
      </Marker>

      {showInfo && (
        <Popup
          longitude={Number(pet._geoloc.lng)}
          latitude={Number(pet._geoloc.lat)}
          anchor="bottom"
          offset={40}
          onClose={() => setShowInfo(false)}
          closeButton={false}
          className="z-50"
        >
          <PetInfo pet={pet} onClose={() => setShowInfo(false)} />
        </Popup>
      )}
    </>
  );
};

export default InfoMarker;
