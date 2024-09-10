import { useUserLocationStore } from "../../store/userLocation";
import * as Location from "expo-location";
import React, { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import { Marker } from "react-native-maps";
const locationImg = require("../../assets/images/user-location.png");

interface IProps {
  selectedRoutePoints: {
    lat: number;
    lng: number;
  }[];
}

const UserMarker: React.FC<IProps> = ({ selectedRoutePoints }) => {
  const { userLocation, setUserLocation } = useUserLocationStore();
  const [userMarkerRotation, setUserMarkerRotation] = useState(0);

  const handleLocationUpdate = useCallback(
    (location: Location.LocationObject) => {
      if (location.coords) {
        const newUserLocation = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };

        if (userLocation) {
          const angle =
            Math.atan2(
              newUserLocation.longitude - userLocation.longitude,
              newUserLocation.latitude - userLocation.latitude
            ) *
            (180 / Math.PI);

          setUserMarkerRotation(-angle + 90);
        }
        setUserLocation(newUserLocation);
      }
    },
    [selectedRoutePoints, userLocation]
  );

  useEffect(() => {
    const requestLocationPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Permission to access location was denied"
        );
        return;
      }

      const locationSubscription = Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          distanceInterval: 1,
          timeInterval: 3000,
        },
        handleLocationUpdate
      );

      return () => locationSubscription.then((sub) => sub.remove());
    };
    requestLocationPermissions();
  }, []);

  return (
    <Marker
      coordinate={userLocation}
      rotation={userMarkerRotation}
      zIndex={100}
      image={locationImg}
    />
  );
};

export default React.memo(UserMarker);
