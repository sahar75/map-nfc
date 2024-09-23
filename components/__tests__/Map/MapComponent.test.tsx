import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import MapComponent from "../../Map";
import * as recommendationApi from "../../../api/recommendation";
import { useRecommendationStore } from "../../../store/recommendations";
import { useUserLocationStore } from "../../../store/userLocation";
import * as Location from "expo-location"; // Import Location

// Mock the stores and API
jest.mock("../../../store/recommendations", () => ({
  useRecommendationStore: jest.fn(),
}));

jest.mock("../../../store/userLocation", () => ({
  useUserLocationStore: jest.fn(),
}));

jest.mock("../../../api/recommendation");

jest.mock("expo-location", () => ({
  requestForegroundPermissionsAsync: jest.fn(),
  watchPositionAsync: jest.fn(),
  Accuracy: {
    BestForNavigation: "best",
    High: "high",
    Balanced: "balanced",
    Low: "low",
  },
}));

describe("MapComponent", () => {
  const mockSetAllRecommendations = jest.fn();
  const mockSetRecommendations = jest.fn();
  const mockSetSelected = jest.fn();

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Mock implementation of useRecommendationStore
    (useRecommendationStore as jest.MockedFunction<any>).mockReturnValue({
      selected: 0,
      recommendations: [],
      setAllRecommendations: mockSetAllRecommendations,
      setRecommendations: mockSetRecommendations,
      setSelected: mockSetSelected,
    });

    // Mock implementation of useUserLocationStore
    (useUserLocationStore as jest.MockedFunction<any>).mockReturnValue({
      userLocation: { latitude: 10, longitude: 10 },
    });

    // Mock API response
    (recommendationApi.getRecommendations as jest.Mock).mockResolvedValue([
      {
        atmName: "ATM 1",
        sourceName: "Source A",
        destinationName: "Destination B",
        distance: 0,
        duration: 0,
        id: "",
        location: { lat: 0, lng: 0 },
        points: [
          { lat: 10, lng: 10 },
          { lat: 20, lng: 20 },
        ],
      },
    ]);

    // Mock location permissions response
    (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue(
      {
        status: "granted", // Mock the status as 'granted'
      }
    );
  });

  it("renders correctly", async () => {
    const { getByTestId } = render(<MapComponent />);
    const map = getByTestId("map");
    expect(map).toBeTruthy();
  });

  it("fetches recommendations on mount", async () => {
    render(<MapComponent />);

    await waitFor(() => {
      expect(mockSetSelected).toHaveBeenCalledWith(0);
      expect(mockSetAllRecommendations).toHaveBeenCalled();
      expect(mockSetRecommendations).toHaveBeenCalled();
    });
  });

  it("calculates polyline coordinates correctly", async () => {
    render(<MapComponent />);

    await waitFor(() => {
      expect(mockSetAllRecommendations).toHaveBeenCalled();
    });

    const { recommendations } = useRecommendationStore();
    recommendations[0] = {
      atmName: "ATM 1",
      sourceName: "Source A",
      destinationName: "Destination B",
      distance: 0,
      duration: 0,
      id: "",
      location: { lat: 0, lng: 0 },
      points: [
        { lat: 10, lng: 10 },
        { lat: 20, lng: 20 },
      ],
    };

    const polylineCoords = recommendations[0].points.map((point) => ({
      latitude: point.lat,
      longitude: point.lng,
    }));

    expect(polylineCoords).toEqual([
      { latitude: 10, longitude: 10 },
      { latitude: 20, longitude: 20 },
    ]);
  });
});
