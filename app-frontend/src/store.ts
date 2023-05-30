import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BearState {
  isAuth: boolean;
  jwt: string;
  username: string;
  setAuth: (arg0: { jwt: string; username: string }) => void;
  removeAuth: () => void;
}

export const useAppState = create<BearState>()(
  persist(
    (set) => ({
      isAuth: false,
      jwt: "",
      username: "",
      setAuth: ({ jwt, username }) => {
        set(() => ({ isAuth: true, jwt, username }));
      },
      removeAuth: () => {
        set(() => ({ isAuth: false, jwt: "", username: "" }));
      },
    }),
    {
      name: "app-storage",
    }
  )
);
