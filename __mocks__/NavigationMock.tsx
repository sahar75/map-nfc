import React, { ComponentType } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

type NavigationMockProps = {
  controller: ComponentType<any>;
  params?: any;
};
export const NavigationMock = ({ controller, params }: NavigationMockProps) => {
  const Stack = createNativeStackNavigator<any>();

  return (
    <NavigationContainer independent>
      <Stack.Navigator initialRouteName="TestRoute">
        <Stack.Screen
          name="TestRoute"
          component={controller}
          initialParams={params}
          options={{ header: () => null }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
