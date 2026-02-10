import { MapPinned, Settings } from "lucide-react";

type EmptyLocationProps = {
  onRequestLocation: () => void;
};

const EmptyLocation = ({ onRequestLocation }: EmptyLocationProps) => {
  return (
    <div className="bg-red-500 h-full relative">
      <img
        className="h-full w-full object-cover brightness-10"
        src="/Mapa mundial png.png"
        alt="Mapa mundial"
      />
      <div className="absolute h-full top-0 left-0 right-0 flex items-center justify-center">
        <div className="size-70 rounded-xl flex flex-col items-center px-5 gap-3">
          <div className="bg-tropical-rain-forest-800 p-4 rounded-3xl relative">
            <MapPinned className="size-20 text-white" />
            <div className="size-10 bg-white absolute left-22 top-20 rounded-full flex items-center justify-center">
              <Settings />
            </div>
          </div>
          <h1 className="text-white font-bold text-xl text-center">
            Ubicación desactivada
          </h1>
          <p className="text-gray-400 text-center">
            Permite el acceso a tu ubicación para encontrar mascotas reportadas
            en tu zona.
          </p>
          <button
            onClick={onRequestLocation}
            className="bg-white text-tropical-rain-forest-800 font-bold py-2 px-6 rounded-lg border-2 border-tropical-rain-forest-800 hover:opacity-80 transition-opacity cursor-pointer"
          >
            Activar ubicación
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmptyLocation;
