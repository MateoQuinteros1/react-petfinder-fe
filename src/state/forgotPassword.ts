import { create } from "zustand";
const BEDomain = import.meta.env.VITE_BACKEND_URL;

type ResetPasswordState = {
  isLoading: boolean;
  error: boolean;
  success: boolean;
};

type ResetPasswordActions = {
  sendResetPasswordEmail: (email: string) => Promise<void>;
};

export const useResetPasswordStore = create<
  ResetPasswordState & ResetPasswordActions
>()((set) => ({
  isLoading: false,
  error: false,
  success: false,
  sendResetPasswordEmail: async (email: string) => {
    set(() => ({ isLoading: true, error: false, success: false }));
    const response = await fetch(`${BEDomain}/auth/forgotpassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (response.status === 500) {
      set(() => ({ isLoading: false, error: true }));
      return;
    }

    set(() => ({ isLoading: false, success: true }));
  },
}));
