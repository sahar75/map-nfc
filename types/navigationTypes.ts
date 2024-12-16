import { StackNavigationProp } from "@react-navigation/stack";

// Define your stack parameters
export type RootStackParamList = {
  map: undefined;
  login: undefined;
};

export type AppNavigationProp = StackNavigationProp<
  RootStackParamList,
  "login"
>;
