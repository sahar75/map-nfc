import React from "react";
import { Text, View } from "react-native";

interface IEmptyStateProps {
  title: string;
}

const EmptyState: React.FC<IEmptyStateProps> = ({ title }) => {
  return (
    <View className="justify-center items-center px-4">
      <Text className="text-xl text-center font-psemibold mt-2">{title}</Text>
    </View>
  );
};

export default EmptyState;
