import { Map, LayoutGrid, RefreshCcw, LucideRadar } from "lucide-react";
import { type SearchRadius, useLostPetsStore } from "../state/lostPetsStore";

type PetType = "all" | "dog" | "cat";
type ViewMode = "grid" | "map";

interface PetsExplorerHeaderProps {
  activeFilter: PetType;
  viewMode: ViewMode;
  setActiveFilter: (filter: PetType) => void;
  setViewMode: (mode: ViewMode) => void;
  filterPets: (filter: "dog" | "cat") => void;
  handleRefresh: () => void;
}

const radiusOptions: { value: SearchRadius; label: string }[] = [
  { value: 1, label: "1 km" },
  { value: 5, label: "5 km" },
  { value: 10, label: "10 km" },
  { value: 20, label: "20 km" },
  { value: 50, label: "50 km" },
  { value: 100, label: "100 km" },
];

const categories: { id: PetType; value: string }[] = [
  { id: "all", value: "Todos" },
  { id: "dog", value: "Perros" },
  { id: "cat", value: "Gatos" },
];

const PetsExplorerHeader = ({
  activeFilter,
  setActiveFilter,
  viewMode,
  setViewMode,
  filterPets,
  handleRefresh,
}: PetsExplorerHeaderProps) => {
  const { setSearchRadius, searchRadius } = useLostPetsStore();

  return (
    <div className="container mx-auto px-4 py-8 border-b border-gray-300 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Mascotas cerca de ti
          </h1>
          <p className="text-gray-500 text-base">
            Si viste alguna de estas mascotas, contactá a su dueño para ayudarla
            a volver a casa.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Botones de vista */}
          <div className="flex items-center bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/50">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-xl transition-all duration-200 text-slate-500 ${viewMode === "grid" ? "bg-tropical-rain-forest-950 text-white" : "hover:text-slate-700"}`}
            >
              <LayoutGrid className="size-6" />
            </button>
            <button
              onClick={() => setViewMode("map")}
              className={`p-2 rounded-xl transition-all duration-200 text-slate-500 ${viewMode === "map" ? "bg-tropical-rain-forest-950 text-white" : "hover:text-slate-700"}`}
            >
              <Map className="size-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-3 flex-col md:flex-row md:gap-15">
        {/* Filtros por tipo de mascota */}
        <div className="flex items-center gap-3 overflow-x-auto">
          {categories.map((category) => (
            <button
              onClick={() => {
                setActiveFilter(category.id);
                if (category.id !== "all") {
                  filterPets(category.id);
                }
              }}
              key={category.id}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-semibold text-slate-600 border cursor-pointer ${activeFilter === category.id ? "bg-tropical-rain-forest-950 text-white border-tropical-rain-forest-950" : "bg-white hover:bg-slate-50 hover:border-slate-300 border-slate-200"}`}
            >
              {category.value}
            </button>
          ))}
        </div>
        {/* Filtros por distancia */}
        <div className="flex gap-3">
          <div className="flex items-center gap-2">
            <LucideRadar className="size-6 text-tropical-rain-forest-950" />
            <p className="text-base font-bold">Distancia</p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={searchRadius!}
              onChange={(e) =>
                setSearchRadius(Number(e.target.value) as SearchRadius)
              }
              className="border border-slate-200/50 rounded-lg p-2 hover:bg-slate-50"
            >
              {radiusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div
        onClick={() => handleRefresh()}
        className="absolute bottom-6 right-6 text-tropical-rain-forest-950 cursor-pointer hover:scale-110 transition-transform duration-200 group/refresh flex flex-col items-center justify-center"
      >
        <RefreshCcw className="self-center" />
        <p className="text-xs">Actualizar</p>
      </div>
    </div>
  );
};

export default PetsExplorerHeader;
