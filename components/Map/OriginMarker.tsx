import React, { useMemo } from "react";
import { View } from "react-native";
import { Marker } from "react-native-maps";
const locationImg = require("../../assets/images/origin.png");

interface IProps {
  selectedRoutePoints: {
    lat: number;
    lng: number;
  }[];
}

const OriginMarker: React.FC<IProps> = ({ selectedRoutePoints }) => {
  const origin = useMemo(() => selectedRoutePoints?.[0], [selectedRoutePoints]);

  return (
    <Marker
      coordinate={{ latitude: origin?.lat ?? 0, longitude: origin?.lng ?? 0 }}
      title="Origin"
      image={locationImg}
      anchor={{ x: 0.45, y: 0.7 }}
    />
  );
};

export default React.memo(OriginMarker);
