import Map, { Marker, type MapMouseEvent } from "react-map-gl/mapbox";
import { Cat, Dog, MapPin } from "lucide-react";
import type { Coords } from "../state/locationStore";

type CustomMapProps = {
  petType: "dog" | "cat" | "";
  coords: {
    lat: number | null;
    lng: number | null;
  };
  setCoords: (coords: { lat: number | null; lng: number | null }) => void;
  initialViewCoords?: Coords;
};

const CustomMap = ({
  petType,
  coords,
  setCoords,
  initialViewCoords,
}: CustomMapProps) => {
  return (
    <div>
      <link
        href="https://api.tiles.mapbox.com/mapbox-gl-js/v3.18.1/mapbox-gl.css"
        rel="stylesheet"
      />
      <Map
        onClick={(e: MapMouseEvent) => setCoords(e.lngLat)}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
        initialViewState={{
          longitude: initialViewCoords?.lng ?? -58.3816,
          latitude: initialViewCoords?.lat ?? -34.6037,
          zoom: 10,
        }}
        style={{
          width: "100%",
          height: "300px",
          border: "1px solid #007260",
          borderRadius: "0.5rem",
        }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        {coords.lat && coords.lng && (
          <Marker longitude={coords.lng} latitude={coords.lat} color="#008d74">
            <div className="p-2 rounded-full mb-17">
              <div className="relative flex items-center justify-center">
                {/* Marker pin tail/body */}
                <div className="absolute top-2">
                  <MapPin className="text-tropical-rain-forest-600 h-10 w-10 fill-tropical-rain-forest-600/20" />
                </div>

                {/* Icon Container */}
                <div className="bg-white p-1.5 rounded-full shadow-lg border-2 border-tropical-rain-forest-600 z-10 transition-transform duration-300 hover:scale-110">
                  {petType === "cat" ? (
                    <Cat className="text-tropical-rain-forest-600 h-6 w-6" />
                  ) : petType === "dog" ? (
                    <Dog className="text-tropical-rain-forest-600 h-6 w-6" />
                  ) : (
                    <MapPin className="text-tropical-rain-forest-600 h-6 w-6" />
                  )}
                </div>
              </div>
            </div>
          </Marker>
        )}
      </Map>
    </div>
  );
};

export default CustomMap;
