import { useEffect, useState } from "react";
import { useLostPetsStore } from "../state/lostPetsStore";
import { useUserStore } from "../state/userStore";
import LoadingSpinner from "../ui/LoadingSpinner";
import PetsExplorerHeader from "../components/PetsExplorerHeader";
import PetsGrid from "../components/PetsGrid";
import LostPetsMap from "../ui/LostPetsMap";
import EmptyResults from "../ui/EmptyResults";
import { useLocationStore } from "../state/locationStore";
import EmptyLocation from "../ui/EmptyLocation";

const LostPets = () => {
  const { initLocation, coords, getLocation } = useLocationStore();
  const {
    pets,
    isLoading,
    fetchLostPets,
    filterPets,
    filteredPetList,
    setSearchRadius,
  } = useLostPetsStore();
  const { userData } = useUserStore();
  const [activeFilter, setActiveFilter] = useState<"dog" | "cat" | "all">(
    "all",
  );
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const list = activeFilter === "all" ? pets : filteredPetList;
  const isCoordsAvailable = coords !== null;

  useEffect(() => {
    initLocation();
  }, []);

  useEffect(() => {
    if (isCoordsAvailable) {
      fetchLostPets();
    }
  }, [isCoordsAvailable]);

  if (!userData?.id) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center gap-2 text-center">
        <LoadingSpinner />
      </div>
    );
  }

  const viewModeContent =
    viewMode === "grid" ? (
      <PetsGrid pets={list} />
    ) : (
      <div className="w-full flex-1 min-h-0">
        <LostPetsMap pets={list} initialViewCoords={coords} />
      </div>
    );

  const content =
    !isLoading && list.length === 0 ? (
      <EmptyResults
        onClearFilters={() => {
          setActiveFilter("all");
          setSearchRadius(10);
        }}
      />
    ) : (
      viewModeContent
    );

  const emptyLocationView = isCoordsAvailable ? (
    content
  ) : (
    <EmptyLocation
      onRequestLocation={() => {
        getLocation();
      }}
    />
  );
  return (
    <>
      <PetsExplorerHeader
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        viewMode={viewMode}
        setViewMode={setViewMode}
        filterPets={filterPets}
        handleRefresh={fetchLostPets}
      />
      <div className="py-6 px-4 bg-slate-100/50 flex flex-col h-[calc(100vh-10rem)]">
        {isLoading ? (
          <div className="flex-1 flex flex-col justify-center items-center gap-2 text-center">
            <LoadingSpinner />
            <p className="text-gray-500 text-lg">
              Buscando mascotas perdidas cerca tuyo...
            </p>
          </div>
        ) : (
          emptyLocationView
        )}
      </div>
    </>
  );
};

export default LostPets;
