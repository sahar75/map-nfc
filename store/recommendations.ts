import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IRoute } from "../types/route.types";
import { recommendationMockData } from "../constants/recommendationMockData";

interface RoutePoint {
  latitude: number;
  longitude: number;
}

interface RecommendationState {
  selected: number;
  setSelected: (selected: number) => void;
  recommendations: IRoute[];
  setRecommendations: (recommendations: IRoute[]) => void;
  allRecommendations: IRoute[];
  setAllRecommendations: (recommendations: IRoute[]) => void;
  reset: () => void;
}

export const useRecommendationStore = create<RecommendationState>()(
  devtools(
    persist(
      (set) => ({
        selected: 0,
        setSelected: (selected) => set(() => ({ selected: selected })),
        recommendations: recommendationMockData,
        setRecommendations: (recommendation) =>
          set(() => ({ recommendations: recommendation })),
        allRecommendations: recommendationMockData,
        setAllRecommendations: (allRecommendations) =>
          set(() => ({ allRecommendations })),
        reset: () =>
          set(() => ({
            selected: 0,
            recommendations: [],
            allRecommendations: [],
          })),
      }),
      {
        name: "recommendation-storage",
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  )
);
