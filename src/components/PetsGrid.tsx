import type { AlgoliaPet } from "../state/lostPetsStore";
import LostPetCard from "./LostPetCard";

type PetsGridProps = {
  pets: AlgoliaPet[];
};

const PetsGrid = ({ pets }: PetsGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-5 justify-items-center 2xl:grid-cols-4">
      {pets.map((pet) => (
        <LostPetCard key={pet.objectID} pet={pet} />
      ))}
    </div>
  );
};

export default PetsGrid;
