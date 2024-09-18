import { View } from "react-native";
import React from "react";

const createIconSet = () => {
  return (props) => <View {...props} />;
};

export const FontAwesome = createIconSet();
