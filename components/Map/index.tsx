import { getRecommendations } from "../../api/recommendation";
import { useRecommendationStore } from "../../store/recommendations";
import { useUserLocationStore } from "../../store/userLocation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Polyline } from "react-native-maps";
import DestinationMarker from "./DestinationMarker";
import OriginMarker from "./OriginMarker";
import UserMarker from "./UserMarker";

function MapComponent() {
  const mapRef = useRef<MapView>(null);

  const {
    selected,
    recommendations,
    setAllRecommendations,
    setRecommendations,
    setSelected,
  } = useRecommendationStore();
  const { userLocation } = useUserLocationStore();
  const region = useMemo(
    () => ({
      latitude: userLocation?.latitude || 0,
      longitude: userLocation?.longitude || 0,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }),
    [userLocation]
  );
  const [mapRegion, setMapRegion] = useState(region);

  const selectedRoutePoints = useMemo(
    () => recommendations?.[selected]?.points || [],
    [recommendations, selected]
  );

  const [isFetched, setIsFetched] = useState(false);
  const [initialRegionSet, setInitialRegionSet] = useState(false);

  useEffect(() => {
    if (userLocation?.latitude && userLocation?.longitude && !isFetched) {
      setSelected(0);
      getRecommendations({
        lat: userLocation?.latitude,
        lng: userLocation?.longitude,
      })
        .then((res) => {
          setAllRecommendations(res ?? []);
          setRecommendations(res ?? []);
        })
        .finally(() => {
          setIsFetched(true);
        });
    }
  }, [userLocation]);

  const polylineCoords = useMemo(
    () =>
      selectedRoutePoints?.map((point) => ({
        latitude: point.lat,
        longitude: point.lng,
      })) || [],
    [selectedRoutePoints]
  );

  const nearestIndex = useMemo(() => {
    if (!userLocation || !selectedRoutePoints.length) return 0;

    let closestDistance = Infinity;
    let closestIndex = 0;

    selectedRoutePoints.forEach((point, index) => {
      const distance = Math.sqrt(
        Math.pow(point.lat - userLocation.latitude, 2) +
          Math.pow(point.lng - userLocation.longitude, 2)
      );

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    return closestIndex;
  }, [userLocation, selectedRoutePoints]);

  const traveledRouteCoords = polylineCoords.slice(0, nearestIndex + 1);
  const remainingRouteCoords = polylineCoords.slice(nearestIndex);

  useEffect(() => {
    if (userLocation && !initialRegionSet) {
      setMapRegion((prevRegion) => ({
        ...prevRegion,
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
      }));
      setInitialRegionSet(true);
    }
  }, [userLocation]);

  useEffect(() => {
    if (mapRef.current && selectedRoutePoints.length) {
      let angle;
      if (traveledRouteCoords.length) {
        const firstPoint =
          traveledRouteCoords?.[traveledRouteCoords.length - 1];
        const secondPoint = remainingRouteCoords?.[0];
        angle =
          Math.atan2(
            secondPoint.longitude - firstPoint.longitude,
            secondPoint.latitude - firstPoint.latitude
          ) *
          (180 / Math.PI);
      } else {
        const firstPoint = selectedRoutePoints?.[0];
        const secondPoint = selectedRoutePoints?.[1];
        angle =
          Math.atan2(
            secondPoint.lng - firstPoint.lng,
            secondPoint.lat - firstPoint.lat
          ) *
          (180 / Math.PI);
      }
      // Change camera on component mount or when showingBirdsEyeView changes
      mapRef?.current.animateCamera(
        {
          center: {
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          }, // Center of the map
          pitch: 60, // Set pitch (change angle)
          heading: angle, // Set heading (rotate)
          altitude: 500, // Altitude for better visibility
          zoom: 20,
        },
        { duration: 1000 }
      ); // Animation duration
    }
  }, [selectedRoutePoints, userLocation]);

  return (
    <View className="flex-1">
      <MapView
        style={StyleSheet.absoluteFillObject}
        region={mapRegion}
        followsUserLocation
        showsMyLocationButton
        zoomControlEnabled
        ref={mapRef}
        data-testid="map"
      >
        <UserMarker selectedRoutePoints={selectedRoutePoints} />
        <DestinationMarker selectedRoutePoints={selectedRoutePoints} />
        <OriginMarker selectedRoutePoints={selectedRoutePoints} />
        <Polyline
          coordinates={remainingRouteCoords}
          strokeColor="#5932EA"
          strokeWidth={6}
        />
        <Polyline
          coordinates={remainingRouteCoords}
          strokeColor="rgba(89, 50, 234, 0.3)"
          strokeWidth={8}
        />
        <Polyline
          coordinates={traveledRouteCoords}
          strokeColor="#FF0000"
          strokeWidth={6}
        />
      </MapView>
    </View>
  );
}

export default React.memo(MapComponent);
