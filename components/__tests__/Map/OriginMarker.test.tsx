// OriginMarker.test.tsx
import React from "react";
import renderer from "react-test-renderer";
import OriginMarker from "../../Map/OriginMarker";
import { Marker } from "react-native-maps";

jest.mock("react-native-maps", () => {
  return {
    Marker: jest.fn().mockReturnValue(null),
    Callout: jest.fn().mockReturnValue(null),
  };
});

const selectedRoutePoints = [{ lat: 37.78825, lng: -122.4324 }];

describe("OriginMarker", () => {
  it("should render correctly with given route points", () => {
    const tree = renderer
      .create(<OriginMarker selectedRoutePoints={selectedRoutePoints} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders the Marker with correct coordinates", () => {
    const component = renderer.create(
      <OriginMarker selectedRoutePoints={selectedRoutePoints} />
    );
    const markerInstance = component.root.findByType(Marker);

    // Check if the Marker has the correct props for latitude and longitude
    expect(markerInstance.props.coordinate.latitude).toBe(37.78825);
    expect(markerInstance.props.coordinate.longitude).toBe(-122.4324);
  });

  it("should render correctly with no route points", () => {
    const selectedRoutePoints: { lat: number; lng: number }[] = [];
    const tree = renderer
      .create(<OriginMarker selectedRoutePoints={selectedRoutePoints} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
