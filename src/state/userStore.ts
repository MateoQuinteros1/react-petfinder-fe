import { create } from "zustand";
const BEDomain = import.meta.env.VITE_BACKEND_URL;
import { useAuthStore } from "./authStore";

export type Pet = {
  id: string;
  name: string;
  type: "dog" | "cat";
  status: "lost" | "found";
  user_id: string;
  createdAt: string;
  updatedAt: string;
  location: string;
  lat: string;
  lng: string;
  image_url: string;
};

type CreatePetCredentials = {
  name: string;
  type: "dog" | "cat";
  status?: "lost" | "found";
  image_file: File | null;
  lat: string;
  lng: string;
};

type UserData = {
  id: string;
  name: string;
  birth_date: string;
  image_url: string;
  createdAt: string;
  updatedAt: string;
  pets: Pet[];
};

type PetsState = {
  isLoading: boolean;
  errorStatus: number | null;
};

type UserState = {
  petsState: PetsState;
  isUpdatingUserData: boolean;
  isLoadingData: boolean;
  userData: UserData | null;
  errorStatus: number | null;
  email: string | null;
};

export type Updates = {
  name?: string;
  image_file?: File | null;
};

type UserActions = {
  fetchUserData: (token: string) => Promise<void>;
  updateUserData: (updates: Updates) => Promise<void>;
  getUserEmail: () => Promise<void>;
  clearUserStore: () => void;
  createPet: (
    pet: CreatePetCredentials,
    navigateCB: () => void,
  ) => Promise<void>;
  updatePet: (
    updates: Partial<CreatePetCredentials>,
    petId: string,
    cb: () => void,
  ) => Promise<void>;
  deletePet: (petId: string, cb: () => void) => Promise<void>;
};

export const useUserStore = create<UserState & UserActions>()((set, get) => ({
  isUpdatingUserData: false,
  isLoadingData: false,
  userData: null,
  errorStatus: null,
  email: null,
  petsState: {
    isLoading: false,
    errorStatus: null,
  },
  fetchUserData: async (token: string) => {
    set({ isLoadingData: true });
    const response = await fetch(`${BEDomain}/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      useAuthStore.getState().logout();
      set({ errorStatus: response.status, isLoadingData: false });
      return;
    }

    const json = await response.json();
    set({ userData: json.data, errorStatus: null });
    set({ isLoadingData: false });
  },
  updateUserData: async (data: Updates) => {
    set({ isUpdatingUserData: true, errorStatus: null });

    const formData = new FormData();

    formData.append("currentName", get().userData?.name || "");
    if (data.name) formData.append("name", data.name);
    if (data.image_file) formData.append("file", data.image_file);

    const response = await fetch(`${BEDomain}/users`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${useAuthStore.getState().token}`,
      },
      body: formData,
    });

    if (response.status === 401) {
      useAuthStore.getState().logout();
      set({ isUpdatingUserData: false });
      return;
    }

    if (response.status === 409) {
      set({ isUpdatingUserData: false, errorStatus: response.status });
      return;
    }

    if (!response.ok) {
      set({ isUpdatingUserData: false, errorStatus: response.status });
      return;
    }

    const json = await response.json();
    set({ userData: json, isUpdatingUserData: false });
  },
  getUserEmail: async () => {
    const response = await fetch(`${BEDomain}/auth/email`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${useAuthStore.getState().token}`,
      },
    });

    if (!response.ok) {
      useAuthStore.getState().logout();
      return;
    }

    const json = await response.json();
    set({ email: json.email });
  },
  clearUserStore: () =>
    set(() => ({
      isLoadingData: false,
      userData: null,
      errorStatus: null,
      email: null,
    })),
  createPet: async (pet: CreatePetCredentials, navigateCB: () => void) => {
    set({ petsState: { isLoading: true, errorStatus: null } });
    const formData = new FormData();
    formData.append("name", pet.name);
    formData.append("type", pet.type);
    formData.append("lat", pet.lat);
    formData.append("lng", pet.lng);
    formData.append("file", pet.image_file!);
    const response = await fetch(`${BEDomain}/pets`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${useAuthStore.getState().token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      set({ petsState: { isLoading: false, errorStatus: response.status } });
      return;
    }

    const json = await response.json();
    set({
      petsState: { isLoading: false, errorStatus: null },
      userData: {
        ...get().userData!,
        pets: [...get().userData!.pets, json.data],
      },
    });
    navigateCB();
  },
  updatePet: async (
    updates: Partial<CreatePetCredentials>,
    petId: string,
    cb: () => void,
  ) => {
    set({ petsState: { isLoading: true, errorStatus: null } });
    const formData = new FormData();

    if (updates.name) formData.append("name", updates.name);
    if (updates.type) formData.append("type", updates.type);
    if (updates.status) formData.append("status", updates.status);
    if (updates.lat && updates.lng) {
      formData.append("lat", updates.lat);
      formData.append("lng", updates.lng);
    }
    if (updates.image_file) formData.append("file", updates.image_file);

    const response = await fetch(`${BEDomain}/pets/${petId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${useAuthStore.getState().token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      set({ petsState: { isLoading: false, errorStatus: response.status } });
      return;
    }

    const json = await response.json();
    set({
      petsState: { isLoading: false, errorStatus: null },
      userData: {
        ...get().userData!,
        pets: get().userData!.pets.map((pet) =>
          pet.id === petId ? json.data : pet,
        ),
      },
    });
    cb();
  },
  deletePet: async (petId: string, cb: () => void) => {
    set({ petsState: { isLoading: true, errorStatus: null } });
    const response = await fetch(`${BEDomain}/pets/${petId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${useAuthStore.getState().token}`,
      },
    });

    if (!response.ok) {
      set({ petsState: { isLoading: false, errorStatus: response.status } });
      return;
    }

    set({
      petsState: { isLoading: false, errorStatus: null },
      userData: {
        ...get().userData!,
        pets: get().userData!.pets.filter((pet) => pet.id !== petId),
      },
    });
    cb();
  },
}));
