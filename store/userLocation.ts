import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface RoutePoint {
  latitude: number;
  longitude: number;
}

interface UserLocationState {
  userLocation: RoutePoint;
  setUserLocation: (userLocation: RoutePoint) => void;
}

export const useUserLocationStore = create<UserLocationState>()(
  devtools(
    persist(
      (set) => ({
        userLocation: { latitude: 0, longitude: 0 },
        setUserLocation: (userLocation) => set(() => ({ userLocation })),
      }),
      {
        name: "user-location-storage",
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  )
);
