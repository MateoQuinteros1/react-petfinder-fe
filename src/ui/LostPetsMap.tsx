import Map from "react-map-gl/mapbox";
import type { AlgoliaPet } from "../state/lostPetsStore";
import InfoMarker from "../components/InfoMarker";

type LostPetsMapProps = {
  pets: AlgoliaPet[];
  initialViewCoords: {
    lat: number;
    lng: number;
  } | null;
};

const LostPetsMap = ({ pets, initialViewCoords }: LostPetsMapProps) => {
  return (
    <div className="h-full w-full">
      <link
        href="https://api.tiles.mapbox.com/mapbox-gl-js/v3.18.1/mapbox-gl.css"
        rel="stylesheet"
      />
      <Map
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
        initialViewState={{
          longitude: initialViewCoords?.lng ?? -58.3816,
          latitude: initialViewCoords?.lat ?? -34.6037,
          zoom: 10,
        }}
        style={{
          width: "100%",
          height: "100%",
          border: "1px solid #007260",
          borderRadius: "0.5rem",
        }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        {pets.map((pet) => (
          <InfoMarker key={pet.objectID} pet={pet} />
        ))}
      </Map>
    </div>
  );
};

export default LostPetsMap;
