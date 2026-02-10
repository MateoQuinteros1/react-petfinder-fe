import { create } from "zustand";
const BEDomain = import.meta.env.VITE_BACKEND_URL;

type ResetPasswordState = {
  isLoading: boolean;
  success: boolean;
  errorStatus: number | null;
};

type ResetPasswordActions = {
  resetPassword: (token: string, password: string) => Promise<void>;
};

export const useResetPasswordStore = create<
  ResetPasswordState & ResetPasswordActions
>()((set) => ({
  isLoading: false,
  success: false,
  errorStatus: null,
  resetPassword: async (token: string, password: string) => {
    set(() => ({ isLoading: true, errorStatus: null, success: false }));
    const response = await fetch(`${BEDomain}/auth/resetpassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, newPassword: password }),
    });

    if (!response.ok) {
      set(() => ({ isLoading: false, errorStatus: response.status }));
      return;
    }

    set(() => ({ isLoading: false, success: true }));
  },
}));
