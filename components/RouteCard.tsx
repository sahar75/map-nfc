import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { twMerge } from "tailwind-merge";
import { IRoute } from "../types/route.types";

const carImage = require("../assets/images/car.png");

interface IRouteCardProps {
  item: IRoute;
  selected?: boolean;
  onPress: () => void;
  index: number;
}

const RouteCard: React.FC<IRouteCardProps> = ({
  item,
  onPress,
  selected,
  index,
}) => {
  return (
    <Pressable
      testID="route-card"
      className={twMerge(
        "bg-white rounded-xl p-5 pt-2 mb-4 border border-[#ECEEF6]",
        selected && "border-violet-700"
      )}
      onPress={onPress}
    >
      <View>
        <View className="flex-row mb-4 border-b border-gray-200 pb-2 justify-between w-full items-center">
          <Text className="text-lg font-bold">Route {index}</Text>
          <Image source={carImage} className="h-12 w-12" resizeMode="contain" />
        </View>
        <View className="flex-row flex-wrap">
          <Text className="w-1/2 mb-2 text-gray-500">ATM: </Text>
          <Text className="w-1/2 mb-2 font-bold">{item.atmName}</Text>
          <Text className="w-1/2 mb-2 text-gray-500">Source</Text>
          <Text className="w-1/2 mb-2 font-bold">{item.sourceName}</Text>
          <Text className="w-1/2 text-gray-500">Destination</Text>
          <Text className="w-1/2 font-bold">{item.destinationName}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default RouteCard;
