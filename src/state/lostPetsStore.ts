import { create } from "zustand";
import { persist } from "zustand/middleware";
import { client, indexName } from "../lib/algolia";
import { useUserStore } from "./userStore";
import { useLocationStore } from "./locationStore";

export type AlgoliaPet = {
  objectID: string;
  name: string;
  type: "dog" | "cat";
  _geoloc: {
    lng: string;
    lat: string;
  };
  status: "lost" | "found";
  image_url: string;
  location: string;
  user_id: string;
  _rankingInfo?: {
    geoDistance: number; // Distance in meters from search point
  };
  createdAt: string;
};

export type SearchRadius = 1 | 5 | 10 | 20 | 50 | 100;

type LostPetsState = {
  searchRadius: SearchRadius | null;
  pets: AlgoliaPet[];
  filteredPetList: AlgoliaPet[];
  isLoading: boolean;
  error: string | null;
};

type LostPetsActions = {
  setSearchRadius: (radius: SearchRadius) => void;
  fetchLostPets: () => Promise<void>;
  filterPets: (type: "dog" | "cat") => void;
  clearState: () => void;
};

export const useLostPetsStore = create<LostPetsState & LostPetsActions>()(
  persist(
    (set, get) => ({
      searchRadius: 10,
      pets: [],
      filteredPetList: [],
      isLoading: false,
      error: null,

      setSearchRadius: (radius: SearchRadius) => {
        set({ searchRadius: radius });
        get().fetchLostPets();
      },
      fetchLostPets: async () => {
        set({ isLoading: true });
        try {
          const { hits } = await client.searchSingleIndex<AlgoliaPet>({
            indexName,
            searchParams: {
              aroundLatLng: `${useLocationStore.getState().coords?.lat},${useLocationStore.getState().coords?.lng}`,
              aroundRadius: get().searchRadius! * 1000,
              query: "lost",
              getRankingInfo: true,
            },
          });

          const finalPetList = hits.filter((h) => {
            return h.user_id !== useUserStore.getState().userData?.id;
          });
          set({ pets: finalPetList, isLoading: false });
        } catch (error) {
          set({
            error: "Error al obtener mascotas perdidas",
            isLoading: false,
          });
        }
      },
      filterPets: (type: "dog" | "cat") => {
        const { pets } = get();
        const filteredPets = pets.filter((pet) => pet.type === type);
        set({ filteredPetList: filteredPets });
      },
      clearState: () => {
        set({
          searchRadius: 10,
          pets: [],
          filteredPetList: [],
          isLoading: false,
          error: null,
        });
      },
    }),
    {
      name: "lost-pets-storage",
      partialize: (state) => ({ searchRadius: state.searchRadius }),
    },
  ),
);
