import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type LoginSchema } from "../schemas/login.schema";
import { useUserStore } from "./userStore";
import type { SignupSchema } from "../schemas/signup.schema";
import type { UpdatePasswordSchema } from "../schemas/updatepassword.schema";
import { useLostPetsStore } from "./lostPetsStore";

const BEDomain = import.meta.env.VITE_BACKEND_URL;

type AuthState = {
  isAuthenticated: boolean;
  token: string | null;
  isAuthLoading?: boolean;
  errorStatus: number | null;
  errorMessage: string | null;
  successRegister: boolean;
  successUpdatePassword: boolean;
};

type AuthActions = {
  login: (credentials: LoginSchema) => Promise<void>;
  logout: () => void;
  signup: (crendentials: SignupSchema, image_file: File) => Promise<void>;
  updatePassword: (credentials: Partial<UpdatePasswordSchema>) => Promise<void>;
};

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      successRegister: false,
      errorStatus: null,
      errorMessage: null,
      isAuthLoading: false,
      isAuthenticated: false,
      successUpdatePassword: false,
      token: null,
      login: async (credentials: LoginSchema) => {
        set(() => ({ isAuthLoading: true, errorStatus: null }));
        const response = await fetch(`${BEDomain}/auth/token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });

        if (!response.ok) {
          set(() => ({ isAuthLoading: false, errorStatus: response.status }));
          return;
        }

        const json = await response.json();
        set(() => ({
          isAuthLoading: false,
          isAuthenticated: true,
          token: json.user.token,
        }));
      },
      logout: () => {
        useUserStore.getState().clearUserStore();
        useLostPetsStore.getState().clearState();
        set(() => ({
          isAuthenticated: false,
          token: null,
          successRegister: false,
          errorStatus: null,
          errorMessage: null,
          successUpdatePassword: false,
        }));
      },
      signup: async (credentials: SignupSchema, image_file: File) => {
        set(() => ({ isAuthLoading: true, errorStatus: null }));
        const formData = new FormData();
        formData.append("name", credentials.name);
        formData.append("email", credentials.email);
        formData.append("password", credentials.password);
        formData.append("birth_date", credentials.birth_date);
        formData.append("file", image_file);

        const response = await fetch(`${BEDomain}/auth`, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const json = await response.json();
          set(() => ({
            isAuthLoading: false,
            errorStatus: response.status,
            errorMessage: json.error,
          }));
          return;
        }
        set(() => ({ isAuthLoading: false, successRegister: true }));
      },
      updatePassword: async (credentials: Partial<UpdatePasswordSchema>) => {
        set(() => ({
          isAuthLoading: true,
          errorStatus: null,
          successUpdatePassword: false,
          errorMessage: null,
        }));
        const response = await fetch(`${BEDomain}/users/password`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${get().token}`,
          },
          body: JSON.stringify(credentials),
        });

        if (response.status === 401) {
          const json = await response.json();
          set(() => ({
            isAuthLoading: false,
            errorStatus: response.status,
            errorMessage: json.error,
          }));
          return;
        }

        if (response.status === 500) {
          set(() => ({ isAuthLoading: false, errorStatus: response.status }));
          return;
        }

        set(() => ({ isAuthLoading: false, successUpdatePassword: true }));
      },
    }),
    {
      name: "auth-store",
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        token: state.token,
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.isAuthenticated && state?.token) {
          useUserStore.getState().fetchUserData(state.token);
        }
      },
    },
  ),
);
