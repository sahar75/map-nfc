import React, { useMemo } from "react";
import { Text, View } from "react-native";
import { Callout, Marker } from "react-native-maps";
const locationImg = require("../../assets/images/destination.png");

interface IProps {
  selectedRoutePoints: {
    lat: number;
    lng: number;
  }[];
}

const DestinationMarker: React.FC<IProps> = ({ selectedRoutePoints }) => {
  const destination = useMemo(
    () => selectedRoutePoints?.[(selectedRoutePoints?.length ?? 0) - 1],
    [selectedRoutePoints]
  );

  return (
    <Marker
      coordinate={{
        latitude: destination?.lat ?? 0,
        longitude: destination?.lng ?? 0,
      }}
      title="Destination"
      zIndex={100}
      pinColor="#5251FA"
      image={locationImg}
    >
      <Callout
        style={{
          width: 300,
          height: 100,
        }}
      >
        <View>
          <Text>test</Text>
        </View>
      </Callout>
    </Marker>
  );
};

export default React.memo(DestinationMarker);
