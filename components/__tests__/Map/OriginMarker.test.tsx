// OriginMarker.test.tsx
import React from 'react';
import TestRenderer from 'react-test-renderer';
import OriginMarker from '../../Map/OriginMarker';

// Mock the Marker component from react-native-maps
jest.mock('react-native-maps', () => {
  return {
    Marker: 'Marker',
  };
});

describe('OriginMarker', () => {
  it('should render correctly with given route points', () => {
    const selectedRoutePoints = [{ lat: 37.78825, lng: -122.4324 }];
    const tree = TestRenderer.create(
      <OriginMarker selectedRoutePoints={selectedRoutePoints} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with no route points', () => {
    const selectedRoutePoints: { lat: number; lng: number }[] = [];
    const tree = TestRenderer.create(
      <OriginMarker selectedRoutePoints={selectedRoutePoints} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
