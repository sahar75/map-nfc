import React from "react";
import { Text, TextProps } from "react-native";

export function MonoText(props: Readonly<TextProps>) {
  return <Text {...props} style={[props.style, { fontFamily: "SpaceMono" }]} />;
}
