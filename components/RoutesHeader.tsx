import { View, Text } from "react-native";
import React from "react";
import SearchInput from "./SearchInput";
import { useRecommendationStore } from "../store/recommendations";

const RoutesHeader = () => {
  const { setRecommendations, allRecommendations } = useRecommendationStore();

  return (
    <View className="mt-10">
      <SearchInput
        placeholder="Search..."
        containerStyles="mb-6"
        onSubmit={(query) => {
          if (query.trim() === "") {
            setRecommendations(allRecommendations);
          } else
            setRecommendations(
              allRecommendations?.filter((x) =>
                x.atmName
                  .toLocaleLowerCase()
                  .includes(query.toLocaleLowerCase())
              )
            );
        }}
      />
      <Text className="font-bold text-2xl mb-4">Recommended Routes</Text>
    </View>
  );
};

export default RoutesHeader;
