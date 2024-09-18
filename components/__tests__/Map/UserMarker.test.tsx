import React from "react";
import TestRenderer from "react-test-renderer";
import UserMarker from "../../Map/UserMarker";

// Mock the Marker component from react-native-maps
jest.mock("react-native-maps", () => {
  return {
    Marker: "Marker",
  };
});

// Mock expo-location
jest.mock("expo-location", () => ({
  requestForegroundPermissionsAsync: jest
    .fn()
    .mockResolvedValue({ status: "granted" }),
  watchPositionAsync: jest.fn().mockResolvedValue({ remove: jest.fn() }),
  Accuracy: {
    BestForNavigation: "BestForNavigation",
  },
}));

// Mock the useUserLocationStore hook
jest.mock("../../../store/userLocation", () => ({
  useUserLocationStore: jest.fn().mockReturnValue({
    userLocation: { latitude: 37.78825, longitude: -122.4324 },
    setUserLocation: jest.fn(),
  }),
}));

describe("UserMarker", () => {
  it("should render correctly with user location", () => {
    const tree = TestRenderer.create(
      <UserMarker selectedRoutePoints={[]} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should handle location updates correctly", () => {
    // Create an instance to check if location update logic runs
    TestRenderer.create(<UserMarker selectedRoutePoints={[]} />);
    // Here you could test specific behaviors or state changes if needed
    // This might include checking if the mocked functions were called
  });
});
