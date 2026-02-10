import { SearchX, RefreshCcw } from "lucide-react";

type EmptyResultsProps = {
  onClearFilters: () => void;
};

const EmptyResults = ({ onClearFilters }: EmptyResultsProps) => {
  return (
    <div className="w-full h-full bg-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-2 w-xs md:w-xl">
        <div className="bg-red-500/10 rounded-full p-8">
          <SearchX className="text-red-500 size-17" />
        </div>
        <p className="text-3xl font-bold text-center text-red-500">
          No encontramos huellitas en esta zona{" "}
        </p>
        <p className="text-center text-gray-500">
          No hay reportes que coincidan con los filtros que aplicaste. Prueba
          ampliar el radio de búsqueda o limpiar los filtros.
        </p>
        <button
          onClick={onClearFilters}
          className="bg-black text-white rounded-xl p-3 flex mt-5 hover:bg-gray-800 transition-colors cursor-pointer"
        >
          <RefreshCcw className="size-5 mr-2" />
          Limpiar filtros
        </button>
      </div>
    </div>
  );
};

export default EmptyResults;
