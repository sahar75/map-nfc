import React from "react";
import renderer from "react-test-renderer";
import { Marker } from "react-native-maps";
import DestinationMarker from "../../Map/DestinationMarker";

jest.mock("react-native-maps", () => {
  return {
    Marker: jest.fn().mockReturnValue(null),
    Callout: jest.fn().mockReturnValue(null),
  };
});

describe("DestinationMarker Component", () => {
  const mockSelectedRoutePoints = [
    { lat: 37.7749, lng: -122.4194 },
    { lat: 34.0522, lng: -118.2437 },
  ];

  it("renders correctly", () => {
    const tree = renderer
      .create(
        <DestinationMarker selectedRoutePoints={mockSelectedRoutePoints} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders the Marker with correct coordinates", () => {
    const component = renderer.create(
      <DestinationMarker selectedRoutePoints={mockSelectedRoutePoints} />
    );
    const markerInstance = component.root.findByType(Marker);

    // Check if the Marker has the correct props for latitude and longitude
    expect(markerInstance.props.coordinate.latitude).toBe(34.0522);
    expect(markerInstance.props.coordinate.longitude).toBe(-118.2437);
  });

  it("uses default coordinates if no destination is available", () => {
    const component = renderer.create(
      <DestinationMarker selectedRoutePoints={[]} />
    );
    const markerInstance = component.root.findByType(Marker);

    // Check if default coordinates are used
    expect(markerInstance.props.coordinate.latitude).toBe(0);
    expect(markerInstance.props.coordinate.longitude).toBe(0);
  });
});
