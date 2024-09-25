import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import UserMarker from "../../Map/UserMarker";
import { useUserLocationStore } from "../../../store/userLocation";
import * as Location from "expo-location";
import { Alert } from "react-native";

// Mocking the userLocationStore
jest.mock("../../../store/userLocation", () => ({
  useUserLocationStore: jest.fn(),
}));

// Mocking the Location module
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

const removeMock = jest.fn();

describe("UserMarker", () => {
  const setUserLocationMock = jest.fn();
  const userLocationMock = { latitude: 0, longitude: 0 };

  beforeEach(() => {
    (useUserLocationStore as jest.MockedFunction<any>).mockReturnValue({
      userLocation: userLocationMock,
      setUserLocation: setUserLocationMock,
    });

    (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue(
      {
        status: "granted",
      }
    );

    (Location.watchPositionAsync as jest.Mock).mockImplementation(
      (_options, callback) => {
        setTimeout(() => {
          callback({
            coords: {
              latitude: 1,
              longitude: 1,
            },
          });
        }, 100);
        return Promise.resolve({ remove: removeMock });
      }
    );
  });

  it("renders correctly and requests location permissions", async () => {
    render(<UserMarker selectedRoutePoints={[{ lat: 0, lng: 0 }]} />);

    await waitFor(() => {
      expect(setUserLocationMock).toHaveBeenCalledWith({
        latitude: 1,
        longitude: 1,
      });
    });
  });

  it("handles location permission denial", async () => {
    (
      Location.requestForegroundPermissionsAsync as jest.Mock
    ).mockResolvedValueOnce({
      status: "denied",
    });

    const alertMock = jest.spyOn(Alert, "alert").mockImplementation();
    render(<UserMarker selectedRoutePoints={[{ lat: 0, lng: 0 }]} />);

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith(
        "Permission Denied",
        "Permission to access location was denied"
      );
    });

    alertMock.mockRestore();
  });

  it("correctly calculates marker rotation based on new location", async () => {
    const { getByTestId } = render(
      <UserMarker selectedRoutePoints={[{ lat: 0, lng: 0 }]} />
    );

    // Update the userLocationMock to simulate a previous location
    (useUserLocationStore as jest.MockedFunction<any>).mockReturnValue({
      userLocation: { latitude: 0, longitude: 0 },
      setUserLocation: setUserLocationMock,
    });

    await waitFor(() => {
      expect(setUserLocationMock).toHaveBeenCalledWith({
        latitude: 1,
        longitude: 1,
      });
      // Check that the rotation prop is as expected
      const marker = getByTestId("user-marker");
      expect(marker.props.rotation).toBeCloseTo(0);
    });
  });

  it("cleans up location subscription on unmount", async () => {
    const { unmount } = render(
      <UserMarker selectedRoutePoints={[{ lat: 0, lng: 0 }]} />
    );

    expect(Location.watchPositionAsync).toHaveBeenCalled();

    unmount();

    // Assuming you are tracking the remove function call
    expect(removeMock).toHaveBeenCalled(); // Ensure this is your mock function
  });

  it("handles missing userLocation", async () => {
    (useUserLocationStore as jest.MockedFunction<any>).mockReturnValueOnce({
      userLocation: null,
      setUserLocation: setUserLocationMock,
    });

    const { getByTestId } = render(
      <UserMarker selectedRoutePoints={[{ lat: 0, lng: 0 }]} />
    );

    await waitFor(() => {
      expect(setUserLocationMock).toHaveBeenCalledWith({
        latitude: 1,
        longitude: 1,
      });
      // Ensure rotation is not set or remains at default value
      const marker = getByTestId("user-marker");
      expect(marker.props.rotation).toBe(0);
    });
  });
});
