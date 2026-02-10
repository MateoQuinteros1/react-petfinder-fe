import { create } from "zustand";

export type Coords = {
  lat: number;
  lng: number;
} | null;

type LocationState = {
  coords: Coords;
  error: string | null;
};

type LocationActions = {
  initLocation: () => void;
  getLocation: () => void;
  listenForPermissionsChanges: () => void;
};

export const useLocationStore = create<LocationState & LocationActions>()(
  (set, get) => ({
    error: null,
    coords: null,
    initLocation: async () => {
      if (!navigator.geolocation) {
        set({ error: "Tu navegador no soporta geolocalización." });
        return;
      }

      const permission = await navigator.permissions.query({
        name: "geolocation",
      });

      if (permission.state === "granted") {
        get().getLocation();
      }
    },
    getLocation: () => {
      navigator.geolocation.getCurrentPosition((position) => {
        set({
          coords: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
      });
      get().listenForPermissionsChanges();
    },
    listenForPermissionsChanges: async () => {
      const permission = await navigator.permissions.query({
        name: "geolocation",
      });
      permission.onchange = () => {
        if (permission.state === "granted") {
          get().getLocation();
        }
        if (permission.state === "denied") {
          set({
            error:
              "Permiso de geolocalización denegado. Por favor, habilítalo para ver mascotas cercanas.",
            coords: null,
          });
        }
      };
    },
  }),
);
