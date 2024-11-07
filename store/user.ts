import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface UserState {
  userHash: string;
  setUserHash: (userHash: string) => void;
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        userHash: "",
        setUserHash: (userHash) => set(() => ({ userHash })),
        isLogin: false,
        setIsLogin: (isLogin) => set(() => ({ isLogin })),
      }),
      {
        name: "user-storage",
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  )
);
